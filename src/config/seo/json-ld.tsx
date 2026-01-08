import type { Organization, WebSite, WithContext } from "schema-dts";
import { SITE_NAME, SITE_URL } from "./home.metadata";

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "โรงงานผลิตเสื้อ",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["Thai"],
  },
  sameAs: [],
};

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "โรงงานผลิตเสื้อคุณภาพ เสื้อยืด เสื้อโปโล ราคาถูกกว่าเพราะผลิตเอง รับผลิตเสื้อตามออเดอร์",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "query-input": "required name=search_term_string" as any,
  },
};

export function JsonLd({
  data,
}: {
  data: WithContext<Organization | WebSite>;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
