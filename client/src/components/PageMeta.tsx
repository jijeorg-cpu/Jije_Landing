import { useEffect } from "react";

export function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    const previousTitle = document.title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !element;
      if (!element) {
        element = document.createElement("meta");
        const identity = selector.match(/\[(name|property)="([^"]+)"\]/);
        if (identity) element.setAttribute(identity[1], identity[2]);
        document.head.appendChild(element);
      }
      const oldValue = element.getAttribute(attribute);
      element.setAttribute(attribute, value);
      return () => {
        if (created) element?.remove();
        else if (oldValue !== null) element?.setAttribute(attribute, oldValue);
      };
    };
    document.title = title;
    const cleanups = [
      setMeta('meta[name="description"]', "content", description),
      setMeta('meta[property="og:title"]', "content", title),
      setMeta('meta[property="og:description"]', "content", description),
      setMeta('meta[name="twitter:card"]', "content", "summary_large_image"),
      setMeta('meta[name="twitter:title"]', "content", title),
      setMeta('meta[name="twitter:description"]', "content", description),
    ];
    return () => {
      document.title = previousTitle;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [title, description]);
  return null;
}
