/**
 * Decode JWT payload without verification (client-side only).
 * Used to read exp claim for access validation.
 */
function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const decoded = atob(padded);
    return JSON.parse(decoded) as { exp?: number };
  } catch {
    return null;
  }
}

/**
 * Returns true if access token exists and is not expired.
 * Treats missing/invalid/expired token as invalid.
 */
export function isAccessTokenValid(): boolean {
  const token = sessionStorage.getItem("access");
  if (!token || !token.trim()) return false;

  const payload = decodeJwtPayload(token);
  if (!payload) return false;

  // exp is seconds since epoch; allow 60s buffer before expiry
  const exp = payload.exp;
  if (exp == null || typeof exp !== "number") return false;

  const nowSeconds = Math.floor(Date.now() / 1000);
  if (nowSeconds >= exp - 60) return false;

  return true;
}

export function authHeader() {
  const token = sessionStorage.getItem("access");
  if (token && isAccessTokenValid()) {
    return `Bearer ${token}`;
  }
}
