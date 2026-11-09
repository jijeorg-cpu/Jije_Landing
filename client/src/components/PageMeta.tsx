import { useEffect } from "react";
import { useLocation } from "wouter";
import { getSiteMetadata, SITE_ORIGIN, SOCIAL_IMAGE, SITE_NAME, STRUCTURED_DATA_ID, serializedSiteStructuredData } from "@shared/site-metadata";

/** One route-aware controller, shared with initial server HTML metadata. */
export function PageMeta() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = getSiteMetadata(location);
    const canonical = `${SITE_ORIGIN}${meta.canonicalPath}`;
    const setMeta = (kind: "name" | "property", key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(kind, key);
        document.head.appendChild(element);
      }
      element.content = value;
    };
    document.title = meta.title;
    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.index ? "index, follow" : "noindex, follow");
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_CA");
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", SOCIAL_IMAGE);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:image:alt", "JÍJÉ — Rooted in Culture. Powered by Intelligence.");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.title);
    setMeta("name", "twitter:description", meta.description);
    setMeta("name", "twitter:image", SOCIAL_IMAGE);
    setMeta("name", "twitter:image:alt", "JÍJÉ — Rooted in Culture. Powered by Intelligence.");
    let structuredData = document.getElementById(STRUCTURED_DATA_ID) as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = STRUCTURED_DATA_ID;
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = serializedSiteStructuredData();
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [location]);
  return null;
}
