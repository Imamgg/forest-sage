import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const ingredientsRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setRevealed(true), 200);
    return () => clearTimeout(t);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-4xl text-foreground mb-4">
            Product not found
          </h1>
          <Link
            to="/"
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground underline"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  // Build a small gallery from the product image + nearby products
  const galleryImages = [
    product.image,
    products[(products.indexOf(product) + 1) % products.length].image,
    products[(products.indexOf(product) + 2) % products.length].image,
  ];

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main className="pt-24 pb-0">
          {/* Back link */}
          <div className="px-6 md:px-10 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-moss transition-colors"
            >
              <ArrowLeft size={14} />
              Back to shop
            </Link>
          </div>

          {/* Product layout */}
          <div className="px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 max-w-7xl mx-auto">
            {/* Left: Image gallery */}
            <div
              className="flex flex-col gap-4"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(60px)",
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Main image */}
              <div className="aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-3xl sm:rounded-5xl shadow-forest">
                <img
                  src={galleryImages[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-2xl sm:rounded-4xl overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === i
                        ? "border-foreground scale-105"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product info */}
            <div
              className="flex flex-col justify-center py-4 lg:py-12"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(80px)",
                transition: "all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
              }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-3">
                {product.subtitle}
              </span>
              <h1
                className="font-display text-foreground leading-[0.9] mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 8vw, 6rem)",
                  letterSpacing: "-0.03em",
                }}
              >
                {product.name.toUpperCase()}
              </h1>
              <p className="font-body text-sm md:text-base text-foreground/80 leading-relaxed mb-8 max-w-md">
                {product.description}
              </p>

              {/* Details */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-10">
                {product.details.map((d) => (
                  <div key={d.label}>
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground block">
                      {d.label}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-foreground">
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price + Quantity + Add to cart */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <span className="font-display text-3xl text-foreground">
                  Rp {product.price}
                </span>

                {/* Quantity selector */}
                <div className="flex items-center gap-0 border border-foreground/20 rounded-full overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-[12px] font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={() => {
                    if (product) {
                      addItem(product, quantity);
                      setQuantity(1);
                    }
                  }}
                  className="px-8 py-4 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-transform duration-500 shadow-forest"
                >
                  Tambahkan Keranjang
                </button>
              </div>
            </div>
          </div>

          {/* Ingredients section */}
          <div
            ref={ingredientsRef}
            className="mt-14 sm:mt-20 md:mt-32 bg-accent rounded-t-[3rem] sm:rounded-t-6xl pt-14 sm:pt-20 md:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10"
          >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div className="scroll-reveal">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                  Apa yang ada didalam
                </span>
                <h2
                  className="font-display text-foreground leading-[0.85] mb-8"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  INGREDIENTS
                </h2>
                <p className="font-body text-sm text-foreground/70 leading-relaxed max-w-md">
                  Setiap produk kami dibuat dengan bahan-bahan alami pilihan,
                  dipetik dan diracik dengan penuh perhatian untuk memastikan
                  kualitas terbaik. Kami percaya bahwa keajaiban alam dapat
                  memberikan manfaat luar biasa, dan itulah yang kami hadirkan
                  dalam setiap racikan kami.
                </p>
              </div>
              <div className="scroll-reveal">
                <ul className="space-y-4">
                  {product.ingredients.map((ingredient, i) => (
                    <li
                      key={ingredient}
                      className="flex items-center gap-4 py-3 border-b border-foreground/10"
                    >
                      <span className="text-[10px] font-bold text-muted-foreground w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">
                        {ingredient}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ProductDetail;
