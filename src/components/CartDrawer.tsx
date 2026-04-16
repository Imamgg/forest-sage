import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalItems,
    totalPrice,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-[4px]"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full sm:max-w-md bg-background flex flex-col shadow-forest-lg"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} className="text-foreground" />
                <span className="font-body font-bold text-[11px] uppercase tracking-editorial-wide text-foreground">
                  cart ({totalItems})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={40} className="text-foreground/20" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Keranjang Anda kosong
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground underline"
                  >
                    Lanjutkan belanja
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -30,
                          height: 0,
                          marginBottom: 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="flex gap-4"
                      >
                        {/* Image */}
                        <Link
                          to={`/product/${item.product.id}`}
                          onClick={closeCart}
                          className="w-20 h-24 rounded-3xl overflow-hidden flex-shrink-0"
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between py-1">
                          <div>
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={closeCart}
                              className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground block"
                            >
                              {item.product.name}
                            </Link>
                            <span className="text-[10px] text-muted-foreground mt-0.5 block">
                              {item.product.subtitle}
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center border border-border/30 rounded-full overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity - 1,
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="w-6 text-center text-[10px] font-bold text-foreground">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.product.id,
                                    item.quantity + 1,
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <span className="text-[11px] font-bold text-foreground">
                              {item.product.price}
                            </span>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="self-start mt-1 w-6 h-6 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors text-foreground/40 hover:text-foreground"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6 border-t border-border/20">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                    Total ({totalItems} item)
                  </span>
                  <span className="font-display text-2xl text-foreground">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <button className="w-full py-4 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform duration-500 shadow-forest">
                  Checkout
                </button>
                <button
                  onClick={closeCart}
                  className="w-full mt-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground transition-colors text-center"
                >
                  Lanjutkan belanja
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
