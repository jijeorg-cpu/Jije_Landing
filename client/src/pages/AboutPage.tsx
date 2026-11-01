import { ArrowRight, BookOpen, Compass, Layers3, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const officialMission = "To preserve, connect and advance African and Afro-Caribbean food culture by building the digital and intelligence infrastructure that strengthens cultural preservation, expands access to its foods, knowledge and traditions, and makes them more understandable to technology.";

export function AboutPage() {
  return (
    <main className="min-h-[100dvh] bg-white text-foreground">
      <Navbar />
      <header className="relative overflow-hidden bg-white pb-16 pt-32 md:pb-20 md:pt-36">
        <div className="absolute -right-28 -top-12 h-[30rem] w-[30rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Who We Are</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.06] tracking-[-.05em] sm:text-5xl md:text-6xl">Rooted in Culture. Powered by Intelligence.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">JÍJÉ Group builds connected businesses and knowledge infrastructure for African and Afro-Caribbean food culture.</p>
        </div>
      </header>

      <section id="mission" className="scroll-mt-24 bg-primary py-16 text-primary-foreground md:py-20">
        <div className="container mx-auto grid max-w-7xl gap-7 px-5 md:grid-cols-[.62fr_1.38fr] md:items-center md:px-10">
          <h2 className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><Compass size={22} /></span>
            Our Mission
          </h2>
          <p className="font-display text-xl font-medium leading-[1.5] tracking-[-.02em] text-white md:text-3xl">{officialMission}</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">What We’re Building</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em] md:text-4xl">Two businesses, one cultural foundation.</h2>
          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="flex min-h-[245px] flex-col rounded-[1.75rem] bg-primary p-7 text-primary-foreground md:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffcc33] text-primary"><Layers3 size={22} /></span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-white">JÍJÉ Marketplace</h3>
              <p className="mt-2 max-w-lg leading-7 text-white/75">Our first business, connecting people with African and Afro-Caribbean food and food businesses.</p>
              <Link href="/marketplace" className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-5 font-semibold text-[#ffcc33]">Explore Marketplace <ArrowRight size={17} /></Link>
            </article>
            <article className="flex min-h-[245px] flex-col rounded-[1.75rem] border border-primary/10 bg-[#e9eee3] p-7 md:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-[#ffcc33]"><Sparkles size={22} /></span>
              <h3 className="mt-5 font-display text-2xl font-semibold text-primary">JÍJÉ Intelligence</h3>
              <p className="mt-2 max-w-lg leading-7 text-foreground/70">A developing initiative exploring cultural food knowledge, research, and intelligent technology.</p>
              <Link href="/intelligence" className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-5 font-semibold text-primary">Explore Intelligence <ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-16">
        <div className="container mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-[.62fr_1.38fr] md:items-center md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Our Vision</p>
          <div className="flex items-start gap-4">
            <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9eee3] text-primary"><BookOpen size={20} /></span>
            <p className="font-display text-2xl font-medium leading-snug tracking-[-.02em] text-primary md:text-3xl">A world where African and Afro-Caribbean food culture is understood, connected, and within reach.</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
