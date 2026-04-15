import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { label: "Shop", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Stockist", href: "/stockists" },
  { label: "Journal", href: "/journal" },
];

const Navbar = () => {
  const { openCart, totalItems } = useCart();
  const { dark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-3 md:py-4">
        <Link to="/" className="font-display text-lg md:text-xl text-foreground tracking-tight">
          — WARISAN
        </Link>

        <div className="hidden md:flex items-center gap-1 px-6 py-2 rounded-full backdrop-blur-[20px] bg-[hsla(0,0%,100%,0.1)] border border-[hsla(0,0%,100%,0.15)]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-moss transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-cream text-forest transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dark ? "moon" : "sun"}
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={openCart}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-cream text-forest"
          >
            <ShoppingBag size={14} className="sm:w-4 sm:h-4" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em]">Cart</span>
            <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-foreground text-background text-[8px] sm:text-[9px] font-bold">
              {totalItems}
            </span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-cream text-forest"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-14 left-4 right-4 z-50 rounded-3xl bg-cream p-6 flex flex-col gap-4 shadow-forest-lg md:hidden"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[11px] font-bold uppercase tracking-[0.3em] text-foreground hover:text-moss transition-colors py-2 border-b border-foreground/10 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
