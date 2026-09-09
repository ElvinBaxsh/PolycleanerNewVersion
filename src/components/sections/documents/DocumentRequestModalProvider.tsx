"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { DocumentRequestModalContext } from "./DocumentRequestModalContext";
import DocumentRequestModal from "./DocumentRequestModal";

export default function DocumentRequestModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <DocumentRequestModalContext.Provider value={value}>
      {children}
      <DocumentRequestModal isOpen={isOpen} onClose={close} />
    </DocumentRequestModalContext.Provider>
  );
}
