import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin } from "lucide-react";

interface Stockist {
  name: string;
  address: string;
  city: string;
  type: string;
}

interface Region {
  region: string;
  stockists: Stockist[];
}

const regions: Region[] = [
  {
    region: "Jawa Timur",
    stockists: [
      {
        name: "Rempah Nusantara",
        address: "Jl. Kalimantan No. 18",
        city: "Surabaya",
        type: "Toko Herbal",
      },
      {
        name: "Apotek Jamu Sehat",
        address: "Jl. Basuki Rachmat No. 45",
        city: "Surabaya",
        type: "Apotek",
      },
      {
        name: "Dapur Rempah",
        address: "Jl. Pahlawan No. 7",
        city: "Malang",
        type: "Concept Store",
      },
      {
        name: "Warung Jamu Tradisional",
        address: "Jl. Gajah Mada No. 22",
        city: "Jember",
        type: "Toko Herbal",
      },
    ],
  },
  {
    region: "Madura",
    stockists: [
      {
        name: "Toko Rempah Bangkalan",
        address: "Jl. Trunojoyo No. 12",
        city: "Bangkalan",
        type: "Toko Herbal",
      },
      {
        name: "Pasar Tradisional Sampang",
        address: "Jl. Rajawali No. 5",
        city: "Sampang",
        type: "Pasar",
      },
      {
        name: "Apotek Sari Rempah",
        address: "Jl. Diponegoro No. 33",
        city: "Pamekasan",
        type: "Apotek",
      },
    ],
  },
  {
    region: "Jawa Tengah & Yogyakarta",
    stockists: [
      {
        name: "Giri Herbal",
        address: "Jl. Malioboro No. 91",
        city: "Yogyakarta",
        type: "Concept Store",
      },
      {
        name: "Warung Sehat Alami",
        address: "Jl. Pemuda No. 14",
        city: "Semarang",
        type: "Toko Herbal",
      },
      {
        name: "Jamu Solo Tradisional",
        address: "Jl. Slamet Riyadi No. 58",
        city: "Solo",
        type: "Apotek",
      },
    ],
  },
  {
    region: "Bali & Nusa Tenggara",
    stockists: [
      {
        name: "Bali Botanica",
        address: "Jl. Hanoman No. 9",
        city: "Ubud",
        type: "Concept Store",
      },
      {
        name: "Seminyak Herbal House",
        address: "Jl. Kayu Aya No. 4",
        city: "Seminyak",
        type: "Concept Store",
      },
      {
        name: "Alam Sari Store",
        address: "Jl. Raya Sanur No. 17",
        city: "Denpasar",
        type: "Toko Herbal",
      },
    ],
  },
  {
    region: "Jakarta & Jabodetabek",
    stockists: [
      {
        name: "Kebun Rempah",
        address: "Jl. Kemang Raya No. 66",
        city: "Jakarta Selatan",
        type: "Concept Store",
      },
      {
        name: "Herbal ID",
        address: "Jl. Senopati No. 38",
        city: "Jakarta Selatan",
        type: "Apotek",
      },
      {
        name: "Taman Jamu",
        address: "Jl. BSD Green Office Park",
        city: "Tangerang",
        type: "Toko Herbal",
      },
      {
        name: "Natura Botanica",
        address: "Jl. Margonda Raya No. 210",
        city: "Depok",
        type: "Toko Herbal",
      },
    ],
  },
  {
    region: "Kalimantan & Sulawesi",
    stockists: [
      {
        name: "Borneo Herbal",
        address: "Jl. Ahmad Yani No. 88",
        city: "Banjarmasin",
        type: "Toko Herbal",
      },
      {
        name: "Rempah Makassar",
        address: "Jl. Penghibur No. 15",
        city: "Makassar",
        type: "Apotek",
      },
    ],
  },
];

const typeColors: Record<string, string> = {
  "Concept Store": "bg-accent text-accent-foreground",
  Apotek: "bg-secondary text-secondary-foreground",
  "Toko Herbal": "bg-muted text-muted-foreground",
  Pasar: "bg-foreground/10 text-foreground",
};

const Stockists = () => {
  const gridRef = useScrollReveal<HTMLDivElement>();

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
                  Temukan Kami
                </span>
                <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9]">
                  STOKIS
                  <br />
                  KAMI
                </h1>
              </div>
              <p className="font-body text-sm sm:text-base text-foreground/70 leading-relaxed">
                Produk Forest Sage tersedia di toko-toko herbal, apotek, dan
                concept store pilihan di seluruh Indonesia. Setiap mitra dipilih
                karena komitmen mereka terhadap kualitas, keaslian bahan, dan
                kecintaan terhadap kekayaan alam Nusantara.
              </p>
            </div>
          </section>

          {/* Regions */}
          <section className="bg-background px-4 sm:px-6 md:px-10 pb-16 sm:pb-24 md:pb-32">
            <div
              ref={gridRef}
              className="max-w-6xl mx-auto space-y-16 md:space-y-24"
            >
              {regions.map((region) => (
                <div key={region.region} className="scroll-reveal">
                  <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-none">
                      {region.region.toUpperCase()}
                    </h2>
                    <div className="flex-1 h-px bg-foreground/10" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {region.stockists.length}{" "}
                      {region.stockists.length === 1 ? "lokasi" : "lokasi"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {region.stockists.map((stockist) => (
                      <div
                        key={stockist.name}
                        className="group rounded-2xl sm:rounded-3xl border border-foreground/8 p-5 sm:p-6 hover:border-foreground/20 hover:shadow-forest transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-display text-base sm:text-lg text-foreground leading-tight">
                            {stockist.name.toUpperCase()}
                          </h3>
                          <span
                            className={`shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full ${
                              typeColors[stockist.type] ||
                              "bg-muted text-muted-foreground"
                            }`}
                          >
                            {stockist.type}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-foreground/50">
                          <MapPin size={14} className="shrink-0 mt-0.5" />
                          <p className="font-body text-sm leading-snug">
                            {stockist.address}
                            <br />
                            {stockist.city}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Become a stockist CTA */}
          <section className="bg-foreground text-cream rounded-[3rem] sm:rounded-6xl py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10 mx-2 sm:mx-4 mb-4">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cream/40 mb-4 block">
                Kemitraan
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-cream leading-[0.9] mb-5">
                JUAL PRODUK
                <br />
                KAMI DI TOKOMU
              </h2>
              <p className="font-body text-sm sm:text-base text-cream/50 max-w-md mx-auto mb-8 leading-relaxed">
                Kami terbuka bermitra dengan toko dan apotek yang berbagi nilai
                yang sama. Minimum order kecil, margin kompetitif, dan kami
                menyediakan dukungan brand secara penuh.
              </p>
              <a
                href="mailto:kemitraan@forest-sage.id"
                className="inline-block px-8 py-3 rounded-full bg-cream text-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sage transition-colors duration-300"
              >
                Hubungi Kami
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Stockists;
