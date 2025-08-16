// src/utils/checkout.ts
function functionsBase() {
  const isLocal =
    location.hostname === "localhost" || location.hostname === "127.0.0.1";
  if (isLocal && location.port === "5173") {
    // Vite port → proxy to Netlify Dev (functions)
    return "http://localhost:8888/.netlify/functions";
  }
  return "/.netlify/functions";
}

export function getUTMs() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || undefined,
    utm_campaign: p.get("utm_campaign") || undefined,
    page_variant: p.get("page_variant") || undefined,
    audience_pitch: p.get("audience_pitch") || undefined,
  };
}

export async function startFoundingMemberCheckout(extra?: {
  utm_source?: string;
  utm_campaign?: string;
  page_variant?: string;
  audience_pitch?: string;
}) {
  const url = `${functionsBase()}/create-checkout-session`;
  const payload = {
    ...(extra || {}),
    // cancel_url will point back here (acts like a back button)
    return_to: window.location.href,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  const data = await res.json();
  window.location.href = data.url;
}
