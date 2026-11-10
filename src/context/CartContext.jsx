import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('oliver_cart') || localStorage.getItem('repvault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('oliver_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('oliver_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('oliver_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('oliver_coupon');
      }
    } catch (e) {}
  }, [coupon]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  /**
   * Flexible addToCart:
   * Supports addToCart(product, quantity, options)
   * And legacy signature addToCart(product, size, color, quantity)
   */
  const addToCart = (product, arg2 = 1, arg3 = {}, arg4 = null) => {
    let quantity = 1;
    let flavor = 'Standard';
    let weight = 'Standard';

    if (typeof arg2 === 'number') {
      quantity = arg2;
      if (typeof arg3 === 'object' && arg3 !== null) {
        flavor = arg3.flavor || arg3.color || product.flavor || product.flavors?.[0] || 'Standard';
        weight = arg3.weight || arg3.size || product.size || product.weights?.[0] || 'Standard';
      }
    } else if (typeof arg2 === 'string') {
      // Legacy: addToCart(product, size, color, quantity)
      weight = arg2;
      flavor = typeof arg3 === 'string' ? arg3 : (product.flavor || product.flavors?.[0] || 'Standard');
      if (typeof arg4 === 'number') quantity = arg4;
    }

    const cartItemId = `${product.id}-${weight}-${flavor}`;
    const img = product.image || product.primaryImage || '/assets/products/01_whey_protein_gold_standard.jpg';

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            id: product.id,
            name: product.name,
            brand: product.brand || 'OLIVER',
            category: product.category || 'Supplements',
            categoryName: product.category || 'Supplements',
            price: product.price,
            originalPrice: product.mrp || product.originalPrice || product.price,
            mrp: product.mrp || product.originalPrice || product.price,
            image: img,
            weight: weight,
            size: weight,
            flavor: flavor,
            color: flavor,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} to cart!`);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'OLIVER10') {
      const c = { code: 'OLIVER10', type: 'percent', value: 10, label: '10% OFF Sports Nutrition' };
      setCoupon(c);
      showToast('Promo OLIVER10 applied: 10% Discount!');
      return { success: true, message: 'Coupon OLIVER10 applied!' };
    }
    if (cleanCode === 'FUEL20') {
      const c = { code: 'FUEL20', type: 'percent', value: 20, minSubtotal: 4999, label: '20% OFF Orders over ₹4,999' };
      setCoupon(c);
      showToast('Promo FUEL20 applied: 20% Discount!');
      return { success: true, message: 'Coupon FUEL20 applied!' };
    }
    if (cleanCode === 'FIRSTORDER') {
      const c = { code: 'FIRSTORDER', type: 'flat', value: 300, label: 'Flat ₹300 OFF First Order' };
      setCoupon(c);
      showToast('Promo FIRSTORDER applied: Flat ₹300 Discount!');
      return { success: true, message: 'Coupon FIRSTORDER applied!' };
    }
    return { success: false, message: 'Invalid or expired coupon code. Try OLIVER10 or FIRSTORDER.' };
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  // Financial Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalMrp = cart.reduce((sum, item) => sum + ((item.mrp || item.originalPrice || item.price) * item.quantity), 0);
  const catalogSavings = Math.max(0, totalMrp - subtotal);

  let discountAmount = 0;
  if (coupon) {
    if (coupon.type === 'percent') {
      discountAmount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon.type === 'flat') {
      discountAmount = Math.min(coupon.value, subtotal);
    }
  }

  // Free shipping threshold ₹999
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemsCount,
      subtotal,
      totalMrp,
      catalogSavings,
      shippingFee,
      discountAmount,
      grandTotal,
      coupon,
      applyCoupon,
      removeCoupon,
      isCartOpen,
      setIsCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
