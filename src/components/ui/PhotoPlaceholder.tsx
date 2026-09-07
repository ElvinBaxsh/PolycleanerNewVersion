import { ImageIcon } from "lucide-react";
import { clsx } from "clsx";

/**
 * Stand-in for real photography (production line, flakes, facility, etc.).
 * The brief asks to avoid generic stock photos and use real Poly Cleaner
 * material instead — until that's supplied, this keeps layout/proportions
 * correct and clearly marks what should be swapped in.
 *
 * "photo" tone mimics a bright, real-photo thumbnail (used over the dark
 * hero/navy sections) instead of a flat dark panel, so it doesn't read as
 * a shadow/overlay sitting on top of the section.
 */
export default function PhotoPlaceholder({
  label,
  tone = "light",
  className,
  aspect = "aspect-[4/3]",
}: {
  label: string;
  tone?: "light" | "dark" | "photo";
  className?: string;
  aspect?: string;
}) {
  if (tone === "photo") {
    return (
      <div
        className={clsx(
          aspect,
          "relative w-full overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#dbe6ea_0%,#eef3f5_45%,#e2ecef_100%)]",
          className
        )}
      >
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 15%, rgba(22,136,181,0.18) 0, transparent 42%), radial-gradient(circle at 85% 75%, rgba(76,175,27,0.14) 0, transparent 45%)",
          }}
        />
        <div className="relative flex h-full flex-col items-center justify-center gap-2">
          <ImageIcon className="size-8 text-navy/30" aria-hidden />
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-navy/80 px-4 py-2 backdrop-blur-sm">
          <p className="text-center text-[11px] font-semibold uppercase tracking-wide text-white/85">
            {label}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        aspect,
        "relative w-full overflow-hidden rounded-2xl border",
        tone === "light"
          ? "border-border bg-gradient-to-br from-soft-gray to-white"
          : "border-white/10 bg-gradient-to-br from-navy to-teal",
        className
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 opacity-[0.08]",
          tone === "light" ? "bg-brand-blue" : "bg-brand-green"
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, currentColor 0, transparent 40%), radial-gradient(circle at 80% 60%, currentColor 0, transparent 45%)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
        <ImageIcon
          className={clsx("size-7", tone === "light" ? "text-brand-blue/60" : "text-white/50")}
          aria-hidden
        />
        <p
          className={clsx(
            "text-xs font-semibold uppercase tracking-wide",
            tone === "light" ? "text-slate/70" : "text-white/60"
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
