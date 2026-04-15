import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const footerLinks1 = ["Koleksi", "Kisah Kami", "Stockist", "Proses", "Kontak"];
const footerLinks2 = ["Privasi", "Ketentuan", "Cookie"];

const Footer = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className="bg-foreground text-secondary rounded-t-[3rem] sm:rounded-t-6xl pt-14 sm:pt-20 md:pt-32 pb-8 sm:pb-10 px-4 sm:px-6 md:px-10"
    >
      <div className="scroll-reveal grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 max-w-7xl mx-auto">
        {/* Newsletter - left */}
        <div className="md:col-span-6">
          <h3
            className="font-display text-3xl md:text-5xl text-secondary mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            DAPATKAN KISAH ARTISAN KAMI
          </h3>
          <p className="font-body text-sm text-secondary/70 mb-8 max-w-md">
            Daftarkan diri Anda untuk mendapatkan penawaran eksklusif dan cerita
            di balik setiap racikan warisan kami.
          </p>
          <div className="flex items-center gap-3 sm:gap-4 border-b border-secondary/30 pb-2 max-w-md">
            <input
              type="email"
              placeholder="ALAMAT EMAIL ANDA"
              className="flex-1 bg-transparent font-body font-bold text-[10px] sm:text-[11px] uppercase tracking-editorial-wide text-secondary placeholder:text-secondary/30 focus:outline-none min-w-0"
            />
            <button className="text-secondary hover:text-cream transition-colors duration-300 flex-shrink-0">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Links - right */}
        <div className="md:col-span-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/50 mb-6 block">
            Shop
          </span>
          <ul className="space-y-3">
            {footerLinks1.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-cream transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/50 mb-6 block">
            Informasi
          </span>
          <ul className="space-y-3">
            {footerLinks2.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary hover:text-cream transition-colors duration-300"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="scroll-reveal mt-20 pt-6 border-t border-secondary/10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.2em] text-secondary/30">
          © 2026 WARISAN. Seluruh hak cipta dilindungi.
        </span>
        <div className="flex gap-6 mt-4 md:mt-0">
          {["Privacy", "Terms", "Cookies"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[10px] uppercase tracking-[0.2em] text-secondary/30 hover:text-secondary/60 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
