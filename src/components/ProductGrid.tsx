import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

const ProductGrid = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const { addItem } = useCart();

  return (
    <section
      ref={sectionRef}
      id="shop"
      className="relative bg-accent rounded-t-[3rem] sm:rounded-t-6xl pt-14 sm:pt-20 md:pt-32 pb-14 sm:pb-20 px-4 sm:px-6 md:px-10"
    >
      <div className="scroll-reveal flex flex-row items-start md:items-end justify-between mb-10 sm:mb-16 md:mb-24">
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
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="scroll-reveal group relative"
            style={{ transitionDelay: `${i * 0.08}s` }}
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

              {/* Gradient overlay - always visible */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />

              {/* Cart button - appears on hover */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-cream text-forest opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto shadow-forest"
              >
                <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
              </button>

              {/* Info - always visible, bottom of image */}
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
    </section>
  );
};

export default ProductGrid;
