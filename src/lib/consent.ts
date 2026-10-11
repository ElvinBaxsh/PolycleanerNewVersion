export type Consent = "granted" | "denied" | "undecided";

const KEY = "pc-cookie-consent";
const EVENT = "pc-consent-change";

// A choice is kept for six months, then the banner asks again.
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

// Used when localStorage is unavailable (some private modes block it).
let memory: Consent = "undecided";

// Stored as "granted|1760000000000": the choice and when it was made.
export function readConsent(): Consent {
  try {
    const [value, savedAt] = (localStorage.getItem(KEY) ?? "").split("|");
    if (value !== "granted" && value !== "denied") return memory;
    return Date.now() - Number(savedAt) < MAX_AGE_MS ? value : "undecided";
  } catch {
    return memory;
  }
}

// "undecided" clears the choice, which brings the banner back.
export function writeConsent(value: Consent) {
  memory = value;
  try {
    if (value === "undecided") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, `${value}|${Date.now()}`);
  } catch {
    // The in-memory value still applies for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}
