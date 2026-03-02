import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Mission", to: "mission" },
    { name: "How It Works", to: "how-it-works" },
    { name: "Community", to: "spotlight" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/jije_logo_reversed.png"
            alt="Jijé logo"
            className="h-8 w-auto object-contain"
          />
          <span className="text-2xl font-bold font-display text-primary tracking-tight">
            Jijé
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              className="text-sm font-medium text-foreground/80 hover:text-primary cursor-pointer transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="join" smooth={true} duration={500}>
            <Button className="rounded-full px-6 font-semibold hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all bg-[#008431]">Partner With Us</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border p-4 shadow-xl flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-foreground py-2 border-b border-border/50"
            >
              {link.name}
            </Link>
          ))}
          <Link to="join" smooth={true} duration={500} onClick={() => setIsMobileMenuOpen(false)}>
            <Button className="w-full rounded-full mt-4 bg-primary text-primary-foreground py-6 text-lg">
              Get Early Access
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
