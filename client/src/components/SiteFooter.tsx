import { Link } from "wouter";

export function SiteFooter() {
  return (
    <footer className="border-t border-primary/10 bg-[#f4f1e8] py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-foreground/65 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-1">
          <Link href="/" className="font-semibold text-primary">
            Jíjé <span className="font-normal text-foreground/60">· Culture. Commerce. Community.</span>
          </Link>
          <p>Toronto / GTA pilot · © {new Date().getFullYear()} Jíjé Group Inc.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 font-medium">
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/vendors" className="transition-colors hover:text-primary">Vendors</Link>
          <Link href="/drivers" className="transition-colors hover:text-primary">Drivers</Link>
          <Link href="/privacy" className="transition-colors hover:text-primary">Privacy Policy</Link>
          <Link href="/terms" className="transition-colors hover:text-primary">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
}
