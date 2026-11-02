import { ArrowUpRight, BriefcaseBusiness, Store, Truck } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";

const inquiryUrl = "https://tally.so/r/rjKA6p";

export function ContactPage() {
  return (
    <main className="min-h-[100dvh] bg-white text-foreground">
      <Navbar />
      <section className="relative overflow-hidden bg-white pb-12 pt-32 md:pb-16 md:pt-40">
        <div aria-hidden="true" className="absolute -right-32 -top-20 h-[30rem] w-[30rem] rounded-full border border-primary/10" />
        <div className="container relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Contact &amp; Partnerships</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[1.02] tracking-[-.06em] md:text-7xl">Find your way in.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-foreground/70 md:text-lg md:leading-8">
            JÍJÉ connects African and Afro-Caribbean food culture with commerce, community, research and technology. Choose the path that fits your conversation.
          </p>
        </div>
      </section>
      <section aria-label="Choose an inquiry path" className="pb-16 md:pb-24">
        <div className="container mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid gap-4 md:grid-cols-3">
            <article className="flex min-h-[260px] flex-col rounded-[1.5rem] border border-primary/10 bg-[#e9eee3] p-6 md:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-[#ffcc33]"><Store size={21} aria-hidden="true" /></span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Marketplace · Food businesses</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary">List Your Business</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">Share your African or Afro-Caribbean food business for Marketplace consideration.</p>
              <Link href="/vendors" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                List Your Business <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </article>

            <article className="flex min-h-[260px] flex-col rounded-[1.5rem] border border-primary/10 bg-white p-6 md:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8e7e5] text-[#c32d39]"><Truck size={21} aria-hidden="true" /></span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[#c32d39]">Marketplace · Delivery</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-primary">Become a Delivery Partner</h2>
              <p className="mt-3 text-sm leading-6 text-foreground/65">Register your interest in supporting delivery for the Toronto/GTA pilot.</p>
              <Link href="/drivers" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Become a Delivery Partner <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </article>

            <article className="flex min-h-[260px] flex-col rounded-[1.5rem] bg-primary p-6 text-primary-foreground md:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#ffcc33]"><BriefcaseBusiness size={21} aria-hidden="true" /></span>
              <p className="mt-6 text-xs font-bold uppercase tracking-[.16em] text-[#ffcc33]">Beyond the Marketplace</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-white">General &amp; Partnership Inquiries</h2>
              <p className="mt-3 text-sm leading-6 text-white/75">For community connections, research, technology, partnerships or general company matters.</p>
              <a href={inquiryUrl} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-[#ffcc33] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffcc33]">
                General &amp; Partnership Inquiries <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </article>
          </div>
          <p className="mt-7 max-w-4xl border-l-2 border-[#ffcc33] pl-4 text-sm leading-6 text-foreground/60">
            The JÍJÉ Marketplace is preparing for a Toronto/GTA pilot. Submitting interest is not approval, an offer of work, a service agreement or a partnership commitment.
          </p>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
