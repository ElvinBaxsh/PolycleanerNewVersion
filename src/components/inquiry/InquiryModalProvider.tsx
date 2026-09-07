"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import { InquiryModalContext, type InquiryModalOptions } from "./InquiryModalContext";
import InquiryModal from "./InquiryModal";

export default function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<InquiryModalOptions | null>(null);

  const open = useCallback((opts?: InquiryModalOptions) => setOptions(opts ?? {}), []);
  const close = useCallback(() => setOptions(null), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
      <InquiryModal options={options} onClose={close} />
    </InquiryModalContext.Provider>
  );
}
