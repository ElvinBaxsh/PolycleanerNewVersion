import { clsx } from "clsx";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={clsx(
            "mb-2 text-xs font-bold tracking-[0.14em] uppercase",
            light ? "text-brand-green" : "text-brand-green-dark"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={clsx(
          "text-[28px] leading-[1.15] font-bold sm:text-[32px] lg:text-[36px]",
          light ? "text-white" : "text-navy"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-3 text-base leading-relaxed sm:text-lg",
            light ? "text-white/80" : "text-slate"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
