import { motion } from "framer-motion";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productSunscreen from "@/assets/product-sunscreen.jpg";

const products = [
  {
    image: productSerum,
    name: "Sérum Vitamina C",
    brand: "Glow Lab",
    skinType: "Pele oleosa",
  },
  {
    image: productCream,
    name: "Hidratante Facial",
    brand: "Derma Pure",
    skinType: "Pele seca",
  },
  {
    image: productCleanser,
    name: "Gel de Limpeza",
    brand: "Clean Skin",
    skinType: "Pele mista",
  },
  {
    image: productSunscreen,
    name: "Protetor Solar FPS 50",
    brand: "Sun Shield",
    skinType: "Todos os tipos",
  },
];

const FeaturedProducts = () => {
  return (
    <section id="produtos" className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos em destaque
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Selecionados por especialistas para cada tipo de pele.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-shadow duration-500"
            >
              <div className="aspect-square overflow-hidden bg-muted/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-5 space-y-2">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <span className="inline-block text-xs bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full">
                  {product.skinType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
