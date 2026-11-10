# OLIVER SUPPLEMENT SHOP | Fuel Your Body. Build Your Best.

> **Official Flagship Sports Nutrition E-Commerce Platform**  
> Complete brand transformation into **OLIVER SUPPLEMENT SHOP**, an aggressive, premium, international-quality sports nutrition e-commerce platform dedicated exclusively to 100% genuine Whey Protein, Whey Isolate, Mass Gainers, Creatine, Pre-Workout, BCAA/EAA, Fish Oil, and Performance Supplements. Zero apparel or clothing products.

---

## 🏛️ Brand Identity & Design System

- **Brand Logo & Mark:** Heavyweight athletic display typography with sharp red accent angles: `OLIVER • SPORTS NUTRITION • EST. 2026`.
- **Primary Color Palette:**
  - Primary Black: `#090909` (Primary background)
  - Secondary Black: `#111111` (Elevated cards & sections)
  - Card Background: `#171717` (Product & category cards)
  - Elevated Background: `#202020` (Modals & popups)
  - Brand Red: `#E50914` (CTA buttons, badges, highlights)
  - Deep Red: `#B8000A` (Active states, gradients)
  - Red Highlight: `#FF2424` (Focus rings, neon accents)
  - Pure White: `#FFFFFF` (Headings & high-contrast text)
  - Secondary Text: `#B8B8B8` (Body copy, specs)
  - Muted Text: `#777777` (Disclaimers, secondary tags)
  - Dark Border: `#303030` (Hairline dividers & borders)
- **Typography:**
  - Headings: `Barlow Condensed` / `Montserrat` (Extra Bold, 800/900 weight, uppercase athletic styling)
  - Body: `Montserrat` (Clean geometric sans-serif)

---

## ⚡ Key Highlights & Architecture

1. **Complete React Architecture (Zero Tailwind CSS):**
   - Built with **React 18**, **React Router v6**, and **Vite 6**.
   - Modular, scoped CSS variables matching the OLIVER design system (`main.css` + `oliver-components.css`).
   - High-performance, zero layout shift, skeleton loaders, and instant transitions.

2. **65-Product Genuine Sports Nutrition Catalog:**
   - Sourced directly from verified supplement product archives with 512x1033 high-resolution pack shots.
   - 14 Dedicated Categories:
     1. Whey Protein
     2. Whey Protein Isolate
     3. Mass Gainers
     4. Creatine
     5. Pre-Workout
     6. BCAA and EAA
     7. Vitamins and Minerals
     8. Fish Oil and Omega-3
     9. Protein Bars and Snacks
     10. Electrolytes
     11. Health and Wellness Supplements
     12. Recovery and Sleep
     13. Fat Burners & Thermogenics
     14. Gym Shakers & Bottles
   - 10 Certified Global & Domestic Brands:
     - **OLIVER Pro Nutrition** (Flagship House Brand)
     - **Optimum Nutrition (ON)**
     - **MuscleTech**
     - **Dymatize**
     - **Myprotein**
     - **Cellucor**
     - **MuscleBlaze**
     - **GNC**
     - **Universal Nutrition**
     - **Rule 1**
   - Rich nutritional data for every product: serving size, protein/carb/fat macros, key ingredients, allergens, dosage instructions, flavors, and weights.

3. **Complete 33-Page Shopping Journey:**
   - **Cinematic Homepage (`/`):** Full-bleed hero banner featuring elite athlete visual, dramatic red ambient lighting, trust badges, shop by category, best seller carousels, whey and creatine spotlights, partner brand wall, combo deals, and customer reviews.
   - **Shop All (`/shop`):** Multi-facet filtering (category, brand, price range, flavor, weight, rating, discount) and sorting (popularity, price low-high, price high-low, new arrivals, best sellers).
   - **Category Pages (`/category/:slug`):** Dynamic routing for all 14 supplement categories.
   - **Brand Directory (`/brands` & `/brands/:brandSlug`):** Dedicated brand landing pages with brand certificates and products.
   - **Product Detail Page (`/product/:id`):** High-res product zoom, flavor selector, weight selector, macro breakdown tile, 4-tab specs (Supplement Facts, Ingredients, Usage Protocol, Verified Athlete Reviews), and related supplements.
   - **Interactive Protein Calculator:** In-app daily protein intake estimator based on bodyweight, training intensity, and fitness goals with optimal timing matrix.
   - **Cart Drawer & Full Cart Page (`/cart`):** Live free shipping meter (₹999 threshold), coupon system (`OLIVER10`, `FUEL20`, `FIRSTORDER`, `FREESHIP`), flavor/weight line item controls.
   - **Indian Checkout (`/checkout`):** 6-digit PIN code validation, Indian state selection, payment methods (UPI, Debit/Credit Cards, NetBanking, COD).
   - **Order Confirmation & Tracking (`/order-confirmation`, `/track-order`, `/orders`):** Order ID generation (`OLIVER-XXXXXX-XXXX`), printable receipt, live AWB courier timeline.
   - **Athlete Account & Auth (`/account`, `/login`, `/register`):** Profile management, past orders, saved shipping address.
   - **Content & Policy Pages (`/about`, `/contact`, `/faq`, `/shipping-policy`, `/return-policy`, `/privacy-policy`, `/terms`, `/404`):** Full corporate policy pages with FSSAI authenticity verification and helpline details (+91 98888 01234).

4. **REST API Backend (`server.js`):**
   - `GET /api/categories` — Supplement category list and counts.
   - `GET /api/products` — Filterable, sortable supplement catalog with search query parsing.
   - `GET /api/products/:id` — Single supplement details with macros and variants.
   - `POST /api/coupons/validate` — Validates coupon codes (`OLIVER10`, `FUEL20`, `FIRSTORDER`, `FREESHIP`).
   - `POST /api/orders` — Processes supplement orders, calculates 18% GST and shipping, persists to `data/orders.json`.
   - `GET /api/orders/:id` — Order status and tracking timeline.
   - `POST /api/auth/login` & `POST /api/auth/register` — Athlete portal authentication.

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
├── public/
│   ├── favicon.svg
│   ├── icons/               # High-res vector brand logos (logo.svg, logo-white.svg, logo-icon.svg)
│   └── assets/
│       ├── products/        # 65 high-resolution genuine supplement product images + asset_manifest.json
│       ├── brands/          # Certified partner brand logos (ON, MuscleTech, Dymatize, etc.)
│       └── hero/            # Hero athlete visual composition
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx      # Genuine supplements banner & helpline
│   │   ├── Navbar.jsx               # Mega menus for categories and brands
│   │   ├── Footer.jsx               # FSSAI compliance, authenticity seal & navigation
│   │   ├── ProductCard.jsx          # Charcoal product card with quick view and variant pills
│   │   ├── QuickViewModal.jsx       # Modal for rapid supplement inspection
│   │   ├── SupplementGuideModal.jsx # Daily protein calculator & intake guide
│   │   ├── SearchModal.jsx          # Instant live search across all 65 supplements
│   │   ├── CartDrawer.jsx           # Slide-out cart with shipping threshold meter
│   │   ├── Toast.jsx                # Toast feedback notifications
│   │   └── SkeletonCard.jsx         # Loading state placeholder
│   ├── context/
│   │   ├── AuthContext.jsx          # Athlete authentication state
│   │   ├── CartContext.jsx          # Cart state, variants, coupons, free shipping
│   │   └── WishlistContext.jsx      # Wishlist persistence
│   ├── data/
│   │   └── products.js              # Centralized 65-product sports nutrition catalog
│   ├── pages/
│   │   ├── Home.jsx                 # Cinematic hero & showcase sections
│   │   ├── Shop.jsx                 # Full catalog with multi-facet filters
│   │   ├── Category.jsx             # Category filtered views
│   │   ├── ProductDetails.jsx       # PDP with macros, facts table, and reviews
│   │   ├── Brands.jsx               # Certified partner brand directory
│   │   ├── SearchResults.jsx        # Search results page
│   │   ├── Cart.jsx                 # Full cart page
│   │   ├── Checkout.jsx             # Indian checkout form
│   │   ├── OrderConfirmation.jsx    # Receipt & tracking link
│   │   ├── OrderTracking.jsx        # AWB tracking timeline
│   │   ├── OrderHistory.jsx         # Athlete past orders
│   │   ├── Wishlist.jsx             # Saved supplements
│   │   ├── Account.jsx              # Athlete profile
│   │   ├── Login.jsx & Register.jsx # Authentication
│   │   ├── About.jsx                # Oliver brand story & authenticity guarantee
│   │   ├── Contact.jsx              # Customer support & helpline
│   │   ├── FAQ.jsx                  # Supplement usage & authenticity FAQ
│   │   ├── ShippingPolicy.jsx       # Shipping timelines & cold storage
│   │   ├── ReturnPolicy.jsx         # 14-day genuine guarantee & returns
│   │   ├── PrivacyPolicy.jsx        # Data privacy
│   │   ├── Terms.jsx                # Terms & conditions
│   │   └── NotFound.jsx             # 404 error page
│   ├── services/
│   │   └── api.js                   # API client with localStorage offline fallback
│   ├── styles/
│   │   ├── main.css                 # Base design tokens and reset
│   │   └── oliver-components.css    # 3,500+ lines of Oliver component styles
│   ├── App.jsx                      # App router with all 33 routes
│   └── main.jsx                     # Entry point
├── data/
│   └── orders.json                  # Order persistence
├── server.js                        # Node.js REST API & static server
├── vite.config.js                   # Vite configuration
└── package.json                     # Dependencies & scripts
```
