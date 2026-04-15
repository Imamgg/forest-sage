import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { articles } from "@/data/articles";
import { ArrowLeft } from "lucide-react";

const ArticleDetail = () => {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <PageTransition>
        <div className="relative min-h-screen flex items-center justify-center bg-background">
          <NoiseOverlay />
          <Navbar />
          <div className="text-center">
            <h1 className="font-display text-4xl text-foreground mb-4">ARTICLE NOT FOUND</h1>
            <Link
              to="/journal"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:text-moss transition-colors"
            >
              ← Back to Journal
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const currentIndex = articles.findIndex((a) => a.id === id);
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main>
          {/* Hero image */}
          <section className="relative min-h-[50vh] md:min-h-[70vh] flex items-end overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/40" />
            <div className="relative z-10 px-4 sm:px-6 md:px-10 pb-10 sm:pb-14 md:pb-20 max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70">
                  {article.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-cream/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70">
                  {article.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-cream/40" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cream/70">
                  {article.readTime}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl text-cream leading-[0.9] mb-3">
                {article.title.toUpperCase()}
              </h1>
              <p className="font-body text-sm sm:text-base text-cream/70">
                {article.subtitle}
              </p>
            </div>
          </section>

          {/* Back link */}
          <section className="bg-background px-4 sm:px-6 md:px-10 pt-8 sm:pt-10">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/journal"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={14} />
                Back to Journal
              </Link>
            </div>
          </section>

          {/* Article body */}
          <section className="bg-background px-4 sm:px-6 md:px-10 py-10 sm:py-14 md:py-20">
            <article className="max-w-3xl mx-auto space-y-6">
              {article.body.map((paragraph, i) => (
                <p
                  key={i}
                  className={`font-body text-base sm:text-lg text-foreground/80 leading-relaxed ${
                    i === 0 ? "text-lg sm:text-xl text-foreground font-medium" : ""
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </article>
          </section>

          {/* Next article */}
          {nextArticle && nextArticle.id !== article.id && (
            <section className="bg-secondary rounded-[3rem] sm:rounded-6xl py-14 sm:py-20 px-4 sm:px-6 md:px-10 mx-2 sm:mx-4 mb-4">
              <div className="max-w-4xl mx-auto">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-6 block">
                  Next Read
                </span>
                <Link to={`/journal/${nextArticle.id}`} className="group block">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                    <div className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
                      <img
                        src={nextArticle.image}
                        alt={nextArticle.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl sm:text-3xl text-foreground leading-[0.95] mb-3 group-hover:text-moss transition-colors duration-300">
                        {nextArticle.title.toUpperCase()}
                      </h2>
                      <p className="font-body text-sm text-foreground/60 leading-relaxed">
                        {nextArticle.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default ArticleDetail;
