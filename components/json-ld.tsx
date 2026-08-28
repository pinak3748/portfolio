type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script content from server-controlled data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
