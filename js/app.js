/**
 * REPVAULT High-Performance Athletic E-Commerce
 * Full REPVAULT-Matching Architecture, State Management, and Animation Controller
 */

import { PRODUCTS, CATEGORIES } from './products.js';

// ==========================================================================
// 1. STORE STATE MANAGEMENT (CART, WISHLIST, RECENTLY VIEWED)
// ==========================================================================
class StoreState {
  constructor() {
    this.cartKey = 'repvault_cart_v2';
    this.wishlistKey = 'repvault_wishlist_v2';
    this.recentKey = 'repvault_recent_v2';
    this.cart = this.load(this.cartKey, []);
    this.wishlist = this.load(this.wishlistKey, []);
    this.recentlyViewed = this.load(this.recentKey, []);
    this.shippingThreshold = 1999; // Free express shipping at ₹1,999
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
  addToCart(productId, size = 'M', quantity = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.id === productId && item.size === size);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.primaryImage,
        category: product.categoryName,
        size: size,
        quantity: quantity
      });
    }

    this.save(this.cartKey, this.cart);
    this.updateCartBadges();
    this.renderCartDrawer();
    AppUI.openCartDrawer();
    AppUI.showToast(`Added ${product.name} (Size ${size}) to Vault Cart`);
  }

  updateQuantity(productId, size, delta) {
    const index = this.cart.findIndex(i => i.id === productId && i.size === size);
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

  removeFromCart(productId, size) {
    this.cart = this.cart.filter(i => !(i.id === productId && i.size === size));
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
    const count = this.getCartCount();

    // Free Shipping Progress
    if (progressFill && progressText) {
      if (subtotal >= this.shippingThreshold) {
        progressFill.style.width = '100%';
        progressFill.style.backgroundColor = '#16a34a';
        progressText.innerHTML = '🎉 <strong>FREE Express Shipping</strong> Unlocked!';
      } else {
        const remaining = this.shippingThreshold - subtotal;
        const pct = Math.min(100, Math.round((subtotal / this.shippingThreshold) * 100));
        progressFill.style.width = pct + '%';
        progressFill.style.backgroundColor = 'var(--primary-navy)';
        progressText.innerHTML = `Add <strong>₹${remaining.toLocaleString('en-IN')}</strong> more for FREE Express Shipping`;
      }
    }

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div style="font-weight: 700; font-size: 1.05rem; margin-bottom: 6px;">Your Vault Bag is Empty</div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Explore our engineered drops and upgrade your training wardrobe.</p>
          <a href="collections.html" class="btn btn-navy btn-sm" onclick="AppUI.closeCartDrawer()">Shop New Drops</a>
        </div>
      `;
      if (footer) footer.style.display = 'none';
      return;
    }

    if (footer) footer.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-cart-id="${item.id}" data-cart-size="${item.size}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-meta">Size: <strong>${item.size}</strong> • ${item.category}</div>
          <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
          <div class="cart-item-controls">
            <div class="qty-picker" style="height: 30px;">
              <button class="qty-btn" style="width: 26px;" onclick="window.REPVAULT.updateQuantity('${item.id}', '${item.size}', -1)">−</button>
              <span class="qty-val" style="width: 26px; font-size: 0.78rem;">${item.quantity}</span>
              <button class="qty-btn" style="width: 26px;" onclick="window.REPVAULT.updateQuantity('${item.id}', '${item.size}', 1)">+</button>
            </div>
            <button class="cart-item-remove" onclick="window.REPVAULT.removeFromCart('${item.id}', '${item.size}')">Remove</button>
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

    // Toggle button icons
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
    this.initCollectionsPage();
    this.initProductDetailPage();
    this.initHomePage();
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
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dbff00" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  },

  closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-drawer-backdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  initCartDrawer() {
    const openBtns = document.querySelectorAll('.cart-open-btn');
    const closeBtn = document.getElementById('cart-close-btn');
    const backdrop = document.getElementById('cart-drawer-backdrop');

    openBtns.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      this.openCartDrawer();
    }));

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeCartDrawer());
    if (backdrop) backdrop.addEventListener('click', () => this.closeCartDrawer());
  },

  initSearchModal() {
    const openBtns = document.querySelectorAll('.search-open-btn');
    const backdrop = document.getElementById('search-modal-backdrop');
    const closeBtn = document.getElementById('search-close-btn');
    const input = document.getElementById('search-input-field');
    const resultsBox = document.getElementById('search-results-box');

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
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
            Type to search instantly across all 20 engineered apparel pieces...
          </div>
        `;
        return;
      }

      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsBox.innerHTML = `
          <div style="padding: 24px; text-align: center; color: var(--text-secondary);">
            No engineered drops found matching "<strong>${query}</strong>"
          </div>
        `;
        return;
      }

      resultsBox.innerHTML = matches.map(p => `
        <a href="product.html?id=${p.id}" class="search-result-item" style="display: flex; align-items: center; gap: 14px; padding: 12px 16px; border-bottom: 1px solid var(--border-gray); transition: background 0.2s ease;">
          <img src="${p.primaryImage}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: cover; border-radius: var(--radius-xs);">
          <div style="flex-grow: 1;">
            <div style="font-size: 0.85rem; font-weight: 700; color: var(--charcoal);">${p.name}</div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">${p.categoryName}</div>
          </div>
          <div style="font-size: 0.9rem; font-weight: 800; color: var(--primary-navy);">₹${p.price.toLocaleString('en-IN')}</div>
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
        this.closeQuickView();
        this.closeSizeGuide();
      }
    });
  },

  initAccountButton() {
    const accBtns = document.querySelectorAll('.account-btn');
    accBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        AppUI.showToast('Athlete Account: Signed in as Guest Lifter. Doorstep express shipping active.');
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
    const header = document.querySelector('.header-wrapper');
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
  },

  // --- Quick View Modal Handling ---
  openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('quick-view-modal');
    const img = document.getElementById('qv-image');
    const cat = document.getElementById('qv-category');
    const title = document.getElementById('qv-title');
    const price = document.getElementById('qv-price');
    const origPrice = document.getElementById('qv-orig-price');
    const discount = document.getElementById('qv-discount');
    const desc = document.getElementById('qv-description');
    const sizeOpts = document.getElementById('qv-size-options');
    const link = document.getElementById('qv-view-details-link');
    const addBtn = document.getElementById('qv-add-btn');

    if (!modal) return;

    const pct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    if (img) img.src = product.primaryImage;
    if (cat) cat.textContent = product.categoryName;
    if (title) title.textContent = product.name;
    if (price) price.textContent = '₹' + product.price.toLocaleString('en-IN');
    if (origPrice) origPrice.textContent = '₹' + product.originalPrice.toLocaleString('en-IN');
    if (discount) discount.textContent = pct + '% OFF';
    if (desc) desc.textContent = product.description;
    if (link) link.href = `product.html?id=${product.id}`;

    let selectedSize = 'M';
    const label = document.getElementById('qv-selected-size');
    if (label) label.textContent = selectedSize;

    if (sizeOpts) {
      const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
      sizeOpts.innerHTML = sizes.map(s => `
        <button class="size-pill ${s === selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>
      `).join('');

      sizeOpts.querySelectorAll('.size-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeOpts.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedSize = btn.dataset.size;
          if (label) label.textContent = selectedSize;
        });
      });
    }

    if (addBtn) {
      addBtn.onclick = () => {
        window.REPVAULT.addToCart(product.id, selectedSize, 1);
        this.closeQuickView();
      };
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeQuickView() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  closeSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  // --- Homepage Features ---
  initHomePage() {
    const trendingGrid = document.getElementById('trending-products-grid');
    if (trendingGrid) {
      const trendingProducts = PRODUCTS.slice(0, 8);
      trendingGrid.innerHTML = trendingProducts.map((p, i) => createProductCardHtml(p, i)).join('');
    }
  },

  // --- Collections Page Controller ---
  initCollectionsPage() {
    const grid = document.getElementById('catalog-products-grid');
    if (!grid) return;

    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';
    let currentSort = urlParams.get('sort') || 'featured';
    let currentFilter = urlParams.get('filter') || 'all';
    let currentSize = 'all';
    let currentPrice = 'all';
    let inStockOnly = true;

    // Filter Drawer elements
    const filterDrawer = document.getElementById('filter-drawer');
    const filterBackdrop = document.getElementById('filter-drawer-backdrop');
    const openFilterBtn = document.getElementById('open-filter-drawer-btn');
    const closeFilterBtn = document.getElementById('close-filter-drawer-btn');
    const applyFilterBtn = document.getElementById('apply-filter-drawer-btn');
    const resetFilterBtn = document.getElementById('reset-filter-drawer-btn');
    const sortSelect = document.getElementById('sort-select-box');

    // Quick View Modal Close handlers
    const qvCloseBtn = document.getElementById('quick-view-close-btn');
    const qvBackdrop = document.getElementById('quick-view-backdrop');
    if (qvCloseBtn) qvCloseBtn.addEventListener('click', () => this.closeQuickView());
    if (qvBackdrop) qvBackdrop.addEventListener('click', () => this.closeQuickView());

    // Drawer Open/Close
    const openDrawer = () => {
      if (filterDrawer) filterDrawer.classList.add('open');
      if (filterBackdrop) filterBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      if (filterDrawer) filterDrawer.classList.remove('open');
      if (filterBackdrop) filterBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (openFilterBtn) openFilterBtn.addEventListener('click', openDrawer);
    if (closeFilterBtn) closeFilterBtn.addEventListener('click', closeDrawer);
    if (filterBackdrop) filterBackdrop.addEventListener('click', closeDrawer);

    // Apply Filter Function
    const renderCatalog = () => {
      let filtered = [...PRODUCTS];

      // 1. Category filter
      if (currentCategory && currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
      }

      // 2. Sale / New filter
      if (currentFilter === 'sale') {
        filtered = filtered.filter(p => (p.badge && p.badge.includes('SALE')) || p.price < p.originalPrice);
      }

      // 3. Size filter
      if (currentSize && currentSize !== 'all') {
        filtered = filtered.filter(p => p.sizes && p.sizes.includes(currentSize));
      }

      // 4. Price filter
      if (currentPrice === 'under-1000') {
        filtered = filtered.filter(p => p.price < 1000);
      } else if (currentPrice === '1000-1500') {
        filtered = filtered.filter(p => p.price >= 1000 && p.price <= 1500);
      } else if (currentPrice === 'above-1500') {
        filtered = filtered.filter(p => p.price > 1500);
      }

      // 5. In-Stock
      if (inStockOnly) {
        filtered = filtered.filter(p => p.inStock !== false);
      }

      // 6. Sorting
      if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (currentSort === 'newest') {
        filtered.reverse();
      }

      // Update Titles & Counts
      const titleEl = document.getElementById('catalog-collection-title');
      const counterEl = document.getElementById('catalog-product-counter');
      const breadcrumbEl = document.getElementById('catalog-breadcrumb');

      const catObj = CATEGORIES.find(c => c.id === currentCategory);
      const catName = catObj ? catObj.name : 'All Products';

      if (titleEl) titleEl.textContent = currentFilter === 'sale' ? 'Flash Sale — 50% Off' : catName;
      if (breadcrumbEl) breadcrumbEl.textContent = `CATALOG // ${catName.toUpperCase()}`;
      if (counterEl) counterEl.textContent = `Showing ${filtered.length} of 20 Products`;

      // Update Horizontal Pills
      document.querySelectorAll('#category-pills-wrap .category-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.cat === currentCategory);
      });

      // Update Drawer Chips
      document.querySelectorAll('#drawer-category-filters .filter-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.cat === currentCategory);
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--charcoal); margin-bottom: 8px;">No drops match these filters</h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px;">Try adjusting your size, price, or category selections.</p>
            <button class="btn btn-navy btn-sm" id="empty-reset-btn">Reset All Filters</button>
          </div>
        `;
        const resetBtn = document.getElementById('empty-reset-btn');
        if (resetBtn) resetBtn.addEventListener('click', resetAll);
        return;
      }

      grid.innerHTML = filtered.map((p, i) => createProductCardHtml(p, i)).join('');
      AppUI.initScrollObserver();
    };

    const resetAll = () => {
      currentCategory = 'all';
      currentSize = 'all';
      currentPrice = 'all';
      currentFilter = 'all';
      inStockOnly = true;
      document.querySelectorAll('#drawer-size-filters .filter-chip').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('#drawer-price-filters .filter-chip').forEach(c => c.classList.toggle('active', c.dataset.price === 'all'));
      renderCatalog();
      closeDrawer();
    };

    // Horizontal Pills click
    document.querySelectorAll('#category-pills-wrap .category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        currentCategory = pill.dataset.cat;
        currentFilter = 'all';
        renderCatalog();
      });
    });

    // Drawer Category chips
    document.querySelectorAll('#drawer-category-filters .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#drawer-category-filters .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentCategory = chip.dataset.cat;
      });
    });

    // Drawer Size chips
    document.querySelectorAll('#drawer-size-filters .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const wasActive = chip.classList.contains('active');
        document.querySelectorAll('#drawer-size-filters .filter-chip').forEach(c => c.classList.remove('active'));
        if (!wasActive) {
          chip.classList.add('active');
          currentSize = chip.dataset.size;
        } else {
          currentSize = 'all';
        }
      });
    });

    // Drawer Price chips
    document.querySelectorAll('#drawer-price-filters .filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#drawer-price-filters .filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentPrice = chip.dataset.price;
      });
    });

    // Drawer In-Stock checkbox
    const inStockBox = document.getElementById('in-stock-only-checkbox');
    if (inStockBox) {
      inStockBox.addEventListener('change', () => {
        inStockOnly = inStockBox.checked;
      });
    }

    if (applyFilterBtn) {
      applyFilterBtn.addEventListener('click', () => {
        renderCatalog();
        closeDrawer();
      });
    }

    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', resetAll);
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderCatalog();
      });
    }

    // Initial render
    renderCatalog();
  },

  // --- Product Detail Page Controller ---
  initProductDetailPage() {
    const pdpWrap = document.getElementById('pdp-main-content');
    if (!pdpWrap) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'rv-polo-black';
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

    // Track recently viewed
    window.REPVAULT.addRecentlyViewed(product.id);

    // Update Page Title
    document.title = `${product.name} | REPVAULT Athletic Wear`;

    // Populate Breadcrumbs & Headings
    const bCat = document.getElementById('pdp-breadcrumb-cat');
    const catName = document.getElementById('pdp-category-name');
    const titleEl = document.getElementById('pdp-product-title');
    const priceEl = document.getElementById('pdp-price');
    const origPriceEl = document.getElementById('pdp-orig-price');
    const discountEl = document.getElementById('pdp-discount');
    const descEl = document.getElementById('pdp-description');
    const fabricEl = document.getElementById('pdp-fabric-spec');

    if (bCat) bCat.textContent = product.categoryName;
    if (catName) catName.textContent = product.categoryName;
    if (titleEl) titleEl.textContent = product.name;
    if (priceEl) priceEl.textContent = '₹' + product.price.toLocaleString('en-IN');
    if (origPriceEl) origPriceEl.textContent = '₹' + product.originalPrice.toLocaleString('en-IN');

    const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    if (discountEl) discountEl.textContent = `${discountPct}% OFF`;
    if (descEl) descEl.textContent = product.description;
    if (fabricEl && product.fabric) fabricEl.textContent = product.fabric;

    // Gallery & Thumbnails
    const largeImage = document.getElementById('pdp-large-image');
    const thumbsList = document.getElementById('pdp-thumbnails-list');
    const zoomContainer = document.getElementById('pdp-zoom-container');

    const galleryImages = product.gallery && product.gallery.length ? product.gallery : [product.primaryImage];

    if (largeImage) {
      largeImage.src = galleryImages[0];
      largeImage.alt = product.name;
    }

    if (thumbsList) {
      thumbsList.innerHTML = galleryImages.map((src, idx) => `
        <div class="pdp-thumb-item ${idx === 0 ? 'active' : ''}" data-index="${idx}">
          <img src="${src}" alt="${product.name} view ${idx + 1}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
      `).join('');

      thumbsList.querySelectorAll('.pdp-thumb-item').forEach(thumb => {
        thumb.addEventListener('click', () => {
          thumbsList.querySelectorAll('.pdp-thumb-item').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
          const idx = parseInt(thumb.dataset.index, 10);
          if (largeImage) {
            largeImage.style.opacity = '0.5';
            setTimeout(() => {
              largeImage.src = galleryImages[idx];
              largeImage.style.opacity = '1';
            }, 120);
          }
        });
      });
    }

    // Zoom on Hover
    if (zoomContainer && largeImage) {
      zoomContainer.addEventListener('mousemove', (e) => {
        const rect = zoomContainer.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        largeImage.style.transformOrigin = `${x}% ${y}%`;
        largeImage.style.transform = 'scale(1.4)';
      });

      zoomContainer.addEventListener('mouseleave', () => {
        largeImage.style.transformOrigin = 'center center';
        largeImage.style.transform = 'scale(1)';
      });
    }

    // Size Selection
    let selectedSize = 'M';
    const sizeOpts = document.getElementById('pdp-size-options');
    const selectedSizeLabel = document.getElementById('selected-size-label');

    if (sizeOpts) {
      const sizes = product.sizes || ['S', 'M', 'L', 'XL', 'XXL'];
      sizeOpts.innerHTML = sizes.map(s => `
        <button class="size-pill ${s === selectedSize ? 'active' : ''}" data-size="${s}">${s}</button>
      `).join('');

      sizeOpts.querySelectorAll('.size-pill').forEach(btn => {
        btn.addEventListener('click', () => {
          sizeOpts.querySelectorAll('.size-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          selectedSize = btn.dataset.size;
          if (selectedSizeLabel) selectedSizeLabel.textContent = selectedSize;
        });
      });
    }

    // Quantity Picker
    let quantity = 1;
    const qtyVal = document.getElementById('pdp-qty-val');
    const qtyDec = document.getElementById('pdp-qty-dec');
    const qtyInc = document.getElementById('pdp-qty-inc');

    if (qtyDec && qtyInc && qtyVal) {
      qtyDec.onclick = () => {
        if (quantity > 1) {
          quantity--;
          qtyVal.textContent = quantity;
        }
      };
      qtyInc.onclick = () => {
        quantity++;
        qtyVal.textContent = quantity;
      };
    }

    // Action Buttons
    const addBtn = document.getElementById('pdp-add-btn');
    const buyBtn = document.getElementById('pdp-buy-now-btn');
    const wishBtn = document.getElementById('pdp-wishlist-btn');

    if (addBtn) {
      addBtn.onclick = () => {
        window.REPVAULT.addToCart(product.id, selectedSize, quantity);
      };
    }

    if (buyBtn) {
      buyBtn.onclick = () => {
        window.REPVAULT.addToCart(product.id, selectedSize, quantity);
        startCheckoutFlow();
      };
    }

    if (wishBtn) {
      wishBtn.onclick = () => {
        window.REPVAULT.toggleWishlist(product.id);
      };
    }

    // Size Guide Modal
    const openGuideBtn = document.getElementById('open-size-guide-btn');
    const guideModal = document.getElementById('size-guide-modal');
    const closeGuideBtn = document.getElementById('size-guide-close-btn');
    const guideBackdrop = document.getElementById('size-guide-backdrop');

    if (openGuideBtn && guideModal) {
      openGuideBtn.onclick = () => {
        guideModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      };
    }
    if (closeGuideBtn) closeGuideBtn.onclick = () => this.closeSizeGuide();
    if (guideBackdrop) guideBackdrop.onclick = () => this.closeSizeGuide();

    // Related Products Grid
    const relatedGrid = document.getElementById('related-products-grid');
    if (relatedGrid) {
      const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
      const fallback = related.length ? related : PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
      relatedGrid.innerHTML = fallback.map((p, i) => createProductCardHtml(p, i)).join('');
    }

    // Recently Viewed Grid
    const recentSec = document.getElementById('recently-viewed-section');
    const recentGrid = document.getElementById('recently-viewed-grid');
    if (recentSec && recentGrid && window.REPVAULT.recentlyViewed.length > 1) {
      const recentIds = window.REPVAULT.recentlyViewed.filter(id => id !== product.id).slice(0, 4);
      const recentItems = recentIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
      if (recentItems.length) {
        recentSec.style.display = 'block';
        recentGrid.innerHTML = recentItems.map((p, i) => createProductCardHtml(p, i)).join('');
      }
    }

    // Mobile Sticky Bottom Bar Controller
    const stickyBar = document.getElementById('mobile-sticky-pdp-bar');
    const stickyThumb = document.getElementById('mobile-sticky-img');
    const stickyTitle = document.getElementById('mobile-sticky-title');
    const stickyPrice = document.getElementById('mobile-sticky-price');
    const stickyBtn = document.getElementById('mobile-sticky-btn');

    if (stickyBar && addBtn) {
      if (stickyThumb) stickyThumb.src = product.primaryImage;
      if (stickyTitle) stickyTitle.textContent = product.name;
      if (stickyPrice) stickyPrice.textContent = '₹' + product.price.toLocaleString('en-IN');
      if (stickyBtn) {
        stickyBtn.onclick = () => {
          window.REPVAULT.addToCart(product.id, selectedSize, 1);
        };
      }

      window.addEventListener('scroll', () => {
        if (window.innerWidth <= 768) {
          const rect = addBtn.getBoundingClientRect();
          if (rect.bottom < 0) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        } else {
          stickyBar.classList.remove('visible');
        }
      }, { passive: true });
    }
  }
};

// ==========================================================================
// 3. PRODUCT CARD COMPONENT BUILDER (REPVAULT STYLE - INFORMATION BELOW IMAGE)
// ==========================================================================
export function createProductCardHtml(product, index = 0) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const secondaryImage = product.gallery && product.gallery[1] ? product.gallery[1] : product.primaryImage;
  const inWishlist = window.REPVAULT && window.REPVAULT.isInWishlist(product.id);
  const staggerClass = `stagger-${(index % 4) + 1}`;

  const sizesHtml = product.sizes ? product.sizes.map(size => `
    <button class="quick-size-btn" onclick="event.preventDefault(); window.REPVAULT.addToCart('${product.id}', '${size}')">${size}</button>
  `).join('') : '';

  return `
    <div class="product-card reveal-init ${staggerClass}" data-product-id="${product.id}">
      <div class="product-media">
        <a href="product.html?id=${product.id}">
          <img src="${product.primaryImage}" alt="${product.name}" class="product-img img-primary" loading="lazy">
          <img src="${secondaryImage}" alt="${product.name}" class="product-img img-secondary" loading="lazy">
        </a>
        <div class="product-badge-wrap">
          <span class="badge badge-sale">${discount}% OFF</span>
        </div>
        <button class="product-wishlist-btn ${inWishlist ? 'active' : ''}" data-product-id="${product.id}" onclick="event.preventDefault(); window.REPVAULT.toggleWishlist('${product.id}')" title="Save to Wishlist">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="${inWishlist ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <button class="btn btn-white btn-sm" style="position: absolute; bottom: 42px; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 0.25s ease; white-space: nowrap; z-index: 5;" onclick="event.preventDefault(); window.AppUI.openQuickView('${product.id}')" id="qv-btn-${product.id}">
          Quick View
        </button>
        <div class="product-quick-sizes">
          ${sizesHtml}
        </div>
      </div>
      <div class="product-info">
        <div class="product-meta">
          <span class="product-cat">${product.categoryName}</span>
          <div class="product-rating">
            <span style="color: var(--accent-amber);">★</span>
            <span style="font-weight: 700; color: var(--charcoal);">${product.rating || '4.9'}</span>
            <span style="color: var(--text-muted); font-size: 0.7rem;">(${product.reviewCount || 120})</span>
          </div>
        </div>
        <a href="product.html?id=${product.id}">
          <h3 class="product-name">${product.name}</h3>
        </a>
        <div class="product-pricing">
          <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
          <span class="price-discount">${discount}% OFF</span>
        </div>
        <div class="product-actions" style="margin-top: 10px;">
          <button class="btn btn-navy btn-sm btn-block" onclick="window.REPVAULT.addToCart('${product.id}', 'M')">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Global functions for inline HTML handlers
window.playReelModal = (videoSrc) => {
  const modal = document.getElementById('reel-modal-backdrop');
  const video = document.getElementById('reel-modal-video');
  const close = document.getElementById('reel-close-btn');
  if (modal && video) {
    video.src = videoSrc;
    modal.classList.add('open');
    video.play();
    document.body.style.overflow = 'hidden';

    const closeReel = () => {
      modal.classList.remove('open');
      video.pause();
      video.src = '';
      document.body.style.overflow = '';
    };

    if (close) close.onclick = closeReel;
    modal.onclick = (e) => {
      if (e.target === modal) closeReel();
    };
  }
};

window.closeCartDrawer = () => AppUI.closeCartDrawer();

window.startCheckoutFlow = () => {
  const count = window.REPVAULT.getCartCount();
  const subtotal = window.REPVAULT.getCartSubtotal();
  if (count === 0) {
    AppUI.showToast('Your Vault Cart is empty!');
    return;
  }
  alert(`REPVAULT Instant Express Checkout\n\nItems: ${count}\nTotal Payable: ₹${subtotal.toLocaleString('en-IN')}\nShipping: ${subtotal >= 1999 ? 'FREE Express' : '₹99'}\n\nPayment Options:\n• UPI (Google Pay, PhonePe, Paytm)\n• NetBanking & Debit/Credit Cards\n• Cash on Delivery (COD)\n\nRedirecting to secure gateway...`);
};

// ==========================================================================
// 4. GLOBAL BOOTSTRAPPER
// ==========================================================================
window.REPVAULT = new StoreState();
window.AppUI = AppUI;

function bootstrap() {
  AppUI.init();
  window.REPVAULT.updateCartBadges();
  window.REPVAULT.updateWishlistBadges();
  window.REPVAULT.renderCartDrawer();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
