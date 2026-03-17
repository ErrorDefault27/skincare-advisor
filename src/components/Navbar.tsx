import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Tipos de Pele", href: "/tipos-de-pele" },
  { label: "Marcas", href: "/#marcas" },
  { label: "Sobre", href: "/#beneficios" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-foreground">
          <Leaf className="h-6 w-6 text-primary" />
          SkinCare Advisor
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Button variant="hero" size="sm" className="rounded-full px-6 h-9 text-sm">
            Entrar / Cadastro
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block text-muted-foreground hover:text-foreground transition-colors text-sm py-1"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" size="sm" className="w-full rounded-full h-9 text-sm">
            Entrar / Cadastro
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
