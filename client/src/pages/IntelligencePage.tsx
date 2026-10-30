import { ArrowRight, BookOpen, CircleDot, Lightbulb, Network } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { PageMeta } from "@/components/PageMeta";

export function IntelligencePage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <PageMeta title="JÍJÉ Intelligence | Cultural Knowledge. Real-World Intelligence." description="JÍJÉ Intelligence is a developing initiative building cultural knowledge and intelligent technology for African and Afro-Caribbean food understanding." />
      <Navbar />
      <section className="relative overflow-hidden bg-[#e9eee3] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-12 top-16 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="absolute right-10 top-28 h-[23rem] w-[23rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1.1fr_.9fr] md:items-center md:px-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-[#f9f7f2]/75 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-[#a75c43]"><CircleDot size={12} /> Developing initiative</p>
            <h1 className="mt-7 max-w-2xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Cultural Knowledge.<br /><span className="text-[#a75c43]">Real-World</span><br />Intelligence.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/70">JÍJÉ Intelligence is building toward a deeper understanding of African and Afro-Caribbean food—its ingredients, names, traditions, and connections.</p>
            <p className="mt-4 text-sm font-medium text-primary/65">This is an initiative in development, not a currently available public product.</p>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[430px] items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-primary/15" />
            <div className="absolute inset-14 rounded-full border border-primary/15" />
            <div className="absolute inset-24 rounded-full border border-primary/15" />
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-primary text-[#e3c979] shadow-xl"><Network size={42} strokeWidth={1.3} /></div>
            <span className="absolute left-7 top-[27%] flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f9f7f2] text-primary shadow-sm"><BookOpen size={22} /></span>
            <span className="absolute bottom-[18%] right-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e3c979] text-primary shadow-sm"><Lightbulb size={22} /></span>
            <span className="absolute right-[12%] top-[13%] h-3 w-3 rounded-full bg-[#a75c43]" />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="container mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[.72fr_1.28fr] md:px-10">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The opportunity</p><h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-5xl">Make cultural context legible.</h2></div>
          <div className="space-y-5 text-lg leading-8 text-foreground/70">
            <p>Food knowledge lives across languages, ingredients, local names, family practice, and place. Technology often lacks the context to connect these details meaningfully.</p>
            <p>Our developing work explores how structured cultural knowledge and intelligent systems might improve discovery, understanding, and decision-making—while respecting the nuance within the culture.</p>
            <p>Research, data connections, and future AI applications are ambitions for this initiative. They are not being presented as live services today.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#f1e9d7] py-20">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">In the making</p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["01", "Food knowledge", "Understanding how ingredients, preparations, and foods are named and connected across cultures."],
              ["02", "Cultural context", "Keeping traditions, language, and community knowledge in view as information is organized."],
              ["03", "Technology with purpose", "Exploring future applications that make cultural food knowledge more useful and understandable."],
            ].map(([number, title, body]) => (
              <article key={number} className="border-t border-primary/20 pt-5">
                <span className="font-mono text-sm text-[#a75c43]">{number}</span><h3 className="mt-8 font-display text-2xl font-semibold">{title}</h3><p className="mt-3 leading-7 text-foreground/65">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <div><p className="text-xs font-bold uppercase tracking-[.2em] text-[#a75c43]">The first business</p><h2 className="mt-3 font-display text-3xl font-semibold">Commerce is where we begin.</h2></div>
          <Link href="/marketplace" className="inline-flex min-h-12 items-center gap-3 self-start rounded-full bg-primary px-6 font-semibold text-primary-foreground">Explore JÍJÉ Marketplace <ArrowRight size={17} /></Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
