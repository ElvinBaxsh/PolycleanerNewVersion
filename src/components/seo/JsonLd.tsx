/**
 * Renders a <script type="application/ld+json"> block for structured data
 * (schema.org). Server-rendered like any other element, so it's present in
 * the initial HTML crawlers see — no client JS required to read it.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
