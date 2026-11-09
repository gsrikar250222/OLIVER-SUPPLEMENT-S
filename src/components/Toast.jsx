import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="repvault-toast-container">
      <div className="repvault-toast">
        <CheckCircle2 size={18} className="toast-icon" />
        <span className="toast-text">{toastMessage}</span>
      </div>
    </div>
  );
}

