import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import { CATEGORIES as SEED_CATEGORIES, BRANDS as SEED_BRANDS, PRODUCTS as SEED_PRODUCTS } from '../src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DB_DIR = path.join(ROOT_DIR, 'data', 'db');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// In-memory cache for fast reads
const memoryStore = {};

function getFilePath(collectionName) {
  return path.join(DB_DIR, `${collectionName}.json`);
}

function loadCollection(name) {
  if (memoryStore[name]) {
    return memoryStore[name];
  }

  const filePath = getFilePath(name);
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      memoryStore[name] = JSON.parse(data);
      return memoryStore[name];
    } catch (e) {
      console.error(`Error loading collection ${name}:`, e);
      memoryStore[name] = [];
      return memoryStore[name];
    }
  }

  memoryStore[name] = [];
  return memoryStore[name];
}

function saveCollection(name, data) {
  memoryStore[name] = data;
  const filePath = getFilePath(name);
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error saving collection ${name}:`, err);
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (fallbackErr) {
      console.error(`Fallback write failed for ${name}:`, fallbackErr);
    }
  }
}

// Password hashing helper (PBKDF2 with salt)
export function hashPassword(password, salt = null) {
  const generatedSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, generatedSalt, 100000, 64, 'sha512').toString('hex');
  return { hash: `${generatedSalt}:${hash}`, salt: generatedSalt };
}

export function verifyPassword(password, storedCombinedHash) {
  if (!storedCombinedHash || !storedCombinedHash.includes(':')) return false;
  const [salt, originalHash] = storedCombinedHash.split(':');
  const verifyHash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(verifyHash, 'hex'), Buffer.from(originalHash, 'hex'));
}

// Seed Initial Data
export function initializeDatabase() {
  // 1. Admin Users Seed
  const adminUsers = loadCollection('admin_users');
  if (adminUsers.length === 0) {
    const { hash } = hashPassword('OliverAdmin#2026!');
    const superAdmin = {
      id: 'admin_super_1',
      name: 'Oliver Master Administrator',
      email: 'admin@olivershop.com',
      passwordHash: hash,
      role: 'Super Admin',
      status: 'active',
      phone: '+91 7708688023',
      avatar: '/icons/logo.svg',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    adminUsers.push(superAdmin);
    saveCollection('admin_users', adminUsers);
    console.log('[DB] Seeded initial Super Admin: admin@olivershop.com');
  }

  // 2. Products Seed
  const products = loadCollection('products');
  if (products.length === 0) {
    const initialProducts = SEED_PRODUCTS.map((p, idx) => ({
      ...p,
      sku: p.sku || `OLV-${p.category.toUpperCase().slice(0, 3)}-${String(idx + 1).padStart(4, '0')}`,
      stock: p.stock !== undefined ? p.stock : 45,
      reservedStock: 0,
      lowStockThreshold: 10,
      status: 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    saveCollection('products', initialProducts);
    console.log(`[DB] Seeded ${initialProducts.length} supplement products`);
  }

  // 3. Categories Seed
  const categories = loadCollection('categories');
  if (categories.length === 0) {
    saveCollection('categories', SEED_CATEGORIES);
    console.log(`[DB] Seeded ${SEED_CATEGORIES.length} categories`);
  }

  // 4. Brands Seed
  const brands = loadCollection('brands');
  if (brands.length === 0) {
    saveCollection('brands', SEED_BRANDS);
    console.log(`[DB] Seeded ${SEED_BRANDS.length} brands`);
  }

  // 5. Coupons Seed
  const coupons = loadCollection('coupons');
  if (coupons.length === 0) {
    const initialCoupons = [
      {
        id: 'coup_1',
        code: 'OLIVER10',
        type: 'percent',
        value: 10,
        minOrder: 0,
        maxDiscount: 1500,
        description: '10% Off Sitewide on Authentic Sports Nutrition',
        status: 'active',
        usageCount: 142,
        usageLimit: 5000,
        expiryDate: '2028-12-31'
      },
      {
        id: 'coup_2',
        code: 'FUEL20',
        type: 'percent',
        value: 20,
        minOrder: 2499,
        maxDiscount: 2000,
        description: '20% Off Big Stacks Over ₹2,499',
        status: 'active',
        usageCount: 89,
        usageLimit: 2000,
        expiryDate: '2028-12-31'
      },
      {
        id: 'coup_3',
        code: 'FIRSTORDER',
        type: 'flat',
        value: 200,
        minOrder: 1499,
        maxDiscount: 200,
        description: 'Flat ₹200 Off for New Athletes',
        status: 'active',
        usageCount: 65,
        usageLimit: 10000,
        expiryDate: '2028-12-31'
      },
      {
        id: 'coup_4',
        code: 'FREESHIP',
        type: 'free_shipping',
        value: 0,
        minOrder: 0,
        maxDiscount: 99,
        description: 'Free Express Shipping Sitewide',
        status: 'active',
        usageCount: 310,
        usageLimit: 10000,
        expiryDate: '2028-12-31'
      }
    ];
    saveCollection('coupons', initialCoupons);
    console.log(`[DB] Seeded ${initialCoupons.length} coupons`);
  }

  // 6. Homepage Content Seed
  const homepage = loadCollection('homepage');
  if (homepage.length === 0) {
    const initialHomepage = {
      id: 'active_homepage_v1',
      version: 1,
      status: 'published',
      publishedAt: new Date().toISOString(),
      announcementBar: {
        enabled: true,
        bgColor: '#000000',
        textColor: '#FFFFFF',
        accentColor: '#E50914',
        items: [
          { id: '1', text: 'Free Delivery on Orders Above ₹1,999', icon: 'Truck', link: '/shop' },
          { id: '2', text: '100% Genuine Products', icon: 'ShieldCheck', link: '/about' },
          { id: '3', text: 'Express Delivery Available', icon: 'Zap', link: '/shipping-policy' },
          { id: '4', text: 'Need Help? +91 7708688023', icon: 'PhoneCall', link: 'tel:+917708688023' }
        ]
      },
      header: {
        logoUrl: '/icons/logo.svg',
        logoAlt: 'OLIVER SUPPLEMENT SHOP',
        logoHeight: 44,
        searchPlaceholder: 'Search supplements, brands...',
        navLinks: [
          { label: 'Home', href: '/', isHighlight: false },
          { label: 'Shop', href: '/shop', isHighlight: false },
          { label: 'Brands', href: '/brands', isHighlight: false },
          { label: 'Categories', href: '/shop', isHighlight: false },
          { label: 'Deals', href: '/shop?sort=discount', isHighlight: true },
          { label: 'About Us', href: '/about', isHighlight: false }
        ]
      },
      hero: {
        kicker: 'OLIVER SUPPLEMENT SHOP',
        headlineLine1: 'FUEL YOUR BODY',
        headlineLine2: 'BUILD YOUR BEST',
        headlineColor1: '#FFFFFF',
        headlineColor2: '#E50914',
        desktopBgUrl: '/assets/hero/hero-cinematic-full-bg-4k.png',
        mobileBgUrl: '/assets/hero/hero-cinematic-mobile-bg.png',
        overlayDarkness: 0.70,
        redGlowIntensity: 0.18,
        ctaText: 'SHOP NOW',
        ctaLink: '/shop',
        ctaBgGradient: 'linear-gradient(135deg, #FF1E27 0%, #D8000C 100%)',
        badges: [
          { id: 'b1', name: 'QUALITY', icon: 'tub', title: '100% Certified Authentic Sports Nutrition' },
          { id: 'b2', name: 'STRENGTH', icon: 'arm', title: 'Explosive Strength & Muscle Hypertrophy' },
          { id: 'b3', name: 'PERFORMANCE', icon: 'leaves', title: 'Peak Athletic Endurance & Clean Botanicals' }
        ]
      },
      quickCategories: [
        { id: 'qc1', name: 'Whey Protein', slug: 'whey-protein', img: '/assets/category_icons/whey-protein.png', enabled: true },
        { id: 'qc2', name: 'Creatine', slug: 'creatine', img: '/assets/category_icons/creatine.png', enabled: true },
        { id: 'qc3', name: 'Pre-Workout', slug: 'pre-workout', img: '/assets/category_icons/pre-workout.png', enabled: true },
        { id: 'qc4', name: 'Vitamin & Minerals', slug: 'vitamins-minerals', img: '/assets/category_icons/vitamins-minerals.png', enabled: true },
        { id: 'qc5', name: 'Fish Oil & Omega-3', slug: 'fish-oil-omega-3', img: '/assets/category_icons/fish-oil.png', enabled: true },
        { id: 'qc6', name: 'Protein Bars & Snacks', slug: 'protein-bars-snacks', img: '/assets/category_icons/protein-bars.png', enabled: true },
        { id: 'qc7', name: 'Mass Gainers', slug: 'mass-gainers', img: '/assets/category_icons/mass-gainers.png', enabled: true },
        { id: 'qc8', name: 'Amino Acids', slug: 'amino-acids', img: '/assets/category_icons/amino-acids.png', enabled: true },
        { id: 'qc9', name: 'Fitness Accessories', slug: 'gym-accessories', img: '/assets/category_icons/fitness-accessories.png', enabled: true },
        { id: 'qc10', name: 'All Categories →', slug: 'all', img: '/assets/category_icons/all-categories.png', enabled: true }
      ],
      bestSellersSection: {
        enabled: true,
        title: 'Best Sellers',
        subtitle: 'Top choice supplements trusted by fitness enthusiasts',
        limit: 10,
        viewAllLink: '/shop?sort=bestseller'
      },
      testimonialsSection: {
        enabled: true,
        title: 'ATHLETE REVIEWS & AUTHENTIC FEEDBACK',
        subtitle: 'Verified lifters, bodybuilders and fitness enthusiasts across India',
        testimonials: [
          {
            id: 't1',
            name: 'Vikram Rajput',
            title: 'National Men’s Physique Competitor',
            rating: 5,
            comment: 'The authenticity of Oliver Supplement Shop is unmatched in India. Every single tub checked out on the brand portal instantly with the scratch code. Delivery to Delhi took only 24 hours!',
            productUsed: 'ISO-100 Hydrolyzed Whey'
          },
          {
            id: 't2',
            name: 'Dr. Rohan Mehra',
            title: 'Sports Physician & Crossfit Coach',
            rating: 5,
            comment: 'As a medical professional, purity and zero doping contaminants are paramount for my athletes. Oliver’s clean lab-tested protein and heavy-metal verified fish oils give me 100% confidence.',
            productUsed: 'Gold Standard 100% Whey'
          },
          {
            id: 't3',
            name: 'Simran Kaur',
            title: 'Powerlifter & Strength Athlete',
            rating: 5,
            comment: 'Switched to Oliver Creatine and Whey 6 months ago. Added 15kg to my squat with zero digestion issues or bloating. Customer support is incredible.',
            productUsed: 'Oliver Micronized Creatine'
          }
        ]
      }
    };
    homepage.push(initialHomepage);
    saveCollection('homepage', homepage);
    console.log('[DB] Seeded initial Homepage Configuration');
  }

  // 7. Website Settings Seed
  const settings = loadCollection('settings');
  if (settings.length === 0) {
    const initialSettings = {
      id: 'general_settings',
      storeName: 'OLIVER SUPPLEMENT SHOP',
      tagline: 'Fuel Your Body. Build Your Best.',
      contactEmail: 'support@olivershop.com',
      contactPhone: '+91 7708688023',
      whatsappNumber: '+91 7708688023',
      supportHours: 'Mon - Sat: 9:00 AM - 9:00 PM',
      warehouseAddress: 'Oliver Sports Nutrition Hub, Bandra West, Mumbai, Maharashtra 400050',
      shipping: {
        freeShippingThreshold: 1999,
        standardDeliveryFee: 99,
        expressDeliveryFee: 199,
        estimatedDeliveryDays: 3,
        codAvailable: true,
        codExtraCharge: 0
      },
      payment: {
        upiEnabled: true,
        cardsEnabled: true,
        netbankingEnabled: true,
        codEnabled: true,
        razorpayEnabled: false,
        razorpayKeyId: ''
      },
      taxGstRate: 18,
      socials: {
        instagram: 'https://instagram.com/oliversupplements',
        youtube: 'https://youtube.com/@oliversupplements',
        facebook: 'https://facebook.com/oliversupplements',
        twitter: 'https://twitter.com/olivershop'
      },
      theme: {
        primaryColor: '#090909',
        accentColor: '#E50914',
        cardBg: '#141414',
        textPrimary: '#FFFFFF',
        textSecondary: '#A0A0A0'
      },
      seo: {
        metaTitle: 'OLIVER SUPPLEMENT SHOP | 100% Genuine Whey Protein & Sports Nutrition',
        metaDescription: 'Shop certified authentic Whey Protein, Creatine, Pre-Workouts and Mass Gainers from top brands with express delivery across India. Batch verified authentic.',
        ogImage: '/assets/hero/hero-cinematic-full-bg-4k.png'
      }
    };
    settings.push(initialSettings);
    saveCollection('settings', settings);
    console.log('[DB] Seeded initial Website Settings');
  }

  // 8. Pages Seed
  const pages = loadCollection('pages');
  if (pages.length === 0) {
    const initialPages = [
      {
        id: 'page_about',
        slug: 'about',
        title: 'About Oliver Supplement Shop',
        status: 'published',
        lastUpdated: new Date().toISOString(),
        content: `Oliver Supplement Shop was built on a single, uncompromising premise: Indian athletes deserve 100% genuine, unadulterated sports nutrition delivered directly from certified brand importers. We eliminate middlemen and grey-market supply chains, ensuring every tub of whey protein, creatine, and pre-workout comes with authentic importer holograms and QR verification scratch codes.`
      },
      {
        id: 'page_shipping',
        slug: 'shipping-policy',
        title: 'Shipping & Delivery Policy',
        status: 'published',
        lastUpdated: new Date().toISOString(),
        content: `All orders are processed and dispatched within 24 hours from our climate-controlled fulfillment centers. We provide free express shipping across India on orders exceeding ₹1,999. Standard delivery takes 2 to 4 business days depending on location.`
      },
      {
        id: 'page_returns',
        slug: 'return-policy',
        title: 'Return & Refund Policy',
        status: 'published',
        lastUpdated: new Date().toISOString(),
        content: `Due to strict quality and hygiene safety standards for dietary supplements, returns are accepted within 7 days of delivery only for items with damaged packaging, broken seals upon delivery, or incorrect items. Once inspected, full refunds are processed within 3-5 business days.`
      },
      {
        id: 'page_privacy',
        slug: 'privacy-policy',
        title: 'Privacy Policy',
        status: 'published',
        lastUpdated: new Date().toISOString(),
        content: `Your privacy is sacred to Oliver Supplement Shop. We do not sell or lease customer contact information to third parties. All transactions are protected by 256-bit SSL encryption.`
      },
      {
        id: 'page_terms',
        slug: 'terms',
        title: 'Terms & Conditions',
        status: 'published',
        lastUpdated: new Date().toISOString(),
        content: `By purchasing from Oliver Supplement Shop, you confirm that you are at least 18 years of age and that dietary supplements are intended to support an active fitness regimen rather than substitute medical advice.`
      }
    ];
    saveCollection('pages', initialPages);
    console.log('[DB] Seeded initial Static Pages');
  }
}

// Database CRUD Collection Interface
export function db(collectionName) {
  return {
    find(filterFn = null) {
      const all = loadCollection(collectionName);
      if (!filterFn) return [...all];
      if (typeof filterFn === 'function') {
        return all.filter(filterFn);
      }
      return all.filter(item => {
        return Object.keys(filterFn).every(key => item[key] === filterFn[key]);
      });
    },

    findOne(filterFn = null) {
      const all = loadCollection(collectionName);
      if (!filterFn) return all[0] || null;
      if (typeof filterFn === 'function') {
        return all.find(filterFn) || null;
      }
      return all.find(item => {
        return Object.keys(filterFn).every(key => item[key] === filterFn[key]);
      }) || null;
    },

    findById(id) {
      const all = loadCollection(collectionName);
      return all.find(item => String(item.id) === String(id)) || null;
    },

    insertOne(doc) {
      const all = loadCollection(collectionName);
      const newDoc = {
        ...doc,
        id: doc.id || `doc_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
        createdAt: doc.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      all.unshift(newDoc);
      saveCollection(collectionName, all);
      return newDoc;
    },

    updateById(id, updates) {
      const all = loadCollection(collectionName);
      const index = all.findIndex(item => String(item.id) === String(id));
      if (index === -1) return null;
      all[index] = {
        ...all[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      saveCollection(collectionName, all);
      return all[index];
    },

    deleteById(id) {
      const all = loadCollection(collectionName);
      const index = all.findIndex(item => String(item.id) === String(id));
      if (index === -1) return false;
      all.splice(index, 1);
      saveCollection(collectionName, all);
      return true;
    },

    count(filterFn = null) {
      const all = loadCollection(collectionName);
      if (!filterFn) return all.length;
      return this.find(filterFn).length;
    }
  };
}

// Initialize immediately upon import
try {
  initializeDatabase();
} catch (e) {
  console.error('[DB] Error during initial database initialization:', e);
}
