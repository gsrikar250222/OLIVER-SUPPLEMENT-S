/**
 * REPVAULT Product Catalog & Store State
 * 80 Original high-fashion athletic products across 10 categories
 * All with realistic INR pricing, stock tracking, and multi-angle galleries
 */

export const CATEGORIES = [
  {
    "id": "oversized",
    "name": "Men's Oversized Tees",
    "slug": "oversized",
    "description": "Drop-shoulder heavyweight streetwear engineered for maximum silhouette drape and breathable gym comfort.",
    "banner": "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
    "itemCount": 8
  },
  {
    "id": "compression",
    "name": "Compression Wear",
    "slug": "compression",
    "description": "Second-skin ergonomic compression panels delivering maximum vascular support and thermal regulation.",
    "banner": "assets/categories/compression/repvault-compression-short-black.jpg",
    "itemCount": 8
  },
  {
    "id": "t-shirts",
    "name": "Gym T-Shirts & Polos",
    "slug": "t-shirts",
    "description": "Athletic tapered crewnecks and anti-curl performance pique polos for elite everyday training.",
    "banner": "assets/categories/t-shirts/Category_Banners_TSHIRT__jpgd40f.jpg",
    "itemCount": 8
  },
  {
    "id": "stringers",
    "name": "Tanks & Stringers",
    "slug": "stringers",
    "description": "Deep cut Y-back and racerback stringers precision-cut to accentuate upper-body physique during workouts.",
    "banner": "assets/categories/stringers/Category_Banners_STRINGERS__jpgd40f.jpg",
    "itemCount": 8
  },
  {
    "id": "shorts",
    "name": "Training Shorts",
    "slug": "shorts",
    "description": "2-in-1 compression inner liner shorts with laser-cut ventilation and zippered phone pockets.",
    "banner": "assets/categories/shorts/Category_Banners_SHORTS__jpg_4c2913df-c57c-4ef3-8d45-4290e386e79af553.jpg",
    "itemCount": 8
  },
  {
    "id": "joggers",
    "name": "Joggers & Track Pants",
    "slug": "joggers",
    "description": "Hybrid slim-taper joggers, raw-washed straight tracks, and utility carpenter pants.",
    "banner": "assets/categories/joggers/Category_Banners_JOGGERS__jpgb5f9.jpg",
    "itemCount": 8
  },
  {
    "id": "training",
    "name": "Performance & Ironclad",
    "slug": "training",
    "description": "High-durability gym wear built to resist barbell friction, heavy loads, and relentless sweat sessions.",
    "banner": "assets/categories/training/Frame_275_jpg6974.jpg",
    "itemCount": 8
  },
  {
    "id": "hoodies",
    "name": "Hoodies & Jackets",
    "slug": "hoodies",
    "description": "French terry zip-up aesthetic hoodies, thermal fleece pullovers, and pump-cover warmup jackets.",
    "banner": "assets/featured/zipup-main.jpg",
    "itemCount": 8
  },
  {
    "id": "womens",
    "name": "Women's Activewear",
    "slug": "womens",
    "description": "High-impact support sports bras, 4-way sculpting high-rise leggings, and breathable crop zip jackets.",
    "banner": "assets/categories/womens/repvault-womens-banner-3bc0d.jpg",
    "itemCount": 8
  },
  {
    "id": "accessories",
    "name": "Gear & Accessories",
    "slug": "accessories",
    "description": "High-density Cordura gym backpacks, moisture-wicking snapback caps, and training duffels.",
    "banner": "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg",
    "itemCount": 8
  }
];

export const PRODUCTS = [
  {
    "id": "rv-ov-01",
    "name": "Vault 260 GSM Heavyweight Oversized Tee — Onyx Black",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2299,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 388,
    "primaryImage": "assets/categories/oversized/repvault-oversized-tee-black.jpg",
    "hoverImage": "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
    "gallery": [
      "assets/categories/oversized/repvault-oversized-tee-black.jpg",
      "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
      "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
      "assets/categories/oversized/oversized-back-1.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#111111"
      },
      {
        "name": "Charcoal Grey",
        "hex": "#2f3136"
      },
      {
        "name": "Off White",
        "hex": "#f0ede6"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Crafted from custom 260 GSM combed compact cotton for a structured boxy silhouette that never clings. Features double-needle neck ribbing and a drop-shoulder cut engineered specifically for athletic physiques.",
    "fabric": "100% Combed Compact Cotton (260 GSM)",
    "features": [
      "Structured Boxy Cut",
      "Pre-Shrunk Bio-Washed",
      "Dense 2x2 Rib Collar",
      "Signature Hem Vault Tag"
    ],
    "tags": [
      "oversized",
      "tee",
      "heavyweight",
      "streetwear",
      "black"
    ]
  },
  {
    "id": "rv-ov-02",
    "name": "Repvault Heritage Acid Washed Oversized Tee — Charcoal",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1499,
    "originalPrice": 2499,
    "badge": "NEW DROP",
    "rating": 4.8,
    "reviewCount": 164,
    "primaryImage": "assets/categories/oversized/repvault_oversized_short_sleeve_tee_black_1794114485298.jpg",
    "hoverImage": "assets/categories/oversized/repvault_oversized_tee_black_lookbook_1794114508050.jpg",
    "gallery": [
      "assets/categories/oversized/repvault_oversized_short_sleeve_tee_black_1794114485298.jpg",
      "assets/categories/oversized/repvault_oversized_tee_black_lookbook_1794114508050.jpg",
      "assets/categories/oversized/oversized-back-2.jpg",
      "assets/categories/oversized/repvault-oversized-tee-detail.jpg"
    ],
    "colors": [
      {
        "name": "Charcoal Mineral",
        "hex": "#2b2b2e"
      },
      {
        "name": "Vintage Olive",
        "hex": "#4b5320"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 17,
    "description": "Individually garment-dyed and mineral acid washed for an authentic lived-in patina. Premium heavy French terry jersey with zero shrinkage.",
    "fabric": "100% Vintage Washed Cotton (240 GSM)",
    "features": [
      "Individually Mineral Washed",
      "Drop Shoulder Aesthetic",
      "Zero Shrinkage Guaranteed",
      "Relaxed Fit"
    ],
    "tags": [
      "oversized",
      "acid wash",
      "charcoal",
      "gym tee"
    ]
  },
  {
    "id": "rv-ov-03",
    "name": "Vault OG Minimalist Oversized Tee — Olive Green",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "POPULAR",
    "rating": 4.7,
    "reviewCount": 215,
    "primaryImage": "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg287f.jpg",
    "hoverImage": "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg63e8.jpg",
    "gallery": [
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg287f.jpg",
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg63e8.jpg",
      "assets/categories/oversized/oversized-back-3.jpg"
    ],
    "colors": [
      {
        "name": "Military Olive",
        "hex": "#485338"
      },
      {
        "name": "Matte Black",
        "hex": "#161618"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 29,
    "description": "Minimalist chest typography and subtle high-density rubberized vault crest at the nape. Relaxed silhouette cut with widened arm openings.",
    "fabric": "95% Cotton, 5% Elastane",
    "features": [
      "Soft Peachskin Finish",
      "Subtle High-Density Logo",
      "Extra Wide Arm Sleeves",
      "Reinforced Seams"
    ],
    "tags": [
      "oversized",
      "olive",
      "minimalist"
    ]
  },
  {
    "id": "rv-ov-04",
    "name": "Vault Division Back-Print Oversized Graphic Tee — Bone White",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2199,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 92,
    "primaryImage": "assets/categories/oversized/oversized-back-1.jpg",
    "hoverImage": "assets/categories/oversized/oversized-back-4.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-1.jpg",
      "assets/categories/oversized/oversized-back-4.jpg",
      "assets/categories/oversized/repvault-oversized-tee-black.jpg"
    ],
    "colors": [
      {
        "name": "Bone White",
        "hex": "#f3ede3"
      },
      {
        "name": "Washed Black",
        "hex": "#222224"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 8,
    "description": "Large technical blueprint graphic across the shoulder blades celebrating Repvault's engineering heritage. Screen-printed with breathable discharge inks.",
    "fabric": "100% Organic Carded Cotton (250 GSM)",
    "features": [
      "Breathable Discharge Screen Print",
      "Relaxed Boxy Fit",
      "Silicone Softener Wash"
    ],
    "tags": [
      "oversized",
      "graphic tee",
      "white",
      "limited"
    ]
  },
  {
    "id": "rv-ov-05",
    "name": "Vault Raw Cut Drop-Shoulder Oversized Tee — Stealth Black",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1249,
    "originalPrice": 1899,
    "badge": "TRENDING",
    "rating": 4.8,
    "reviewCount": 141,
    "primaryImage": "assets/categories/oversized/repvault_oversized_tee_black_1794114464693.jpg",
    "hoverImage": "assets/categories/oversized/repvault_oversized_tee_black_lookbook.jpg",
    "gallery": [
      "assets/categories/oversized/repvault_oversized_tee_black_1794114464693.jpg",
      "assets/categories/oversized/repvault_oversized_tee_black_lookbook.jpg",
      "assets/categories/oversized/oversized-back-2.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#0f0f11"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "Engineered with subtle drop sleeves and laser-bonded hems for a contemporary raw aesthetic. Ultra-comfortable for upper-body lifting days.",
    "fabric": "96% Combed Cotton, 4% Lycra",
    "features": [
      "Laser Cut Seams",
      "Drop Shoulder",
      "Anti-Pilling Coating"
    ],
    "tags": [
      "oversized",
      "stealth",
      "black"
    ]
  },
  {
    "id": "rv-ov-06",
    "name": "Vault Monochrome Technical Heavy Tee — Fog Grey",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1349,
    "originalPrice": 2099,
    "badge": "NEW",
    "rating": 4.7,
    "reviewCount": 78,
    "primaryImage": "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
    "hoverImage": "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
    "gallery": [
      "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
      "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
      "assets/categories/oversized/oversized-back-3.jpg"
    ],
    "colors": [
      {
        "name": "Fog Grey",
        "hex": "#7a7d84"
      },
      {
        "name": "Onyx Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 14,
    "description": "Neutral grey palette inspired by brutalist architecture. Constructed for breathability and shape retention even after 50+ wash cycles.",
    "fabric": "100% Premium Compact Cotton (240 GSM)",
    "features": [
      "Colorfast Reactive Dyes",
      "Boxy Fit",
      "Subtle Shoulder Darting"
    ],
    "tags": [
      "oversized",
      "fog grey",
      "minimal"
    ]
  },
  {
    "id": "rv-ov-07",
    "name": "Vault Circuit Oversized Pump Cover — Midnight Navy",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1449,
    "originalPrice": 2399,
    "badge": "SALE 40% OFF",
    "rating": 4.8,
    "reviewCount": 190,
    "primaryImage": "assets/categories/oversized/oversized-back-3.jpg",
    "hoverImage": "assets/categories/oversized/oversized-back-1.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-3.jpg",
      "assets/categories/oversized/oversized-back-1.jpg",
      "assets/categories/oversized/repvault-oversized-tee-black.jpg"
    ],
    "colors": [
      {
        "name": "Midnight Navy",
        "hex": "#0c1829"
      },
      {
        "name": "Charcoal",
        "hex": "#22252a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 12,
    "description": "The quintessential pump cover. Ample room across chest and lats to keep muscles warm before working sets, drape-tested for ideal proportion.",
    "fabric": "100% Heavy Jersey Cotton (260 GSM)",
    "features": [
      "True Heavyweight Feel",
      "Reinforced Taped Collar",
      "Side Split Hem"
    ],
    "tags": [
      "pump cover",
      "oversized",
      "navy"
    ]
  },
  {
    "id": "rv-ov-08",
    "name": "Repvault Essential Boxy Tee — Sandstone",
    "category": "oversized",
    "categoryName": "Men's Oversized Tees",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1899,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 312,
    "primaryImage": "assets/categories/oversized/oversized-back-4.jpg",
    "hoverImage": "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-4.jpg",
      "assets/categories/oversized/repvault-oversized-tee-detail.jpg",
      "assets/categories/oversized/repvault-oversized-tee-black.jpg"
    ],
    "colors": [
      {
        "name": "Sandstone",
        "hex": "#d8cbb8"
      },
      {
        "name": "Pure Black",
        "hex": "#000000"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 25,
    "description": "Versatile neutral tone with ultra-clean finishes. Pairs seamlessly with Repvault slim cargo joggers or 2-in-1 laser shorts.",
    "fabric": "100% Cotton French Terry",
    "features": [
      "Breathable Weave",
      "Drop Armhole",
      "Tonal Branding"
    ],
    "tags": [
      "sandstone",
      "oversized",
      "essential"
    ]
  },
  {
    "id": "rv-cp-01",
    "name": "Vault Pro Compression Short Sleeve — Stealth Black",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1999,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 412,
    "primaryImage": "assets/categories/compression/repvault-compression-short-black.jpg",
    "hoverImage": "assets/categories/compression/repvault-compression-tshirt-black-10334a.png",
    "gallery": [
      "assets/categories/compression/repvault-compression-short-black.jpg",
      "assets/categories/compression/repvault-compression-tshirt-black-10334a.png",
      "assets/categories/compression/repvault-compression-tshirt-black-10403c.png"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#111113"
      },
      {
        "name": "Optic White",
        "hex": "#fcfcfc"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 34,
    "description": "Targeted graduated compression to increase venous return and reduce muscle oscillation during explosive movements. Flatlock seams eliminate chafing.",
    "fabric": "84% Nylon, 16% Spandex (220 GSM)",
    "features": [
      "Graduated Compression",
      "Sweat-Wicking Anti-Odor",
      "Chafe-Free Flatlock Seams",
      "UV 50+ Protection"
    ],
    "tags": [
      "compression",
      "short sleeve",
      "black",
      "rashguard"
    ]
  },
  {
    "id": "rv-cp-02",
    "name": "Vault Aero Compression Long Sleeve Rashguard — Charcoal",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1499,
    "originalPrice": 2499,
    "badge": "TOP RATED",
    "rating": 5,
    "reviewCount": 279,
    "primaryImage": "assets/categories/compression/repvault-compression-long-black.jpg",
    "hoverImage": "assets/categories/oversized/repvault_compression_long_sleeve_charcoal_1794114634190.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-long-black.jpg",
      "assets/categories/oversized/repvault_compression_long_sleeve_charcoal_1794114634190.jpg",
      "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png"
    ],
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#2e3036"
      },
      {
        "name": "Midnight Black",
        "hex": "#0c0d0e"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 18,
    "description": "High-density thermal compression engineered for weightlifting and combat training. Ergonomic arm panels provide full rotational freedom.",
    "fabric": "82% Polyamide, 18% Elastane",
    "features": [
      "4-Way Omnistretch",
      "Raglan Sleeve Construction",
      "Sublimated Durable Logo"
    ],
    "tags": [
      "long sleeve",
      "compression",
      "charcoal",
      "gym"
    ]
  },
  {
    "id": "rv-cp-03",
    "name": "Vault Pro Compression Full-Sleeve — Optic White",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1499,
    "originalPrice": 2399,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 154,
    "primaryImage": "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
    "hoverImage": "assets/categories/compression/repvault-compression-tshirt-white-100af8.png",
    "gallery": [
      "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
      "assets/categories/compression/repvault-compression-tshirt-white-100af8.png",
      "assets/categories/compression/repvault-compression-short-black.jpg"
    ],
    "colors": [
      {
        "name": "Optic White",
        "hex": "#ffffff"
      },
      {
        "name": "Stealth Black",
        "hex": "#121212"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 15,
    "description": "Crisp white performance compression designed with moisture-channeling microstructure. Reflective logo detailing at forearm and upper spine.",
    "fabric": "85% Technical Polyester, 15% Spandex",
    "features": [
      "Quick-Dry Mesh Zones",
      "Reflective Spine Accents",
      "Compression Grip Waist"
    ],
    "tags": [
      "white",
      "compression",
      "full sleeve"
    ]
  },
  {
    "id": "rv-cp-04",
    "name": "Repvault Muscle-Fit Baselayer Top — Onyx",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1099,
    "originalPrice": 1799,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 201,
    "primaryImage": "assets/categories/oversized/repvault_compression_short_sleeve_black_1794114621617.jpg",
    "hoverImage": "assets/categories/compression/repvault-compression-tshirt-black-10403c.png",
    "gallery": [
      "assets/categories/oversized/repvault_compression_short_sleeve_black_1794114621617.jpg",
      "assets/categories/compression/repvault-compression-tshirt-black-10403c.png",
      "assets/categories/compression/repvault-compression-short-black.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#151517"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 27,
    "description": "Form-fitting baselayer that keeps your core temperature primed. Designed with targeted rib compression around the obliques.",
    "fabric": "88% Nylon Microfiber, 12% Spandex",
    "features": [
      "Core Stabilization",
      "Second-Skin Feel",
      "Underarm Laser Vents"
    ],
    "tags": [
      "baselayer",
      "compression",
      "muscle fit"
    ]
  },
  {
    "id": "rv-cp-05",
    "name": "Vault Hybrid Armored Compression LS — Black/Carbon",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1599,
    "originalPrice": 2699,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 88,
    "primaryImage": "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png",
    "hoverImage": "assets/categories/compression/repvault-compression-long-black.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png",
      "assets/categories/compression/repvault-compression-long-black.jpg"
    ],
    "colors": [
      {
        "name": "Carbon Black",
        "hex": "#1e1e20"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 9,
    "description": "Reinforced elbow and forearm panels protect against turf burns, knurling abrasions, and mat contact.",
    "fabric": "80% Micro-Nylon, 20% Elastane",
    "features": [
      "Abrasion-Resistant Forearm Panels",
      "High Compression Index",
      "Anti-Bacterial Silver Finish"
    ],
    "tags": [
      "armored",
      "compression",
      "heavy duty"
    ]
  },
  {
    "id": "rv-cp-06",
    "name": "Vault Active T-Compression Shirt — Arctic White",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1149,
    "originalPrice": 1899,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 65,
    "primaryImage": "assets/categories/compression/repvault-compression-tshirt-white-100af8.png",
    "hoverImage": "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
    "gallery": [
      "assets/categories/compression/repvault-compression-tshirt-white-100af8.png",
      "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png"
    ],
    "colors": [
      {
        "name": "Arctic White",
        "hex": "#f8f9fa"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 21,
    "description": "Lightweight short-sleeve compression optimized for warm training conditions and cardio conditioning.",
    "fabric": "86% Poly-Spandex Blend",
    "features": [
      "Cooling Tech Yarn",
      "Reinforced Collar",
      "Full Elastic Recovery"
    ],
    "tags": [
      "white compression",
      "active",
      "cardio"
    ]
  },
  {
    "id": "rv-cp-07",
    "name": "Vault Kinetic Shadow Compression Tee — Dark Heather",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1249,
    "originalPrice": 1999,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 130,
    "primaryImage": "assets/categories/compression/repvault-compression-tshirt-black-10403c.png",
    "hoverImage": "assets/categories/compression/repvault-compression-short-black.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-tshirt-black-10403c.png",
      "assets/categories/compression/repvault-compression-short-black.jpg"
    ],
    "colors": [
      {
        "name": "Dark Heather",
        "hex": "#32363e"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 16,
    "description": "Ergonomic seams follow muscle contours from chest through deltoids, highlighting athletic development.",
    "fabric": "85% Polyamide, 15% Elastane",
    "features": [
      "Anatomical Seam Mapping",
      "Sweat Repellent",
      "High Durability"
    ],
    "tags": [
      "kinetic",
      "compression",
      "heather"
    ]
  },
  {
    "id": "rv-cp-08",
    "name": "Vault Velocity Compression Top — Matte Black",
    "category": "compression",
    "categoryName": "Compression Wear",
    "gender": "men",
    "price": 1299,
    "originalPrice": 2099,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 182,
    "primaryImage": "assets/categories/compression/repvault-compression-tshirt-black-10334a.png",
    "hoverImage": "assets/categories/compression/repvault-compression-short-black.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-tshirt-black-10334a.png",
      "assets/categories/compression/repvault-compression-short-black.jpg"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#17181c"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 30,
    "description": "Ultra-sleek profile featuring silicone hem gripper tape that stops the shirt from riding up during squats or sprints.",
    "fabric": "83% Nylon, 17% Spandex",
    "features": [
      "Anti-Ride Silicone Waistband",
      "UPF 50+ Sun Protection",
      "Quick Dry"
    ],
    "tags": [
      "velocity",
      "black",
      "compression"
    ]
  },
  {
    "id": "rv-ts-01",
    "name": "Vault Pro Athletic Polo — Stealth Black",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1499,
    "originalPrice": 2299,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 342,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
    "hoverImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#141416"
      },
      {
        "name": "Navy Blue",
        "hex": "#0c1b33"
      },
      {
        "name": "Chalk White",
        "hex": "#f5f5f7"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 26,
    "description": "Engineered for athletes transitioning from high-intensity training to smart lifestyle wear. Crafted with high-stretch pique fabric featuring anti-odor silver ion technology and a reinforced collar that never curls.",
    "fabric": "92% Performance Cotton, 8% Spandex (240 GSM)",
    "features": [
      "Anti-Curl Reinforced Collar",
      "Moisture-Wicking Fast Dry",
      "Athletic Tapered Fit",
      "4-Way Mechanical Stretch"
    ],
    "tags": [
      "polo",
      "collared",
      "black",
      "smart gym"
    ]
  },
  {
    "id": "rv-ts-02",
    "name": "Vault Classic Crewneck Gym T-Shirt — Jet Black",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 999,
    "originalPrice": 1599,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 521,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
    "hoverImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#121214"
      },
      {
        "name": "Charcoal",
        "hex": "#32343a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 40,
    "description": "The gold standard everyday training tee. Features a fitted chest and biceps with a relaxed taper through the waist.",
    "fabric": "95% Combed Cotton, 5% Elastane (210 GSM)",
    "features": [
      "Tapered Athletic Cut",
      "Pre-Shrunk Enzyme Wash",
      "No-Roll Rib Collar"
    ],
    "tags": [
      "crewneck",
      "essential",
      "t-shirt",
      "black"
    ]
  },
  {
    "id": "rv-ts-03",
    "name": "Vault Aero Vent Performance Tee — Carbon Grey",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1899,
    "badge": "NEW DROP",
    "rating": 4.8,
    "reviewCount": 94,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
    "hoverImage": "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg"
    ],
    "colors": [
      {
        "name": "Carbon Grey",
        "hex": "#2a2c31"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "Micro-perforated back panel vents excess heat during intense intervals. Ultra-lightweight dry-touch fabric that never sticks.",
    "fabric": "90% Recycled Poly, 10% Elastane",
    "features": [
      "Micro-Perforated Back",
      "Reflective Logo Accents",
      "Anti-Chafe Seams"
    ],
    "tags": [
      "aero",
      "performance",
      "grey"
    ]
  },
  {
    "id": "rv-ts-04",
    "name": "Vault Luxe Supima Cotton Tee — Deep Navy",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1299,
    "originalPrice": 2099,
    "badge": "PREMIUM",
    "rating": 4.9,
    "reviewCount": 147,
    "primaryImage": "assets/categories/mens/MH0108518aef.jpg",
    "hoverImage": "assets/categories/mens/1407b.jpg",
    "gallery": [
      "assets/categories/mens/MH0108518aef.jpg",
      "assets/categories/mens/1407b.jpg"
    ],
    "colors": [
      {
        "name": "Deep Navy",
        "hex": "#0e1a2b"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 13,
    "description": "Crafted from long-staple Supima cotton for unmatched softness and long-lasting color saturation.",
    "fabric": "100% Supima Cotton (200 GSM)",
    "features": [
      "Extra-Long Staple Fibers",
      "Silky Hand Feel",
      "Tailored Cut"
    ],
    "tags": [
      "supima",
      "navy",
      "luxury"
    ]
  },
  {
    "id": "rv-ts-05",
    "name": "Vault Tactical Raglan Training Tee — Olive/Black",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1149,
    "originalPrice": 1799,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 118,
    "primaryImage": "assets/categories/mens/1407b.jpg",
    "hoverImage": "assets/categories/mens/Mens_Launch_Key_Highlight_22-10-26_jpg5ff9.jpg",
    "gallery": [
      "assets/categories/mens/1407b.jpg",
      "assets/categories/mens/Mens_Launch_Key_Highlight_22-10-26_jpg5ff9.jpg"
    ],
    "colors": [
      {
        "name": "Tactical Olive",
        "hex": "#3e4832"
      },
      {
        "name": "Stealth Black",
        "hex": "#141416"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Raglan shoulder cut removes the top seam so backpacks and barbell bars sit comfortably with zero pressure points.",
    "fabric": "94% Cotton, 6% Spandex",
    "features": [
      "Seamless Shoulders",
      "Side Slit Mobility",
      "Durable Screen Print"
    ],
    "tags": [
      "raglan",
      "olive",
      "tactical"
    ]
  },
  {
    "id": "rv-ts-06",
    "name": "Vault Apex Seamless Knit T-Shirt — Obsidian",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2199,
    "badge": "TOP RATED",
    "rating": 4.9,
    "reviewCount": 165,
    "primaryImage": "assets/categories/mens/Mens_Launch_Key_Highlight_22-10-26_jpg5ff9.jpg",
    "hoverImage": "assets/categories/mens/MH0108518aef.jpg",
    "gallery": [
      "assets/categories/mens/Mens_Launch_Key_Highlight_22-10-26_jpg5ff9.jpg",
      "assets/categories/mens/MH0108518aef.jpg"
    ],
    "colors": [
      {
        "name": "Obsidian",
        "hex": "#1b1b1d"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 15,
    "description": "Circular knit seamless construction engineered without side seams for complete comfort during long training sessions.",
    "fabric": "65% Nylon, 35% Polyester Seamless Knit",
    "features": [
      "Zero Side Seams",
      "Engineered Breathability Zones",
      "4-Way Stretch"
    ],
    "tags": [
      "seamless",
      "knit",
      "obsidian"
    ]
  },
  {
    "id": "rv-ts-07",
    "name": "Vault Modern Minimalist Polo — Off-White",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1549,
    "originalPrice": 2499,
    "badge": "LIMITED",
    "rating": 4.8,
    "reviewCount": 82,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg",
    "hoverImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg"
    ],
    "colors": [
      {
        "name": "Off White",
        "hex": "#f3ede3"
      },
      {
        "name": "Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 11,
    "description": "Premium hidden-button placket with sleek tonal matte hardware and laser-etched Repvault branding.",
    "fabric": "94% Cotton Pique, 6% Elastane",
    "features": [
      "Hidden Magnetic Placket",
      "Anti-Roll Knitted Collar",
      "Smart Casual Fit"
    ],
    "tags": [
      "polo",
      "off white",
      "minimalist"
    ]
  },
  {
    "id": "rv-ts-08",
    "name": "Vault Everyday Performance Tee — Steel Grey",
    "category": "t-shirts",
    "categoryName": "Gym T-Shirts & Polos",
    "gender": "men",
    "price": 1049,
    "originalPrice": 1699,
    "badge": "BESTSELLER",
    "rating": 4.8,
    "reviewCount": 230,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
    "hoverImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg"
    ],
    "colors": [
      {
        "name": "Steel Grey",
        "hex": "#5a5e65"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 31,
    "description": "Ultra-resilient everyday gym shirt designed to withstand chalk, barbell knurling, and high wash frequencies.",
    "fabric": "60% Cotton, 40% Polyester",
    "features": [
      "Barbell-Resistant Weave",
      "Quick Air Drying",
      "Athletic Taper"
    ],
    "tags": [
      "steel grey",
      "everyday",
      "t-shirt"
    ]
  },
  {
    "id": "rv-st-01",
    "name": "Vault Ironclad Y-Back Stringer — Seagreen",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 899,
    "originalPrice": 1499,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 367,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg"
    ],
    "colors": [
      {
        "name": "Seagreen",
        "hex": "#2e6f66"
      },
      {
        "name": "Stealth Black",
        "hex": "#151517"
      },
      {
        "name": "Charcoal",
        "hex": "#35383d"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 28,
    "description": "Designed for classic bodybuilding physique display. Deep arm cutouts and narrow Y-back straps allow complete shoulder and lat engagement without fabric restriction.",
    "fabric": "95% Cotton, 5% Lycra (190 GSM)",
    "features": [
      "Deep Cut Y-Back Strap",
      "Drop Curved Scoop Hem",
      "High-Elasticity Chest Seams",
      "Fade-Proof Reactive Dye"
    ],
    "tags": [
      "stringer",
      "y-back",
      "tank",
      "bodybuilding"
    ]
  },
  {
    "id": "rv-st-02",
    "name": "Vault Speed Running Tank — Teal Green",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 949,
    "originalPrice": 1599,
    "badge": "TOP RATED",
    "rating": 4.8,
    "reviewCount": 142,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg"
    ],
    "colors": [
      {
        "name": "Teal Green",
        "hex": "#225a52"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "Engineered specifically for marathon sessions and outdoor speed work. Ultralight featherweight mesh weave wicks sweat instantly.",
    "fabric": "100% Featherweight Aeromesh",
    "features": [
      "Ultralight 110 GSM",
      "Side Split Hem for Stride",
      "Reflective Chest Strip"
    ],
    "tags": [
      "running tank",
      "aeromesh",
      "speed"
    ]
  },
  {
    "id": "rv-st-03",
    "name": "Vault Deep Drop Sleeveless Gym Vest — Jet Black",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 849,
    "originalPrice": 1399,
    "badge": "POPULAR",
    "rating": 4.7,
    "reviewCount": 210,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#111112"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 23,
    "description": "Clean sleeveless aesthetic with reinforced arm openings that hold shape through hundreds of wash cycles.",
    "fabric": "96% Combed Cotton, 4% Spandex",
    "features": [
      "Reinforced Armhole Binding",
      "Straight Hem",
      "Tonal Vault Print"
    ],
    "tags": [
      "vest",
      "sleeveless",
      "black"
    ]
  },
  {
    "id": "rv-st-04",
    "name": "Vault Division Raw Edge Stringer — Mineral Grey",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 899,
    "originalPrice": 1499,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 89,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg"
    ],
    "colors": [
      {
        "name": "Mineral Grey",
        "hex": "#45484f"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 16,
    "description": "Industrial raw edges with lockstitch prevention. Shows off delts and chest line perfectly.",
    "fabric": "100% Cotton Rib Knit",
    "features": [
      "Raw Cut Edges with Stay-Stitch",
      "Extended Drop Silhouette",
      "Breathable Rib"
    ],
    "tags": [
      "raw edge",
      "stringer",
      "grey"
    ]
  },
  {
    "id": "rv-st-05",
    "name": "Vault Aero Racerback Stringer — Royal Blue",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 929,
    "originalPrice": 1549,
    "badge": "SALE 40% OFF",
    "rating": 4.9,
    "reviewCount": 114,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg"
    ],
    "colors": [
      {
        "name": "Royal Blue",
        "hex": "#163d7a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 14,
    "description": "Ultra-thin racerback spine cut giving total freedom for heavy squats and pull-ups.",
    "fabric": "90% Polyester, 10% Spandex",
    "features": [
      "Extreme Back Mobility",
      "Fast-Drying Yarn",
      "Chafe-Free Binding"
    ],
    "tags": [
      "racerback",
      "blue",
      "gym tank"
    ]
  },
  {
    "id": "rv-st-06",
    "name": "Vault Core Heavy Tank — Bone White",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 879,
    "originalPrice": 1399,
    "badge": "POPULAR",
    "rating": 4.7,
    "reviewCount": 96,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg"
    ],
    "colors": [
      {
        "name": "Bone White",
        "hex": "#f0ece3"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 18,
    "description": "Classic gym-era ribbed tank built from heavyweight 220 GSM cotton. Sits snug across the chest.",
    "fabric": "100% Heavy Combed Cotton 2x1 Rib",
    "features": [
      "Vintage Ribbed Texture",
      "Reinforced Neckline",
      "Pre-Washed"
    ],
    "tags": [
      "white tank",
      "heavy tank",
      "retro gym"
    ]
  },
  {
    "id": "rv-st-07",
    "name": "Vault Hybrid Mesh Training Tank — Smoke",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 949,
    "originalPrice": 1599,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 75,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg"
    ],
    "colors": [
      {
        "name": "Smoke Grey",
        "hex": "#4d5159"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 15,
    "description": "Mesh ventilation side panels maximize airflow across the lats and lower back during heavy sets.",
    "fabric": "88% Polyester, 12% Spandex",
    "features": [
      "Side Airflow Vents",
      "Subtle Vault Typography",
      "Quick Dry"
    ],
    "tags": [
      "mesh",
      "training tank",
      "smoke"
    ]
  },
  {
    "id": "rv-st-08",
    "name": "Vault Signature Athletic Sleeveless — Onyx",
    "category": "stringers",
    "categoryName": "Tanks & Stringers",
    "gender": "men",
    "price": 999,
    "originalPrice": 1699,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 220,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
    "hoverImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#131315"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 24,
    "description": "Clean cut tailored specifically for athletic physiques. Wide shoulders provide coverage while showing upper trap development.",
    "fabric": "95% Cotton, 5% Spandex",
    "features": [
      "Athletic Shoulder Width",
      "Double-Stitched Seams",
      "Soft Touch"
    ],
    "tags": [
      "sleeveless",
      "onyx",
      "bestseller"
    ]
  },
  {
    "id": "rv-sh-01",
    "name": "Vault 2-in-1 Compression Liner Shorts — Stealth Black",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2199,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 420,
    "primaryImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "hoverImage": "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
    "gallery": [
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
      "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#111113"
      },
      {
        "name": "Fire Red",
        "hex": "#a11818"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 35,
    "description": "The ultimate training shorts. Outer shell features lightweight 4-way stretch with laser-perforated airflow vents, paired with an integrated compression inner liner featuring a bounce-free phone pocket and shirt loop.",
    "fabric": "Outer: 90% Polyester, 10% Spandex | Liner: 84% Nylon, 16% Spandex",
    "features": [
      "Integrated Compression Liner",
      "Bounce-Free Internal Phone Pocket",
      "Laser-Cut Breathable Eyelets",
      "Towel/Shirt Loop on Waistband"
    ],
    "tags": [
      "shorts",
      "2-in-1",
      "compression",
      "running",
      "gym"
    ]
  },
  {
    "id": "rv-sh-02",
    "name": "Vault Laser-Cut 2-in-1 Shorts — Crimson Red",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1449,
    "originalPrice": 2399,
    "badge": "TOP RATED",
    "rating": 4.8,
    "reviewCount": 198,
    "primaryImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
    "hoverImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
    "gallery": [
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg"
    ],
    "colors": [
      {
        "name": "Crimson Red",
        "hex": "#a6192e"
      },
      {
        "name": "Stealth Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 18,
    "description": "High-contrast dynamic crimson red shell with black compression liner. Zippered waterproof side pockets protect keys and AirPods.",
    "fabric": "88% Nylon, 12% Spandex",
    "features": [
      "Waterproof Zipper Pockets",
      "Laser-Perforated Side Paneling",
      "Reinforced Gusset"
    ],
    "tags": [
      "shorts",
      "red",
      "laser cut",
      "running"
    ]
  },
  {
    "id": "rv-sh-03",
    "name": "Vault Compression Liner 7\" Shorts — Chalk White",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2249,
    "badge": "NEW DROP",
    "rating": 4.9,
    "reviewCount": 112,
    "primaryImage": "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
    "hoverImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "gallery": [
      "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg"
    ],
    "colors": [
      {
        "name": "Chalk White",
        "hex": "#f8f9fa"
      },
      {
        "name": "Onyx Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 16,
    "description": "Clean aesthetic with ultra-soft white compression liner. Anti-chafe technology tested over 100+ kilometers of running.",
    "fabric": "90% Micro-Poly, 10% Spandex",
    "features": [
      "7-Inch Inseam",
      "Dual Secure Zipper Pockets",
      "Elastic Jacquard Waistband"
    ],
    "tags": [
      "white shorts",
      "7 inch",
      "running"
    ]
  },
  {
    "id": "rv-sh-04",
    "name": "Vault Core Heavyweight Terry Shorts — Charcoal",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1899,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 160,
    "primaryImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
    "hoverImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "gallery": [
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg"
    ],
    "colors": [
      {
        "name": "Charcoal Heather",
        "hex": "#32353a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Substantial 320 GSM French terry cotton for classic bodybuilding aesthetic and durable comfort.",
    "fabric": "100% French Terry Cotton (320 GSM)",
    "features": [
      "Raw Cut Edge Hem",
      "Deep Welt Pockets",
      "Heavy Braided Drawstring"
    ],
    "tags": [
      "terry shorts",
      "heavyweight",
      "charcoal"
    ]
  },
  {
    "id": "rv-sh-05",
    "name": "Vault Aero Speed Running Shorts 5\" — Onyx",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1149,
    "originalPrice": 1799,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 88,
    "primaryImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "hoverImage": "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
    "gallery": [
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
      "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "Featherlight 5-inch inseam shorts engineered for unrestricted leg mobility and maximum sprint output.",
    "fabric": "92% Poly, 8% Spandex",
    "features": [
      "5-Inch High Split Inseam",
      "Rear Zipper Key Pocket",
      "Featherweight 95 GSM"
    ],
    "tags": [
      "5 inch shorts",
      "speed",
      "running"
    ]
  },
  {
    "id": "rv-sh-06",
    "name": "Vault Cargo Utility Training Shorts — Olive Green",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1499,
    "originalPrice": 2399,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 76,
    "primaryImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
    "hoverImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "gallery": [
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg"
    ],
    "colors": [
      {
        "name": "Olive Green",
        "hex": "#444e39"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 11,
    "description": "Tactical training shorts with low-profile magnetic snap cargo pockets that don't flap during running.",
    "fabric": "88% Stretch Ripstop, 12% Elastane",
    "features": [
      "Low-Profile Cargo Pockets",
      "Reinforced Ripstop Weave",
      "D-Ring Gear Clip"
    ],
    "tags": [
      "cargo shorts",
      "olive",
      "utility"
    ]
  },
  {
    "id": "rv-sh-07",
    "name": "Vault Hybrid Mesh Lift Shorts — Slate Grey",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1249,
    "originalPrice": 1999,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 105,
    "primaryImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
    "hoverImage": "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
    "gallery": [
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
      "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png"
    ],
    "colors": [
      {
        "name": "Slate Grey",
        "hex": "#525760"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 24,
    "description": "Double-layered aeromesh shorts with soft elastic interior waistband and durable outer mesh.",
    "fabric": "100% Breathable Aeromesh",
    "features": [
      "Double Layer Mesh",
      "Deep Hand Pockets",
      "Wide Elastic Waistband"
    ],
    "tags": [
      "mesh shorts",
      "slate",
      "gym"
    ]
  },
  {
    "id": "rv-sh-08",
    "name": "Vault Tactical Flex Training Shorts — Carbon",
    "category": "shorts",
    "categoryName": "Training Shorts",
    "gender": "men",
    "price": 1349,
    "originalPrice": 2099,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 151,
    "primaryImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "hoverImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
    "gallery": [
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg"
    ],
    "colors": [
      {
        "name": "Carbon",
        "hex": "#1c1e22"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 20,
    "description": "Engineered for high-rep barbell work with reinforced quad panels to prevent friction wear from bars.",
    "fabric": "90% Nylon, 10% Spandex",
    "features": [
      "Reinforced Quad Strips",
      "Side Hem Notches",
      "Concealed Zip Pocket"
    ],
    "tags": [
      "flex shorts",
      "training",
      "carbon"
    ]
  },
  {
    "id": "rv-jg-01",
    "name": "Vault Hybrid Slim-Taper Joggers — Jet Black",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1899,
    "originalPrice": 2999,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 478,
    "primaryImage": "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg",
    "hoverImage": "assets/categories/joggers/repvault-hybrid-slim-track-black-highlights-42ce4937.png",
    "gallery": [
      "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg",
      "assets/categories/joggers/repvault-hybrid-slim-track-black-highlights-42ce4937.png",
      "assets/categories/oversized/bottoms_black_joggers_1794114622348.jpg"
    ],
    "colors": [
      {
        "name": "Jet Black",
        "hex": "#111113"
      },
      {
        "name": "Charcoal",
        "hex": "#2b2c30"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 32,
    "description": "Our signature hybrid joggers. Constructed from premium 4-way stretch poly-cotton with an aggressive calf taper and ribbed ankle cuffs that stay locked in place.",
    "fabric": "70% Cotton, 25% Polyester, 5% Spandex (300 GSM)",
    "features": [
      "Aggressive Ankle Taper",
      "Concealed Waterproof YKK Zippers",
      "Reflective Vault Monogram",
      "Reinforced Crotch Gusset"
    ],
    "tags": [
      "joggers",
      "track pants",
      "black",
      "hybrid",
      "gym bottoms"
    ]
  },
  {
    "id": "rv-jg-02",
    "name": "Vault Utility Carpenter Cargo Pants — Onyx Black",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 2199,
    "originalPrice": 3499,
    "badge": "TRENDING",
    "rating": 4.9,
    "reviewCount": 234,
    "primaryImage": "assets/categories/joggers/Carpenter_pants_1582a.png",
    "hoverImage": "assets/categories/joggers/Carpenter_pants_29ffb.png",
    "gallery": [
      "assets/categories/joggers/Carpenter_pants_1582a.png",
      "assets/categories/joggers/Carpenter_pants_29ffb.png",
      "assets/categories/joggers/Carpenter_pants_3582a.png"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#121214"
      },
      {
        "name": "Military Olive",
        "hex": "#3b442e"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 14,
    "description": "Athletic streetwear perfection. Features reinforced carpenter knee panels, hammer loop details, and zippered utility cargo pockets with a tapered leg opening.",
    "fabric": "97% Stretch Cotton Twill, 3% Elastane (280 GSM)",
    "features": [
      "Articulated Knee Paneling",
      "Dual Cargo Utility Pockets",
      "Custom Metal Hardware",
      "Tapered Ankle Cut"
    ],
    "tags": [
      "cargo",
      "carpenter",
      "streetwear",
      "black"
    ]
  },
  {
    "id": "rv-jg-03",
    "name": "Vault Raw-Washed Straight Tracks — Charcoal Vintage",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1999,
    "originalPrice": 3199,
    "badge": "NEW DROP",
    "rating": 4.8,
    "reviewCount": 167,
    "primaryImage": "assets/categories/oversized/Raw-washed-tracks-d-_6e6cf.jpg",
    "hoverImage": "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg",
    "gallery": [
      "assets/categories/oversized/Raw-washed-tracks-d-_6e6cf.jpg",
      "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg"
    ],
    "colors": [
      {
        "name": "Vintage Charcoal",
        "hex": "#2f3136"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 18,
    "description": "Straight leg relaxed track pants enzyme-washed for a vintage streetwear texture. Internal ankle bungee cord toggles allow instant conversion to jogger silhouette.",
    "fabric": "100% French Terry Cotton (340 GSM)",
    "features": [
      "Convertible Ankle Bungee Toggles",
      "Deep Side Inseam Pockets",
      "Enzyme Stone Wash"
    ],
    "tags": [
      "straight track",
      "washed",
      "vintage"
    ]
  },
  {
    "id": "rv-jg-04",
    "name": "Vault Ironclad Heavy Fleece Joggers — Black",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1799,
    "originalPrice": 2899,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 310,
    "primaryImage": "assets/categories/oversized/bottoms_black_joggers_1794114622348.jpg",
    "hoverImage": "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg",
    "gallery": [
      "assets/categories/oversized/bottoms_black_joggers_1794114622348.jpg",
      "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg"
    ],
    "colors": [
      {
        "name": "Black Fleece",
        "hex": "#141416"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 25,
    "description": "Thick brushed fleece interior keeps your muscles warm through cold-weather warmups and outdoor morning runs.",
    "fabric": "80% Cotton, 20% Polyester Heavy Fleece (320 GSM)",
    "features": [
      "Brushed Thermal Interior",
      "Ribbed Ankle Cuffs",
      "Heavy Drawcord with Metal Tips"
    ],
    "tags": [
      "fleece",
      "warmup",
      "joggers"
    ]
  },
  {
    "id": "rv-jg-05",
    "name": "Vault Technical Aero Track Pants — Stealth",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1899,
    "originalPrice": 2999,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 95,
    "primaryImage": "assets/categories/joggers/Carpenter_pants_29ffb.png",
    "hoverImage": "assets/categories/joggers/Carpenter_pants_3582a.png",
    "gallery": [
      "assets/categories/joggers/Carpenter_pants_29ffb.png",
      "assets/categories/joggers/Carpenter_pants_3582a.png"
    ],
    "colors": [
      {
        "name": "Stealth",
        "hex": "#16171a"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 10,
    "description": "Ultralight ripstop shell with water-resistant DWR finish. Built for running in unexpected weather without absorbing moisture.",
    "fabric": "90% Nylon Ripstop, 10% Spandex DWR",
    "features": [
      "DWR Water-Repellent Finish",
      "Ankle Zippers for Shoes-On Removal",
      "Breathable Mesh Inseam"
    ],
    "tags": [
      "water resistant",
      "ripstop",
      "track pants"
    ]
  },
  {
    "id": "rv-jg-06",
    "name": "Vault Tapered Poly-Track Pants — Obsidian",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1699,
    "originalPrice": 2699,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 140,
    "primaryImage": "assets/categories/joggers/repvault-hybrid-slim-track-black-highlights-42ce4937.png",
    "hoverImage": "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg",
    "gallery": [
      "assets/categories/joggers/repvault-hybrid-slim-track-black-highlights-42ce4937.png",
      "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg"
    ],
    "colors": [
      {
        "name": "Obsidian",
        "hex": "#1a1a1c"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 21,
    "description": "Sleek tricot knit fabric that glides effortlessly during dynamic movement. Features subtle matte side pin-tucks.",
    "fabric": "100% Performance Tricot Polyester",
    "features": [
      "Sleek Pin-Tuck Seams",
      "Zippered Pockets",
      "Elastic Ankle Grippers"
    ],
    "tags": [
      "tricot",
      "track pants",
      "obsidian"
    ]
  },
  {
    "id": "rv-jg-07",
    "name": "Vault Tactical Cargo Tracks — Desert Tan",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 2099,
    "originalPrice": 3299,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 82,
    "primaryImage": "assets/categories/joggers/Carpenter_pants_3582a.png",
    "hoverImage": "assets/categories/joggers/Carpenter_pants_1582a.png",
    "gallery": [
      "assets/categories/joggers/Carpenter_pants_3582a.png",
      "assets/categories/joggers/Carpenter_pants_1582a.png"
    ],
    "colors": [
      {
        "name": "Desert Tan",
        "hex": "#c2b399"
      },
      {
        "name": "Black",
        "hex": "#111111"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 13,
    "description": "Ergonomic 6-pocket cargo configuration designed with gusseted pockets that stay flush when empty.",
    "fabric": "98% Cotton, 2% Spandex",
    "features": [
      "6-Pocket Layout",
      "Articulated Knee Pleats",
      "Adjustable Ankle Tabs"
    ],
    "tags": [
      "cargo",
      "tan",
      "tactical"
    ]
  },
  {
    "id": "rv-jg-08",
    "name": "Vault Performance Tech Joggers — Heather Grey",
    "category": "joggers",
    "categoryName": "Joggers & Track Pants",
    "gender": "men",
    "price": 1749,
    "originalPrice": 2799,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 220,
    "primaryImage": "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg",
    "hoverImage": "assets/categories/oversized/Raw-washed-tracks-d-_6e6cf.jpg",
    "gallery": [
      "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg",
      "assets/categories/oversized/Raw-washed-tracks-d-_6e6cf.jpg"
    ],
    "colors": [
      {
        "name": "Heather Grey",
        "hex": "#8a8d94"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 27,
    "description": "Versatile medium-weight performance knit with moisture management and comfortable elastic waistband.",
    "fabric": "75% Cotton, 20% Polyester, 5% Elastane",
    "features": [
      "Moisture Management",
      "Comfort Waistband",
      "Tapered Cuffs"
    ],
    "tags": [
      "grey joggers",
      "heather",
      "performance"
    ]
  },
  {
    "id": "rv-tr-01",
    "name": "Vault Ironclad Straight Heavy Tracks — Charcoal",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1899,
    "originalPrice": 2999,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 310,
    "primaryImage": "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
    "hoverImage": "assets/categories/training/Frame_275_jpg6974.jpg",
    "gallery": [
      "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
      "assets/categories/training/Frame_275_jpg6974.jpg",
      "assets/categories/training/repvault-performance-black-22c12.jpg"
    ],
    "colors": [
      {
        "name": "Iron Charcoal",
        "hex": "#2b2e34"
      },
      {
        "name": "Midnight Black",
        "hex": "#111112"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 24,
    "description": "Engineered for pure heavy lifting. Double-reinforced fabric prevents barbell knurling damage during heavy deadlifts and clean pulls.",
    "fabric": "72% Cotton, 23% Poly, 5% Spandex (330 GSM)",
    "features": [
      "Barbell-Proof Shin Reinforcement",
      "Relaxed Straight Cut",
      "Deep Zippered Pockets"
    ],
    "tags": [
      "ironclad",
      "powerlifting",
      "tracks"
    ]
  },
  {
    "id": "rv-tr-02",
    "name": "Vault Performance Barbell Tee — Onyx Black",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1899,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 245,
    "primaryImage": "assets/categories/training/repvault-performance-black-22c12.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-2c8ea.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-22c12.jpg",
      "assets/categories/training/repvault-performance-black-2c8ea.jpg",
      "assets/categories/training/repvault-performance-black-45067.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#131315"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 30,
    "description": "Grippy silicone pattern on upper back locks the barbell in place during heavy back squats. Breathable sweat-dispersion weave.",
    "fabric": "88% Polyester, 12% Spandex",
    "features": [
      "Squat Bar Grip Coating",
      "Underarm Ventilation Vents",
      "Reinforced Neckline"
    ],
    "tags": [
      "squat tee",
      "barbell",
      "training"
    ]
  },
  {
    "id": "rv-tr-03",
    "name": "Vault Heavyweight Friction-Resistant Tee — Slate",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1249,
    "originalPrice": 1999,
    "badge": "TOP RATED",
    "rating": 4.9,
    "reviewCount": 132,
    "primaryImage": "assets/categories/training/repvault-performance-black-2c8ea.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-45067.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-2c8ea.jpg",
      "assets/categories/training/repvault-performance-black-45067.jpg"
    ],
    "colors": [
      {
        "name": "Slate",
        "hex": "#3f434a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 17,
    "description": "High-tensile yarn construction specifically tested against rough kettlebells and sandbags without pilling.",
    "fabric": "100% High-Density Synthetic Cotton Blend",
    "features": [
      "Anti-Pilling Standard 4.5+",
      "Pre-Shrunk",
      "Athletic Taper"
    ],
    "tags": [
      "friction resistant",
      "slate",
      "training"
    ]
  },
  {
    "id": "rv-tr-04",
    "name": "Vault Tactical Ironclad Shorts — Carbon",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1399,
    "originalPrice": 2199,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 91,
    "primaryImage": "assets/categories/training/repvault-performance-black-45067.jpg",
    "hoverImage": "assets/categories/training/Frame_275_jpg6974.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-45067.jpg",
      "assets/categories/training/Frame_275_jpg6974.jpg"
    ],
    "colors": [
      {
        "name": "Carbon",
        "hex": "#1e2024"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 20,
    "description": "Tough Cordura-reinforced thigh panels engineered for Olympic weightlifting and rope climbing.",
    "fabric": "Cordura Stretch Blend",
    "features": [
      "Cordura Reinforcement",
      "Triple-Needle Stitching",
      "Secure Key Carabiner Loop"
    ],
    "tags": [
      "ironclad shorts",
      "weightlifting",
      "cordura"
    ]
  },
  {
    "id": "rv-tr-05",
    "name": "Vault Powerlifting Long Sleeve Top — Onyx",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1449,
    "originalPrice": 2299,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 78,
    "primaryImage": "assets/categories/training/repvault-performance-black-22c12.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-2c8ea.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-22c12.jpg",
      "assets/categories/training/repvault-performance-black-2c8ea.jpg"
    ],
    "colors": [
      {
        "name": "Onyx",
        "hex": "#111112"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 9,
    "description": "Full elbow and arm protection during heavy bench press and overhead log presses.",
    "fabric": "90% Nylon, 10% Spandex",
    "features": [
      "Elbow Sleeve Compatibility",
      "High Neckline",
      "Breathable Back"
    ],
    "tags": [
      "powerlifting",
      "long sleeve",
      "onyx"
    ]
  },
  {
    "id": "rv-tr-06",
    "name": "Vault Conditioning Raglan Tee — Forest",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1149,
    "originalPrice": 1799,
    "badge": "POPULAR",
    "rating": 4.7,
    "reviewCount": 115,
    "primaryImage": "assets/categories/training/Frame_275_jpg6974.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-22c12.jpg",
    "gallery": [
      "assets/categories/training/Frame_275_jpg6974.jpg",
      "assets/categories/training/repvault-performance-black-22c12.jpg"
    ],
    "colors": [
      {
        "name": "Forest",
        "hex": "#2c3b2d"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 16,
    "description": "Designed for high-output conditioning, sled pushes, and interval circuit training.",
    "fabric": "85% Poly, 15% Spandex",
    "features": [
      "Quick Heat Dissipation",
      "Anti-Odor Polygiene",
      "Ergonomic Flatlocks"
    ],
    "tags": [
      "conditioning",
      "forest",
      "raglan"
    ]
  },
  {
    "id": "rv-tr-07",
    "name": "Vault Hybrid Heavy Straight Pants — Black",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1949,
    "originalPrice": 3099,
    "badge": "SALE 35% OFF",
    "rating": 4.8,
    "reviewCount": 142,
    "primaryImage": "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-45067.jpg",
    "gallery": [
      "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
      "assets/categories/training/repvault-performance-black-45067.jpg"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#141416"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 18,
    "description": "Heavyweight straight leg silhouette with zippered side hems for quick footwear changes.",
    "fabric": "75% Cotton, 25% Polyester",
    "features": [
      "Side Ankle Zippers",
      "Deep Welt Pockets",
      "Heavy Drawcord"
    ],
    "tags": [
      "straight tracks",
      "heavyweight",
      "black"
    ]
  },
  {
    "id": "rv-tr-08",
    "name": "Vault Ironclad Compression Tights — Stealth",
    "category": "training",
    "categoryName": "Performance & Ironclad",
    "gender": "men",
    "price": 1599,
    "originalPrice": 2599,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 204,
    "primaryImage": "assets/categories/training/repvault-performance-black-2c8ea.jpg",
    "hoverImage": "assets/categories/training/repvault-performance-black-22c12.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-2c8ea.jpg",
      "assets/categories/training/repvault-performance-black-22c12.jpg"
    ],
    "colors": [
      {
        "name": "Stealth",
        "hex": "#151518"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Full-length compression leggings designed to wear under training shorts for joint warmth and calf support.",
    "fabric": "84% Nylon, 16% Spandex",
    "features": [
      "Knee Joint Compression",
      "Phone Pocket",
      "Wide Comfort Band"
    ],
    "tags": [
      "tights",
      "leggings",
      "compression"
    ]
  },
  {
    "id": "rv-hd-01",
    "name": "Repvault Aesthetic Hooded Zip-Up — Chalk Beige",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "unisex",
    "price": 1299,
    "originalPrice": 2499,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 489,
    "primaryImage": "assets/featured/zipup-main.jpg",
    "hoverImage": "assets/featured/zipup-thumb-1.jpg",
    "gallery": [
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-1.jpg",
      "assets/featured/zipup-thumb-2.jpg",
      "assets/featured/zipup-thumb-3.jpg"
    ],
    "colors": [
      {
        "name": "Chalk Beige",
        "hex": "#eae4d5"
      },
      {
        "name": "Midnight Black",
        "hex": "#121214"
      },
      {
        "name": "Heather Mist",
        "hex": "#e2e4e8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 28,
    "description": "The viral aesthetic crop zip-up hoodie. Tailored double-layer structured hood that maintains shape, finished with heavy matte gunmetal YKK two-way zipper and signature Repvault tone-on-tone embroidery.",
    "fabric": "100% French Terry Cotton (360 GSM)",
    "features": [
      "Two-Way Matte YKK Zipper",
      "Double-Layer Stand Hood",
      "Ribbed Drop Hem",
      "Embroidered Monogram at Nape"
    ],
    "tags": [
      "hoodie",
      "zipup",
      "beige",
      "crop",
      "aesthetic"
    ]
  },
  {
    "id": "rv-hd-02",
    "name": "Vault Oversized Heavy French Terry Pullover — Onyx Black",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "men",
    "price": 1999,
    "originalPrice": 3299,
    "badge": "TOP RATED",
    "rating": 5,
    "reviewCount": 312,
    "primaryImage": "assets/categories/oversized/hoodie_category.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/categories/oversized/hoodie_category.jpg",
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-2.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#101012"
      },
      {
        "name": "Washed Olive",
        "hex": "#3e4536"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "400 GSM heavyweight French terry engineered with a substantial structured drape and kangaroo pocket with concealed interior phone divider.",
    "fabric": "100% Heavy Combed Cotton Terry (400 GSM)",
    "features": [
      "400 GSM Ultra-Dense Weave",
      "Crossover Neck Hood (No Strings)",
      "Internal Phone Divider Pocket"
    ],
    "tags": [
      "heavyweight hoodie",
      "pullover",
      "black",
      "streetwear"
    ]
  },
  {
    "id": "rv-hd-03",
    "name": "Repvault Aesthetic Hooded Zip-Up — Onyx Black",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "unisex",
    "price": 1299,
    "originalPrice": 2499,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 378,
    "primaryImage": "assets/featured/zipup-thumb-2.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/featured/zipup-thumb-2.jpg",
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-3.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 33,
    "description": "All-black edition of our flagship aesthetic zip-up. Features ribbed cuff thumbholes for cold morning training.",
    "fabric": "100% French Terry Cotton (360 GSM)",
    "features": [
      "Integrated Thumbholes",
      "Two-Way YKK Zipper",
      "High Collar Shield"
    ],
    "tags": [
      "black zipup",
      "hoodie",
      "thumbholes"
    ]
  },
  {
    "id": "rv-hd-04",
    "name": "Vault Tech-Fleece Bomber Jacket — Carbon",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "men",
    "price": 2499,
    "originalPrice": 3999,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 94,
    "primaryImage": "assets/featured/zipup-thumb-1.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/featured/zipup-thumb-1.jpg",
      "assets/featured/zipup-main.jpg"
    ],
    "colors": [
      {
        "name": "Carbon Black",
        "hex": "#181a1e"
      }
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 8,
    "description": "Minimalist technical bomber silhouette with water-repellent bonded fleece and magnetic storm closure.",
    "fabric": "Tech-Fleece Bonded Membrane",
    "features": [
      "Bonded Membrane Insulation",
      "Magnetic Storm Flap",
      "Hidden Chest Passport Pocket"
    ],
    "tags": [
      "bomber",
      "jacket",
      "techwear"
    ]
  },
  {
    "id": "rv-hd-05",
    "name": "Vault Acid Washed Boxy Pullover — Mineral Slate",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "men",
    "price": 1899,
    "originalPrice": 3099,
    "badge": "NEW DROP",
    "rating": 4.8,
    "reviewCount": 120,
    "primaryImage": "assets/categories/oversized/hoodie_category.jpg",
    "hoverImage": "assets/featured/zipup-thumb-3.jpg",
    "gallery": [
      "assets/categories/oversized/hoodie_category.jpg",
      "assets/featured/zipup-thumb-3.jpg"
    ],
    "colors": [
      {
        "name": "Mineral Slate",
        "hex": "#43474f"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 15,
    "description": "Vintage-washed boxy cut pullover hoodie with distressed seam accents and custom vintage finish.",
    "fabric": "100% Cotton French Terry (380 GSM)",
    "features": [
      "Vintage Mineral Wash",
      "Boxy Silhouette",
      "Drop Shoulders"
    ],
    "tags": [
      "washed hoodie",
      "slate",
      "pullover"
    ]
  },
  {
    "id": "rv-hd-06",
    "name": "Repvault Aesthetic Hooded Zip-Up — Heather Grey",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "unisex",
    "price": 1299,
    "originalPrice": 2499,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 215,
    "primaryImage": "assets/featured/zipup-thumb-3.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/featured/zipup-thumb-3.jpg",
      "assets/featured/zipup-main.jpg"
    ],
    "colors": [
      {
        "name": "Heather Grey",
        "hex": "#d5d7dc"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 20,
    "description": "Athletic heather grey melange texture with clean tonal finishes and structured collar.",
    "fabric": "85% Cotton, 15% Poly French Terry",
    "features": [
      "Double Stitched Cuffs",
      "Two-Way Zip",
      "Ultra Soft Interior"
    ],
    "tags": [
      "heather grey",
      "zipup",
      "aesthetic"
    ]
  },
  {
    "id": "rv-hd-07",
    "name": "Vault Sleeveless Gym Pump Cover Hoodie — Stealth",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "men",
    "price": 1199,
    "originalPrice": 1999,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 148,
    "primaryImage": "assets/categories/oversized/hoodie_category.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/categories/oversized/hoodie_category.jpg",
      "assets/featured/zipup-main.jpg"
    ],
    "colors": [
      {
        "name": "Stealth",
        "hex": "#161618"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Sleeveless cut allows unencumbered bicep and shoulder work while keeping your core warm.",
    "fabric": "100% French Terry Cotton (300 GSM)",
    "features": [
      "Deep Cut Armholes",
      "Spacious Hood",
      "Kangaroo Pocket"
    ],
    "tags": [
      "sleeveless hoodie",
      "pump cover",
      "stealth"
    ]
  },
  {
    "id": "rv-hd-08",
    "name": "Vault Thermo-Shield Full Zip Windbreaker — Onyx",
    "category": "hoodies",
    "categoryName": "Hoodies & Jackets",
    "gender": "unisex",
    "price": 2199,
    "originalPrice": 3499,
    "badge": "NEW",
    "rating": 4.9,
    "reviewCount": 86,
    "primaryImage": "assets/featured/zipup-main.jpg",
    "hoverImage": "assets/featured/zipup-thumb-1.jpg",
    "gallery": [
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-1.jpg"
    ],
    "colors": [
      {
        "name": "Onyx",
        "hex": "#111113"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "inStock": true,
    "stockCount": 16,
    "description": "Ultralight packable windbreaker with weather-sealed zippers and breathable underarm eyelets.",
    "fabric": "100% Ripstop Nylon with DWR",
    "features": [
      "Packable into Pocket",
      "Weatherproof Zips",
      "Reflective Accents"
    ],
    "tags": [
      "windbreaker",
      "jacket",
      "packable"
    ]
  },
  {
    "id": "rv-wm-01",
    "name": "Vault Pro Sculpt High-Impact Sports Bra — Ocean Blue",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1199,
    "originalPrice": 1999,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 462,
    "primaryImage": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
    "hoverImage": "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
    "gallery": [
      "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
      "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
      "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png"
    ],
    "colors": [
      {
        "name": "Ocean Blue",
        "hex": "#1e5b8a"
      },
      {
        "name": "Terracotta Rust",
        "hex": "#9b4530"
      },
      {
        "name": "Onyx Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 26,
    "description": "Engineered with compressive molded cups and supportive crossover back straps that eliminate bounce during high-impact training and running. Butter-soft brushed fabric feels like second skin.",
    "fabric": "75% Nylon Microfiber, 25% Spandex (280 GSM)",
    "features": [
      "Removable Anti-Shift Padding",
      "High-Impact Bounce Control",
      "Brushed Butter-Soft Finish",
      "Sweat-Wicking Underband"
    ],
    "tags": [
      "sports bra",
      "ocean blue",
      "high impact",
      "womens activewear"
    ]
  },
  {
    "id": "rv-wm-02",
    "name": "Vault Pro Sculpt High-Impact Sports Bra — Terracotta Rust",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1199,
    "originalPrice": 1999,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 284,
    "primaryImage": "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png",
    "hoverImage": "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
    "gallery": [
      "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png",
      "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
      "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg"
    ],
    "colors": [
      {
        "name": "Terracotta Rust",
        "hex": "#a44634"
      },
      {
        "name": "Ocean Blue",
        "hex": "#1e5b8a"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 20,
    "description": "Rich earth-tone terracotta rust palette. Features bonded edges that won't dig into shoulders.",
    "fabric": "75% Nylon, 25% Spandex",
    "features": [
      "Bonded Shoulder Straps",
      "Breathable Mesh Lining",
      "Zero Hardware"
    ],
    "tags": [
      "sports bra",
      "rust",
      "terracotta"
    ]
  },
  {
    "id": "rv-wm-03",
    "name": "Vault Active High-Rise Sculpt Leggings — Midnight Navy",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1699,
    "originalPrice": 2699,
    "badge": "TOP RATED",
    "rating": 5,
    "reviewCount": 388,
    "primaryImage": "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
    "hoverImage": "assets/categories/womens/Nav-Bar-Banners-_Womens_-_800-x-458_-_01__jpgc804.jpg",
    "gallery": [
      "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
      "assets/categories/womens/Nav-Bar-Banners-_Womens_-_800-x-458_-_01__jpgc804.jpg"
    ],
    "colors": [
      {
        "name": "Midnight Navy",
        "hex": "#101d36"
      },
      {
        "name": "Black Onyx",
        "hex": "#111112"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 35,
    "description": "100% squat-proof 4-way stretch fabric with no front seam to prevent camel toe. Curved contour glute seam accentuates natural curves, with a seamless waistband that stays high and never rolls.",
    "fabric": "80% Nylon, 20% Elastane Sculpting Knit",
    "features": [
      "100% Squat-Proof Guaranteed",
      "Zero Front Center Seam",
      "Hidden Waistband Pocket",
      "Non-Slip Stay-Up High Band"
    ],
    "tags": [
      "leggings",
      "high rise",
      "navy",
      "squat proof"
    ]
  },
  {
    "id": "rv-wm-04",
    "name": "Repvault Aesthetic Crop Zip Hoodie — Chalk Beige",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1299,
    "originalPrice": 2499,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 410,
    "primaryImage": "assets/featured/zipup-main.jpg",
    "hoverImage": "assets/featured/zipup-thumb-1.jpg",
    "gallery": [
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-1.jpg",
      "assets/featured/zipup-thumb-2.jpg",
      "assets/featured/zipup-thumb-3.jpg"
    ],
    "colors": [
      {
        "name": "Chalk Beige",
        "hex": "#e7dfd0"
      },
      {
        "name": "Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 22,
    "description": "Tailored cropped proportion cut above the hips to pair flawlessly with high-rise leggings. Cozy French terry with heavy two-way metal zipper.",
    "fabric": "100% French Terry Cotton",
    "features": [
      "Flattering Crop Proportion",
      "Two-Way Metal Zipper",
      "High Collar Hood"
    ],
    "tags": [
      "crop hoodie",
      "beige",
      "womens zipup"
    ]
  },
  {
    "id": "rv-wm-05",
    "name": "Vault Seamless Rib Crop Training Top — Black",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 999,
    "originalPrice": 1599,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 172,
    "primaryImage": "assets/categories/womens/Nav-Bar-Banners-_Womens_-_800-x-458_-_01__jpgc804.jpg",
    "hoverImage": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
    "gallery": [
      "assets/categories/womens/Nav-Bar-Banners-_Womens_-_800-x-458_-_01__jpgc804.jpg",
      "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#121214"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 25,
    "description": "Seamless micro-rib crop top with raglan short sleeves and compressive underbust band for light-to-medium support.",
    "fabric": "92% Seamless Polyamide, 8% Elastane",
    "features": [
      "Seamless Micro-Rib",
      "Supportive Underbust Band",
      "Raglan Shoulders"
    ],
    "tags": [
      "crop top",
      "seamless",
      "training top"
    ]
  },
  {
    "id": "rv-wm-06",
    "name": "Vault Biker Compression Shorts 6\" — Midnight Navy",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1199,
    "originalPrice": 1899,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 198,
    "primaryImage": "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
    "hoverImage": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
    "gallery": [
      "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
      "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg"
    ],
    "colors": [
      {
        "name": "Midnight Navy",
        "hex": "#111f38"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 19,
    "description": "6-inch inseam high-rise biker shorts. Tapered leg cuffs prevent thigh chafing and zero roll-up during cycling and squats.",
    "fabric": "78% Nylon, 22% Spandex",
    "features": [
      "6-Inch Inseam",
      "Side Drop-In Phone Pocket",
      "No-Roll Waistband"
    ],
    "tags": [
      "biker shorts",
      "navy",
      "womens shorts"
    ]
  },
  {
    "id": "rv-wm-07",
    "name": "Vault Longline Cami Sports Bra — Sage Green",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1149,
    "originalPrice": 1799,
    "badge": "SALE 35% OFF",
    "rating": 4.7,
    "reviewCount": 130,
    "primaryImage": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
    "hoverImage": "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png",
    "gallery": [
      "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
      "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png"
    ],
    "colors": [
      {
        "name": "Sage Green",
        "hex": "#778977"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 17,
    "description": "Extended longline silhouette that doubles as a crop tank. Delicate double straps provide elegant back framing.",
    "fabric": "80% Nylon, 20% Spandex",
    "features": [
      "Longline Coverage",
      "Removable Cups",
      "Double Back Straps"
    ],
    "tags": [
      "cami bra",
      "longline",
      "sage"
    ]
  },
  {
    "id": "rv-wm-08",
    "name": "Vault Cloud-Touch Relaxed Joggers — Oatmeal",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "gender": "women",
    "price": 1799,
    "originalPrice": 2799,
    "badge": "NEW",
    "rating": 4.9,
    "reviewCount": 95,
    "primaryImage": "assets/categories/womens/repvault-womens-banner-3bc0d.jpg",
    "hoverImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/categories/womens/repvault-womens-banner-3bc0d.jpg",
      "assets/featured/zipup-main.jpg"
    ],
    "colors": [
      {
        "name": "Oatmeal Melange",
        "hex": "#ded7c8"
      }
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "inStock": true,
    "stockCount": 14,
    "description": "Plush peachskin fleece joggers with high-rise gathered elastic waistband and relaxed taper.",
    "fabric": "80% Combed Cotton, 20% Polyester Fleece",
    "features": [
      "Cloud-Soft Fleece",
      "High-Rise Gathering",
      "Deep Pockets"
    ],
    "tags": [
      "joggers",
      "womens joggers",
      "oatmeal"
    ]
  },
  {
    "id": "rv-ac-01",
    "name": "Vault Elevate Tactical 35L Backpack — Stealth Black",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 2499,
    "originalPrice": 3999,
    "badge": "BESTSELLER",
    "rating": 5,
    "reviewCount": 382,
    "primaryImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
    "gallery": [
      "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
      "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
      "assets/categories/accessories/statement-bp-black-_94aaa.jpg",
      "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#111113"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "inStock": true,
    "stockCount": 20,
    "description": "The definitive athletic travel backpack. Constructed from 1000D ballistic water-resistant Cordura with isolated bottom ventilated shoe compartment, padded 16-inch laptop sleeve, external MOLLE webbing, and heavy aluminum luggage handle pass-through.",
    "fabric": "1000D Ballistic Cordura Nylon + YKK Waterproof Zips",
    "features": [
      "Isolated Ventilated Shoe Pocket",
      "Padded 16-Inch Laptop Compartment",
      "1000D Waterproof Cordura",
      "Ergonomic Memory Foam Straps"
    ],
    "tags": [
      "backpack",
      "tactical",
      "gym bag",
      "35L",
      "accessories"
    ]
  },
  {
    "id": "rv-ac-02",
    "name": "Vault Statement Daily Commuter Backpack — Onyx",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 2199,
    "originalPrice": 3499,
    "badge": "TOP RATED",
    "rating": 4.9,
    "reviewCount": 194,
    "primaryImage": "assets/categories/accessories/statement-bp-black-_94aaa.jpg",
    "hoverImage": "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg",
    "gallery": [
      "assets/categories/accessories/statement-bp-black-_94aaa.jpg",
      "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg",
      "assets/categories/accessories/ElevateBackpacks_4a394.jpg"
    ],
    "colors": [
      {
        "name": "Onyx Black",
        "hex": "#141416"
      }
    ],
    "sizes": [
      "One Size"
    ],
    "inStock": true,
    "stockCount": 15,
    "description": "Sleek low-profile 24L silhouette designed for seamless transition from gym to executive office. Waterproof matte polyurethane coating.",
    "fabric": "Waterproof Matte Polyurethane + Ballistic Base",
    "features": [
      "Clamshell 180° Opening",
      "Concealed Passport Pocket",
      "Magnetic Chest Sternum Strap"
    ],
    "tags": [
      "backpack",
      "commuter",
      "waterproof",
      "black"
    ]
  },
  {
    "id": "rv-ac-03",
    "name": "Vault Performance Pro Snapback Cap — Stealth Black",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 699,
    "originalPrice": 1199,
    "badge": "BESTSELLER",
    "rating": 4.8,
    "reviewCount": 512,
    "primaryImage": "assets/categories/accessories/gym-caps-men9766.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "gallery": [
      "assets/categories/accessories/gym-caps-men9766.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#111112"
      },
      {
        "name": "Charcoal Grey",
        "hex": "#32353b"
      }
    ],
    "sizes": [
      "Adjustable Snapback"
    ],
    "inStock": true,
    "stockCount": 45,
    "description": "Engineered with moisture-wicking technical ripstop and laser-cut breathable perforations. Features a 3D silicone Repvault Vault Monogram.",
    "fabric": "100% Technical Water-Resistant Ripstop Poly",
    "features": [
      "Laser-Perforated Air Vent Crown",
      "Anti-Bacterial Terry Sweatband",
      "Pre-Curved Structured Brim"
    ],
    "tags": [
      "cap",
      "hat",
      "snapback",
      "black"
    ]
  },
  {
    "id": "rv-ac-04",
    "name": "Vault Minimalist Training Cap — Charcoal Grey",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 699,
    "originalPrice": 1199,
    "badge": "POPULAR",
    "rating": 4.7,
    "reviewCount": 228,
    "primaryImage": "assets/categories/accessories/gym-caps-men9766.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
    "gallery": [
      "assets/categories/accessories/gym-caps-men9766.jpg"
    ],
    "colors": [
      {
        "name": "Charcoal Grey",
        "hex": "#33363c"
      }
    ],
    "sizes": [
      "Adjustable Snapback"
    ],
    "inStock": true,
    "stockCount": 38,
    "description": "Unstructured 6-panel athletic cap that folds flat for packing into gym bags without losing shape.",
    "fabric": "100% Quick-Dry Taslan Nylon",
    "features": [
      "Packable Flexible Visor",
      "Reflective Rear Strap",
      "Featherweight 55g"
    ],
    "tags": [
      "training cap",
      "charcoal",
      "gym hat"
    ]
  },
  {
    "id": "rv-ac-05",
    "name": "Vault Elevate Tactical Duffel Bag 50L — Black",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 2799,
    "originalPrice": 4499,
    "badge": "LIMITED",
    "rating": 4.9,
    "reviewCount": 160,
    "primaryImage": "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "gallery": [
      "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
      "assets/categories/accessories/ElevateBackpacks_4a394.jpg"
    ],
    "colors": [
      {
        "name": "Black",
        "hex": "#111113"
      }
    ],
    "sizes": [
      "50 Liters"
    ],
    "inStock": true,
    "stockCount": 12,
    "description": "Massive 50L capacity with separate wet gear pocket, weightlifting belt strap, and detachable shoulder sling.",
    "fabric": "1000D Cordura Nylon",
    "features": [
      "Belt Lash Straps",
      "Waterproof Wet Pocket",
      "Reinforced Tarpaulin Bottom"
    ],
    "tags": [
      "duffel bag",
      "50L",
      "gear"
    ]
  },
  {
    "id": "rv-ac-06",
    "name": "Vault Heavy Duty Lifting Straps (Pair) — Stealth",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 499,
    "originalPrice": 899,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 395,
    "primaryImage": "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "gallery": [
      "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg"
    ],
    "colors": [
      {
        "name": "Stealth Black",
        "hex": "#141416"
      }
    ],
    "sizes": [
      "Standard (Pair)"
    ],
    "inStock": true,
    "stockCount": 60,
    "description": "Thick industrial cotton webbing with neoprene wrist padding tested up to 400kg barbell traction.",
    "fabric": "Industrial Grade Cotton Webbing + Neoprene Padding",
    "features": [
      "Tested to 400kg Max Load",
      "5mm Neoprene Wrist Cushion",
      "Double Box-X Stitching"
    ],
    "tags": [
      "lifting straps",
      "deadlift",
      "gym gear"
    ]
  },
  {
    "id": "rv-ac-07",
    "name": "Vault Premium Shaker Bottle 750ml — Matte Black",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 599,
    "originalPrice": 999,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 280,
    "primaryImage": "assets/categories/accessories/statement-bp-black-_94aaa.jpg",
    "hoverImage": "assets/categories/accessories/gym-caps-men9766.jpg",
    "gallery": [
      "assets/categories/accessories/statement-bp-black-_94aaa.jpg"
    ],
    "colors": [
      {
        "name": "Matte Black",
        "hex": "#161618"
      }
    ],
    "sizes": [
      "750 ml"
    ],
    "inStock": true,
    "stockCount": 50,
    "description": "100% BPA-free Eastman Tritan stainless steel blend shaker with silent whisk ball and leak-proof flip cap.",
    "fabric": "BPA-Free Eastman Tritan Plastic",
    "features": [
      "Silent Agitator Ball",
      "100% Guaranteed Leak-Proof",
      "Odor-Resistant Surface"
    ],
    "tags": [
      "shaker",
      "bottle",
      "matte black"
    ]
  },
  {
    "id": "rv-ac-08",
    "name": "Vault Quick-Dry Microfiber Gym Towel — Slate",
    "category": "accessories",
    "categoryName": "Gear & Accessories",
    "gender": "unisex",
    "price": 399,
    "originalPrice": 699,
    "badge": "BESTSELLER",
    "rating": 4.8,
    "reviewCount": 310,
    "primaryImage": "assets/categories/accessories/gym-caps-men9766.jpg",
    "hoverImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "gallery": [
      "assets/categories/accessories/gym-caps-men9766.jpg"
    ],
    "colors": [
      {
        "name": "Slate Grey",
        "hex": "#4b4f57"
      }
    ],
    "sizes": [
      "40cm x 80cm"
    ],
    "inStock": true,
    "stockCount": 75,
    "description": "Super-absorbent compact microfiber towel with silver ion anti-bacterial treatment and magnetic gym equipment clip.",
    "fabric": "80% Poly, 20% Polyamide Microfiber with Silver Ions",
    "features": [
      "Magnetic Bench Clip",
      "Absorbs 4x Its Weight",
      "Dries 3x Faster Than Cotton"
    ],
    "tags": [
      "gym towel",
      "microfiber",
      "slate"
    ]
  }
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function getProductsByCategory(catId) {
  if (!catId || catId === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === catId);
}

export function searchProducts(query) {
  if (!query) return PRODUCTS;
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(q) ||
    p.categoryName.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
  );
}
