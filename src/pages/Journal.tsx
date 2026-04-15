import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { articles } from "@/data/articles";
import { ArrowRight } from "lucide-react";

const Journal = () => {
  const gridRef = useScrollReveal<HTMLDivElement>();
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Header */}
          <section className="pt-28 sm:pt-32 md:pt-40 pb-10 sm:pb-14 px-4 sm:px-6 md:px-10 bg-background">
            <div className="max-w-6xl mx-auto">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                Jurnal
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9]">
                CERITA DARI
                <br />
                BUMI NUSANTARA
              </h1>
            </div>
          </section>

          {/* Featured article */}
          <section className="px-4 sm:px-6 md:px-10 pb-12 sm:pb-16 md:pb-24 bg-background">
            <Link
              to={`/journal/${featured.id}`}
              className="group block max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                <div className="overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {featured.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                      {featured.date}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-foreground leading-[0.95] mb-3 group-hover:text-moss transition-colors duration-300">
                    {featured.title.toUpperCase()}
                  </h2>
                  <p className="font-body text-sm text-foreground/60 mb-2">
                    {featured.subtitle}
                  </p>
                  <p className="font-body text-sm text-foreground/70 leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground group-hover:text-moss transition-colors duration-300">
                    Baca Artikel
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </div>
            </Link>
          </section>

          {/* Article grid */}
          <section className="bg-secondary rounded-[3rem] sm:rounded-6xl py-14 sm:py-20 md:py-28 px-4 sm:px-6 md:px-10">
            <div ref={gridRef} className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {rest.map((article) => (
                  <Link
                    key={article.id}
                    to={`/journal/${article.id}`}
                    className="group scroll-reveal"
                  >
                    <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] mb-5">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        {article.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground leading-[0.95] mb-2 group-hover:text-moss transition-colors duration-300">
                      {article.title.toUpperCase()}
                    </h3>
                    <p className="font-body text-sm text-foreground/60 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Journal;
