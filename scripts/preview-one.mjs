import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const subId = process.argv[2];

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("Missing STRIPE_SECRET_KEY (put it in .env or your shell env)");
  process.exit(1);
}
if (!subId) {
  console.error("Usage: npm run preview:one -- <subscription_id>");
  process.exit(1);
}

const fmt = (cents, ccy) => `${(cents / 100).toFixed(2)} ${(ccy || "usd").toUpperCase()}`;

async function main() {
  const sub = await stripe.subscriptions.retrieve(subId);
  const preview = await stripe.invoices.createPreview({
    customer: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
    subscription: sub.id
  });

  const discountTotal = (preview.total_discount_amounts || []).reduce((s, d) => s + d.amount, 0);

  console.log("Subscription:", sub.id, "status:", sub.status);
  console.log("Preview ID:", preview.id);
  console.log("Subtotal:", fmt(preview.subtotal, preview.currency));
  console.log("Discounts total:", fmt(discountTotal, preview.currency));
  (preview.total_discount_amounts || []).forEach((d, i) =>
    console.log(`  - discount[${i}]: ${fmt(d.amount, preview.currency)}`)
  );
  console.log("Total:", fmt(preview.total, preview.currency));
  console.log("Amount due:", fmt(preview.amount_due, preview.currency));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
