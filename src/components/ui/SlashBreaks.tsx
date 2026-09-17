import { Fragment } from "react";

/**
 * Renders text with a line-break opportunity after every slash.
 *
 * Browsers don't wrap after "/", so a name like "Transparent/light blue"
 * (or "Şəffaf/açıq mavi") behaves as one unbreakable word up to the first
 * space — in a narrow uppercase card title that ran past the card and was
 * clipped. A <wbr> lets it break as "Transparent/ light blue" only when it
 * has to, without putting invisible characters into the copied text.
 */
export default function SlashBreaks({ text }: { text: string }) {
  const parts = text.split("/");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <>
              /<wbr />
            </>
          )}
          {part}
        </Fragment>
      ))}
    </>
  );
}
