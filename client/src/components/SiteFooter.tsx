import { Link } from "wouter";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-[#f4f1e8] py-12">
      <div className="mx-auto grid max-w-7xl gap-9 px-5 md:grid-cols-[1.2fr_1fr] md:px-10">
        <div className="flex flex-col gap-3">
          <Link href="/" className="w-fit font-display text-xl font-bold text-primary">JÍJÉ Group</Link>
          <p className="font-medium text-foreground/80">Rooted in Culture. Powered by Intelligence.</p>
          <p className="text-sm text-foreground/60">Building connections between culture, commerce, knowledge and technology.</p>
          <p className="mt-2 text-xs text-foreground/70">© {new Date().getFullYear()} JÍJÉ Group Inc. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <nav aria-label="Company" className="flex flex-col gap-3 text-sm font-medium text-foreground/70">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-primary">Company</span>
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <Link href="/about" className="transition-colors hover:text-primary">About JÍJÉ</Link>
            <Link href="/partnerships" className="transition-colors hover:text-primary">Partnerships</Link>
            <Link href="/contact" className="transition-colors hover:text-primary">Contact</Link>
          </nav>
          <nav aria-label="Businesses" className="flex flex-col gap-3 text-sm font-medium text-foreground/70">
            <span className="text-xs font-bold uppercase tracking-[.16em] text-primary">Businesses</span>
            <Link href="/marketplace" className="transition-colors hover:text-primary">Marketplace</Link>
            <Link href="/intelligence" className="transition-colors hover:text-primary">Intelligence</Link>
            <Link href="/vendors" className="transition-colors hover:text-primary">For vendors</Link>
            <Link href="/drivers" className="transition-colors hover:text-primary">For drivers</Link>
          </nav>
          <nav aria-label="Legal" className="col-span-2 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-foreground/70 sm:col-span-1 sm:flex-col">
            <span className="hidden text-xs font-bold uppercase tracking-[.16em] text-primary sm:inline">Legal</span>
            <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
