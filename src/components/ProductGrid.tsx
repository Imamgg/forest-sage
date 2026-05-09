import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const cardVariants = {
  hidden: { opacity: 0, y: 80, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const headingVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProductCard = ({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) => {
  const { addItem } = useCart();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax: image moves slower than the card
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

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
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group relative"
    >
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden rounded-2xl sm:rounded-3xl"
      >
        {/* Parallax Image */}
        <div className="aspect-[3/4] overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
            style={{ y: imageY, scale: 1.15 }}
            loading="lazy"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />

        {/* Cart button - appears on hover */}
        <motion.button
          onClick={handleAddToCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream text-forest opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto shadow-forest z-10"
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

const ProductGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative bg-accent rounded-t-[3rem] sm:rounded-t-6xl pt-14 sm:pt-20 md:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10"
    >
      <motion.div
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-row items-start md:items-end justify-between mb-10 sm:mb-16 md:mb-24"
      >
        <h2
          className="font-display text-foreground leading-[0.85]"
          style={{
            fontSize: "clamp(2.5rem, 15vw, 15vw)",
            letterSpacing: "-0.03em",
          }}
        >
          KOLEKSI
        </h2>
        <Link
          to="/koleksi"
          className="mt-4 md:mt-0 flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-foreground text-background hover:scale-105 transition-transform duration-500 cursor-pointer shadow-forest"
        >
          <ArrowRight size={20} className="sm:w-7 sm:h-7" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
