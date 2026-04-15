import journal1 from "@/assets/journal-1.jpg";
import journal2 from "@/assets/journal-2.jpg";
import journal3 from "@/assets/journal-3.jpg";
import journal4 from "@/assets/journal-4.jpg";
import journal5 from "@/assets/journal-5.jpg";

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
}

export const articles: Article[] = [
  {
    id: "seni-meracik-jamu",
    title: "Seni Meracik Jamu",
    subtitle:
      "Mengapa racikan sederhana turun-temurun jauh lebih kuat dari produk modern",
    category: "Ritual",
    date: "Feb 2026",
    readTime: "5 menit baca",
    image: journal1,
    excerpt:
      "Di tengah banjir suplemen dan skincare modern, kami percaya bahwa racikan jamu yang paling menyentuh adalah yang paling sederhana.",
    body: [
      "Ada revolusi diam-diam yang terjadi di dapur-dapur Indonesia. Orang mulai meninggalkan kapsul dan tablet, kembali ke cobek dan kunyit, ke asam jawa dan daun pandan.",
      "Di Forest Sage, kami selalu percaya bahwa meracik jamu adalah momen ketenangan, bukan lini produksi. Formula kami dirancang untuk memberikan lebih banyak dengan lebih sedikit bahan: satu racikan yang menenangkan, menyehatkan, dan menguatkan.",
      "Filosofinya sederhana: ketika kamu menyingkirkan kebisingan, kamu tinggalkan apa yang benar-benar bekerja. Minyak kelapa yang telah digunakan selama berabad-abad. Ekstrak kunyit yang berbicara dengan tubuhmu dalam bahasa yang sudah ia pahami.",
      "Ritual jamu bukan tentang tidak melakukan apa-apa — ini tentang kesengajaan. Tentang menggerus rempah dengan tangan, merasakan aroma kayu manis, dan mengetahui persis dari ladang mana ia berasal.",
      "Ini adalah perawatan tubuh sebagai meditasi. Sebagai koneksi. Sebagai pengingat harian bahwa hal terbaik dalam hidup ditanam, bukan dipabrikasi.",
    ],
  },
  {
    id: "di-balik-workshop-kami",
    title: "Di Balik Workshop Kami",
    subtitle:
      "Sekilas proses di balik layar bagaimana produk Forest Sage dibuat",
    category: "Di Balik Layar",
    date: "Jan 2026",
    readTime: "7 menit baca",
    image: journal2,
    excerpt:
      "Dari racikan jamu hingga minyak rempah, setiap produk Forest Sage bermula dari meja kayu tua di sebuah dapur di Bangkalan, Madura.",
    body: [
      "Workshop kami berada di tepi kampung kecil di Bangkalan, dikelilingi ladang rempah dan tembok batu yang telah berdiri selama satu abad. Di sinilah, di sebuah bangunan tua bergorden bambu, setiap produk Forest Sage dibuat dengan tangan.",
      "Hari dimulai pagi-pagi sekali. Pukul 5 subuh, kunyit segar sudah diparut, mengisi udara dengan aroma khas yang hangat. Tim kecil kami — lima orang — masing-masing punya stasiun kerja sendiri, peralatan mereka sudah licin karena bertahun-tahun dipakai.",
      "Jamu dibuat menggunakan metode tradisional. Rempah digiling halus, dicampur dengan air asam jawa segar, lalu didiamkan semalaman agar sari-sarinya keluar secara alami.",
      "Minyak rempah kami diekstrak dalam jumlah kecil, tidak lebih dari lima puluh botol sekali proses. Ini bukan soal efisiensi — ini disengaja. Batch kecil berarti kami bisa menguji setiap botol untuk memastikan aroma, tekstur, dan khasiatnya tepat.",
      "Tidak ada mesin konveyor di sini. Tidak ada lini otomatis. Hanya tangan terampil, bahan berqualitas, dan kesabaran untuk melakukan segalanya dengan benar.",
    ],
  },
  {
    id: "musim-panen-rempah",
    title: "Musim Panen Rempah",
    subtitle:
      "Mengikuti siklus tanam Nusantara yang membentuk setiap produk kami",
    category: "Sumber Bahan",
    date: "Des 2025",
    readTime: "6 menit baca",
    image: journal3,
    excerpt:
      "Rempah dalam produk Forest Sage mengikuti ritme yang sudah berlangsung ribuan tahun — siklus tanam dan panen Nusantara.",
    body: [
      "Musim hujan tiba di Madura dengan derasan air yang membasahi ladang kunyit dan lengkuas. Tanah merah kering berubah subur, dan tunas-tunas baru mulai menyembul dari permukaan.",
      "Menjelang akhir musim hujan, ladang jahe sudah siap dipanen. Petani mitra kami di Jawa memanen di pagi hari, saat kandungan minyak atsiri berada di puncaknya. Rimpang dibersihkan dan dijemur di bawah sinar matahari selama tiga hari.",
      "Musim kemarau adalah waktu kayu manis. Kulit pohon dikupas dengan hati-hati, digulung menjadi stik, lalu dikeringkan di tempat teduh — proses ini menjaga aroma hangat khasnya tetap utuh.",
      "Akhir tahun adalah waktu cengkeh dan kapulaga. Cengkeh dipetik satu per satu sebelum bunga mekar sepenuhnya, karena di situlah kandungan eugenol paling tinggi.",
      "Musim istirahat adalah waktu untuk mempersiapkan tanah musim berikutnya. Karena bahan baku yang luar biasa dimulai dari tanah yang sehat dan dirawat dengan kasih sayang.",
    ],
  },
  {
    id: "warisan-jamu-nusantara",
    title: "Warisan Jamu Nusantara",
    subtitle:
      "Bagaimana kearifan herbal leluhur membentuk produk rempah modern",
    category: "Warisan",
    date: "Nov 2025",
    readTime: "8 menit baca",
    image: journal4,
    excerpt:
      "Jauh sebelum industri kesehatan modern ada, para dukun dan tabib sudah meracik obat dari tanaman di sekitar mereka.",
    body: [
      "Masuk ke pasar tradisional mana pun di Jawa dan kamu akan menemukan hal yang sama: botol-botol kaca berisi akar dan rimpang, ikat-ikat daun kering, dan penjual jamu yang hafal khasiat setiap tanaman di meja mereka.",
      "Tradisi jamu membentang ribuan tahun ke belakang — dari tabib kerajaan Majapahit, pembuat boreh di Bali, hingga nenek-nenek di kampung yang tahu persis daun apa yang meredakan demam.",
      "Yang menjadi benang merah dari semua tradisi ini adalah penghormatan terhadap tanaman. Bukan sebagai komoditas, tapi sebagai obat hidup dengan kecerdasannya sendiri. Kunyit untuk anti-inflamasi. Jahe untuk pencernaan. Kayu manis untuk sirkulasi darah.",
      "Di Forest Sage, kami mempelajari tradisi ini bukan sebagai keingintahuan, tapi sebagai cetak biru. Racikan Jamu Kunyit Asam kami didasarkan pada formula yang ditemukan dalam catatan pengobatan kerajaan abad ke-15. Minyak Kopi Rempah kami mengacu pada metode Madura yang belum berubah selama berabad-abad.",
      "Kami tidak mengklaim menemukan sesuatu yang baru. Kami hanya meneruskan percakapan antara tanaman dan manusia yang sudah berlangsung selama ribuan tahun.",
    ],
  },
  {
    id: "membangun-ritual-harian",
    title: "Membangun Ritual Harian",
    subtitle:
      "Panduan menciptakan rutinitas perawatan tubuh berbasis rempah yang sederhana",
    category: "Panduan",
    date: "Okt 2025",
    readTime: "4 menit baca",
    image: journal5,
    excerpt:
      "Kamu tidak butuh selusin produk untuk merawat tubuh. Begini cara membangun ritual yang sesederhana tapi seefektif mungkin.",
    body: [
      "Rutinitas perawatan terbaik adalah yang benar-benar kamu lakukan. Bukan ritual dua belas langkah yang kamu lihat di media sosial, tapi dua atau tiga momen perawatan yang terasa senatural bernapas.",
      "Pagi hari: Mulailah dengan air hangat. Basuh wajah, keringkan, lalu selagi kulit masih sedikit lembap, hangatkan sedikit Jamu Kunyit Asam di telapak tangan. Usapkan ke kulit — jangan digosok. Biarkan meresap.",
      "Jika tubuh terasa pegal di siang hari, setetes Minyak Kopi Rempah di pergelangan tangan akan sekaligus melembapkan dan menyegarkan. Kayu manis dan cengkeh bekerja dua arah: menenangkan otot sekaligus membangkitkan energi.",
      "Malam hari: Madu Hutan Organik dicampur air hangat adalah minuman penutup hari yang sempurna. Antioksidannya bekerja saat kamu beristirahat, membantu pemulihan dari dalam.",
      "Hanya itu. Tiga produk. Lima menit, dua kali sehari. Rahasianya bukan pada jumlah langkah — tapi pada kualitas bahan dan niat yang kamu bawa ke setiap momen.",
    ],
  },
];
