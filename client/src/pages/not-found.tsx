import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <Navbar />
      <section className="relative flex min-h-[72dvh] items-center overflow-hidden bg-[#f1f5e7] pb-16 pt-32 md:pb-24 md:pt-36">
        <div className="pointer-events-none absolute -right-20 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full border border-primary/10 md:right-12 md:h-[36rem] md:w-[36rem]" />
        <div className="pointer-events-none absolute -right-4 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 rounded-full border border-primary/10 md:right-28 md:h-[26rem] md:w-[26rem]" />
        <div className="container relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.1fr_.9fr] md:px-10">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[.16em] text-[#705335]">
              <span className="h-px w-9 bg-[#705335]" /> JÍJÉ Group · 404
            </p>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-[-.02em] text-primary sm:text-6xl md:text-7xl">
              This page took a different path.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-foreground/75">
              The address may have changed, or the page may no longer be here. Find your way back to the JÍJÉ ecosystem.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">
                <ArrowLeft size={17} aria-hidden="true" /> Back to JÍJÉ
              </Link>
              <Link href="/marketplace" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-primary/25 bg-background/70 px-6 font-semibold text-primary transition-colors hover:bg-background">
                Explore Marketplace <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto flex aspect-square w-full max-w-[350px] items-center justify-center text-primary md:max-w-[410px]">
            <div className="absolute inset-4 rounded-full border border-primary/15" />
            <div className="absolute inset-16 rounded-full border border-primary/15" />
            <div className="absolute inset-28 rounded-full border border-primary/15" />
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-[#ffcc33] shadow-lg">
              <Compass size={46} strokeWidth={1.2} />
            </div>
            <span className="absolute bottom-7 left-5 font-display text-7xl font-bold text-primary/10">404</span>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
