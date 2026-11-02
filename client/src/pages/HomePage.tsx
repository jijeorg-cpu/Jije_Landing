import { ArrowRight, ArrowUpRight, Layers3, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

export function HomePage() {
  return (
    <main className="min-h-[100dvh] overflow-hidden bg-background text-foreground">
      <Navbar />
      <section className="relative min-h-[720px] bg-white pt-28 md:min-h-[770px] md:pt-32">
        <div className="container relative mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 md:grid-cols-[1.05fr_.95fr] md:px-10 md:pb-24">
          <div className="relative z-10 max-w-2xl">
            <h1 className="font-display text-[3.5rem] font-semibold leading-[1.02] tracking-[-.025em] text-primary sm:text-7xl lg:text-[5.6rem]">
              Rooted in <span className="text-[#c32d39]">Culture.</span><br />Powered by<br />Intelligence.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-foreground/75 md:text-xl">
              Building the commerce and intelligence infrastructure for African and Afro-Caribbean food.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/marketplace" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-primary px-7 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
                Explore JÍJÉ Marketplace <ArrowRight size={18} />
              </Link>
              <Link href="/intelligence" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-primary/25 bg-background/80 px-7 font-semibold text-primary transition-colors hover:bg-background">
                Discover JÍJÉ Intelligence <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[590px]">
            <div className="relative aspect-[.92] overflow-hidden rounded-t-[48%] rounded-b-[2rem] bg-white shadow-[0_30px_80px_rgba(26,77,46,.12)]">
              <img src="/attached_assets/jije_jollof.JPEG" alt="A shared platter of jollof rice and accompaniments" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="businesses" className="scroll-mt-24 bg-white py-24 md:py-32">
        <span id="spotlight" className="scroll-mt-24" />
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-[-.05em] md:text-6xl">Our Businesses</h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] bg-primary p-8 text-primary-foreground md:p-11">
              <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
              <div className="absolute -right-7 -top-7 h-48 w-48 rounded-full border border-white/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffcc33] text-primary"><Layers3 size={23} /></span>
              <h3 className="sr-only">JÍJÉ Marketplace</h3>
              <p className="relative mt-9 max-w-lg leading-7 text-white/75">The first JÍJÉ business, connecting people with African and Afro-Caribbean food and food businesses.</p>
              <Link href="/marketplace" className="relative mt-auto inline-flex w-fit items-center gap-3 pt-8 font-semibold text-[#ffcc33] transition-colors hover:text-white">Explore Marketplace <ArrowRight size={17} /></Link>
            </article>
            <article className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[2rem] border border-primary/10 bg-[#e9eee3] p-8 md:p-11">
              <div className="absolute -bottom-24 -right-12 h-80 w-80 rounded-full border border-primary/10" />
              <div className="absolute -bottom-12 right-0 h-56 w-56 rounded-full border border-primary/10" />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-[#ffcc33]"><Sparkles size={23} /></span>
              <h3 className="sr-only">JÍJÉ Intelligence: Cultural Knowledge. Real-World Intelligence.</h3>
              <p className="relative mt-9 max-w-lg leading-7 text-foreground/70">A developing initiative connecting cultural food knowledge with research and intelligent technology.</p>
              <Link href="/intelligence" className="relative mt-auto inline-flex w-fit items-center gap-3 pt-8 font-semibold text-primary transition-colors hover:text-[#c32d39]">Explore Intelligence <ArrowRight size={17} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 bg-primary py-10 text-primary-foreground md:py-12">
        <div className="container mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 md:flex-row md:items-center md:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-white">THE REASON WE BUILD</p>
            <Link href="/about" className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10">Read our story <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section id="join" className="scroll-mt-24 bg-primary py-10 text-primary-foreground md:py-12">
        <div className="container mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 md:flex-row md:items-center md:px-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">COME BUILD WITH US</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/partnerships" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#ffcc33] px-6 font-semibold text-primary hover:bg-[#f4bd20]">Explore Partnerships <ArrowRight size={17} /></Link>
            <Link href="/marketplace#pilot" id="pilot" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/35 px-6 font-semibold text-white hover:bg-white/10">Join the Pilot</Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

