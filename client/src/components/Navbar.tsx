import { useState, useEffect } from "react";
import { Link as RouteLink, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const landingLinks = [
  { name: "Our mission", to: "mission" },
  { name: "How it works", to: "how-it-works" },
  { name: "Community", to: "spotlight" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHome = location === "/";
  const partnerUrl = "https://tally.so/r/rjKA6p";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const renderLandingLink = (link: (typeof landingLinks)[number], mobile = false) =>
    <a
      key={link.to}
      href={isHome ? `#${link.to}` : `/#${link.to}`}
      onClick={mobile ? closeMenu : undefined}
      className={`${mobile ? "border-b border-border/50 py-2 text-lg" : "text-sm"} font-medium text-foreground/75 transition-colors hover:text-primary`}
    >
      {link.name}
    </a>;

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 py-3 shadow-sm backdrop-blur-md"
          : "bg-background/85 py-4 backdrop-blur-sm md:bg-transparent md:py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        <RouteLink href="/" aria-label="Jíjé home" className="flex shrink-0 items-center">
          <img src="/jije-icon-v2.png" alt="Jíjé" className="h-12 w-auto object-contain md:h-14" />
        </RouteLink>

        <div className="hidden items-center gap-6 lg:flex">
          {landingLinks.map((link) => renderLandingLink(link))}
          <RouteLink href="/vendors" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">For vendors</RouteLink>
          <RouteLink href="/drivers" className="text-sm font-medium text-foreground/75 transition-colors hover:text-primary">For drivers</RouteLink>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <RouteLink href="/vendors" className="inline-flex min-h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Join the pilot</RouteLink>
          <Button
            variant="outline"
            onClick={() => window.open(partnerUrl, "_blank", "noopener,noreferrer")}
            className="min-h-10 rounded-full border-primary/25 px-4 text-sm font-semibold text-primary"
          >
            Partnership enquiry
          </Button>
        </div>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
          className="rounded-full p-2 text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-3 border-b border-border bg-background/98 p-5 shadow-xl backdrop-blur-xl md:hidden">
          {landingLinks.map((link) => renderLandingLink(link, true))}
          <RouteLink href="/vendors" onClick={closeMenu} className="border-b border-border/50 py-2 text-lg font-medium text-foreground">For vendors</RouteLink>
          <RouteLink href="/drivers" onClick={closeMenu} className="border-b border-border/50 py-2 text-lg font-medium text-foreground">For drivers</RouteLink>
          <RouteLink href="/vendors" onClick={closeMenu} className="mt-2 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-5 font-semibold text-primary-foreground">Join the pilot</RouteLink>
          <Button
            variant="outline"
            onClick={() => {
              closeMenu();
              window.open(partnerUrl, "_blank", "noopener,noreferrer");
            }}
            className="min-h-12 rounded-full border-primary/25 text-primary"
          >
            Existing partnership enquiry
          </Button>
        </div>
      )}
    </nav>
  );
}
