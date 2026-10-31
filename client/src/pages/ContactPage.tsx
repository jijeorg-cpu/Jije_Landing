import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const inquiryUrl = "https://tally.so/r/rjKA6p";

export function ContactPage() {
  return (
    <main className="min-h-[100dvh] bg-[#f9f7f2] text-foreground">
      <Navbar />
      <section className="relative overflow-hidden bg-[#f0f4e6] pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="absolute -right-28 -top-16 h-[34rem] w-[34rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Contact</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Let’s start a conversation.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-foreground/70">Choose a Marketplace application or send a general or partnership inquiry.</p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto grid max-w-7xl gap-5 px-5 md:grid-cols-[1.2fr_.8fr] md:px-10">
          <article className="rounded-[1.75rem] bg-primary p-8 text-primary-foreground md:p-12">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><MessageCircle size={22} /></span>
            <p className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">General & partnership enquiries</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">General & partnership inquiries</h2>
            <p className="mt-4 max-w-xl leading-7 text-white/75">For company, research, or technology inquiries, use our established form.</p>
            <a href={inquiryUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-full bg-[#ffcc33] px-6 font-semibold text-primary hover:bg-[#f4bd20]">Open Partnership Inquiry <ArrowUpRight size={17} /></a>
          </article>
          <div className="grid gap-5">
            <Link href="/vendors" className="group flex items-center justify-between rounded-[1.5rem] border border-primary/10 bg-[#e9eee3] p-7 transition-transform hover:-translate-y-0.5">
              <span><span className="block text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Marketplace</span><span className="mt-2 block font-display text-2xl font-semibold text-primary">Vendor interest</span><span className="mt-2 block text-sm text-foreground/60">Share your business details.</span></span><ArrowUpRight className="text-primary" />
            </Link>
            <Link href="/drivers" className="group flex items-center justify-between rounded-[1.5rem] border border-primary/10 bg-[#fbf9f3] p-7 transition-transform hover:-translate-y-0.5">
              <span><span className="block text-xs font-bold uppercase tracking-[.16em] text-[#705335]">Marketplace</span><span className="mt-2 block font-display text-2xl font-semibold text-primary">Delivery partner interest</span><span className="mt-2 block text-sm text-foreground/60">Learn about the pilot application.</span></span><ArrowUpRight className="text-primary" />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
