import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('repvault_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('repvault_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('repvault_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      if (coupon) {
        localStorage.setItem('repvault_coupon', JSON.stringify(coupon));
      } else {
        localStorage.removeItem('repvault_coupon');
      }
    } catch (e) {}
  }, [coupon]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, size = 'M', color = null, quantity = 1) => {
    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
    const cartItemId = `${product.id}-${size}-${selectedColor}`;

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
            name: product.name,
            categoryName: product.categoryName,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.primaryImage,
            size,
            color: selectedColor,
            quantity
          }
        ];
      }
    });

    showToast(`Added ${product.name} (${size}) to Bag!`);
    setIsCartOpen(true);
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

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Financial calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const FREE_SHIPPING_THRESHOLD = 1000;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.type === 'free_shipping';
  const shippingFee = cart.length === 0 ? 0 : (freeShipping ? 0 : 99);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  let discount = 0;
  if (coupon && subtotal > 0) {
    if (coupon.type === 'percent') {
      discount = Math.round((subtotal * coupon.value) / 100);
    } else if (coupon.type === 'flat') {
      discount = Math.min(subtotal, coupon.value);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const gst = cart.length === 0 ? 0 : Math.round(taxableAmount * 0.05);
  const total = cart.length === 0 ? 0 : (taxableAmount + shippingFee + gst);

  const applyCoupon = async (code) => {
    if (!code || !code.trim()) {
      return { success: false, message: 'Please enter a coupon code' };
    }
    const res = await api.validateCoupon(code.trim(), subtotal);
    if (res.success) {
      setCoupon(res.coupon);
      showToast(`Coupon ${res.coupon.code} applied!`);
      return { success: true };
    } else {
      return { success: false, message: res.message };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed');
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      openCart,
      closeCart,
      coupon,
      applyCoupon,
      removeCoupon,
      subtotal,
      totalItemsCount,
      shippingFee,
      freeShipping,
      FREE_SHIPPING_THRESHOLD,
      amountNeededForFreeShipping,
      freeShippingProgress,
      discount,
      gst,
      total,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

