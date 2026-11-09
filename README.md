# REPVAULT | Engineered Athletic Couture & High-Performance Apparel

> **Official Flagship E-Commerce Platform**  
> Complete brand transformation & React migration for **REPVAULT**, an architectural athletic fashion brand crafting 260 GSM heavyweight oversized streetwear, precision compression rashguards, performance 2-in-1 shorts, and tailored luxury sportswear.

---

## 🏛️ Brand Identity & Logo Redesign

- **Brand Monogram:** Geometric architectural vault key monogram with high-tension precision lines.
- **Wordmark:** Luxury high-tracking geometric typography: `REPVAULT • ATHLETIC COUTURE • EST. 2026`.
- **Assets:**
  - `public/icons/logo.svg` — Dark monogram & typography on transparent background for light UI.
  - `public/icons/logo-white.svg` — White monogram & typography on transparent background for dark UI & footer.
  - `public/icons/logo-icon.svg` & `public/favicon.svg` — Square monogram icon for browser tabs & mobile navigation.

---

## ⚡ Key Highlights & Architecture

1. **Complete React Architecture (Strictly No Tailwind CSS):**
   - Built with **React 18**, **React Router v6**, and **Vite**.
   - Modular, responsive CSS based on the REPVAULT design system.
   - Zero splash screens or artificial loading delays — opens directly and uses skeleton loaders during asynchronous data fetching.

2. **Expanded 80-Product Catalog (8 Unique Products Per Category):**
   - **Men's Oversized Tees:** 260 GSM boxy silhouettes, acid-washed minerals, technical blueprint back-prints.
   - **Compression Wear:** Graduated vascular rashguards, flatlock seam baselayers, thermal full-sleeves.
   - **Gym T-Shirts & Polos:** Anti-curl performance pique polos, Supima cotton crews, seamless knits.
   - **Tanks & Stringers:** Deep-cut Y-back stringers, featherweight aeromesh running tanks, raw-edge cuts.
   - **Training Shorts:** 2-in-1 compression inner liner shorts with bounce-free phone pockets & laser vents.
   - **Joggers & Track Pants:** Hybrid slim-taper joggers, raw-washed straight tracks, utility carpenter cargos.
   - **Performance & Ironclad:** Barbell-proof knurling-resistant gear, squat grip silicone prints, heavy powerlifting tops.
   - **Hoodies & Jackets:** French terry aesthetic crop zip-ups with two-way gunmetal YKK zips, 400 GSM pullovers.
   - **Women's Activewear:** High-impact sculpt sports bras, 100% squat-proof seamless high-rise leggings.
   - **Gear & Accessories:** 1000D Cordura 35L tactical backpacks with shoe pockets, snapback caps, heavy lifting straps.

3. **Complete Shopping Journey:**
   - **Homepage:** Editorial hero carousel, Explore by Category, Featured Product Spotlight, Division tabs, textile engineering highlights, bestsellers.
   - **Catalog & Shop:** Instant multi-facet filter sidebar (Categories, Gender, Size, Price Range), real-time sorting, and active filter chips.
   - **Product Detail Page (PDP):** Multi-angle gallery stack with zoom preview, color swatches, size selector with interactive Size Guide modal, stock alert, quantity stepper, Add to Cart, Buy Now, accordion technical specs, and related styles.
   - **Slide-Out Bag Drawer & Cart Page:** Free express shipping threshold meter (₹1,000 threshold), coupon code engine (`VAULT10`, `WELCOME20`, `REP50`), line item controls.
   - **Checkout & Real Order Placement:** Full shipping address form, payment selector (UPI, Credit/Debit Card, Net Banking, COD), and server-side order generation.
   - **Order Confirmation & Tracking:** Unique Order IDs (`RV-XXXXXX-XXXX`), verified checkmark, printable receipt, and interactive 5-stage delivery tracking simulator.
   - **Wishlist & Authentication:** Persistent wishlist with Move to Bag actions, user account sign-in/registration.

4. **REST API Backend (`server.js`):**
   - `GET /api/categories` — Catalog divisions with counts and imagery.
   - `GET /api/products` — Filterable and sortable catalog list with search and pagination.
   - `GET /api/products/:id` — Single product details.
   - `POST /api/coupons/validate` — Validates coupon codes and computes discounts.
   - `POST /api/orders` — Validates order details, calculates taxes/shipping, and persists to `data/orders.json`.
   - `GET /api/orders/:id` — Order status retrieval and tracking timeline.
   - `POST /api/auth/login` & `POST /api/auth/register` — Session authentication.

---

## 🚀 Running the Project

### Development (React + Vite)
```bash
npm run dev
# Vite runs at http://localhost:3000
```

### Production Build & Server
```bash
# 1. Compile production bundle
npm run build

# 2. Start REST API & static server
npm run server
# Server live at http://localhost:3000
```

---

## 📁 Source Code Organization

```
repvault_website/
├── public/                 # Static assets, icons, logo SVGs, favicon
│   ├── favicon.svg
│   └── icons/
├── src/
│   ├── assets/             # Brand logos & imagery
│   ├── components/         # Reusable UI components
│   │   ├── AnnouncementBar.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── SearchModal.jsx
│   │   ├── SizeGuideModal.jsx
│   │   ├── SkeletonCard.jsx
│   │   └── Toast.jsx
│   ├── context/            # Global state providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── data/               # 80-Product Catalog dataset
│   │   └── products.js
│   ├── pages/              # Route pages
│   │   ├── Cart.jsx
│   │   ├── Category.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── OrderConfirmation.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Register.jsx
│   │   ├── Shop.jsx
│   │   └── Wishlist.jsx
│   ├── services/           # REST API client
│   │   └── api.js
│   ├── styles/             # Master CSS (No Tailwind)
│   │   └── main.css
│   ├── App.jsx             # Main Router layout
│   └── main.jsx            # Application entry point
├── data/
│   └── orders.json         # Order persistence store
├── server.js               # Node REST API & static server
├── vite.config.js          # Vite config
└── package.json
```
