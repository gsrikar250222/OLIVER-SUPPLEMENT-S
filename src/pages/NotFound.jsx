import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Zap, Flame } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container empty-page-wrap section-pad text-center">
      <span className="notfound-code">404</span>
      <h1 className="empty-page-title">PAGE NOT FOUND IN THE SUPPLEMENT SHOP</h1>
      <p className="empty-page-desc">
        The supplement category or route you requested has been moved or does not exist.
      </p>

      <div className="notfound-quick-links mt-20">
        <Link to="/category/whey-protein" className="fallback-pill">Whey Protein</Link>
        <Link to="/category/creatine" className="fallback-pill">Creatine</Link>
        <Link to="/category/pre-workout" className="fallback-pill">Pre-Workout</Link>
        <Link to="/brands" className="fallback-pill">Certified Brands</Link>
      </div>

      <div className="mt-30">
        <Link to="/" className="btn-primary">
          RETURN TO HOME &rarr;
        </Link>
      </div>
    </div>
  );
}
