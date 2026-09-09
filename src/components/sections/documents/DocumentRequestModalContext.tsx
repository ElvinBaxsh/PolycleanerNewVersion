"use client";

import { createContext, useContext } from "react";

export interface DocumentRequestModalContextValue {
  open: () => void;
  close: () => void;
}

export const DocumentRequestModalContext = createContext<DocumentRequestModalContextValue | null>(null);

export function useDocumentRequestModal() {
  const ctx = useContext(DocumentRequestModalContext);
  if (!ctx) {
    throw new Error("useDocumentRequestModal must be used within DocumentRequestModalProvider");
  }
  return ctx;
}
