import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import storyHero from "@/assets/story-hero.jpg";
import storyHarvest from "@/assets/story-harvest.jpg";
import storyWorkshop from "@/assets/story-workshop.jpg";
import { Leaf, Droplets, Sun } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Langsung dari Alam",
    description:
      "Setiap bahan kami panen langsung dari kebun dan hutan Nusantara - kunyit dari Jawa, kayu manis dari Madura, hingga pandan liar dari pesisir.",
  },
  {
    icon: Droplets,
    title: "Dibuat dalam Jumlah Kecil",
    description:
      "Kami memproduksi dalam jumlah terbatas untuk menjaga kualitas dan kesegaran. Setiap produk diracik dengan tangan menggunakan metode tradisional.",
  },
  {
    icon: Sun,
    title: "Tanpa Kompromi",
    description:
      "Tanpa pengawet buatan, tanpa pewarna sintetis, tanpa jalan pintas. Hanya formula rempah murni yang menghormati kearifan leluhur Nusantara.",
  },
];

const timeline = [
  {
    year: "2019",
    event:
      "Lahir dari dapur kecil di Madura - tiga racikan jamu sebagai titik awal.",
  },
  {
    year: "2020",
    event: "Bermitra langsung dengan petani rempah lokal di Jawa dan Madura.",
  },
  {
    year: "2021",
    event:
      "Membuka workshop pertama untuk meracik dan mengemas produk secara tradisional.",
  },
  {
    year: "2023",
    event: "Hadir di 20+ toko dan apotek herbal di seluruh Indonesia.",
  },
  {
    year: "2025",
    event:
      "Meluncurkan lini kemasan ramah lingkungan dari bahan daur ulang lokal.",
  },
];

const Story = () => {
  const valuesRef = useScrollReveal<HTMLDivElement>();
  const timelineRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Hero */}
          <section className="relative min-h-[70vh] md:min-h-screen flex items-end overflow-hidden">
            <img
              src={storyHero}
              alt="Terra botanical ingredients flatlay"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
            <div className="relative z-10 px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 md:pb-24 max-w-4xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-cream/70 mb-4 block">
                Cerita Kami
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-cream leading-[0.9] mb-6">
                BERAKAR
                <br />
                DARI BUMI
              </h1>
              <p className="font-body text-sm sm:text-base text-cream/80 max-w-lg leading-relaxed">
                Forest Sage lahir dari keyakinan sederhana - bahwa kekuatan
                sejati ada dalam rempah bumi Nusantara, bukan di balik label
                pabrik.
              </p>
            </div>
          </section>

          {/* Origin story */}
          <section className="bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
              <div className="order-2 md:order-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                  Awal Mula
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[0.9] mb-6">
                  DARI TANAH
                  <br />
                  KE TANGAN
                </h2>
                <p className="font-body text-sm text-foreground/80 leading-relaxed mb-4">
                  Di sebuah dapur sederhana di Bangkalan, Madura, pendiri kami
                  mulai meracik jamu dan rempah menggunakan resep turun-temurun.
                  Apa yang bermula sebagai praktik pribadi perlahan menjadi misi
                  - melestarikan kekayaan tanaman herbal Nusantara.
                </p>
                <p className="font-body text-sm text-foreground/80 leading-relaxed">
                  Hingga kini, setiap produk Forest Sage masih dibuat dengan
                  tangan di workshop kami, menggunakan metode tradisional yang
                  sama. Kami bermitra langsung dengan petani rempah lokal di
                  Jawa dan Madura, memastikan praktik pertanian yang adil dan
                  berkelanjutan.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src={storyHarvest}
                  alt="Panen rempah segar di ladang Madura"
                  className="w-full rounded-[2rem] sm:rounded-[3rem] aspect-[4/5] object-cover"
                />
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="bg-secondary rounded-[3rem] sm:rounded-6xl py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
            <div ref={valuesRef} className="max-w-6xl mx-auto">
              <div className="text-center mb-14 md:mb-20 scroll-reveal">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                  Yang Kami Pegang
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[0.9]">
                  NILAI KAMI
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="scroll-reveal text-center md:text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto md:mx-0 mb-5">
                      <value.icon size={20} className="text-foreground" />
                    </div>
                    <h3 className="font-display text-lg md:text-xl text-foreground mb-3">
                      {value.title.toUpperCase()}
                    </h3>
                    <p className="font-body text-sm text-foreground/70 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Workshop image + timeline */}
          <section className="bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start">
              <div>
                <img
                  src={storyWorkshop}
                  alt="Workshop peracikan produk herbal tradisional"
                  className="w-full rounded-[2rem] sm:rounded-[3rem] aspect-square object-cover sticky top-24"
                />
              </div>
              <div ref={timelineRef}>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block scroll-reveal">
                  Perjalanan Kami
                </span>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[0.9] mb-10 scroll-reveal">
                  JEJAK WAKTU
                </h2>
                <div className="space-y-8">
                  {timeline.map((item) => (
                    <div
                      key={item.year}
                      className="scroll-reveal flex gap-6 items-start border-b border-foreground/10 pb-6 last:border-0"
                    >
                      <span className="font-display text-2xl md:text-3xl text-foreground shrink-0 w-16">
                        {item.year}
                      </span>
                      <p className="font-body text-sm text-foreground/70 leading-relaxed pt-2">
                        {item.event}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            ref={ctaRef}
            className="bg-foreground text-cream rounded-[3rem] sm:rounded-6xl py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 mx-2 sm:mx-4 mb-4"
          >
            <div className="max-w-3xl mx-auto text-center scroll-reveal">
              <h2 className="font-display text-3xl sm:tex t-4xl md:text-6xl text-secondary leading-[0.9] mb-6">
                RASAKAN
                <br />
                NUSANTARA
              </h2>
              <p className="font-body text-sm sm:text-base text-secondary/60 max-w-md mx-auto mb-8 leading-relaxed">
                Jelajahi koleksi rempah dan jamu kami - setiap produk adalah
                penghormatan terhadap kekayaan alam dan kearifan leluhur
                Nusantara.
              </p>
              <a
                href="/#shop"
                className="inline-block px-8 py-3 rounded-full bg-secondary text-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:text-cream transition-colors duration-300"
              >
                Lihat Koleksi
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Story;
