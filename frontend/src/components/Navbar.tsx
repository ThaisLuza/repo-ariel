import { useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Programas", href: "#programas" },
  { label: "Planos", href: "#planos" },
  { label: "Contato", href: "#contato" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-heading font-extrabold text-xl tracking-tight text-navy">
          AHEAD<span className="text-electric">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-navy transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="lg" asChild>
            <a href="#contato">Iniciar Minha Transformação</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-navy" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-b border-border px-6 pb-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block text-sm font-medium text-muted-foreground hover:text-navy"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" className="w-full" asChild>
            <a href="#contato" onClick={() => setOpen(false)}>Iniciar Minha Transformação</a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;