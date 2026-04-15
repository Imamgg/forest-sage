import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import Index from "./pages/Index";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import ArticleDetail from "./pages/ArticleDetail";
import ProductDetail from "./pages/ProductDetail";
import Stockists from "./pages/Stockists";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/story" element={<Story />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:id" element={<ArticleDetail />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/stockists" element={<Stockists />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartProvider>
          <CartDrawer />
          <AnimatedRoutes />
        </CartProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
