import { motion } from "framer-motion";
import { ScanFace, Sparkles, ShoppingBag } from "lucide-react";

const steps = [
  {
    icon: ScanFace,
    title: "Informe seu tipo de pele",
    description: "Responda algumas perguntas simples sobre seu tipo e tom de pele.",
  },
  {
    icon: Sparkles,
    title: "Veja recomendações personalizadas",
    description: "Nosso algoritmo analisa e seleciona os melhores produtos para você.",
  },
  {
    icon: ShoppingBag,
    title: "Descubra produtos ideais",
    description: "Explore produtos aprovados por dermatologistas para sua rotina.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Três passos simples para encontrar sua rotina perfeita de skincare.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center space-y-4"
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/40 text-sm font-bold text-foreground">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
