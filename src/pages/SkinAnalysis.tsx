import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Sun,
  Droplets,
  ShieldCheck,
  Leaf,
  CheckCircle2,
} from "lucide-react";

/* ─── data ─── */

const skinTones = [
  { id: "I", label: "Muito clara", color: "#FDEBD3", description: "Queima facilmente, nunca bronzeia" },
  { id: "II", label: "Clara", color: "#F5D6B8", description: "Queima facilmente, bronzeia levemente" },
  { id: "III", label: "Média clara", color: "#D4A574", description: "Queima moderadamente, bronzeia gradualmente" },
  { id: "IV", label: "Média", color: "#C68642", description: "Queima pouco, bronzeia facilmente" },
  { id: "V", label: "Média escura", color: "#8D5524", description: "Raramente queima, bronzeia muito" },
  { id: "VI", label: "Escura", color: "#5C3317", description: "Nunca queima, pele profundamente pigmentada" },
];

const skinTypes = [
  { id: "oleosa", label: "Oleosa", icon: "💧", desc: "Brilho excessivo, poros dilatados" },
  { id: "seca", label: "Seca", icon: "🏜️", desc: "Repuxamento, descamação" },
  { id: "mista", label: "Mista", icon: "⚖️", desc: "Zona T oleosa, bochechas secas" },
  { id: "normal", label: "Normal", icon: "✨", desc: "Equilibrada, poucos problemas" },
  { id: "sensivel", label: "Sensível", icon: "🌸", desc: "Irritação fácil, vermelhidão" },
];

const ageRanges = [
  { id: "adolescente", label: "13 – 19 anos", desc: "Pele adolescente" },
  { id: "jovem", label: "20 – 35 anos", desc: "Pele jovem" },
  { id: "madura", label: "36+ anos", desc: "Pele madura" },
];

const concerns = [
  { id: "acne", label: "Acne e espinhas" },
  { id: "manchas", label: "Manchas e hiperpigmentação" },
  { id: "rugas", label: "Rugas e linhas finas" },
  { id: "oleosidade", label: "Oleosidade excessiva" },
  { id: "ressecamento", label: "Ressecamento" },
  { id: "poros", label: "Poros dilatados" },
  { id: "olheiras", label: "Olheiras" },
  { id: "flacidez", label: "Flacidez" },
];

const routines: Record<string, string[]> = {
  oleosa: ["Gel de limpeza facial", "Tônico adstringente", "Sérum de Niacinamida", "Hidratante oil-free", "Protetor solar FPS 50 toque seco"],
  seca: ["Leite de limpeza", "Tônico hidratante", "Sérum de Ácido Hialurônico", "Creme hidratante rico", "Protetor solar FPS 50 com hidratação"],
  mista: ["Gel de limpeza suave", "Tônico equilibrante", "Sérum de Vitamina C", "Hidratante leve", "Protetor solar FPS 50"],
  normal: ["Sabonete facial suave", "Água micelar", "Sérum antioxidante", "Hidratante leve", "Protetor solar FPS 30+"],
  sensivel: ["Água micelar sem álcool", "Tônico calmante", "Sérum de Centella Asiática", "Creme para pele sensível", "Protetor solar mineral FPS 50"],
};

const ingredientsByTone: Record<string, { warn: string; recommend: string }> = {
  I: { warn: "Evite exposição solar prolongada. Use FPS 50+ diariamente.", recommend: "Vitamina C, Ácido Kójico, FPS 50+" },
  II: { warn: "Pele propensa a queimaduras. Reaplique protetor a cada 2h.", recommend: "Niacinamida, Retinol, FPS 50+" },
  III: { warn: "Risco moderado de manchas pós-inflamatórias.", recommend: "Ácido Tranexâmico, Vitamina C, FPS 30+" },
  IV: { warn: "Tendência a hiperpigmentação. Cuidado com ácidos fortes.", recommend: "Ácido Azelaico, Arbutin, FPS 30+" },
  V: { warn: "Evite peelings agressivos que podem causar manchas.", recommend: "Ácido Mandélico, Niacinamida, FPS 30+" },
  VI: { warn: "Pele resiliente ao sol, mas hidratação é essencial.", recommend: "Ácido Hialurônico, Manteiga de Karité, FPS 30+" },
};

/* ─── types ─── */
interface Answers {
  tone: string;
  skinType: string;
  age: string;
  concerns: string[];
}

const TOTAL_STEPS = 5; // tone, skinType, age, concerns, result

/* ─── component ─── */
const SkinAnalysis = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    tone: "",
    skinType: "",
    age: "",
    concerns: [],
  });

  const canNext = () => {
    if (step === 0) return !!answers.tone;
    if (step === 1) return !!answers.skinType;
    if (step === 2) return !!answers.age;
    if (step === 3) return answers.concerns.length > 0;
    return true;
  };

  const toggleConcern = (id: string) => {
    setAnswers((prev) => ({
      ...prev,
      concerns: prev.concerns.includes(id)
        ? prev.concerns.filter((c) => c !== id)
        : [...prev.concerns, id],
    }));
  };

  const selectedTone = skinTones.find((t) => t.id === answers.tone);
  const toneInfo = answers.tone ? ingredientsByTone[answers.tone] : null;
  const routine = answers.skinType ? routines[answers.skinType] ?? routines.normal : [];

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" /> Análise Personalizada
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Descubra sua Pele
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Responda algumas perguntas e receba uma rotina personalizada de
              skincare com base no seu tom, tipo e necessidades.
            </p>
          </motion.div>

          {/* progress */}
          {step < TOTAL_STEPS - 1 && (
            <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
              {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}

          {/* steps */}
          <AnimatePresence mode="wait">
            {/* STEP 0 — Tom de pele / Fototipo */}
            {step === 0 && (
              <motion.div key="step0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                      Qual é o seu tom de pele?
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Selecione o fototipo que mais se aproxima da sua cor natural.
                    </p>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-6">
                      {skinTones.map((tone) => (
                        <button
                          key={tone.id}
                          onClick={() => setAnswers((p) => ({ ...p, tone: tone.id }))}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                            answers.tone === tone.id
                              ? "border-primary shadow-md scale-105"
                              : "border-transparent hover:border-border"
                          }`}
                        >
                          <div
                            className="w-12 h-12 rounded-full shadow-inner border border-border/30"
                            style={{ backgroundColor: tone.color }}
                          />
                          <span className="text-xs font-medium text-foreground text-center leading-tight">
                            {tone.label}
                          </span>
                        </button>
                      ))}
                    </div>

                    {selectedTone && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-muted/50 rounded-xl p-4 flex items-start gap-3"
                      >
                        <Sun className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            Fototipo {selectedTone.id} — {selectedTone.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {selectedTone.description}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* STEP 1 — Tipo de pele */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                      Qual é o seu tipo de pele?
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Escolha o que melhor descreve sua pele no dia a dia.
                    </p>

                    <RadioGroup
                      value={answers.skinType}
                      onValueChange={(v) => setAnswers((p) => ({ ...p, skinType: v }))}
                      className="grid gap-3"
                    >
                      {skinTypes.map((st) => (
                        <Label
                          key={st.id}
                          htmlFor={`skin-${st.id}`}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            answers.skinType === st.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          <RadioGroupItem value={st.id} id={`skin-${st.id}`} />
                          <span className="text-2xl">{st.icon}</span>
                          <div>
                            <p className="font-medium text-foreground">{st.label}</p>
                            <p className="text-sm text-muted-foreground">{st.desc}</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* STEP 2 — Faixa etária */}
            {step === 2 && (
              <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                      Qual é a sua faixa etária?
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Isso nos ajuda a recomendar ativos adequados para sua fase.
                    </p>

                    <RadioGroup
                      value={answers.age}
                      onValueChange={(v) => setAnswers((p) => ({ ...p, age: v }))}
                      className="grid gap-3"
                    >
                      {ageRanges.map((a) => (
                        <Label
                          key={a.id}
                          htmlFor={`age-${a.id}`}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            answers.age === a.id
                              ? "border-primary bg-primary/5"
                              : "border-border/50 hover:border-border"
                          }`}
                        >
                          <RadioGroupItem value={a.id} id={`age-${a.id}`} />
                          <div>
                            <p className="font-medium text-foreground">{a.label}</p>
                            <p className="text-sm text-muted-foreground">{a.desc}</p>
                          </div>
                        </Label>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* STEP 3 — Preocupações */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <Card className="border-border/50 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                      Quais são suas preocupações?
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      Selecione uma ou mais opções.
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {concerns.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => toggleConcern(c.id)}
                          className={`p-3 rounded-xl border-2 text-sm font-medium text-left transition-all duration-200 ${
                            answers.concerns.includes(c.id)
                              ? "border-primary bg-primary/5 text-foreground"
                              : "border-border/50 text-muted-foreground hover:border-border"
                          }`}
                        >
                          {answers.concerns.includes(c.id) && (
                            <CheckCircle2 className="inline h-4 w-4 text-primary mr-1.5 -mt-0.5" />
                          )}
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* STEP 4 — Resultado */}
            {step === 4 && (
              <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                <div className="space-y-6">
                  {/* perfil */}
                  <Card className="border-primary/30 shadow-md overflow-hidden">
                    <div className="bg-primary/10 px-6 py-4 flex items-center gap-4">
                      {selectedTone && (
                        <div
                          className="w-14 h-14 rounded-full border-4 border-primary/30 shadow"
                          style={{ backgroundColor: selectedTone.color }}
                        />
                      )}
                      <div>
                        <h2 className="text-xl font-display font-bold text-foreground">
                          Seu Perfil de Pele
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Fototipo {answers.tone} · {skinTypes.find((s) => s.id === answers.skinType)?.label} ·{" "}
                          {ageRanges.find((a) => a.id === answers.age)?.label}
                        </p>
                      </div>
                    </div>

                    <CardContent className="p-6 space-y-5">
                      {/* tom + proteção */}
                      {toneInfo && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-foreground font-semibold">
                            <Sun className="h-5 w-5 text-secondary" /> Proteção Solar
                          </div>
                          <p className="text-sm text-muted-foreground">{toneInfo.warn}</p>
                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Ingredientes recomendados</p>
                            <p className="text-sm text-foreground">{toneInfo.recommend}</p>
                          </div>
                        </div>
                      )}

                      {/* preocupações */}
                      <div>
                        <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                          <ShieldCheck className="h-5 w-5 text-primary" /> Suas Preocupações
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {answers.concerns.map((c) => (
                            <span
                              key={c}
                              className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full"
                            >
                              {concerns.find((x) => x.id === c)?.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* rotina */}
                  <Card className="border-border/50 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-foreground font-semibold mb-4">
                        <Droplets className="h-5 w-5 text-primary" /> Rotina Recomendada
                      </div>
                      <ol className="space-y-3">
                        {routine.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0">
                              {i + 1}
                            </span>
                            <span className="text-sm text-foreground">{item}</span>
                          </li>
                        ))}
                      </ol>
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button variant="hero" asChild>
                      <Link to={`/produtos?skinType=${answers.skinType}`}>
                        <Leaf className="h-4 w-4 mr-1" /> Ver Produtos Recomendados
                      </Link>
                    </Button>
                    <Button
                      variant="hero-outline"
                      onClick={() => {
                        setStep(0);
                        setAnswers({ tone: "", skinType: "", age: "", concerns: [] });
                      }}
                    >
                      Refazer Análise
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* navigation buttons */}
          {step < TOTAL_STEPS - 1 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={() => setStep((s) => s - 1)}
                disabled={step === 0}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Voltar
              </Button>
              <Button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="gap-2"
              >
                {step === 3 ? "Ver Resultado" : "Próximo"} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SkinAnalysis;
