// scripts/extend-trials.mjs
import "dotenv/config";
import Stripe from "stripe";

/**
 * Extend subscription trials.
 *
 * Usage:
 *   # extend ALL trialing founding_member subs by +21 days (DRY)
 *   DRY_RUN=1 node scripts/extend-trials.mjs +21
 *
 *   # extend ALL trialing founding_member subs to a fixed date (UTC midnight)
 *   DRY_RUN=1 node scripts/extend-trials.mjs 2025-09-07
 *
 *   # extend ONE subscription by +14 days
 *   DRY_RUN=1 node scripts/extend-trials.mjs sub_123 +14
 *
 *   # real execution
 *   DRY_RUN=0 node scripts/extend-trials.mjs +30
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const DRY_RUN = (process.env.DRY_RUN || "0").toString() === "1";
const DEFAULT_DAYS = Number(process.env.TRIAL_EXTENSION_DAYS || 30);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY (.env)");
  process.exit(1);
}

const arg1 = process.argv[2] || ""; // maybe "sub_..." or target
const arg2 = process.argv[3] || ""; // optional target if arg1 is sub id

const isSubId = (s) => /^sub_[a-zA-Z0-9]+$/.test(s);

function toSeconds(d) { return Math.floor(d.getTime() / 1000); }

function parseTargetEpochSeconds(raw) {
  // No input → default +N days
  if (!raw) {
    const d = new Date(Date.now() + DEFAULT_DAYS * 86400_000);
    return toSeconds(d);
  }
  // "+N" or "N" days
  if (/^\+?\d+$/.test(raw)) {
    const days = Number(raw.replace("+", ""));
    const d = new Date(Date.now() + days * 86400_000);
    return toSeconds(d);
    }
  // Date string (e.g., 2025-09-07 or ISO)
  const parsed = new Date(raw);
  if (!isNaN(parsed.getTime())) {
    return toSeconds(parsed);
  }
  throw new Error(`Unrecognized target "${raw}". Use +N (days) or YYYY-MM-DD.`);
}

async function extendOne(sub, targetEpoch) {
  const subId = sub.id;
  const current = Number(sub.trial_end || 0);
  const nowSec = Math.floor(Date.now() / 1000);

  if (sub.status !== "trialing") {
    console.log(`Skip ${subId}: status=${sub.status} (not trialing)`);
    return;
  }

  // Only extend forward. If target <= current, do nothing.
  if (current && targetEpoch <= current) {
    console.log(`Skip ${subId}: current trial_end (${current}) already beyond target (${targetEpoch}).`);
    return;
  }

  // Stripe requires the new trial_end to be in the future.
  const newEnd = Math.max(targetEpoch, nowSec + 60);

  const msg =
    `Extend ${subId}: ${current ? `from ${current}` : "no current trial_end"} -> ${newEnd}`;
  if (DRY_RUN) {
    console.log(`DRY: ${msg}`);
    return;
  }

  const updated = await stripe.subscriptions.update(subId, {
    trial_end: newEnd,
    // no proration involved; we are only moving the trial boundary
    metadata: { ...(sub.metadata || {}), trial_extended_at: new Date().toISOString() },
  });
  console.log(`${msg} ✔ (status=${updated.status})`);
}

async function main() {
  // Determine mode and target
  let subId = "";
  let targetRaw = "";

  if (isSubId(arg1)) {
    subId = arg1;
    targetRaw = arg2 || "";
  } else {
    targetRaw = arg1 || "";
  }

  const targetEpoch = parseTargetEpochSeconds(targetRaw);
  console.log(`Target trial_end (epoch): ${targetEpoch}`);

  if (subId) {
    // Single subscription path
    const sub = await stripe.subscriptions.retrieve(subId);
    if ((sub.metadata?.cohort || "") !== "founding_member") {
      console.log(`Skip ${sub.id}: cohort=${sub.metadata?.cohort || ""}`);
      return;
    }
    await extendOne(sub, targetEpoch);
  } else {
    // Bulk path: all trialing “founding_member”
    let scanned = 0, updated = 0;
    for await (const s of stripe.subscriptions.list({ status: "trialing", limit: 100 })) {
      scanned++;
      if ((s.metadata?.cohort || "") !== "founding_member") continue;
      await extendOne(s, targetEpoch);
      updated++;
    }
    console.log(`\nDone. Scanned ${scanned} trialing; attempted updates for ${updated} founding member(s). DRY_RUN=${DRY_RUN ? "1" : "0"}`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
