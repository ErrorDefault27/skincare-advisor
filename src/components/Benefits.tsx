import { motion } from "framer-motion";
import { Heart, Database, Zap } from "lucide-react";

const benefits = [
  {
    icon: Heart,
    title: "Recomendações personalizadas",
    description: "Algoritmo inteligente que considera seu tipo de pele, tom e sensibilidades para sugerir os produtos perfeitos.",
  },
  {
    icon: Database,
    title: "Banco de dados dermatológico",
    description: "Centenas de produtos catalogados e validados por profissionais da dermatologia.",
  },
  {
    icon: Zap,
    title: "Fácil de usar",
    description: "Interface intuitiva que te guia em poucos minutos até sua rotina ideal de skincare.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Por que usar o SkinCare Advisor?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Tecnologia e ciência a serviço da sua beleza e saúde.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-shadow duration-500 space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{b.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{b.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
