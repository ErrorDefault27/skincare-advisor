import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, SlidersHorizontal, X } from "lucide-react";
import productSerum from "@/assets/product-serum.jpg";
import productCream from "@/assets/product-cream.jpg";
import productCleanser from "@/assets/product-cleanser.jpg";
import productSunscreen from "@/assets/product-sunscreen.jpg";

const allProducts = [
  { id: 1, image: productSerum, name: "Sérum Vitamina C", brand: "Glow Lab", skinType: "Pele oleosa", category: "Sérum" },
  { id: 2, image: productCream, name: "Hidratante Facial", brand: "Derma Pure", skinType: "Pele seca", category: "Hidratante" },
  { id: 3, image: productCleanser, name: "Gel de Limpeza", brand: "Clean Skin", skinType: "Pele mista", category: "Limpeza" },
  { id: 4, image: productSunscreen, name: "Protetor Solar FPS 50", brand: "Sun Shield", skinType: "Todos os tipos", category: "Proteção Solar" },
  { id: 5, image: productSerum, name: "Sérum Retinol", brand: "Glow Lab", skinType: "Pele madura", category: "Sérum" },
  { id: 6, image: productCream, name: "Creme Noturno", brand: "Derma Pure", skinType: "Pele seca", category: "Hidratante" },
  { id: 7, image: productCleanser, name: "Espuma de Limpeza", brand: "Clean Skin", skinType: "Pele oleosa", category: "Limpeza" },
  { id: 8, image: productSunscreen, name: "Protetor Solar Toque Seco", brand: "Sun Shield", skinType: "Pele oleosa", category: "Proteção Solar" },
  { id: 9, image: productSerum, name: "Sérum Ácido Hialurônico", brand: "Hydra Glow", skinType: "Todos os tipos", category: "Sérum" },
  { id: 10, image: productCream, name: "Gel Creme Oil-Free", brand: "Hydra Glow", skinType: "Pele mista", category: "Hidratante" },
  { id: 11, image: productCleanser, name: "Água Micelar", brand: "La Beauté", skinType: "Pele sensível", category: "Limpeza" },
  { id: 12, image: productCream, name: "Creme Anti-idade", brand: "La Beauté", skinType: "Pele madura", category: "Hidratante" },
];

const brands = [...new Set(allProducts.map((p) => p.brand))];
const skinTypes = [...new Set(allProducts.map((p) => p.skinType))];
const categories = [...new Set(allProducts.map((p) => p.category))];

const Products = () => {
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const toggle = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
      const matchBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchSkin = selectedSkinTypes.length === 0 || selectedSkinTypes.includes(p.skinType);
      const matchCat = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      return matchSearch && matchBrand && matchSkin && matchCat;
    });
  }, [search, selectedBrands, selectedSkinTypes, selectedCategories]);

  const activeFilterCount = selectedBrands.length + selectedSkinTypes.length + selectedCategories.length;

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setSelectedCategories([]);
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Nossos Produtos
            </h1>
            <p className="text-muted-foreground">
              Encontre o produto perfeito para o seu tipo de pele.
            </p>
          </motion.div>

          {/* Search + Filter toggle */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos ou marcas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-full bg-card border-border"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full px-2 py-0.5 ml-1">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            {activeFilterCount > 0 && (
              <Button variant="ghost" onClick={clearAll} className="rounded-full gap-1 text-muted-foreground">
                <X className="h-4 w-4" /> Limpar
              </Button>
            )}
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.aside
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 260 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:block shrink-0 overflow-hidden"
                >
                  <div className="w-[260px] space-y-8">
                    {/* Marcas */}
                    <FilterGroup
                      title="Marcas"
                      items={brands}
                      selected={selectedBrands}
                      onToggle={(v) => setSelectedBrands(toggle(selectedBrands, v))}
                    />
                    {/* Tipo de Pele */}
                    <FilterGroup
                      title="Tipo de Pele"
                      items={skinTypes}
                      selected={selectedSkinTypes}
                      onToggle={(v) => setSelectedSkinTypes(toggle(selectedSkinTypes, v))}
                    />
                    {/* Categoria */}
                    <FilterGroup
                      title="Categoria"
                      items={categories}
                      selected={selectedCategories}
                      onToggle={(v) => setSelectedCategories(toggle(selectedCategories, v))}
                    />
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Mobile Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden fixed inset-0 top-16 z-40 bg-background overflow-y-auto p-6 space-y-6"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-display font-semibold text-lg text-foreground">Filtros</h3>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <FilterGroup title="Marcas" items={brands} selected={selectedBrands} onToggle={(v) => setSelectedBrands(toggle(selectedBrands, v))} />
                  <FilterGroup title="Tipo de Pele" items={skinTypes} selected={selectedSkinTypes} onToggle={(v) => setSelectedSkinTypes(toggle(selectedSkinTypes, v))} />
                  <FilterGroup title="Categoria" items={categories} selected={selectedCategories} onToggle={(v) => setSelectedCategories(toggle(selectedCategories, v))} />
                  <Button variant="hero" className="w-full mt-4" onClick={() => setShowFilters(false)}>
                    Ver {filtered.length} produtos
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
              </p>

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-2">Nenhum produto encontrado</p>
                  <p className="text-muted-foreground text-sm">Tente ajustar seus filtros.</p>
                  <Button variant="outline" className="mt-4 rounded-full" onClick={clearAll}>
                    Limpar filtros
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
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
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-block text-xs bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-full">
                              {product.skinType}
                            </span>
                            <span className="inline-block text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const FilterGroup = ({
  title,
  items,
  selected,
  onToggle,
}: {
  title: string;
  items: string[];
  selected: string[];
  onToggle: (val: string) => void;
}) => (
  <div>
    <h4 className="font-display font-semibold text-foreground text-sm mb-3">{title}</h4>
    <div className="space-y-2">
      {items.map((item) => (
        <label
          key={item}
          className="flex items-center gap-3 cursor-pointer group/filter"
        >
          <Checkbox
            checked={selected.includes(item)}
            onCheckedChange={() => onToggle(item)}
          />
          <span className="text-sm text-muted-foreground group-hover/filter:text-foreground transition-colors">
            {item}
          </span>
        </label>
      ))}
    </div>
  </div>
);

export default Products;
