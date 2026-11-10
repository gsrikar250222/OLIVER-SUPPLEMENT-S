/**
 * OLIVER SUPPLEMENT SHOP — Sports Nutrition E-Commerce
 * Full OLIVER-Matching Architecture, State Management, and Controller
 */

import { PRODUCTS, CATEGORIES } from './products.js';

// ==========================================================================
// 1. STORE STATE MANAGEMENT (CART, WISHLIST, RECENTLY VIEWED)
// ==========================================================================
class StoreState {
  constructor() {
    this.cartKey = 'oliver_cart_v2';
    this.wishlistKey = 'oliver_wishlist_v2';
    this.recentKey = 'oliver_recent_v2';
    this.cart = this.load(this.cartKey, []);
    this.wishlist = this.load(this.wishlistKey, []);
    this.recentlyViewed = this.load(this.recentKey, []);
    this.shippingThreshold = 999; // Free express shipping at ₹999
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }

  // --- Cart Operations ---
  addToCart(productId, variant = {}, quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const flavor = typeof variant === 'string' ? variant : (variant.flavor || (product.flavors && product.flavors[0]) || 'Standard');
    const weight = (typeof variant === 'object' && variant.weight) || (product.weights && product.weights[0]) || 'Standard';

    const existingIndex = this.cart.findIndex(item => item.id === productId && item.flavor === flavor && item.weight === weight);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image || product.primaryImage,
        category: product.categoryName,
        flavor,
        weight,
        quantity
      });
    }

    this.save(this.cartKey, this.cart);
    this.updateCartBadges();
    this.renderCartDrawer();
    AppUI.openCartDrawer();
    AppUI.showToast(`Added ${product.name} (${flavor} / ${weight}) to Oliver Bag`);
  }

  updateQuantity(productId, flavor, weight, delta) {
    const index = this.cart.findIndex(i => i.id === productId && i.flavor === flavor && i.weight === weight);
    if (index > -1) {
      this.cart[index].quantity += delta;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.save(this.cartKey, this.cart);
      this.updateCartBadges();
      this.renderCartDrawer();
    }
  }

  removeFromCart(productId, flavor, weight) {
    this.cart = this.cart.filter(i => !(i.id === productId && i.flavor === flavor && i.weight === weight));
    this.save(this.cartKey, this.cart);
    this.updateCartBadges();
    this.renderCartDrawer();
    AppUI.showToast('Item removed from cart');
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  updateCartBadges() {
    const count = this.getCartCount();
    document.querySelectorAll('.cart-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  renderCartDrawer() {
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-footer');
    const subtotalEl = document.getElementById('cart-subtotal-val');
    const progressFill = document.getElementById('shipping-progress-fill');
    const progressText = document.getElementById('shipping-progress-text');

    if (!container) return;

    const subtotal = this.getCartSubtotal();

    // Free Shipping Progress
    if (progressFill && progressText) {
      if (subtotal >= this.shippingThreshold) {
        progressFill.style.width = '100%';
        progressFill.style.backgroundColor = '#16a34a';
        progressText.innerHTML = '🎉 <strong>FREE Express Delivery</strong> Unlocked!';
      } else {
        const remaining = this.shippingThreshold - subtotal;
        const pct = Math.min(100, Math.round((subtotal / this.shippingThreshold) * 100));
        progressFill.style.width = pct + '%';
        progressFill.style.backgroundColor = 'var(--brand-red, #E50914)';
        progressText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for FREE Express Delivery`;
      }
    }

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state" style="text-align: center; padding: 48px 20px;">
          <div class="cart-empty-icon" style="margin-bottom: 16px; color: var(--muted-text);">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div style="font-weight: 700; font-size: 1.1rem; margin-bottom: 6px; color: var(--white);">Your Oliver Cart is Empty</div>
          <p style="font-size: 0.85rem; color: var(--secondary-text); margin-bottom: 20px;">Fuel your training goals with 100% genuine sports supplements.</p>
          <a href="/shop" class="btn btn-primary" onclick="AppUI.closeCartDrawer()">Shop Supplements</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}" style="display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--border);">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="width: 64px; height: 64px; object-fit: contain; background: #171717; border-radius: 6px;">
        <div class="cart-item-info" style="flex: 1;">
          <div class="cart-item-title" style="font-size: 0.88rem; font-weight: 700; color: var(--white);">${item.name}</div>
          <div class="cart-item-meta" style="font-size: 0.75rem; color: var(--secondary-text); margin: 3px 0;">
            ${item.flavor ? `Flavour: <strong>${item.flavor}</strong>` : ''} 
            ${item.weight ? `• Weight: <strong>${item.weight}</strong>` : ''}
          </div>
          <div class="cart-item-price" style="font-size: 0.95rem; font-weight: 800; color: var(--brand-red);">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          <div class="cart-item-controls" style="display: flex; align-items: center; justify-content: space-between; margin-top: 8px;">
            <div class="qty-picker" style="display: flex; align-items: center; border: 1px solid var(--border); border-radius: 4px;">
              <button class="qty-btn" style="width: 26px; height: 26px; background: none; border: none; color: #fff; cursor: pointer;" onclick="window.OLIVER.updateQuantity('${item.id}', '${item.flavor}', '${item.weight}', -1)">−</button>
              <span class="qty-val" style="width: 26px; text-align: center; font-size: 0.8rem; color: #fff;">${item.quantity}</span>
              <button class="qty-btn" style="width: 26px; height: 26px; background: none; border: none; color: #fff; cursor: pointer;" onclick="window.OLIVER.updateQuantity('${item.id}', '${item.flavor}', '${item.weight}', 1)">+</button>
            </div>
            <button class="cart-item-remove" style="background: none; border: none; color: var(--muted-text); font-size: 0.75rem; cursor: pointer;" onclick="window.OLIVER.removeFromCart('${item.id}', '${item.flavor}', '${item.weight}')">Remove</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- Wishlist Operations ---
  toggleWishlist(productId) {
    const idx = this.wishlist.indexOf(productId);
    const product = PRODUCTS.find(p => p.id === productId);
    if (idx > -1) {
      this.wishlist.splice(idx, 1);
      AppUI.showToast(`Removed ${product ? product.name : 'item'} from Wishlist`);
    } else {
      this.wishlist.push(productId);
      AppUI.showToast(`Saved ${product ? product.name : 'item'} to Wishlist`);
    }
    this.save(this.wishlistKey, this.wishlist);
    this.updateWishlistBadges();

    document.querySelectorAll(`.product-wishlist-btn[data-product-id="${productId}"]`).forEach(btn => {
      btn.classList.toggle('active', this.isInWishlist(productId));
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', this.isInWishlist(productId) ? 'currentColor' : 'none');
    });
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  updateWishlistBadges() {
    const count = this.wishlist.length;
    document.querySelectorAll('.wishlist-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  // --- Recently Viewed ---
  addRecentlyViewed(productId) {
    if (!productId) return;
    this.recentlyViewed = this.recentlyViewed.filter(id => id !== productId);
    this.recentlyViewed.unshift(productId);
    if (this.recentlyViewed.length > 8) this.recentlyViewed.pop();
    this.save(this.recentKey, this.recentlyViewed);
  }
}

// ==========================================================================
// 2. UI CONTROLLER & MODAL INTERACTIONS
// ==========================================================================
export const AppUI = {
  init() {
    this.initCartDrawer();
    this.initSearchModal();
    this.initMobileNav();
    this.initScrollHeader();
    this.initScrollObserver();
    this.initAccountButton();
  },

  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast show';
    toast.style.cssText = 'background: #171717; border: 1px solid #303030; color: #fff; padding: 12px 18px; border-radius: 6px; margin-top: 10px; display: flex; align-items: center; gap: 10px; font-size: 0.85rem; box-shadow: 0 8px 24px rgba(0,0,0,0.5);';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E50914" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  },

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  },

  initCartDrawer() {
    const openBtns = document.querySelectorAll('.cart-drawer-toggle');
    const closeBtn = document.getElementById('cart-drawer-close');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.openCartDrawer();
    }));

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeCartDrawer());
    if (backdrop) backdrop.addEventListener('click', () => this.closeCartDrawer());
  },

  initSearchModal() {
    const openBtns = document.querySelectorAll('.search-modal-toggle');
    const backdrop = document.getElementById('search-modal-backdrop');
    const closeBtn = document.getElementById('search-modal-close');
    const input = document.getElementById('search-modal-input');
    const resultsBox = document.getElementById('search-modal-results');

    if (!backdrop || !input) return;

    const openSearch = (e) => {
      if (e) e.preventDefault();
      backdrop.classList.add('open');
      input.focus();
      document.body.style.overflow = 'hidden';
      renderResults(input.value);
    };

    const closeSearch = () => {
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    const renderResults = (query) => {
      if (!resultsBox) return;
      const q = query.trim().toLowerCase();
      if (!q) {
        resultsBox.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--muted-text); font-size: 0.85rem;">
            Type to search instantly across all 65 sports nutrition supplements...
          </div>
        `;
        return;
      }

      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsBox.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--secondary-text);">
            No sports nutrition products found matching "<strong>${query}</strong>"
          </div>
        `;
        return;
      }

      resultsBox.innerHTML = matches.slice(0, 10).map(p => `
        <a href="/product/${p.id}" class="search-result-item" style="display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid var(--border); text-decoration: none; transition: background 0.2s ease;">
          <img src="${p.image || p.primaryImage}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: contain; background: #171717; border-radius: 4px;">
          <div style="flex-grow: 1;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #fff;">${p.name}</div>
            <div style="font-size: 0.72rem; color: var(--secondary-text); text-transform: uppercase;">${p.brand} • ${p.categoryName}</div>
          </div>
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--brand-red);">₹${p.price.toLocaleString('en-IN')}</div>
        </a>
      `).join('');
    };

    openBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSearch();
    });

    input.addEventListener('input', (e) => renderResults(e.target.value));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        this.closeCartDrawer();
      }
    });
  },

  initAccountButton() {
    const accBtns = document.querySelectorAll('.account-btn');
    accBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Handled via React Router
      });
    });
  },

  initMobileNav() {
    const toggleBtn = document.getElementById('mobile-nav-toggle');
    const drawer = document.getElementById('mobile-menu-drawer');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const closeBtn = document.getElementById('mobile-menu-close');

    if (!toggleBtn || !drawer) return;

    const open = () => {
      drawer.style.transform = 'translateX(0)';
      if (backdrop) backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      drawer.style.transform = 'translateX(-100%)';
      if (backdrop) backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
  },

  initScrollHeader() {
    const header = document.querySelector('.oliver-navbar');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  },

  initScrollObserver() {
    const elements = document.querySelectorAll('.reveal-init');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  }
};

// ==========================================================================
// 3. PRODUCT CARD COMPONENT BUILDER (OLIVER CHARCOAL ATHLETIC STYLE)
// ==========================================================================
export function createProductCardHtml(product, index = 0) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const inWishlist = window.OLIVER && window.OLIVER.isInWishlist(product.id);
  const staggerClass = `stagger-${(index % 4) + 1}`;

  const weightTag = (product.weights && product.weights[0]) || '';
  const flavorTag = (product.flavors && product.flavors[0]) || '';

  return `
    <div class="product-card reveal-init ${staggerClass}" data-product-id="${product.id}">
      <div class="product-media">
        <a href="/product/${product.id}">
          <img src="${product.image || product.primaryImage}" alt="${product.name}" class="product-img" loading="lazy">
        </a>
        <div class="product-badge-wrap">
          <span class="badge badge-sale">${discount}% OFF</span>
        </div>
        <button class="product-wishlist-btn ${inWishlist ? 'active' : ''}" data-product-id="${product.id}" onclick="event.preventDefault(); window.OLIVER.toggleWishlist('${product.id}')" title="Save to Wishlist">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-brand">${product.brand}</span>
          <div class="product-rating">
            <span style="color: #ffb800;">★</span>
            <span style="font-weight: 700; color: #fff;">${product.rating || '4.9'}</span>
            <span style="color: var(--muted-text); font-size: 0.7rem;">(${product.reviewCount || 120})</span>
          </div>
        </div>
        <a href="/product/${product.id}">
          <h3 class="product-name">${product.name}</h3>
        </a>
        <div class="product-variant-tags" style="font-size: 0.72rem; color: var(--secondary-text); margin-bottom: 8px;">
          ${weightTag ? `<span class="tag-pill">${weightTag}</span>` : ''}
          ${flavorTag ? `<span class="tag-pill">${flavorTag}</span>` : ''}
        </div>
        <div class="product-pricing">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span class="price-discount">${discount}% OFF</span>
        </div>
        <div class="product-actions" style="margin-top: 10px;">
          <button class="btn btn-primary btn-sm btn-block" onclick="window.OLIVER.addToCart('${product.id}')">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global functions for inline HTML handlers
window.closeCartDrawer = () => AppUI.closeCartDrawer();

window.startCheckoutFlow = () => {
  const count = window.OLIVER.getCartCount();
  const subtotal = window.OLIVER.getCartSubtotal();
  if (count === 0) {
    AppUI.showToast('Your Oliver Cart is empty!');
    return;
  }
  window.location.href = '/checkout';
};

// ==========================================================================
// 4. GLOBAL BOOTSTRAPPER
// ==========================================================================
window.OLIVER = new StoreState();
window.REPVAULT = window.OLIVER; // Backward-compatibility alias
window.AppUI = AppUI;

function bootstrap() {
  AppUI.init();
  window.OLIVER.updateCartBadges();
  window.OLIVER.updateWishlistBadges();
  window.OLIVER.renderCartDrawer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
