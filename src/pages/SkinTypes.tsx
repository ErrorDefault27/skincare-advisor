import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Sun, Heart, Droplets, Shield, Flower2, CheckCircle2 } from "lucide-react";

const skinTypes = [
  {
    title: "Pele Adolescente",
    age: "13 – 19 anos",
    icon: Sparkles,
    color: "text-primary",
    bgAccent: "bg-primary/10",
    description:
      "Na adolescência, as alterações hormonais aumentam a produção de sebo, resultando em pele oleosa, acne e poros dilatados. Uma rotina simples e consistente é o melhor caminho.",
    characteristics: [
      "Oleosidade excessiva na zona T",
      "Tendência a cravos e espinhas",
      "Poros dilatados",
      "Textura irregular",
    ],
    tips: [
      "Lavar o rosto 2x ao dia com gel de limpeza suave",
      "Usar hidratante oil-free e não comedogênico",
      "Protetor solar FPS 30+ diariamente",
      "Evitar espremer espinhas para não deixar marcas",
    ],
    ingredients: ["Ácido salicílico", "Niacinamida", "Zinco", "Tea Tree"],
    filterQuery: "?skinType=oleosa",
  },
  {
    title: "Pele Jovem",
    age: "20 – 35 anos",
    icon: Sun,
    color: "text-accent-foreground",
    bgAccent: "bg-secondary/60",
    description:
      "A pele jovem adulta está no auge da produção de colágeno, mas já começa a apresentar os primeiros sinais de envelhecimento. É a fase ideal para prevenção com antioxidantes e proteção solar rigorosa.",
    characteristics: [
      "Primeiras linhas finas ao redor dos olhos",
      "Possíveis manchas de sol",
      "Pele ainda firme, mas com menos viço",
      "Desidratação por estilo de vida",
    ],
    tips: [
      "Incorporar vitamina C pela manhã",
      "Usar protetor solar FPS 50 diariamente",
      "Hidratar com ácido hialurônico",
      "Iniciar uso de retinol em baixa concentração à noite",
    ],
    ingredients: ["Vitamina C", "Ácido hialurônico", "Retinol", "FPS 50"],
    filterQuery: "?skinType=mista",
  },
  {
    title: "Pele Madura",
    age: "35+ anos",
    icon: Heart,
    color: "text-destructive",
    bgAccent: "bg-destructive/10",
    description:
      "Com o passar dos anos, a produção de colágeno e elastina diminui, surgem rugas, perda de firmeza e manchas. A rotina deve focar em regeneração, nutrição profunda e proteção.",
    characteristics: [
      "Rugas e linhas de expressão marcadas",
      "Perda de firmeza e elasticidade",
      "Manchas e tom desigual",
      "Pele mais fina e sensível",
    ],
    tips: [
      "Usar retinol ou retinaldeído à noite",
      "Investir em séruns com peptídeos e antioxidantes",
      "Hidratar com ceramidas e óleos nutritivos",
      "Protetor solar FPS 50+ é indispensável",
    ],
    ingredients: ["Retinol", "Peptídeos", "Ceramidas", "Coenzima Q10"],
    filterQuery: "?skinType=seca",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

const SkinTypes = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/60 text-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-2">
              <Flower2 className="h-4 w-4 text-primary" />
              Guia de Pele por Idade
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Tipos de Pele por <span className="text-primary">Idade</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Cada fase da vida traz necessidades diferentes para a pele. Descubra as
              características, cuidados essenciais e ingredientes recomendados para
              adolescentes, jovens e peles maduras.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skin Type Cards */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8 space-y-12">
          {skinTypes.map((skin, i) => {
            const Icon = skin.icon;
            return (
              <motion.div
                key={skin.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
              >
                <Card className="overflow-hidden border-border/60">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]">
                      {/* Left accent panel */}
                      <div
                        className={`${skin.bgAccent} flex flex-col items-center justify-center gap-4 p-8 md:p-10`}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-background/80 flex items-center justify-center shadow-sm">
                          <Icon className={`h-8 w-8 ${skin.color}`} />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground text-center">
                          {skin.title}
                        </h2>
                        <span className="text-sm font-medium text-muted-foreground bg-background/60 px-3 py-1 rounded-full">
                          {skin.age}
                        </span>
                      </div>

                      {/* Right content */}
                      <div className="p-6 md:p-8 lg:p-10 space-y-6">
                        <p className="text-muted-foreground leading-relaxed">
                          {skin.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-6">
                          {/* Characteristics */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Droplets className="h-4 w-4 text-primary" />
                              Características
                            </h3>
                            <ul className="space-y-2">
                              {skin.characteristics.map((c) => (
                                <li
                                  key={c}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Tips */}
                          <div className="space-y-3">
                            <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm uppercase tracking-wider">
                              <Shield className="h-4 w-4 text-primary" />
                              Dicas de Cuidado
                            </h3>
                            <ul className="space-y-2">
                              {skin.tips.map((t) => (
                                <li
                                  key={t}
                                  className="text-sm text-muted-foreground flex items-start gap-2"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                  {t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Ingredients + CTA */}
                        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/50">
                          <div className="flex flex-wrap gap-2">
                            {skin.ingredients.map((ing) => (
                              <span
                                key={ing}
                                className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                              >
                                {ing}
                              </span>
                            ))}
                          </div>
                          <Button asChild variant="default" size="sm" className="rounded-full">
                            <Link to={`/produtos${skin.filterQuery}`}>
                              Ver produtos recomendados →
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary/5 border border-primary/20 rounded-3xl p-10 md:p-14 text-center max-w-2xl mx-auto space-y-4"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Não sabe qual é o seu tipo de pele?
            </h2>
            <p className="text-muted-foreground">
              Faça nossa análise rápida e receba recomendações personalizadas em minutos.
            </p>
            <Button variant="hero" className="mt-2">
              Fazer análise de pele
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SkinTypes;
