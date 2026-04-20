const productsData = [
  {
    "id": "OUT001",
    "name": "White Minimalist Hoodie",
    "category": "Casual",
    "price": 300000,
    "rating": 4.8,
    "reviews": 124,
    "items": [
      { "type": "atasan", "name": "Premium White Hoodie" },
      { "type": "bawahan", "name": "White Sweatpants" },
      { "type": "sepatu", "name": "White Sneakers" }
    ],
    "image": "assets/images/products/produk 1.jpg",
    "description": "Setelan hoodie putih premium yang nyaman dan stylish."
  },
  {
    "id": "OUT002",
    "name": "Oversize Sweatshirt",
    "category": "Casual",
    "price": 250000,
    "rating": 4.5,
    "reviews": 89,
    "items": [
      { "type": "atasan", "name": "White Oversize Sweatshirt" },
      { "type": "bawahan", "name": "Loose Pants" }
    ],
    "image": "assets/images/products/produk 2.jpg",
    "description": "Tampil santai dengan sweatshirt oversize putih."
  },
  {
    "id": "OUT003",
    "name": "Streetwear Sporty",
    "category": "Streetwear",
    "price": 350000,
    "rating": 4.9,
    "reviews": 210,
    "items": [
      { "type": "atasan", "name": "White Graphic T-Shirt" },
      { "type": "bawahan", "name": "Grey Sweatpants" },
      { "type": "sepatu", "name": "Chunky Sneakers" }
    ],
    "image": "assets/images/products/produk 3.jpg",
    "description": "Gaya sporty casual yang cocok untuk hangout."
  },
  {
    "id": "OUT004",
    "name": "Gamis Lebaran Set",
    "category": "Formal",
    "price": 450000,
    "rating": 4.7,
    "reviews": 156,
    "items": [
      { "type": "atasan", "name": "Gamis Panjang Elegan" },
      { "type": "aksesoris", "name": "Hijab Senada" },
      { "type": "aksesoris", "name": "Handbag" }
    ],
    "image": "assets/images/products/produk 4.jpg",
    "description": "Set gamis anggun warna pastel untuk acara formal atau lebaran."
  },
  {
    "id": "OUT005",
    "name": "Gamis Syar'i Earth Tone",
    "category": "Formal",
    "price": 420000,
    "rating": 4.6,
    "reviews": 112,
    "items": [
      { "type": "atasan", "name": "Gamis Coklat Susu" },
      { "type": "aksesoris", "name": "Hijab Syar'i" }
    ],
    "image": "assets/images/products/produk 5.jpg",
    "description": "Tampil syar'i dengan warna earth tone yang tenang."
  },
  {
    "id": "OUT006",
    "name": "Gamis Rose Elegance",
    "category": "Formal",
    "price": 480000,
    "rating": 5.0,
    "reviews": 342,
    "items": [
      { "type": "atasan", "name": "Gamis Pink Rose Premium" },
      { "type": "aksesoris", "name": "Khimar Senada" }
    ],
    "image": "assets/images/products/produk 6.jpg",
    "description": "Dress anggun dengan sentuhan warna rose yang mempesona."
  },
  {
    "id": "OUT007",
    "name": "Gamis Khaki Minimalist",
    "category": "Formal",
    "price": 380000,
    "rating": 4.8,
    "reviews": 145,
    "items": [
      { "type": "atasan", "name": "Gamis Khaki Polos" },
      { "type": "aksesoris", "name": "Hijab Pashmina" }
    ],
    "image": "assets/images/products/produk 7.jpg",
    "description": "Gamis polos warna khaki yang simpel dan menawan."
  },
  {
    "id": "OUT008",
    "name": "Gamis Black Premium",
    "category": "Formal",
    "price": 410000,
    "rating": 4.9,
    "reviews": 230,
    "items": [
      { "type": "atasan", "name": "Gamis Hitam Jetblack" },
      { "type": "aksesoris", "name": "Niqab & Khimar" }
    ],
    "image": "assets/images/products/produk 8.jpg",
    "description": "Gamis jetblack premium untuk tampilan syar'i maksimal."
  },
  {
    "id": "OUT009",
    "name": "Gamis Terracotta Set",
    "category": "Formal",
    "price": 430000,
    "rating": 4.7,
    "reviews": 178,
    "items": [
      { "type": "atasan", "name": "Gamis Terracotta" },
      { "type": "aksesoris", "name": "Khimar Panjang" }
    ],
    "image": "assets/images/products/produk 9.jpg",
    "description": "Set gamis warna terracotta yang hangat dan nyaman."
  },
  {
    "id": "OUT010",
    "name": "Green Sage Casual Set",
    "category": "Casual",
    "price": 360000,
    "rating": 4.8,
    "reviews": 190,
    "items": [
      { "type": "atasan", "name": "Jaket Green Sage" },
      { "type": "atasan", "name": "Kaos Putih" },
      { "type": "bawahan", "name": "Celana Chino Cream" }
    ],
    "image": "assets/images/products/produk 10.jpg",
    "description": "Paduan warna sage green dan cream yang sangat kekinian."
  },
  {
    "id": "OUT011",
    "name": "Olive Essential Outfit",
    "category": "Casual",
    "price": 340000,
    "rating": 4.6,
    "reviews": 105,
    "items": [
      { "type": "atasan", "name": "Kemeja Outer Olive" },
      { "type": "bawahan", "name": "Celana Ankle Pants" }
    ],
    "image": "assets/images/products/produk 11.jpg",
    "description": "Outfit warna olive esensial untuk kegiatan sehari-hari."
  },
  {
    "id": "OUT012",
    "name": "Green Plaid Streetwear",
    "category": "Streetwear",
    "price": 280000,
    "rating": 4.5,
    "reviews": 92,
    "items": [
      { "type": "atasan", "name": "Kemeja Flanel Hijau" },
      { "type": "bawahan", "name": "Celana Hitam Loose" },
      { "type": "sepatu", "name": "Sneakers Putih" }
    ],
    "image": "assets/images/products/produk 12.jpg",
    "description": "Gaya jalanan dengan kemeja flanel kotak-kotak."
  },
  {
    "id": "OUT013",
    "name": "Brown Vintage Casual",
    "category": "Casual",
    "price": 390000,
    "rating": 4.7,
    "reviews": 134,
    "items": [
      { "type": "atasan", "name": "Jaket Beige" },
      { "type": "atasan", "name": "Kaos Coklat Tua" },
      { "type": "bawahan", "name": "Celana Korduroi" }
    ],
    "image": "assets/images/products/produk 13.jpg",
    "description": "Tampilan kasual bernuansa vintage dengan dominasi warna coklat."
  },
  {
    "id": "OUT014",
    "name": "Earth Explorer Set",
    "category": "Casual",
    "price": 450000,
    "rating": 4.8,
    "reviews": 215,
    "items": [
      { "type": "atasan", "name": "Kemeja Hijau Army" },
      { "type": "bawahan", "name": "Celana Khaki" },
      { "type": "aksesoris", "name": "Backpack Canvas" }
    ],
    "image": "assets/images/products/produk 14.jpg",
    "description": "Setelan lengkap dengan backpack, siap untuk berpetualang."
  },
  {
    "id": "OUT015",
    "name": "Navy Smart Casual",
    "category": "Formal",
    "price": 520000,
    "rating": 4.9,
    "reviews": 310,
    "items": [
      { "type": "atasan", "name": "Blazer Navy Blue" },
      { "type": "atasan", "name": "Kemeja Putih" },
      { "type": "bawahan", "name": "Jeans Biru Pudar" }
    ],
    "image": "assets/images/products/produk 15.jpg",
    "description": "Perpaduan blazer formal dan celana jeans untuk gaya smart casual."
  }
];
