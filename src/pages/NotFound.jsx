import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container empty-page-wrap section-pad text-center">
      <span className="notfound-code">404</span>
      <h1 className="empty-page-title">PAGE NOT LOCATED IN THE VAULT</h1>
      <p className="empty-page-desc">The collection or page you requested does not exist or has been relocated.</p>
      <Link to="/" className="btn btn-primary mt-24">
        RETURN TO HOME
      </Link>
    </div>
  );
}

