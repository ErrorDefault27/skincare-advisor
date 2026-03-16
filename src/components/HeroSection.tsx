import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-skincare.jpg";

const HeroSection = () => {
  return (
    <section className="pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Descubra os melhores produtos para{" "}
              <span className="text-primary">sua pele</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Nosso sistema inteligente recomenda produtos personalizados com base
              no seu tipo de pele, tom e necessidades específicas. Cuidado
              dermatológico ao alcance de um clique.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="hero">Começar análise de pele</Button>
              <Button variant="hero-outline">Saiba mais</Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden shadow-glow">
              <img
                src={heroImage}
                alt="Produtos de skincare em superfície de mármore"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/30 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
