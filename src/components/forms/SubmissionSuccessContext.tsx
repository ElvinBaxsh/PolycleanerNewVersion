"use client";

import { createContext, useContext } from "react";
import type { SummaryRow } from "./SubmissionSuccess";

/** Everything the confirmation needs, handed over by whichever form sent. */
export interface SubmissionSuccessPayload {
  title: string;
  subtitle: string;
  reference: string;
  rows: SummaryRow[];
  /** "Send another" — closing the confirmation hands back the blank form. */
  resetLabel: string;
}

export interface SubmissionSuccessContextValue {
  show: (payload: SubmissionSuccessPayload) => void;
  close: () => void;
}

export const SubmissionSuccessContext = createContext<SubmissionSuccessContextValue | null>(null);

export function useSubmissionSuccess() {
  const ctx = useContext(SubmissionSuccessContext);
  if (!ctx) {
    throw new Error("useSubmissionSuccess must be used within SubmissionSuccessProvider");
  }
  return ctx;
}
