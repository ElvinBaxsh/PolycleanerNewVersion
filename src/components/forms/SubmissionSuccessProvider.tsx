"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import SubmissionSuccessModal from "./SubmissionSuccessModal";
import {
  SubmissionSuccessContext,
  type SubmissionSuccessPayload,
} from "./SubmissionSuccessContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";

/**
 * Holds the one confirmation modal for the whole site.
 *
 * It can't live inside a form: a form sent from the inquiry modal closes
 * that modal on success, which unmounts the form — and with it anything it
 * was rendering. Mounted here, above every other modal, the confirmation
 * survives its sender disappearing, and there is never more than one open.
 */
export default function SubmissionSuccessProvider({ children }: { children: ReactNode }) {
  const { t } = useLanguage();
  const [payload, setPayload] = useState<SubmissionSuccessPayload | null>(null);
  // Kept while the exit animation plays, so the modal has something to fade
  // out with — the same reason InquiryModal keeps its last options around.
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
