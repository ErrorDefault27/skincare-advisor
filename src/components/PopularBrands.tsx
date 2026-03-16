import { motion } from "framer-motion";

const brands = [
  "La Roche-Posay",
  "CeraVe",
  "Neutrogena",
  "Vichy",
  "Bioderma",
  "The Ordinary",
];

const PopularBrands = () => {
  return (
    <section id="marcas" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Marcas populares
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Trabalhamos com as marcas mais confiáveis do mercado dermatológico.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {brands.map((brand, i) => (
            <motion.div
              key={brand}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card rounded-2xl p-6 flex items-center justify-center shadow-card hover:shadow-glow transition-shadow duration-500 cursor-pointer"
            >
              <span className="font-display font-semibold text-foreground/80 text-center text-sm">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
