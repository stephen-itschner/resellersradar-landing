// netlify/functions/create-checkout-session.mjs
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// Success → Tally (fixed URL you provided)
const SUCCESS_TALLY_URL =
  "https://tally.so/r/mBRrvQ?utm_source=checkout&utm_campaign=none&page_variant=b2c&audience_pitch=none&path=preorder_signup";

// Fallback cancel destination if return_to is missing or not whitelisted
const FALLBACK_CANCEL = "https://b2c.resellersradar.com/";

// Hosts allowed for the "back button" cancel behavior
const ALLOWED_CANCEL_HOSTS = new Set([
  "b2c.resellersradar.com",
  "localhost:8888",
  "127.0.0.1:8888",
  "localhost:5173",
  "127.0.0.1:5173",
]);

function trialEndFromEnv() {
  const days = Number(process.env.TRIAL_HOLD_DAYS || 365);
  return Math.floor(Date.now() / 1000) + days * 24 * 60 * 60;
}

function sanitizeReturnTo(raw) {
  try {
    if (!raw) return FALLBACK_CANCEL;
    const u = new URL(raw);
    return ALLOWED_CANCEL_HOSTS.has(u.host) ? u.toString() : FALLBACK_CANCEL;
  } catch {
    return FALLBACK_CANCEL;
  }
}

function baseParams({ priceId, body, cancelUrl }) {
  const { utm_source, utm_campaign, page_variant, audience_pitch } = body || {};
  return {
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: SUCCESS_TALLY_URL,   // send to Tally on success
    cancel_url: cancelUrl,            // act like "back"
    subscription_data: {
      trial_end: trialEndFromEnv(),   // you end trials manually at launch
      metadata: {
        cohort: "founding_member",
        utm_source: utm_source || "",
        utm_campaign: utm_campaign || "",
        page_variant: page_variant || "",
        audience_pitch: audience_pitch || "",
      },
    },
    client_reference_id: `founding_member_${Date.now()}`,
    metadata: {
      utm_source: utm_source || "",
      utm_campaign: utm_campaign || "",
      page_variant: page_variant || "",
      audience_pitch: audience_pitch || "",
    },
    custom_text: {
      submit: {
        // Markdown supported by Stripe Checkout
        message: "No charge until launch. **First paid month bills at $1**, then 30% off for life.",
      },
    },
  };
}

function ok(url, extra) {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, ...extra }),
  };
}

function fail(err, hint) {
  const payload = {
    message: err?.message || "Stripe error",
    type: err?.type,
    code: err?.code,
    param: err?.param,
    hint,
  };
  return {
    statusCode: 500,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  };
}

function isLikelyStackingIssue(err) {
  const msg = (err?.message || "").toLowerCase();
  return (
    msg.includes("discount") ||
    msg.includes("coupon") ||
    msg.includes("promotion") ||
    msg.includes("invalid parameter") ||
    msg.includes("cannot apply")
  );
}

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const body = event.body ? JSON.parse(event.body) : {};
    const priceId = process.env.STRIPE_PRICE_ID;
    const introCoupon = process.env.STRIPE_COUPON_FIRSTMONTH1;   // $1 first month (once)
    const lifetimeCoupon = process.env.STRIPE_COUPON_LIFETIME30; // 30% forever

    if (!process.env.STRIPE_SECRET_KEY) return { statusCode: 500, body: "Missing STRIPE_SECRET_KEY" };
    if (!priceId) return { statusCode: 500, body: "Missing STRIPE_PRICE_ID" };

    const cancelUrl = sanitizeReturnTo(body.return_to);
    const params = baseParams({ priceId, body, cancelUrl });

    // Attempt A: apply both coupons via `discounts`
    try {
      const session = await stripe.checkout.sessions.create({
        ...params,
        discounts: [
          introCoupon ? { coupon: introCoupon } : null,
          lifetimeCoupon ? { coupon: lifetimeCoupon } : null,
        ].filter(Boolean),
      });
      return ok(session.url);
    } catch (errA) {
      console.error("[Attempt A failed]", JSON.stringify(errA, null, 2));

      // Attempt B: lifetime coupon on the subscription, intro via `discounts`
      try {
        const session = await stripe.checkout.sessions.create({
          ...params,
          discounts: introCoupon ? [{ coupon: introCoupon }] : undefined,
          subscription_data: {
            ...params.subscription_data,
            coupon: lifetimeCoupon || undefined,
          },
        });
        return ok(session.url);
      } catch (errB) {
        console.error("[Attempt B failed]", JSON.stringify(errB, null, 2));

        // Attempt C: lifetime only (lets you proceed while we verify stacking behavior)
        try {
          const session = await stripe.checkout.sessions.create({
            ...params,
            discounts: lifetimeCoupon ? [{ coupon: lifetimeCoupon }] : undefined,
          });
          return ok(session.url, {
            fallback: "applied_lifetime_only",
            note: "Intro $1 coupon omitted due to discount-stacking limits.",
          });
        } catch (errC) {
          console.error("[Attempt C failed]", JSON.stringify(errC, null, 2));
          const hint = isLikelyStackingIssue(errC)
            ? "Coupon stacking may be blocked. Ensure both coupons exist in the same mode (test vs live). If stacking is blocked, create a founders $7 price + $6-off-once coupon, or switch the intro to a free trial."
            : "Verify the price is recurring and matches your API key mode (test vs live).";
          return fail(errC, hint);
        }
      }
    }
  } catch (err) {
    console.error("[Unexpected error]", err);
    return { statusCode: 500, body: "Internal error" };
  }
};
