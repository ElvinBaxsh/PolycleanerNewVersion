declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

// Pushes an event to the GTM dataLayer. Safe to call before GTM is installed.
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
