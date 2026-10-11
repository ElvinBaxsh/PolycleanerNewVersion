declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends a custom event to Google Analytics. Does nothing when the tag isn't
// loaded (local development, or a visitor who blocks it).
export function trackEvent(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
