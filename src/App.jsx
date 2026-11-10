import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

// Components
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import SearchModal from './components/SearchModal.jsx';
import SupplementGuideModal from './components/SupplementGuideModal.jsx';
import Toast from './components/Toast.jsx';

// Pages
import Home from './pages/Home.jsx';
import Shop from './pages/Shop.jsx';
import Category from './pages/Category.jsx';
import Brands from './pages/Brands.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Account from './pages/Account.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import OrderTracking from './pages/OrderTracking.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import FAQ from './pages/FAQ.jsx';
import ShippingPolicy from './pages/ShippingPolicy.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  // Global keyboard shortcuts (Ctrl+K or / to search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <div className="oliver-app-container">
            <ScrollToTop />
            <AnnouncementBar />
            <Navbar 
              onOpenSearch={() => setSearchOpen(true)} 
              onOpenGuide={() => setGuideOpen(true)} 
            />

            <main className="app-content-wrap">
              <Routes>
                {/* 1. Home */}
                <Route path="/" element={<Home onOpenGuide={() => setGuideOpen(true)} />} />

                {/* 2. Shop All Supplements */}
                <Route path="/shop" element={<Shop />} />

                {/* 3. Category Routes */}
                <Route path="/category/:slug" element={<Category />} />
                <Route path="/whey-protein" element={<Navigate to="/category/whey-protein" replace />} />
                <Route path="/whey-protein-isolate" element={<Navigate to="/category/whey-isolate" replace />} />
                <Route path="/whey-isolate" element={<Navigate to="/category/whey-isolate" replace />} />
                <Route path="/mass-gainers" element={<Navigate to="/category/mass-gainers" replace />} />
                <Route path="/creatine" element={<Navigate to="/category/creatine" replace />} />
                <Route path="/pre-workout" element={<Navigate to="/category/pre-workout" replace />} />
                <Route path="/bcaa-eaa" element={<Navigate to="/category/amino-acids" replace />} />
                <Route path="/vitamins-and-minerals" element={<Navigate to="/category/vitamins-minerals" replace />} />
                <Route path="/vitamins-minerals" element={<Navigate to="/category/vitamins-minerals" replace />} />
                <Route path="/fish-oil-and-omega-3" element={<Navigate to="/category/fish-oil-omega-3" replace />} />
                <Route path="/fish-oil" element={<Navigate to="/category/fish-oil-omega-3" replace />} />
                <Route path="/protein-bars-and-snacks" element={<Navigate to="/category/protein-bars-snacks" replace />} />
                <Route path="/protein-bars" element={<Navigate to="/category/protein-bars-snacks" replace />} />
                <Route path="/electrolytes" element={<Navigate to="/category/electrolytes" replace />} />
                <Route path="/health-and-wellness-supplements" element={<Navigate to="/category/health-wellness" replace />} />
                <Route path="/health-wellness" element={<Navigate to="/category/health-wellness" replace />} />

                {/* 4. Brands Showcase */}
                <Route path="/brands" element={<Brands />} />

                {/* 5. Product Details */}
                <Route path="/product/:id" element={<ProductDetails onOpenGuide={() => setGuideOpen(true)} />} />

                {/* 6. Search Results */}
                <Route path="/search" element={<SearchResults />} />

                {/* 7. Wishlist */}
                <Route path="/wishlist" element={<Wishlist />} />

                {/* 8. Cart */}
                <Route path="/cart" element={<Cart />} />

                {/* 9. Checkout */}
                <Route path="/checkout" element={<Checkout />} />

                {/* 10. Order Confirmation */}
                <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />

                {/* 11. Athlete Account, Order History, Tracking */}
                <Route path="/account" element={<Account />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/order-tracking" element={<OrderTracking />} />

                {/* 12. Information & Support Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/return-policy" element={<ReturnPolicy />} />
                <Route path="/returns" element={<ReturnPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />

                {/* 13. Auth Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* 14. 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />

            {/* Global Overlays & Modals */}
            <CartDrawer />
            <SearchModal 
              isOpen={searchOpen} 
              onClose={() => setSearchOpen(false)} 
            />
            <SupplementGuideModal 
              isOpen={guideOpen} 
              onClose={() => setGuideOpen(false)} 
            />
            <Toast />
          </div>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
