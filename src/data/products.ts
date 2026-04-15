import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";

export interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  subtitle: string;
  description: string;
  ingredients: string[];
  details: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "jamu-kunyit-asam",
    name: "Jamu Kunyit Asam",
    price: "95.000",
    image: product1,
    subtitle: "Salep Wajah Organik",
    description:
      "Salep wajah yang menenangkan, dibuat dengan kunyit organik, asam jawa, dan minyak kelapa murni. Kaya akan antioksidan dan sifat anti-inflamasi, balm ini membantu meredakan kemerahan, meningkatkan kecerahan kulit, dan memberikan hidrasi ringan untuk semua jenis kulit.",
    ingredients: [
      "Ekstrak Kunyit Organik",
      "Asam Jawa",
      "Minyak Kelapa Murni",
      "Minyak Jojoba",
      "Minyak Biji Anggur",
      "Vitamin E",
    ],
    details: [
      { label: "Volume", value: "50ml" },
      { label: "Use", value: "Topical Skincare" },
      { label: "Origin", value: "Indonesia" },
    ],
  },
  {
    id: "kayu-manis",
    name: "Kayu Manis Bangkalan",
    price: "32.500",
    image: product2,
    subtitle: "Rempah Kayu Manis Asli",
    description:
      "Kayu manis asli dari Bangkalan, Madura. Dikenal dengan aroma hangat dan rasa manis yang khas, kayu manis ini dipanen secara tradisional dan dikeringkan dengan metode alami untuk menjaga kualitas dan keaslian rasa.",
    ingredients: ["Kayu Manis Bangkalan 100%"],
    details: [
      { label: "Volume", value: "100g" },
      { label: "Use", value: "Cooking / Baking" },
      { label: "Origin", value: "Bangkalan, Madura" },
    ],
  },
  {
    id: "kopi-rempah",
    name: "Kopi Rempah",
    price: "25.000",
    image: product3,
    subtitle: "Rempah Kopi Asli Madura",
    description:
      "Racikan kopi rempah khas Madura yang memadukan biji kopi pilihan dengan campuran rempah tradisional seperti kayu manis, cengkeh, dan kapulaga. Setiap tegukan menghadirkan kehangatan dan kompleksitas rasa yang menggugah selera.",
    ingredients: [
      "Biji Kopi Arabika",
      "Kayu Manis",
      "Cengkeh",
      "Kapulaga",
      "Gula Aren (opsional)",
    ],
    details: [
      { label: "Volume", value: "250g" },
      { label: "Use", value: "Brewed Coffee" },
      { label: "Origin", value: "Madura" },
    ],
  },
  {
    id: "madu-hutan",
    name: "Madu Hutan Organik",
    price: "45.000",
    image: product4,
    subtitle: "Madu Asli dari Hutan",
    description:
      "Madu hutan organik yang dipanen dari sarang lebah liar di hutan tropis. Kaya akan enzim alami, antioksidan, dan nutrisi, madu ini memiliki rasa yang kompleks dengan sentuhan floral dan herbal, ideal untuk pemanis alami atau sebagai tambahan dalam perawatan kulit.",
    ingredients: ["Madu Hutan Organik 100%"],
    details: [
      { label: "Volume", value: "250g" },
      { label: "Use", value: "Natural Sweetener / Skincare" },
      { label: "Origin", value: "Tropical Forests" },
    ],
  },
  {
    id: "rempah-blend-tea",
    name: "Rempah Blend Tea",
    price: "18.000",
    image: product5,
    subtitle: "Teh Herbal Rempah",
    description:
      "Teh herbal yang memadukan berbagai rempah pilihan seperti chamomile, lemon balm, elderflower, peppermint, rose petals, dan linden blossom. Setiap cangkir memberikan kehangatan dan ketenangan, ideal untuk relaksasi atau sebagai pendamping di sore hari.",
    ingredients: [
      "Chamomile",
      "Lemon Balm",
      "Elderflower",
      "Peppermint",
      "Rose Petals",
      "Linden Blossom",
    ],
    details: [
      { label: "Volume", value: "50g" },
      { label: "Use", value: "Herbal Tea" },
      { label: "Origin", value: "Global Blend" },
    ],
  },
  {
    id: "teh-herbal-pandan",
    name: "Teh Herbal Pandan",
    price: "15.000",
    image: product6,
    subtitle: "Teh Herbal Rempah Pandan",
    description:
      "Teh herbal yang memadukan daun pandan segar dengan campuran rempah tradisional seperti kayu manis, cengkeh, dan kapulaga. Setiap tegukan menghadirkan kehangatan dan aroma pandan yang khas, ideal untuk relaksasi atau sebagai pendamping di sore hari.",
    ingredients: [
      "Daun Pandan",
      "Kayu Manis",
      "Cengkeh",
      "Kapulaga",
      "Gula Aren (opsional)",
    ],
    details: [
      { label: "Volume", value: "200ml" },
      { label: "Use", value: "Herbal Tea" },
      { label: "Origin", value: "Indonesia" },
    ],
  },
];
