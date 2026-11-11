import crypto from 'crypto';
import { db, verifyPassword, hashPassword } from './db.js';

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'oliver_master_control_super_secret_key_2026';
const TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000; // 8 hours

// In-memory rate limiting store: { key: { count, firstAttempt, lockedUntil } }
const loginAttempts = new Map();

export function checkRateLimit(identifier) {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier);

  if (!attempt) return { allowed: true };

  // If locked
  if (attempt.lockedUntil && now < attempt.lockedUntil) {
    const remainingSeconds = Math.ceil((attempt.lockedUntil - now) / 1000);
    return {
      allowed: false,
      message: `Too many failed login attempts. Account temporarily locked. Please try again in ${remainingSeconds} seconds.`
    };
  }

  // If 15 mins window passed, reset
  if (now - attempt.firstAttempt > 15 * 60 * 1000) {
    loginAttempts.delete(identifier);
    return { allowed: true };
  }

  return { allowed: true };
}

export function recordFailedAttempt(identifier) {
  const now = Date.now();
  const attempt = loginAttempts.get(identifier) || { count: 0, firstAttempt: now, lockedUntil: null };
  attempt.count += 1;

  if (attempt.count >= 5) {
    attempt.lockedUntil = now + 15 * 60 * 1000; // lock for 15 mins
  }
  loginAttempts.set(identifier, attempt);
}

export function clearRateLimit(identifier) {
  loginAttempts.delete(identifier);
}

// Generate Secure HMAC-SHA256 Session Token
export function createAdminToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + TOKEN_EXPIRY_MS
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(payloadB64).digest('base64url');
  return `${payloadB64}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;

  const [payloadB64, signature] = token.split('.');
  const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(payloadB64).digest('base64url');

  if (signature !== expectedSig) {
    return null; // Invalid signature
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return null; // Token expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}

// Role Permissions Matrix
const ROLE_PERMISSIONS = {
  'Super Admin': ['*'],
  'Product Manager': ['products', 'categories', 'brands', 'inventory', 'media'],
  'Content Manager': ['homepage', 'hero', 'pages', 'footer', 'design', 'media', 'seo', 'banners'],
  'Order Manager': ['orders', 'customers', 'coupons', 'shipping', 'inventory'],
  'Customer Support': ['orders_read', 'customers_read', 'reviews', 'inquiries', 'feedback']
};

export function hasPermission(role, moduleName) {
  if (!role) return false;
  if (role === 'Super Admin') return true;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes('*') || permissions.includes(moduleName);
}

// Activity Logging
export function logAdminActivity(user, action, targetEntity, details = {}) {
  try {
    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      adminId: user?.userId || user?.id || 'system',
      adminName: user?.name || 'System',
      adminEmail: user?.email || 'admin@olivershop.com',
      action,
      targetEntity,
      details,
      timestamp: new Date().toISOString()
    };
    db('activity_logs').insertOne(logEntry);
  } catch (err) {
    console.error('Failed to log admin activity:', err);
  }
}

