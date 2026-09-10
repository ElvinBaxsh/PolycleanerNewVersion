"use client";

import { useRef, useState, type DragEvent } from "react";
import { Paperclip, FileText, X } from "lucide-react";
import { clsx } from "clsx";
import {
  MAX_UPLOAD_FILES,
  MAX_UPLOAD_FILE_SIZE,
  UPLOAD_ACCEPT_ATTRIBUTE,
  hasAllowedUploadExtension,
} from "@/lib/constants";

const ACCEPT = UPLOAD_ACCEPT_ATTRIBUTE;

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * A dropzone + reviewable file list standing in for a bare native
 * <input type="file"> — the native control only ever shows a single
 * "N files" summary with no way to see or remove what's selected, which
 * reads as broken even when multi-select is actually working.
 *
 * The real <input type="file"> stays in the DOM (hidden) so the parent
 * form's existing `new FormData(form)` submission logic keeps working
 * unmodified — selected files are synced into it via a DataTransfer
 * object on every add/remove, rather than relying on the input's own
 * (browser-only-writable) file picker state.
 */
export default function FileUpload({
  name,
  label,
  hint,
  chooseLabel,
  tooManyMessage,
  tooLargeMessage,
  wrongTypeMessage,
}: {
  name: string;
  label: string;
  hint: string;
  chooseLabel: string;
  tooManyMessage: string;
  tooLargeMessage: string;
  wrongTypeMessage: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function syncInput(next: File[]) {
    const dt = new DataTransfer();
    next.forEach((file) => dt.items.add(file));
    if (inputRef.current) inputRef.current.files = dt.files;
  }

  function addFiles(incoming: FileList | File[]) {
    const incomingArr = Array.from(incoming);
    if (incomingArr.length === 0) return;

    const seen = new Set(files.map((f) => `${f.name}-${f.size}-${f.lastModified}`));
    const deduped = incomingArr.filter((f) => {
      const key = `${f.name}-${f.size}-${f.lastModified}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // The `accept` attribute only filters the OS file picker — a drag-and-drop
    // ignores it entirely, so the same rule the server enforces runs here too,
    // to fail immediately rather than after a submit round-trip.
    const wrongType = deduped.find((f) => !hasAllowedUploadExtension(f.name));
    if (wrongType) {
      setError(wrongTypeMessage);
      syncInput(files);
      return;
    }

    const oversized = deduped.find((f) => f.size > MAX_UPLOAD_FILE_SIZE);
    if (oversized) {
      setError(tooLargeMessage);
      // A native file picker selection always replaces the input's file
      // list, even when we reject it here — put the last-known-good set
      // back so a rejected pick can't slip into the form at submit time.
      syncInput(files);
      return;
    }

    const combined = [...files, ...deduped];
    if (combined.length > MAX_UPLOAD_FILES) {
      setError(tooManyMessage);
      syncInput(files);
      return;
    }

    setError("");
    setFiles(combined);
    syncInput(combined);
  }

  function removeFile(index: number) {
    const next = files.filter((_, i) => i !== index);
    setError("");
    setFiles(next);
    syncInput(next);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-navy">{label}</label>

      {/* The real form field — hidden, its .files is overwritten via
          syncInput() after every add/remove to hold the complete
          accumulated set (native picker selection always REPLACES rather
          than appends, so accumulation across multiple picker openings is
          handled here in React state instead). */}
      <input
        ref={inputRef}
        type="file"
        name={name}
        multiple
        accept={ACCEPT}
        className="hidden"
        tabIndex={-1}
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files);
        }}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={clsx(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-5 text-center transition-colors",
          dragActive ? "border-brand-blue bg-brand-blue/5" : "border-border hover:border-brand-blue/40 hover:bg-soft-gray"
        )}
      >
        <Paperclip className="size-5 text-slate/40" aria-hidden />
        <span className="text-sm font-semibold text-brand-blue">{chooseLabel}</span>
        <span className="text-xs text-slate/50">{hint}</span>
      </div>

      {files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${file.lastModified}`}
              className="flex items-center justify-between gap-2 rounded-lg border border-border bg-soft-gray/60 px-3 py-2 text-sm"
            >
              <span className="flex min-w-0 items-center gap-2 text-navy">
                <FileText className="size-4 shrink-0 text-slate/40" aria-hidden />
                <span className="truncate">{file.name}</span>
                <span className="shrink-0 text-xs text-slate/50">({formatSize(file.size)})</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 cursor-pointer rounded p-0.5 text-slate/50 transition-colors hover:bg-white hover:text-red-600"
              >
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}
