"use client";

import { createContext, useContext } from "react";

export interface InquiryModalOptions {
  type?: string;
  interest?: string;
}

export interface InquiryModalContextValue {
  open: (options?: InquiryModalOptions) => void;
  close: () => void;
}

export const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function useInquiryModal() {
  const ctx = useContext(InquiryModalContext);
  if (!ctx) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }
  return ctx;
}
