import { Fragment } from "react";

// Lets text wrap after a slash ("Transparent/ light blue"). Browsers don't do
// it on their own.
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
