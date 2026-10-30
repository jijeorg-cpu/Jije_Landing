import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowDownToLine, ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import legalCopy from "@/content/legal.json";

type LegalKind = "privacy" | "terms";
type LegalPageProps = { kind: LegalKind };

export function LegalPage({ kind }: LegalPageProps) {
  const [, setLocation] = useLocation();
  const paragraphs = legalCopy[kind] as string[];
  const title = paragraphs[0];
  const metadata = paragraphs[1];
  const otherKind: LegalKind = kind === "privacy" ? "terms" : "privacy";
  const otherTitle = otherKind === "privacy" ? "Privacy Policy" : "Terms of Service";
  const documentUrl = kind === "privacy" ? "/legal/jije-privacy-policy.pdf" : "/legal/jije-terms-of-service.pdf";
  const sections = paragraphs.slice(2).reduce<{ heading: string; id: string; content: string[] }[]>((all, text, index) => {
    const headingMatch = text.match(/^(\d+)\.\s/);
    if (headingMatch) {
      all.push({ heading: text, id: `${kind}-section-${headingMatch[1]}`, content: [] });
    } else if (all.length) {
      all[all.length - 1].content.push(text);
    } else {
      all.push({ heading: "", id: `${kind}-intro-${index}`, content: [text] });
    }
    return all;
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [kind]);

  return (
    <div className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <Navbar />
      <main className="relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-36">
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full border border-primary/10" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-primary/75 transition-colors hover:text-primary">
            <ArrowLeft size={16} aria-hidden="true" /> Back to JÍJÉ
          </Link>
          <header className="mt-8 max-w-3xl border-l-4 border-[#bd694d] pl-6 md:pl-8">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#705335]">JÍJÉ Group Inc. · Toronto / GTA</p>
            <h1 className="mt-3 font-display text-5xl font-bold leading-[1.02] text-primary sm:text-6xl md:text-7xl">{title}</h1>
            <p className="mt-5 text-sm font-medium tracking-wide text-foreground/55">{metadata}</p>
          </header>

          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
            <article className="min-w-0 rounded-[1.75rem] border border-primary/10 bg-[#fffdf7] px-6 py-8 shadow-[0_14px_50px_rgba(29,62,42,.06)] sm:px-10 sm:py-12">
              <div className="mb-9 flex flex-col gap-4 border-b border-primary/10 pb-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xl text-sm leading-relaxed text-foreground/65">
                  Official JÍJÉ document. The text below is reproduced from the approved source.
                </p>
                <a
                  href={documentUrl}
                  download
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-primary/20 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  <ArrowDownToLine size={16} aria-hidden="true" /> Download PDF
                </a>
              </div>
              <div className="space-y-10">
                {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-28">
                    {section.heading && (
                      <h2 className="mb-4 font-display text-2xl font-bold leading-tight text-primary sm:text-[1.7rem]">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-4 text-[1.02rem] leading-[1.85] text-foreground/80">
                      {section.content.map((paragraph, index) => paragraph.startsWith("• ") ? (
                        <ul key={`${section.id}-${index}`} className="list-disc space-y-3 pl-6 marker:text-[#bd694d]">
                          <li>{paragraph.slice(2)}</li>
                        </ul>
                      ) : (
                        <p key={`${section.id}-${index}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <div className="mt-12 flex flex-col gap-3 border-t border-primary/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-foreground/60">Also read our {otherTitle}.</p>
                <Link href={`/${otherKind}`} className="inline-flex items-center gap-2 font-semibold text-primary hover:text-[#bd694d]">
                  {otherTitle} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>

            <aside className="order-first rounded-2xl border border-primary/10 bg-[#e9eee3] p-5 lg:order-last lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-[#bd694d]">On this page</p>
              <nav aria-label={`${title} sections`} className="mt-4 max-h-[55vh] space-y-1 overflow-auto pr-1">
                {sections.filter((section) => section.heading).map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm leading-snug text-primary/75 transition-colors hover:bg-white/70 hover:text-primary"
                  >
                    {section.heading}
                  </a>
                ))}
              </nav>
              <button
                type="button"
                onClick={() => setLocation(`/${otherKind}`)}
                className="mt-5 flex w-full items-center justify-between border-t border-primary/10 pt-4 text-left text-sm font-semibold text-primary"
              >
                Read {otherTitle} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
