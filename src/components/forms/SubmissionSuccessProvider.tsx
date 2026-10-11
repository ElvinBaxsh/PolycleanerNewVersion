"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import SubmissionSuccessModal from "./SubmissionSuccessModal";
import {
  SubmissionSuccessContext,
  type SubmissionSuccessPayload,
} from "./SubmissionSuccessContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// The one confirmation modal for the whole site. It sits above the other
// modals, so it stays open when the inquiry modal closes.
export default function SubmissionSuccessProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [payload, setPayload] = useState<SubmissionSuccessPayload | null>(null);
  // Kept while the exit animation plays.
  const [open, setOpen] = useState(false);

  const show = useCallback((next: SubmissionSuccessPayload) => {
    setPayload(next);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ show, close }), [show, close]);

  return (
    <SubmissionSuccessContext.Provider value={value}>
      {children}
      {payload && (
        <SubmissionSuccessModal
          open={open}
          onClose={close}
          onReset={close}
          title={payload.title}
          subtitle={payload.subtitle}
          sentBadge={t.forms.sentBadge}
          referenceLabel={t.forms.referenceLabel}
          reference={payload.reference}
          detailsTitle={t.forms.inquiryDetails}
          rows={payload.rows}
          resetLabel={payload.resetLabel}
          closeLabel={t.forms.closeLabel}
        />
      )}
    </SubmissionSuccessContext.Provider>
  );
}
