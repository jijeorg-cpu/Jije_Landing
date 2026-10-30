import { useState, useEffect } from "react";
import { Link as RouteLink, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Home", to: "/" },
  { name: "About JÍJÉ", to: "/about" },
  { name: "Marketplace", to: "/marketplace" },
  { name: "Intelligence", to: "/intelligence" },
  { name: "Partnerships", to: "/partnerships" },
  { name: "Contact", to: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const partnerUrl = "https://tally.so/r/rjKA6p";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);
  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-0 z-50 border-b border-primary/10 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-background/98 shadow-sm backdrop-blur-md" : "bg-background/95 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto flex min-h-[5.5rem] items-center justify-between gap-3 px-4 md:px-6">
        <RouteLink href="/" aria-label="JÍJÉ home" className="relative flex h-[5.25rem] w-[9.5rem] shrink-0 items-center overflow-hidden">
          <img
            src="/jije-icon-v2.png"
            alt="JÍJÉ"
            className="absolute left-0 top-1/2 h-[9.5rem] w-[9.5rem] max-w-none -translate-y-1/2 object-contain"
          />
        </RouteLink>

        <div className="hidden items-center gap-4 xl:flex">
          {links.map((link) => (
            <RouteLink key={link.to} href={link.to} className={`whitespace-nowrap text-sm font-semibold transition-colors hover:text-primary focus-visible:rounded-sm ${location === link.to || (location === "/partners" && link.to === "/partnerships") ? "text-primary" : "text-foreground/80"}`}>
              {link.name}
            </RouteLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <RouteLink href="/marketplace" className="inline-flex min-h-10 items-center whitespace-nowrap rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Explore Marketplace</RouteLink>
          <Button
            variant="outline"
            onClick={() => window.open(partnerUrl, "_blank", "noopener,noreferrer")}
            className="min-h-10 whitespace-nowrap rounded-full border-primary/25 px-4 text-sm font-semibold text-primary"
          >
            Enquire
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="rounded-full p-2 text-primary xl:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full flex max-h-[calc(100dvh-5.5rem)] w-full flex-col gap-3 overflow-y-auto border-b border-border bg-background p-5 shadow-xl backdrop-blur-xl xl:hidden">
          {links.map((link) => (
            <RouteLink key={link.to} href={link.to} onClick={closeMenu} className="border-b border-border/50 py-2 text-lg font-medium text-foreground">
              {link.name}
            </RouteLink>
          ))}
          <RouteLink href="/vendors" onClick={closeMenu} className="border-b border-border/50 py-2 text-lg font-medium text-foreground">For vendors</RouteLink>
          <RouteLink href="/drivers" onClick={closeMenu} className="border-b border-border/50 py-2 text-lg font-medium text-foreground">For drivers</RouteLink>
          <RouteLink href="/marketplace" onClick={closeMenu} className="mt-2 inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground">Explore Marketplace</RouteLink>
          <RouteLink href="/marketplace#pilot" onClick={closeMenu} className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full border border-primary/25 px-5 font-semibold text-primary">Join the Pilot</RouteLink>
          <Button
            variant="outline"
            onClick={() => {
              closeMenu();
              window.open(partnerUrl, "_blank", "noopener,noreferrer");
            }}
            className="min-h-12 rounded-full border-primary/25 text-primary"
          >
            Partnership enquiry
          </Button>
        </div>
      )}
    </nav>
  );
}
