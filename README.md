# REPVAULT — Engineered High-Performance Athletic Gymwear

**REPVAULT** is a premium athletic clothing e-commerce website and interactive 3D apparel showcase.

> **Tagline:** BUILT FOR THE GRIND.

---

## 🌟 Highlights & Features

- **Interactive 3D WebGL Showroom & Preloader**: Real-time 3D procedural garment models (T-shirts & Track Pants) built with Three.js featuring 360° rotation, real-time lighting, decals, and colorway swatches.
- **Complete Brand Transformation**: Engineered typography, custom SVG Vault Shield monograms, and modern athletic streetwear aesthetics.
- **Men's & Women's Collections**:
  - Oversized gym T-shirts, compression armor, performance training crews, minimalist polo shirts, Y-back stringers, hoodies, hybrid track joggers, utility cargo pants, and 2-in-1 shorts.
  - High-impact seamless sports bras and high-rise squat-proof leggings.
  - Tactical backpacks and performance headwear.
- **Full E-Commerce State Management**:
  - Filter by category, sorting by price and arrival date, live search modal, dynamic product cards.
  - Slide-out quick size selector drawer (S, M, L, XL, XXL).
  - Multi-angle product detail pages (PDP) with accordion specifications, size charts, and zoom gallery.
  - Persistent shopping cart drawer with local storage and quantity adjustments.
- **Responsive Architecture**: Fully responsive across desktop, laptop, tablet, and mobile devices.

---

## 📁 Project Structure

```text
repvault_website/
├── index.html                  # Main homepage with 3D preloader & new arrivals spotlight
├── collections.html            # E-commerce product catalog with interactive filters & sorting
├── product.html                # Dynamic product detail page (PDP)
├── loading.html                # Standalone 3D Collections Lab & Preloader
├── 3d-collections.html         # Canonical 3D visualizer page
├── server.js                   # Zero-dependency local Node.js static HTTP server
├── css/
│   └── styles.css              # Design tokens, responsive grid, animations & transitions
├── js/
│   ├── app.js                  # Frontend state controller, cart drawer, search, PDP logic
│   └── products.js             # Catalog data, pricing in INR, categories, and image mappings
├── icons/                      # SVG brand logos & icons
├── fonts/                      # Montserrat web fonts
└── assets/                     # High-definition sportswear photography, banners & video showcases
```

---

## 🚀 Getting Started

To run the site locally:

```bash
node server.js
```

Then open your browser at:
- **Homepage**: `http://localhost:3000`
- **3D Showroom**: `http://localhost:3000/loading.html`
- **Catalog**: `http://localhost:3000/collections.html`
- **Product Detail**: `http://localhost:3000/product.html?id=rv-polo-black`
