import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";

const Index = () => {
  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />
        <main>
          <HeroSection />
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
