import { Link } from "react-router-dom";
import { ShoppingBag, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const categories = ["Semua", "Rempah", "Minuman", "Perawatan"];

const categoryMap: Record<string, string[]> = {
  Semua: products.map((p) => p.id),
  Rempah: ["kayu-manis"],
  Minuman: ["kopi-rempah", "rempah-blend-tea", "teh-herbal-pandan"],
  Perawatan: ["jamu-kunyit-asam", "madu-hutan"],
};

const Collection = () => {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => categoryMap[activeCategory]?.includes(p.id));

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Header */}
          <section className="pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 bg-background">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-end">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                  Koleksi Lengkap
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9]">
                  SELURUH
                  <br />
                  KOLEKSI
                </h1>
              </div>
              <p className="font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
                Jelajahi seluruh rangkaian produk warisan kami — dari rempah
                pilihan, racikan herbal tradisional, hingga perawatan alami yang
                terinspirasi kearifan Nusantara.
              </p>
            </div>
          </section>

          {/* Filter & Grid */}
          <section className="bg-background px-4 sm:px-6 md:px-10 pb-16 sm:pb-24 md:pb-32">
            <div className="max-w-6xl mx-auto">
              {/* Filter bar */}
              <div className="flex flex-wrap items-center gap-3 mb-10 sm:mb-14 md:mb-20">
                <SlidersHorizontal
                  size={14}
                  className="text-muted-foreground mr-1"
                />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                      activeCategory === cat
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-foreground border-foreground/15 hover:border-foreground/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
                <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  {filtered.length} produk
                </span>
              </div>

              {/* Product grid */}
              <div
                ref={gridRef}
                className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6"
              >
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="scroll-reveal group relative"
                    style={{ transitionDelay: `${i * 0.06}s` }}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="block relative overflow-hidden rounded-2xl sm:rounded-3xl"
                    >
                      {/* Image */}
                      <div className="aspect-[3/4]">
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
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addItem(product);
                        }}
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-background text-foreground opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto shadow-forest"
                      >
                        <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
                      </button>

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
                  </div>
                ))}
              </div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Tidak ada produk dalam kategori ini
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-foreground text-secondary rounded-[3rem] sm:rounded-6xl py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 mx-2 sm:mx-4 mb-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/50 mb-4 block">
                Kemitraan
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-secondary leading-[0.9] mb-5">
                INGIN MENJUAL
                <br />
                PRODUK KAMI?
              </h2>
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
