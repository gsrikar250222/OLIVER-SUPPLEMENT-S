/**
 * REPVAULT Product Catalog & Store State
 * Authoritative production data mapped to repvault_final_assets/
 */

export const CATEGORIES = [
  {
    "id": "all",
    "name": "All Products",
    "count": 20
  },
  {
    "id": "t-shirts",
    "name": "T-Shirts & Polos",
    "count": 5,
    "banner": "assets/categories/t-shirts/Category_Banners_TSHIRT__jpgd40f.jpg"
  },
  {
    "id": "joggers",
    "name": "Joggers & Tracks",
    "count": 5,
    "banner": "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg"
  },
  {
    "id": "compression",
    "name": "Compression Tech",
    "count": 5,
    "banner": "assets/categories/compression/repvault-compression-short-black.jpg"
  },
  {
    "id": "oversized",
    "name": "Oversized Line",
    "count": 5,
    "banner": "assets/categories/oversized/repvault-oversized-lookbook-black.jpg"
  },
  {
    "id": "shorts",
    "name": "Performance Shorts",
    "count": 5,
    "banner": "assets/categories/shorts/Category_Banners_SHORTS__jpg_4c2913df-c57c-4ef3-8d45-4290e386e79af553.jpg"
  },
  {
    "id": "stringers",
    "name": "Stringers & Tanks",
    "count": 5,
    "banner": "assets/categories/stringers/Category_Banners_STRINGERS__jpgd40f.jpg"
  },
  {
    "id": "training",
    "name": "Training & Ironclad",
    "count": 5,
    "banner": "assets/categories/training/Frame_275_jpg6974.jpg"
  },
  {
    "id": "accessories",
    "name": "Gear & Backpacks",
    "count": 5,
    "banner": "assets/categories/accessories/ElevateBackpacks_4a394.jpg"
  },
  {
    "id": "womens",
    "name": "Women's Activewear",
    "count": 5,
    "banner": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg"
  }
];

export const PRODUCTS = [
  {
    "id": "rv-polo-black",
    "name": "Vault Pro Athletic Polo — Stealth Black",
    "category": "t-shirts",
    "categoryName": "T-Shirts & Polos",
    "price": 1499,
    "originalPrice": 2299,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 342,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-6bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg"
    ],
    "video": "assets/videos/showcases/dfe64c9c40594804b8349ba2b92d6ac5.HD-1080p-2.5Mbps-86067808a4f0.mp4",
    "description": "Engineered for athletes transitioning from high-intensity training to smart lifestyle wear. Crafted with high-stretch pique fabric featuring anti-odor silver ion technology and a reinforced collar that never curls.",
    "fabric": "92% Performance Cotton, 8% Spandex (240 GSM)",
    "features": [
      "Anti-Curl Reinforced Collar",
      "Moisture-Wicking Fast Dry Finish",
      "Athletic Tapered Fit",
      "4-Way Mechanical Stretch"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-tee-classic",
    "name": "Vault Core Performance Crew — Stealth Black",
    "category": "t-shirts",
    "categoryName": "T-Shirts & Polos",
    "price": 1199,
    "originalPrice": 1799,
    "badge": "FEATURED",
    "rating": 4.8,
    "reviewCount": 189,
    "primaryImage": "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
    "gallery": [
      "assets/categories/t-shirts/repvault-polo-tshirt-black-2bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-tshirt-black-1bf0a.jpg",
      "assets/categories/t-shirts/repvault-polo-key-highlights-54e6b.jpg"
    ],
    "description": "The definitive daily workout t-shirt. High breathability poly-spandex blend that moves with every muscle contraction without riding up or losing its shape.",
    "fabric": "95% Micro-Poly, 5% Elastane",
    "features": [
      "Sweat-Wicking Technology",
      "Zero Chafe Flatlock Seams",
      "Pre-Shrunk Ring-Spun Weave"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-ironclad-yback-stringer",
    "name": "Vault Ironclad Y-Back Power Stringer — Stealth Black",
    "category": "stringers",
    "categoryName": "Stringers & Tanks",
    "price": 1099,
    "originalPrice": 1699,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 310,
    "primaryImage": "assets/categories/stringers/Category_Banners_STRINGERS__jpgd40f.jpg",
    "gallery": [
      "assets/categories/stringers/Category_Banners_STRINGERS__jpgd40f.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg"
    ],
    "video": "assets/videos/showcases/215afec0807144c0bdd716421082048a.HD-1080p-2.5Mbps-26605012a4f0.mp4",
    "description": "Designed for relentless back days and heavy pulling sessions. Deep Y-back cut ensures zero lat impingement while reinforced shoulder straps prevent sagging.",
    "fabric": "95% Combed Performance Cotton, 5% Spandex (180 GSM)",
    "features": [
      "Deep Ergonomic Y-Back Contour",
      "Reinforced Bound Armholes",
      "4-Way Mechanical Elasticity",
      "Zero Lat Impingement Design"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-hybrid-slim-track",
    "name": "Engineered Hybrid Slim Track Pants — Matte Black",
    "category": "joggers",
    "categoryName": "Joggers & Tracks",
    "price": 1899,
    "originalPrice": 2899,
    "badge": "BESTSELLER",
    "rating": 5,
    "reviewCount": 412,
    "primaryImage": "assets/categories/joggers/repvault-hybrid-slim-track-black.jpg",
    "gallery": [
      "assets/categories/joggers/repvault-hybrid-slim-track-black-highlights-42ce4937.png",
      "assets/categories/joggers/Category_Banners_JOGGERS__jpgb5f9.jpg"
    ],
    "video": "assets/videos/showcases/008ef119327e450d8089f98580307d9e.HD-1080p-2.5Mbps-95887962a4f0.mp4",
    "description": "Built with dual-zone performance textiles: French Terry upper for supreme softness and durable woven lower for quad support and zero drag. Concealed zip pockets keep phones locked during squats.",
    "fabric": "French Terry Cotton / Performance Poly Gusset",
    "features": [
      "Deep Concealed Phone Zip Pockets",
      "Articulated Knee Darts",
      "Custom Heavy Drawcord with Metal Aglets",
      "Tapered Ankle Fit"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-carpenter-cargo",
    "name": "Vault Utility Carpenter Cargo Pants — Raw Sand",
    "category": "joggers",
    "categoryName": "Joggers & Tracks",
    "price": 2199,
    "originalPrice": 3299,
    "badge": "NEW DROP",
    "rating": 4.9,
    "reviewCount": 156,
    "primaryImage": "assets/categories/joggers/Carpenter_pants_3582a.png",
    "gallery": [
      "assets/categories/joggers/Carpenter_pants_3582a.png",
      "assets/categories/joggers/Carpenter_pants_29ffb.png",
      "assets/categories/joggers/Carpenter_pants_1582a.png"
    ],
    "description": "Heavyweight utility streetwear engineered for durability. Features 6 reinforced tactical pockets, hammer loop styling, and an ergonomic wide-leg cut with adjustable bungee cuffs.",
    "fabric": "100% Heavy Cotton Twill (320 GSM)",
    "features": [
      "6 Reinforced Utility Pockets",
      "Hammer Loop Tactical Accent",
      "Custom Bungee Ankle Cinchers",
      "Heavyweight Twill Construction"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-comp-short-black",
    "name": "Vault Armor Muscle Compression Tee — Obsidian Black",
    "category": "compression",
    "categoryName": "Compression Tech",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "HIGH TECH",
    "rating": 5,
    "reviewCount": 520,
    "primaryImage": "assets/categories/compression/repvault-compression-short-black.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-tshirt-black-10403c.png",
      "assets/categories/compression/repvault-compression-tshirt-black-10334a.png",
      "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png"
    ],
    "video": "assets/videos/showcases/a1c5d5f1b18a43ebbb1647e6a18e0333.HD-1080p-2.5Mbps-25915012a4f0.mp4",
    "description": "Second-skin anatomical compression engineered to increase blood circulation, reduce muscle oscillation, and accelerate workout recovery. Targeted thermal ventilation zones prevent overheating.",
    "fabric": "85% High-Elasticity Nylon, 15% Spandex (220 GSM)",
    "features": [
      "Graduated Muscular Compression",
      "Targeted Underarm Ventilation Weave",
      "High-Impact Raglan Seams",
      "Second-Skin Second Layer Fit"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-comp-long-black",
    "name": "Vault Armor Full-Sleeve Compression — Obsidian Black",
    "category": "compression",
    "categoryName": "Compression Tech",
    "price": 1499,
    "originalPrice": 2299,
    "badge": "HOT",
    "rating": 4.9,
    "reviewCount": 288,
    "primaryImage": "assets/categories/compression/repvault-compression-long-black.jpg",
    "gallery": [
      "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png",
      "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
      "assets/categories/compression/repvault-compression-tshirt-black-10403c.png"
    ],
    "description": "Full arm muscular compression support for heavy lifting and cold weather training. Keeps biceps, triceps, and forearms warm while maximizing blood oxygenation.",
    "fabric": "85% Nylon, 15% Spandex Second-Skin Weave",
    "features": [
      "Full Bicep & Forearm Compression",
      "Thermal Heat Retention",
      "Anti-Chafing Flatlock Stitching",
      "High Stretch Recovery"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-comp-long-white",
    "name": "Vault Armor Full-Sleeve Compression — Pure White",
    "category": "compression",
    "categoryName": "Compression Tech",
    "price": 1499,
    "originalPrice": 2299,
    "badge": "NEW",
    "rating": 4.8,
    "reviewCount": 164,
    "primaryImage": "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
    "gallery": [
      "assets/categories/compression/repvault-compression-fullsleeve-white-1045a0.png",
      "assets/categories/compression/repvault-compression-tshirt-white-100af8.png",
      "assets/categories/compression/repvault-compression-fullsleeve-black-10af77.png"
    ],
    "description": "Clean aesthetic high-impact compression base layer in pure white. Opaque high-density knit provides total coverage with zero translucency during max stretch.",
    "fabric": "85% Nylon, 15% Spandex High-Density Knit",
    "features": [
      "Non-See-Through Opaque Weave",
      "UV 50+ Sun Protection",
      "Fast Moisture Vaporization"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-2in1-shorts-black",
    "name": "Vault Velocity 2-in-1 Compression Shorts — Stealth Black",
    "category": "shorts",
    "categoryName": "Performance Shorts",
    "price": 1399,
    "originalPrice": 2099,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 387,
    "primaryImage": "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
    "gallery": [
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg",
      "assets/categories/shorts/repvault-2in1-compression-shorts-white-1097f7.png",
      "assets/categories/shorts/Category_Banners_SHORTS__jpg_4c2913df-c57c-4ef3-8d45-4290e386e79af553.jpg"
    ],
    "video": "assets/videos/showcases/45d29794eaa5408c92b345387c950650.HD-720p-1.6Mbps-43318857a4f0.mp4",
    "description": "The ultimate training short. Featherlight 4-way stretch outer shell paired with an integrated compression inner liner that locks your phone tightly to your thigh with zero bounce.",
    "fabric": "Outer: 90% Poly, 10% Elastane / Liner: 85% Nylon, 15% Spandex",
    "features": [
      "Integrated Thigh Phone Compression Pocket",
      "Towel Loop on Rear Waistband",
      "Laser-Cut Side Hem Slits for Squat Mobility",
      "Hidden Zipper Pocket"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-2in1-shorts-red",
    "name": "Vault Laser-Airflow 2-in-1 Shorts — Crimson Volt",
    "category": "shorts",
    "categoryName": "Performance Shorts",
    "price": 1399,
    "originalPrice": 2099,
    "badge": "HOT",
    "rating": 4.8,
    "reviewCount": 142,
    "primaryImage": "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
    "gallery": [
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp589c.jpg",
      "assets/categories/shorts/Product-Banner-13-04-26-_2-in-1-laser-shorts-red__jpg.webp95aa.jpg",
      "assets/categories/shorts/repvault-2in1-shorts-black-c97c.jpg"
    ],
    "description": "High visibility training shorts equipped with laser-perforated cooling panels on heat zones and an ultra-soft compression liner for zero chafing.",
    "fabric": "High-Density Laser-Perforated Poly / Spandex Liner",
    "features": [
      "Laser Perforated Heat Dissipation",
      "Integrated Liner Pocket",
      "Elastic Waistband with Flat Drawcord"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-speed-tank-green",
    "name": "Vault Aero Speed Running Tank — Sea Green",
    "category": "stringers",
    "categoryName": "Stringers & Tanks",
    "price": 999,
    "originalPrice": 1599,
    "badge": "POPULAR",
    "rating": 4.8,
    "reviewCount": 220,
    "primaryImage": "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
    "gallery": [
      "assets/categories/stringers/SpeedRunningTankSeagreen_3f995.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_3a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_2a3d8.jpg",
      "assets/categories/stringers/SpeedRunningTankSeagreen_137e3.jpg"
    ],
    "description": "Ultralight racerback tank cut specifically to free up your shoulder joints during overhead presses and lateral raises. Highly breathable mesh structure.",
    "fabric": "100% Aerodynamic Poly-Mesh (140 GSM)",
    "features": [
      "Racerback Ergonomic Cut",
      "Deep Armhole Lat Freedom",
      "Reflective Heat-Transfer Accents",
      "Ultra-Breathable Micro Mesh"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-og-oversized-olive",
    "name": "Vault OG Dropped-Shoulder Oversized Tee — Olive Drab",
    "category": "oversized",
    "categoryName": "Oversized Line",
    "price": 1399,
    "originalPrice": 2099,
    "badge": "STREETWEAR",
    "rating": 4.9,
    "reviewCount": 395,
    "primaryImage": "assets/categories/oversized/repvault-oversized-lookbook-black.jpg",
    "gallery": [
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg63e8.jpg",
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg287f.jpg",
      "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg"
    ],
    "description": "Heavyweight streetwear silhouette tailored with dropped shoulder seams, an extended boxy chest, and a snug ribbed neckline that never sags.",
    "fabric": "100% Combed Heavy Cotton (260 GSM)",
    "features": [
      "260 GSM Heavy Weight Feel",
      "Dropped Shoulder Extended Boxy Cut",
      "High-Density Non-Sag Ribbed Neck",
      "Bio-Washed Vintage Softness"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-raw-washed-tracks",
    "name": "Vault Acid-Washed Relaxed Heavy Tracks — Dark Grey",
    "category": "oversized",
    "categoryName": "Oversized Line",
    "price": 1999,
    "originalPrice": 2999,
    "badge": "LIMITED",
    "rating": 5,
    "reviewCount": 215,
    "primaryImage": "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg",
    "gallery": [
      "assets/categories/oversized/Raw-washed-tracks-d-_7a311.jpg",
      "assets/categories/oversized/Raw-washed-tracks-d-_6e6cf.jpg",
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg63e8.jpg"
    ],
    "description": "Custom mineral acid wash creates a distinctive weathered patina on every garment. Relaxed thigh contour with heavy elasticated bottom cuffs.",
    "fabric": "100% Terry Fleece (340 GSM)",
    "features": [
      "Custom Mineral Acid Wash Patina",
      "340 GSM Heavy Weight Terry",
      "Deep Welted Side Pockets",
      "Extra Long Heavyweight Drawcord"
    ],
    "sizes": [
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-performance-tee-black",
    "name": "Vault Apex High-Output Training Tee — Pitch Black",
    "category": "training",
    "categoryName": "Training & Ironclad",
    "price": 1249,
    "originalPrice": 1899,
    "badge": "CORE",
    "rating": 4.8,
    "reviewCount": 198,
    "primaryImage": "assets/categories/training/repvault-performance-black-2c8ea.jpg",
    "gallery": [
      "assets/categories/training/repvault-performance-black-2c8ea.jpg",
      "assets/categories/training/repvault-performance-black-22c12.jpg",
      "assets/categories/training/repvault-performance-black-45067.jpg"
    ],
    "description": "Built for intense HIIT, powerlifting, and CrossFit sessions. Engineered with 4-way mechanical stretch that never constricts during benching or pull-ups.",
    "fabric": "92% Performance Poly, 8% Elastane (190 GSM)",
    "features": [
      "4-Way Mechanical Stretch",
      "Quick-Drying Capillary Action",
      "Tapered Muscle Fit",
      "Anti-Odor Bio-Shield Treatment"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-ironclad-tracks",
    "name": "Vault Ironclad Reinforced Straight Tracks — Charcoal",
    "category": "training",
    "categoryName": "Training & Ironclad",
    "price": 1899,
    "originalPrice": 2799,
    "badge": "DURABLE",
    "rating": 4.9,
    "reviewCount": 172,
    "primaryImage": "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
    "gallery": [
      "assets/categories/training/IroncladStraightTracks_5_13c3a21d-ce7a-4a93-9a04-53f6bb1c86f6.webpf67f.jpg",
      "assets/categories/training/Frame_275_jpg6974.jpg"
    ],
    "description": "Straight-leg profile with reinforced knee fabric panels to prevent abrasions during deadlifts and ground workouts.",
    "fabric": "Heavy Poly-Cotton Weave with Cordura-Reinforced Knees",
    "features": [
      "Abrasion-Resistant Knee Panels",
      "Straight-Leg Classic Drape",
      "Heavyweight Metal Zippers"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-elevate-backpack",
    "name": "Vault Elevate Weatherproof Tactical Backpack — 35L",
    "category": "accessories",
    "categoryName": "Gear & Backpacks",
    "price": 2499,
    "originalPrice": 3999,
    "badge": "BESTSELLER",
    "rating": 5,
    "reviewCount": 467,
    "primaryImage": "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
    "gallery": [
      "assets/categories/accessories/ElevateBackpacks_4a394.jpg",
      "assets/categories/accessories/ElevateBackpacks_4bbb4.jpg",
      "assets/categories/accessories/statement-bp-black-_94aaa.jpg",
      "assets/categories/accessories/Statement-Backpack-_A_-Description__jpge39d.jpg"
    ],
    "video": "assets/videos/showcases/5d512f8e486446509a148e72c70cd363.HD-1080p-2.5Mbps-47972239a4f0.mp4",
    "description": "Engineered for athletes on the move. Features an isolated ventilated shoe compartment, 16-inch padded laptop sleeve, dual protein shaker pockets, and water-repellent matte exterior.",
    "fabric": "1000D Ballistic Water-Repellent Nylon",
    "features": [
      "35L Total Capacity",
      "Isolated Ventilated Sneaker Tunnel",
      "Padded 16\" Laptop Compartment",
      "Waterproof Rubberized YKK Zippers",
      "Sternum Support Strap"
    ],
    "sizes": [
      "One Size (35L)"
    ]
  },
  {
    "id": "rv-athletic-cap",
    "name": "Vault Shield Curved-Brim Performance Cap — Pitch Black",
    "category": "accessories",
    "categoryName": "Gear & Backpacks",
    "price": 699,
    "originalPrice": 1199,
    "badge": "ESSENTIAL",
    "rating": 4.8,
    "reviewCount": 154,
    "primaryImage": "assets/categories/accessories/gym-caps-men9766.jpg",
    "gallery": [
      "assets/categories/accessories/gym-caps-men9766.jpg",
      "assets/categories/accessories/ElevateBackpacks_4a394.jpg"
    ],
    "description": "Moisture-wicking athletic cap with an interior sweatband, laser-cut ventilation eyelets, and an adjustable custom metal buckle clasp.",
    "fabric": "100% Quick-Dry Poly Weave",
    "features": [
      "Laser-Cut Airflow Eyelets",
      "Moisture-Absorbing Inner Band",
      "Structured 6-Panel Crown"
    ],
    "sizes": [
      "Adjustable (One Size)"
    ]
  },
  {
    "id": "rv-pro-sports-bra-blue",
    "name": "Vault Sculpt High-Impact Sports Bra — Ocean Blue",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "price": 1199,
    "originalPrice": 1799,
    "badge": "BESTSELLER",
    "rating": 4.9,
    "reviewCount": 312,
    "primaryImage": "assets/categories/womens/repvault-sports-bra-ocean-blue.jpg",
    "gallery": [
      "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
      "assets/categories/womens/pro-sports-bra-rust-size-up97f3.png",
      "assets/categories/womens/repvault-womens-banner-3bc0d.jpg"
    ],
    "description": "Engineered for zero-bounce support during sprints, jumps, and heavy lifts. Features removable molded cups and a wide elastic chest band.",
    "fabric": "78% Polyamide, 22% Elastane Butter-Soft Finish",
    "features": [
      "Maximum Bounce Reduction",
      "Removable Ergonomic Cups",
      "Sweat-Wicking Four-Way Stretch",
      "Chafe-Free Flat Seams"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L"
    ]
  },
  {
    "id": "rv-highrise-leggings-navy",
    "name": "Vault Sculpt High-Rise Seamless Leggings — Midnight Navy",
    "category": "womens",
    "categoryName": "Women's Activewear",
    "price": 1699,
    "originalPrice": 2499,
    "badge": "SQUAT PROOF",
    "rating": 5,
    "reviewCount": 420,
    "primaryImage": "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
    "gallery": [
      "assets/categories/womens/Active-High-Rise-Leggings-Navy-Key-Highlights8a2e.png",
      "assets/categories/womens/pro-sports-bra-ocean-blue-size-up29fe.png",
      "assets/categories/womens/repvault-womens-banner-3bc0d.jpg"
    ],
    "description": "100% squat-tested opaque performance leggings with a compressive double-layered ribbed waistband that stays anchored throughout intense movement.",
    "fabric": "80% Nylon, 20% Spandex Interlock Knit",
    "features": [
      "100% Squat-Proof Guaranteed",
      "Double-Layered Ribbed Core Band",
      "Zero Front Seam to Prevent Riding",
      "Buttery Soft Compression"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL"
    ]
  },
  {
    "id": "rv-flagship-hoodie-black",
    "name": "Vault Thrive Engineered Pullover Hoodie — Matte Black",
    "category": "mens",
    "categoryName": "Men's Flagship",
    "price": 2299,
    "originalPrice": 3499,
    "badge": "FLAGSHIP",
    "rating": 5,
    "reviewCount": 388,
    "primaryImage": "assets/categories/mens/MH0108518aef.jpg",
    "gallery": [
      "assets/categories/mens/MH0108518aef.jpg",
      "assets/categories/mens/1407b.jpg",
      "assets/categories/mens/Mens_Launch_Key_Highlight_22-10-26_jpg5ff9.jpg"
    ],
    "video": "assets/videos/showcases/215afec0807144c0bdd716421082048a.HD-1080p-2.5Mbps-26605012a4f0.mp4",
    "description": "The pinnacle of REPVAULT craftsmanship. Built with 380 GSM ultra-dense loopback French Terry, an athletic crossover neckline, and a structured three-panel hood.",
    "fabric": "100% Loopback French Terry Cotton (380 GSM)",
    "features": [
      "380 GSM Ultra-Heavyweight Terry",
      "Crossover Athletic Ergonomic Hood",
      "Concealed Interior Kangaroo Phone Sleeve",
      "High-Tensile Ribbed Cuffs"
    ],
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ]
  }
  ,
  {
    "id": "rv-hooded-zipup",
    "name": "Vault Aesthetic Hooded Zip-Up — Chalk Beige",
    "category": "oversized",
    "categoryName": "Hoodies & Jackets",
    "price": 1299,
    "originalPrice": 2199,
    "badge": "FEATURED",
    "rating": 4.9,
    "reviewCount": 142,
    "primaryImage": "assets/featured/zipup-main.jpg",
    "gallery": [
      "assets/featured/zipup-main.jpg",
      "assets/featured/zipup-thumb-1.jpg",
      "assets/featured/zipup-thumb-2.jpg",
      "assets/featured/zipup-thumb-3.jpg"
    ],
    "video": "assets/videos/hero/0cf42c5e22d448dbaf1d0087345de2bd.mp4",
    "description": "Engineered for pump cover warmups and everyday athletic lifestyle. Built with premium combed cotton fleece, reinforced metallic two-way zipper, and tailored dropped shoulders.",
    "fabric": "95% Combed Cotton, 5% Elastane (340 GSM)",
    "features": [
      "Custom Antique Silver Zip Hardware",
      "Ergonomic Lined Crossover Hood",
      "Concealed Zip Audio/Key Pockets",
      "Shape-Retaining Ribbed Hem"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ]
  },
  {
    "id": "rv-oversized-wings-black",
    "name": "Vault Eagle Wings Graphic Oversized Tee — Stealth Black",
    "category": "oversized",
    "categoryName": "Oversized Collection",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "35% OFF",
    "rating": 4.9,
    "reviewCount": 218,
    "primaryImage": "assets/categories/oversized/oversized-back-1.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-1.jpg",
      "assets/categories/oversized/Product-Banner-05-08-26-_OG-Oversized-T-Shirt-Olive__jpg63e8.jpg"
    ],
    "video": "assets/videos/showcases/008ef119327e450d8089f98580307d9e.HD-1080p-2.5Mbps-95887962a4f0.mp4",
    "description": "240 GSM dense combed jersey with archival winged emblem screen print across broad athletic shoulders.",
    "fabric": "100% Combed Heavy Cotton (240 GSM)",
    "features": [
      "High-Density Screen Back Print",
      "Thick 1-Inch Ribbed Crew Neck",
      "Drop-Shoulder Boxy Silhouette",
      "Pre-Shrunk Bio-Washed Finish"
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"]
  },
  {
    "id": "rv-oversized-typo-beige",
    "name": "Vault Archival Typography Heavyweight Tee — Chalk Beige",
    "category": "oversized",
    "categoryName": "Oversized Collection",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "35% OFF",
    "rating": 4.8,
    "reviewCount": 184,
    "primaryImage": "assets/categories/oversized/oversized-back-2.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-2.jpg"
    ],
    "video": "assets/videos/showcases/215afec0807144c0bdd716421082048a.HD-1080p-2.5Mbps-26605012a4f0.mp4",
    "description": "Minimalist front chest logo paired with bold high-contrast back statement typography for casual lifters.",
    "fabric": "100% Combed Heavy Cotton (240 GSM)",
    "features": [
      "High-Density Screen Back Print",
      "Reinforced Double-Stitched Seams",
      "Drop-Shoulder Boxy Silhouette",
      "Breathable Natural Fiber"
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"]
  },
  {
    "id": "rv-oversized-raw-cherry",
    "name": "Vault Raw Washed Heavyweight Boxy Tee — Crimson Maroon",
    "category": "oversized",
    "categoryName": "Oversized Collection",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "35% OFF",
    "rating": 5.0,
    "reviewCount": 96,
    "primaryImage": "assets/categories/oversized/oversized-back-3.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-3.jpg"
    ],
    "video": "assets/videos/showcases/45d29794eaa5408c92b345387c950650.HD-720p-1.6Mbps-43318857a4f0.mp4",
    "description": "Acid-mineral wash effect with distinctive athletic crest back artwork. Superb drape over lats and traps.",
    "fabric": "100% Acid-Washed Ring-Spun Cotton (240 GSM)",
    "features": [
      "Vintage Acid Wash Distressing",
      "Fade-Resistant Discharge Print",
      "Relaxed Oversized Cut",
      "Zero Side Seams"
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"]
  },
  {
    "id": "rv-oversized-heritage-brown",
    "name": "Vault Monogram Vertical Typography Tee — Vintage Charcoal",
    "category": "oversized",
    "categoryName": "Oversized Collection",
    "price": 1299,
    "originalPrice": 1999,
    "badge": "35% OFF",
    "rating": 4.9,
    "reviewCount": 162,
    "primaryImage": "assets/categories/oversized/oversized-back-4.jpg",
    "gallery": [
      "assets/categories/oversized/oversized-back-4.jpg"
    ],
    "video": "assets/videos/showcases/5d512f8e486446509a148e72c70cd363.HD-1080p-2.5Mbps-47972239a4f0.mp4",
    "description": "Vertical spine typography print engineered to emphasize spinal erector width and back taper.",
    "fabric": "100% Combed Heavy Cotton (240 GSM)",
    "features": [
      "Vertical Spine Architectural Print",
      "Thick Ribbed Crew Neck",
      "Heavyweight Streetwear Feel",
      "Silicon Softener Wash"
    ],
    "sizes": ["S", "M", "L", "XL", "XXL"]
  }
];