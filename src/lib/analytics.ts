declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Pushes an event to the GTM/GA4 dataLayer. Safe to call even before GTM is
 * installed — the events simply queue in window.dataLayer (created here if
 * missing) and GTM picks them up retroactively once its snippet loads, which
 * is the standard dataLayer.push pattern.
 */
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
