"use client";

import { createContext, useContext } from "react";
import type { SummaryRow } from "./SubmissionSuccess";

// What a form passes to the confirmation.
export interface SubmissionSuccessPayload {
  title: string;
  subtitle: string;
  reference: string;
  rows: SummaryRow[];
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
