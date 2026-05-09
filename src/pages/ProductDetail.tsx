import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Plus,
  Minus,
  X,
  ChevronLeft,
  ChevronRight,
  Check,
  ZoomIn,
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

/* ── Lightbox component ────────────────────────────────── */

const Lightbox = ({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="fixed inset-0 z-[80] bg-foreground/90 backdrop-blur-xl flex items-center justify-center"
    onClick={onClose}
  >
    {/* Close button */}
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 text-background flex items-center justify-center backdrop-blur-sm transition-colors"
      onClick={onClose}
    >
      <X size={18} />
    </motion.button>

    {/* Navigation arrows */}
    <button
      onClick={(e) => {
        e.stopPropagation();
        onPrev();
      }}
      className="absolute left-4 sm:left-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/10 hover:bg-background/20 text-background flex items-center justify-center backdrop-blur-sm transition-colors"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onNext();
      }}
      className="absolute right-4 sm:right-8 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-background/10 hover:bg-background/20 text-background flex items-center justify-center backdrop-blur-sm transition-colors"
    >
      <ChevronRight size={20} />
    </button>

    {/* Image */}
    <AnimatePresence mode="wait">
      <motion.img
        key={activeIndex}
        src={images[activeIndex]}
        alt=""
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </AnimatePresence>

    {/* Dots */}
    <div className="absolute bottom-6 flex gap-2">
      {images.map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            i === activeIndex ? "bg-background w-6" : "bg-background/40"
          }`}
        />
      ))}
    </div>
  </motion.div>
);

/* ── Ingredient Item ───────────────────────────────────── */

const IngredientItem = ({
  ingredient,
  index,
}: {
  ingredient: string;
  index: number;
}) => (
  <motion.li
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{
      delay: index * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    }}
    whileHover={{ x: 8, backgroundColor: "hsla(157, 97%, 14%, 0.03)" }}
    className="flex items-center gap-4 py-3.5 border-b border-foreground/10 rounded-lg px-2 -mx-2 cursor-default transition-colors"
  >
    <span className="text-[10px] font-bold text-muted-foreground w-6 tabular-nums">
      {String(index + 1).padStart(2, "0")}
    </span>
    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-foreground">
      {ingredient}
    </span>
  </motion.li>
);

/* ── Main Component ────────────────────────────────────── */

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImage(0);
    setQuantity(1);
    setAddedToCart(false);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl text-foreground mb-4">
            Product not found
          </h1>
          <Link
            to="/"
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground underline"
          >
            Back to shop
          </Link>
        </motion.div>
      </div>
    );
  }

  // Build a small gallery from the product image + nearby products
  const galleryImages = [
    product.image,
    products[(products.indexOf(product) + 1) % products.length].image,
    products[(products.indexOf(product) + 2) % products.length].image,
  ];

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    toast.success(`${product.name} ditambahkan`, {
      description: `${quantity}x — Rp ${product.price}`,
      icon: <Check size={16} />,
      duration: 2500,
    });
    setTimeout(() => {
      setQuantity(1);
      setAddedToCart(false);
    }, 1500);
  };

  const lightboxPrev = () =>
    setActiveImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  const lightboxNext = () =>
    setActiveImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <Lightbox
              images={galleryImages}
              activeIndex={activeImage}
              onClose={() => setLightboxOpen(false)}
              onPrev={lightboxPrev}
              onNext={lightboxNext}
            />
          )}
        </AnimatePresence>

        <main className="pt-24 pb-0">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 md:px-10 mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-moss transition-colors"
            >
              <ArrowLeft size={14} />
              Back to shop
            </Link>
          </motion.div>

          {/* Product layout */}
          <div
            ref={heroRef}
            className="px-4 sm:px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 max-w-7xl mx-auto"
          >
            {/* Left: Image gallery */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-4"
            >
              {/* Main image with zoom */}
              <div
                className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-3xl sm:rounded-5xl shadow-forest cursor-zoom-in group"
                onClick={() => setLightboxOpen(true)}
              >
                <motion.div
                  style={{ scale: imageScale }}
                  className="w-full h-full"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={galleryImages[activeImage]}
                      alt={product.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Zoom hint */}
                <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <ZoomIn size={14} className="text-foreground" />
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3">
                {galleryImages.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Right: Product info */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col justify-center py-4 lg:py-12"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-3"
              >
                {product.subtitle}
              </motion.span>
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
                {product.details.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground block">
                      {d.label}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.15em] text-foreground">
                      {d.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Price + Quantity + Add to cart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
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
                  <motion.span
                    key={quantity}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-10 text-center text-[12px] font-bold text-foreground"
                  >
                    {quantity}
                  </motion.span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] shadow-forest transition-colors duration-500 ${
                    addedToCart
                      ? "bg-green-700 text-white"
                      : "bg-foreground text-background hover:bg-foreground/90"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={14} />
                        Ditambahkan!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        Tambahkan Keranjang
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Ingredients section */}
          <div className="mt-14 sm:mt-20 md:mt-32 bg-accent rounded-t-[3rem] sm:rounded-t-6xl pt-14 sm:pt-20 md:pt-28 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
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
              </motion.div>
              <div>
                <ul className="space-y-1">
                  {product.ingredients.map((ingredient, i) => (
                    <IngredientItem
                      key={ingredient}
                      ingredient={ingredient}
                      index={i}
                    />
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
