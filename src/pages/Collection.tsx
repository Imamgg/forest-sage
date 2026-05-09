import { Link } from "react-router-dom";
import {
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronDown,
  Check,
  Leaf,
  Search,
} from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

/* ── Constants ──────────────────────────────────────────── */

const CATEGORIES = ["Semua", "Rempah", "Minuman", "Perawatan"] as const;

const PRICE_RANGES = [
  { label: "Semua Harga", min: 0, max: Infinity },
  { label: "< Rp 30.000", min: 0, max: 29999 },
  { label: "Rp 30.000 – Rp 50.000", min: 30000, max: 50000 },
  { label: "> Rp 50.000", min: 50001, max: Infinity },
] as const;

const ORIGINS = [...new Set(products.map((p) => p.origin))];

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc";
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Harga: Rendah → Tinggi" },
  { value: "price-desc", label: "Harga: Tinggi → Rendah" },
  { value: "name-asc", label: "Nama: A → Z" },
];

const parsePrice = (price: string) => parseInt(price.replace(/\./g, ""), 10);

/* ── Skeleton Card ──────────────────────────────────────── */

const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden">
      <Skeleton className="w-full h-full bg-foreground/[0.06]" />
    </div>
    <div className="mt-3 space-y-2 px-1">
      <Skeleton className="h-2 w-1/3 bg-foreground/[0.06] rounded-full" />
      <Skeleton className="h-3 w-2/3 bg-foreground/[0.06] rounded-full" />
      <Skeleton className="h-2.5 w-1/4 bg-foreground/[0.06] rounded-full" />
    </div>
  </div>
);

/* ── Animated Empty State ───────────────────────────────── */

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    className="col-span-full flex flex-col items-center justify-center py-20 sm:py-28 text-center"
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
        <Search size={28} className="text-foreground/30" />
      </div>
    </motion.div>
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
      Tidak ada produk ditemukan
    </p>
    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
      Coba ubah filter atau kategori untuk menemukan produk yang Anda cari.
    </p>
  </motion.div>
);

/* ── Filter Sidebar (Desktop) / Drawer (Mobile) ────────── */

interface FilterPanelProps {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  activePriceRange: number;
  setActivePriceRange: (i: number) => void;
  activeOrigins: string[];
  toggleOrigin: (o: string) => void;
  resetFilters: () => void;
  activeFilterCount: number;
}

const FilterPanel = ({
  activeCategory,
  setActiveCategory,
  activePriceRange,
  setActivePriceRange,
  activeOrigins,
  toggleOrigin,
  resetFilters,
  activeFilterCount,
}: FilterPanelProps) => (
  <div className="space-y-8">
    {/* Reset */}
    {activeFilterCount > 0 && (
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={resetFilters}
        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors"
      >
        <X size={12} />
        Hapus filter ({activeFilterCount})
      </motion.button>
    )}

    {/* Kategori */}
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Kategori
      </h3>
      <div className="space-y-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
              activeCategory === cat
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-foreground/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>

    {/* Harga */}
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Rentang Harga
      </h3>
      <div className="space-y-1.5">
        {PRICE_RANGES.map((range, idx) => (
          <button
            key={range.label}
            onClick={() => setActivePriceRange(idx)}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-300 flex items-center justify-between ${
              activePriceRange === idx
                ? "bg-foreground text-background"
                : "text-foreground hover:bg-foreground/5"
            }`}
          >
            {range.label}
            {activePriceRange === idx && <Check size={12} />}
          </button>
        ))}
      </div>
    </div>

    {/* Asal */}
    <div>
      <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
        Asal
      </h3>
      <div className="space-y-1.5">
        {ORIGINS.map((origin) => {
          const active = activeOrigins.includes(origin);
          return (
            <button
              key={origin}
              onClick={() => toggleOrigin(origin)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] font-medium tracking-wide transition-all duration-300 flex items-center justify-between ${
                active
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-foreground/5"
              }`}
            >
              {origin}
              {active && <Check size={12} />}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

/* ── Product Card (with parallax) ───────────────────────── */

const CollectionProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} ditambahkan`, {
      description: `Rp ${product.price}`,
      icon: <Check size={16} />,
      duration: 2000,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        delay: index * 0.06,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative"
    >
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />

        {/* Cart button */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-background text-foreground opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto shadow-forest z-10"
        >
          <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
        </motion.button>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5">
          <p className="text-cream/60 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-0.5 sm:mb-1 truncate">
            {product.subtitle}
          </p>
          <div className="flex items-end justify-between gap-2">
            <h3 className="font-display text-cream text-sm sm:text-lg md:text-xl leading-tight tracking-wide line-clamp-2">
              {product.name}
            </h3>
            <span className="shrink-0 text-cream text-[10px] sm:text-[12px] font-bold tracking-wide">
              Rp {product.price}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ── Main Component ─────────────────────────────────────── */

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [activePriceRange, setActivePriceRange] = useState(0);
  const [activeOrigins, setActiveOrigins] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const toggleOrigin = useCallback((origin: string) => {
    setActiveOrigins((prev) =>
      prev.includes(origin)
        ? prev.filter((o) => o !== origin)
        : [...prev, origin]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setActiveCategory("Semua");
    setActivePriceRange(0);
    setActiveOrigins([]);
    setSortBy("default");
  }, []);

  const activeFilterCount =
    (activeCategory !== "Semua" ? 1 : 0) +
    (activePriceRange !== 0 ? 1 : 0) +
    activeOrigins.length;

  // Simulate loading on filter change
  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  }, [activeCategory, activePriceRange, activeOrigins, sortBy]);

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== "Semua") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Price filter
    const range = PRICE_RANGES[activePriceRange];
    if (range.min > 0 || range.max < Infinity) {
      result = result.filter((p) => {
        const price = parsePrice(p.price);
        return price >= range.min && price <= range.max;
      });
    }

    // Origin filter
    if (activeOrigins.length > 0) {
      result = result.filter((p) => activeOrigins.includes(p.origin));
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [activeCategory, activePriceRange, activeOrigins, sortBy]);

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Header */}
          <section className="pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                  Koleksi Lengkap
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9]">
                  SELURUH
                  <br />
                  KOLEKSI
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-body text-sm sm:text-base text-foreground/70 leading-relaxed"
              >
                Jelajahi seluruh rangkaian produk warisan kami — dari rempah
                pilihan, racikan herbal tradisional, hingga perawatan alami yang
                terinspirasi kearifan Nusantara.
              </motion.p>
            </div>
          </section>

          {/* Filter & Grid */}
          <section className="bg-background px-4 sm:px-6 md:px-10 pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-7xl mx-auto">
              {/* Top bar: mobile filter toggle + sort */}
              <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-full border border-foreground/15 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:border-foreground/40 transition-all"
                >
                  <SlidersHorizontal size={13} />
                  Filter
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-foreground text-background text-[9px] flex items-center justify-center font-bold">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* Desktop active filters summary */}
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    {filtered.length} produk
                  </span>
                </div>

                {/* Sort dropdown */}
                <div className="relative ml-auto">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-foreground/15 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground hover:border-foreground/40 transition-all"
                  >
                    Urutkan
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 z-30 bg-background border border-foreground/10 rounded-2xl shadow-forest overflow-hidden min-w-[200px]"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value);
                              setSortOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-[11px] font-medium tracking-wide transition-colors flex items-center justify-between gap-3 ${
                              sortBy === opt.value
                                ? "bg-foreground/5 text-foreground"
                                : "text-foreground/70 hover:bg-foreground/[0.03] hover:text-foreground"
                            }`}
                          >
                            {opt.label}
                            {sortBy === opt.value && <Check size={12} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Desktop: Sidebar + Grid */}
              <div className="flex gap-8 md:gap-12">
                {/* Sidebar (desktop) */}
                <motion.aside
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="hidden lg:block w-[220px] flex-shrink-0 sticky top-28 self-start"
                >
                  <FilterPanel
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    activePriceRange={activePriceRange}
                    setActivePriceRange={setActivePriceRange}
                    activeOrigins={activeOrigins}
                    toggleOrigin={toggleOrigin}
                    resetFilters={resetFilters}
                    activeFilterCount={activeFilterCount}
                  />
                </motion.aside>

                {/* Product grid */}
                <div className="flex-1 min-w-0">
                  {/* Active filter pills (below sort) */}
                  {activeFilterCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {activeCategory !== "Semua" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
                          {activeCategory}
                          <button onClick={() => setActiveCategory("Semua")}>
                            <X size={10} />
                          </button>
                        </span>
                      )}
                      {activePriceRange !== 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
                          {PRICE_RANGES[activePriceRange].label}
                          <button onClick={() => setActivePriceRange(0)}>
                            <X size={10} />
                          </button>
                        </span>
                      )}
                      {activeOrigins.map((o) => (
                        <span
                          key={o}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.15em] text-foreground"
                        >
                          {o}
                          <button onClick={() => toggleOrigin(o)}>
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {/* Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6">
                    <AnimatePresence mode="popLayout">
                      {isLoading
                        ? Array.from({ length: 6 }).map((_, i) => (
                            <motion.div
                              key={`skeleton-${i}`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ delay: i * 0.05 }}
                            >
                              <ProductSkeleton />
                            </motion.div>
                          ))
                        : filtered.length > 0
                          ? filtered.map((product, i) => (
                              <CollectionProductCard
                                key={product.id}
                                product={product}
                                index={i}
                              />
                            ))
                          : <EmptyState />}
                    </AnimatePresence>
                  </div>

                  {/* Result count (mobile) */}
                  {!isLoading && filtered.length > 0 && (
                    <div className="lg:hidden mt-8 text-center">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        {filtered.length} produk ditampilkan
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {showMobileFilter && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-[4px]"
                  onClick={() => setShowMobileFilter(false)}
                />
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="fixed top-0 left-0 bottom-0 z-[70] w-[85%] max-w-xs bg-background overflow-y-auto"
                >
                  <div className="flex items-center justify-between p-6 border-b border-foreground/10">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={14} className="text-foreground" />
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                        Filter
                      </span>
                    </div>
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="p-6">
                    <FilterPanel
                      activeCategory={activeCategory}
                      setActiveCategory={(c) => {
                        setActiveCategory(c);
                      }}
                      activePriceRange={activePriceRange}
                      setActivePriceRange={(i) => {
                        setActivePriceRange(i);
                      }}
                      activeOrigins={activeOrigins}
                      toggleOrigin={toggleOrigin}
                      resetFilters={resetFilters}
                      activeFilterCount={activeFilterCount}
                    />
                  </div>
                  <div className="p-6 border-t border-foreground/10">
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="w-full py-3.5 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em]"
                    >
                      Tampilkan {filtered.length} Produk
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* CTA */}
          <section className="bg-foreground text-secondary rounded-[3rem] sm:rounded-6xl py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 mx-2 sm:mx-4 mb-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/50 mb-4 block"
              >
                Kemitraan
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary leading-[0.9] mb-5"
              >
                INGIN MENJUAL
                <br />
                PRODUK KAMI?
              </motion.h2>
              <p className="font-body text-sm sm:text-base text-secondary/70 max-w-md mx-auto mb-8 leading-relaxed">
                Bergabunglah dengan jaringan mitra kami dan hadirkan produk
                warisan Nusantara di toko Anda.
              </p>
              <Link
                to="/stockists"
                className="inline-block px-8 py-3 rounded-full bg-secondary text-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:text-cream transition-colors duration-300"
              >
                Lihat Stockist
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Collection;
