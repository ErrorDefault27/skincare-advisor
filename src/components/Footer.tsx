import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4 md:col-span-1">
            <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
              <Leaf className="h-5 w-5 text-primary" />
              SkinCare Advisor
            </a>
            <p className="text-sm opacity-70 leading-relaxed">
              Seu guia inteligente para uma rotina de skincare personalizada e eficiente.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider opacity-60">Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Home</a></li>
              <li><a href="#produtos" className="hover:opacity-100 transition-opacity">Produtos</a></li>
              <li><a href="#como-funciona" className="hover:opacity-100 transition-opacity">Tipos de Pele</a></li>
              <li><a href="#marcas" className="hover:opacity-100 transition-opacity">Marcas</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider opacity-60">Suporte</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Política de Privacidade</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Termos de Uso</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider opacity-60">Contato</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>contato@skincareadvisor.com</li>
              <li className="flex gap-4 pt-2">
                <a href="#" className="hover:opacity-100 transition-opacity">Instagram</a>
                <a href="#" className="hover:opacity-100 transition-opacity">Twitter</a>
                <a href="#" className="hover:opacity-100 transition-opacity">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-xs opacity-50">
          © {new Date().getFullYear()} SkinCare Advisor. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
