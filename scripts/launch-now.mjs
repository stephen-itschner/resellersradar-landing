// scripts/launch-now.mjs
import "dotenv/config";
import Stripe from "stripe";

/**
 * Launch flow to guarantee first charge ~= $1 (pre-tax):
 * 1) Remove lifetime discount temporarily.
 * 2) Add one-time negative invoice item on THIS subscription (discountable: false).
 * 3) End trial now (generates first invoice immediately).
 * 4) Re-attach lifetime discount for future months.
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

const DRY_RUN = (process.env.DRY_RUN || "0").toString() === "1";
const LIFETIME_COUPON = process.env.STRIPE_COUPON_LIFETIME30 || "";
const TARGET_CENTS = Number(process.env.FIRST_MONTH_TARGET_CENTS || 100);
const MAX_POLLS = 20;
const POLL_MS = 1500;

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY (put it in .env)");
  process.exit(1);
}

const fmt = (cents, ccy = "usd") =>
  `${(cents / 100).toFixed(2)} ${String(ccy).toUpperCase()}`;

async function deleteSubDiscountIfAny(subId) {
  try {
    if (DRY_RUN) { console.log(`DRY: would delete discount for ${subId}`); return; }
    await stripe.subscriptions.deleteDiscount(subId);
    console.log(`Deleted subscription discount for ${subId}`);
  } catch (e) {
    const msg = (e && e.message) || "";
    if (!/No such discount/i.test(msg)) {
      console.warn(`Could not delete discount for ${subId}: ${msg}`);
    }
  }
}

async function createOneTimeCredit(customerId, subscriptionId, amountCents, currency, description) {
  if (amountCents <= 0) return null;
  if (DRY_RUN) {
    console.log(
      `DRY: would credit -${fmt(amountCents, currency)} to ${customerId} on ${subscriptionId} :: ${description}`
    );
    return { id: "ii_dry_stub" };
  }
  const ii = await stripe.invoiceItems.create({
    customer: customerId,
    amount: -Math.abs(amountCents),
    currency,
    description,
    subscription: subscriptionId, // attaches to this sub’s next invoice
    discountable: false,          // prevent percent-off from reducing the credit
  });
  console.log(`Created credit ${ii.id}: -${fmt(amountCents, currency)} (subscription=${subscriptionId})`);
  return ii;
}

async function endTrialNow(subId) {
  if (DRY_RUN) {
    console.log(`DRY: would set trial_end=now for ${subId}`);
    // In dry mode we don’t return a fake invoice id; polling is skipped.
    return { id: subId, latest_invoice: null };
  }
  const updated = await stripe.subscriptions.update(subId, { trial_end: "now" });
  console.log(`Ended trial for ${subId}; latest_invoice=${updated.latest_invoice}`);
  return updated;
}

async function pollInvoiceFinal(invoiceId) {
  if (!invoiceId) return null;
  for (let i = 0; i < MAX_POLLS; i++) {
    const id = typeof invoiceId === "string" ? invoiceId : invoiceId.id;
    const inv = await stripe.invoices.retrieve(id);
    if (inv.status && inv.status !== "draft") {
      console.log(
        `Invoice ${inv.id} status: ${inv.status}; total=${fmt(inv.total, inv.currency)}; amount_due=${fmt(inv.amount_due, inv.currency)}`
      );
      return inv;
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  console.warn(`Invoice ${invoiceId} did not finalize within the poll window.`);
  return null;
}

async function reattachLifetimeDiscount(subId) {
  if (!LIFETIME_COUPON) {
    console.log(`No STRIPE_COUPON_LIFETIME30 set; skipping re-attach for ${subId}`);
    return;
  }
  if (DRY_RUN) {
    console.log(`DRY: would re-attach lifetime coupon ${LIFETIME_COUPON} to ${subId}`);
    return;
  }
  await stripe.subscriptions.update(subId, { coupon: LIFETIME_COUPON });
  console.log(`Re-attached lifetime coupon ${LIFETIME_COUPON} to ${subId}`);
}

async function processSub(s) {
  const subId = s.id;
  const customerId = typeof s.customer === "string" ? s.customer : s.customer.id;
  const item = (s.items?.data || [])[0];
  const currency = item?.price?.currency || "usd";
  const unit = item?.price?.unit_amount || 0;

  console.log(`\n=== Processing ${subId} (customer=${customerId}) status=${s.status} ===`);
  console.log(`Price: ${fmt(unit, currency)}; target first charge: ${fmt(TARGET_CENTS, currency)}`);

  // 1) Remove lifetime discount (temporarily)
  await deleteSubDiscountIfAny(subId);

  // 2) Add one-time credit to reach target
  const credit = Math.max(0, unit - TARGET_CENTS);
  await createOneTimeCredit(customerId, subId, credit, currency, "Founding Member first-month credit to $1");

  // 3) End trial now (generates first invoice)
  const updated = await endTrialNow(subId);

  // 4) Poll invoice only in real mode
  if (!DRY_RUN && updated.latest_invoice) {
    await pollInvoiceFinal(updated.latest_invoice);
  } else if (DRY_RUN) {
    console.log("DRY: would poll latest invoice until finalized");
  }

  // 5) Re-attach lifetime discount for future months
  await reattachLifetimeDiscount(subId);

  // 6) Tag launch timestamp
  if (!DRY_RUN) {
    await stripe.subscriptions.update(subId, {
      metadata: { ...(s.metadata || {}), launched_at: new Date().toISOString() },
    });
  } else {
    console.log(`DRY: would tag ${subId} with launched_at timestamp`);
  }
}

async function main() {
  let total = 0;
  let processed = 0;

  // Auto-pagination in v18: iterate the list directly
  for await (const s of stripe.subscriptions.list({ status: "trialing", limit: 100 })) {
    total++;
    if ((s.metadata?.cohort || "") !== "founding_member") continue;
    try {
      processed++;
      await processSub(s);
    } catch (e) {
      console.error(`Error processing ${s.id}:`, e?.message || e);
    }
  }

  console.log(`\nDone. Scanned ${total} trialing; processed ${processed} founding member(s). DRY_RUN=${DRY_RUN ? "1" : "0"}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
