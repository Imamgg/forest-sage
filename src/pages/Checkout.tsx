import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Truck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import NoiseOverlay from "@/components/NoiseOverlay";
import PageTransition from "@/components/PageTransition";
import { useCart } from "@/context/CartContext";

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = totalPrice >= 200000 ? 0 : 15000;
  const grandTotal = totalPrice + shippingCost;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  // Order success state
  if (orderPlaced) {
    return (
      <PageTransition>
        <div className="relative">
          <NoiseOverlay />
          <Navbar />
          <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center py-32">
              <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={32} className="text-foreground" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-[0.9] mb-4">
                PESANAN
                <br />
                DITERIMA
              </h1>
              <p className="font-body text-sm text-foreground/60 mb-3 leading-relaxed">
                Terima kasih atas pesanan Anda! Kami akan segera memproses dan
                mengirimkan produk warisan Nusantara ke alamat Anda.
              </p>
              <p className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
                Konfirmasi akan dikirim ke email Anda
              </p>
              <Link
                to="/"
                className="inline-block px-8 py-3 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-500 shadow-forest"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }

  // Empty cart redirect
  if (items.length === 0 && !orderPlaced) {
    return (
      <PageTransition>
        <div className="relative">
          <NoiseOverlay />
          <Navbar />
          <main className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="max-w-md mx-auto text-center py-32">
              <h1 className="font-display text-3xl sm:text-4xl text-foreground leading-[0.9] mb-4">
                KERANJANG
                <br />
                KOSONG
              </h1>
              <p className="font-body text-sm text-foreground/60 mb-8 leading-relaxed">
                Anda belum menambahkan produk ke keranjang.
              </p>
              <Link
                to="/koleksi"
                className="inline-block px-8 py-3 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] hover:scale-105 transition-transform duration-500 shadow-forest"
              >
                Lihat Koleksi
              </Link>
            </div>
          </main>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="relative">
        <NoiseOverlay />
        <Navbar />

        <main className="bg-background min-h-screen">
          {/* Header */}
          <section className="pt-28 sm:pt-32 md:pt-40 pb-8 sm:pb-10 px-4 sm:px-6 md:px-10">
            <div className="max-w-5xl mx-auto">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft size={14} />
                Kembali
              </button>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
                Checkout
              </span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-[0.9]">
                SELESAIKAN
                <br />
                PESANAN
              </h1>
            </div>
          </section>

          {/* Content */}
          <section className="px-4 sm:px-6 md:px-10 pb-16 sm:pb-24 md:pb-32">
            <form
              onSubmit={handleSubmit}
              className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              {/* Left: Form */}
              <div className="lg:col-span-7 space-y-10">
                {/* Contact */}
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
                    Informasi Kontak
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
                          placeholder="email@contoh.com"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                          No. Telepon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div>
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
                    Alamat Pengiriman
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                        Alamat Lengkap *
                      </label>
                      <textarea
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                        placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                          Kota *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
                          placeholder="Surabaya"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                          Provinsi *
                        </label>
                        <select
                          name="province"
                          value={form.province}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground focus:outline-none focus:border-foreground/40 transition-colors"
                        >
                          <option value="">Pilih</option>
                          <option value="Jawa Timur">Jawa Timur</option>
                          <option value="Jawa Tengah">Jawa Tengah</option>
                          <option value="Jawa Barat">Jawa Barat</option>
                          <option value="DKI Jakarta">DKI Jakarta</option>
                          <option value="Bali">Bali</option>
                          <option value="Yogyakarta">Yogyakarta</option>
                          <option value="Kalimantan Selatan">
                            Kalimantan Selatan
                          </option>
                          <option value="Sulawesi Selatan">
                            Sulawesi Selatan
                          </option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                          Kode Pos *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={form.postalCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors"
                          placeholder="60xxx"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60 mb-2">
                        Catatan (Opsional)
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={2}
                        className="w-full px-4 py-3 rounded-2xl border border-border/30 bg-transparent font-body text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40 transition-colors resize-none"
                        placeholder="Instruksi khusus untuk pengiriman"
                      />
                    </div>
                  </div>
                </div>

                {/* Perks */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Pembayaran Aman",
                      desc: "Transaksi terenkripsi",
                    },
                    {
                      icon: Truck,
                      title: "Gratis Ongkir",
                      desc: "Pesanan ≥ Rp 200.000",
                    },
                    {
                      icon: Clock,
                      title: "Pengiriman Cepat",
                      desc: "Estimasi 2–5 hari",
                    },
                  ].map((perk) => (
                    <div
                      key={perk.title}
                      className="flex items-start gap-3 p-4 rounded-2xl border border-border/20"
                    >
                      <perk.icon
                        size={16}
                        className="text-muted-foreground shrink-0 mt-0.5"
                      />
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground">
                          {perk.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {perk.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-5">
                <div className="sticky top-28 rounded-3xl border border-border/20 p-6 sm:p-8">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
                    Ringkasan Pesanan
                  </h2>

                  {/* Items */}
                  <div className="space-y-5 mb-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="w-16 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-0.5">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground block leading-tight">
                              {item.product.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              Qty: {item.quantity}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-foreground">
                            Rp{" "}
                            {(
                              parseInt(
                                item.product.price.replace(/\./g, ""),
                                10,
                              ) * item.quantity
                            ).toLocaleString("id-ID")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="border-t border-border/20 pt-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60">
                        Subtotal ({totalItems} item)
                      </span>
                      <span className="text-[11px] font-bold text-foreground">
                        Rp {totalPrice.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/60">
                        Ongkos Kirim
                      </span>
                      <span className="text-[11px] font-bold text-foreground">
                        {shippingCost === 0
                          ? "Gratis"
                          : `Rp ${shippingCost.toLocaleString("id-ID")}`}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-[9px] text-muted-foreground">
                        Gratis ongkir untuk pesanan ≥ Rp 200.000
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border/20 mt-4 pt-5">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
                        Total
                      </span>
                      <span className="font-display text-2xl text-foreground">
                        Rp {grandTotal.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform duration-500 shadow-forest disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Memproses..." : "Buat Pesanan"}
                    </button>

                    <p className="text-[9px] text-center text-muted-foreground mt-4 leading-relaxed">
                      Dengan menekan tombol di atas, Anda menyetujui syarat dan
                      ketentuan yang berlaku.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </PageTransition>
  );
};

export default Checkout;
