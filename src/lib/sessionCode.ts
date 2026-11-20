/** Deterministic classroom session codes (no server).
 *  Format: 4 chars from Crockford-like alphabet (no 0/1/I/O).
 *  Encodes: salt (session uniqueness) + role-play index + customer variant.
 */

const ALPH = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const BASE = ALPH.length; // 32

export type CustomerVariant = 'korean' | 'japanese' | 'international';

export const CUSTOMER_VARIANTS: CustomerVariant[] = ['korean', 'japanese', 'international'];

export const VARIANT_LABELS: Record<CustomerVariant, string> = {
  korean: 'Korean tourist (odal.co.kr)',
  japanese: 'Japanese domestic (Anne / 沖楽)',
  international: 'Other international guest',
};

function toBase32(n: number, width: number): string {
  let x = n;
  let out = '';
  for (let i = 0; i < width; i++) {
    out = ALPH[x % BASE] + out;
    x = Math.floor(x / BASE);
  }
  return out;
}

function fromBase32(s: string): number | null {
  let n = 0;
  for (const ch of s.toUpperCase()) {
    const i = ALPH.indexOf(ch);
    if (i < 0) return null;
    n = n * BASE + i;
  }
  return n;
}

function checksum(payload: number): number {
  return (payload * 7 + 13) & 31;
}

/**
 * Pack: salt(5) | scenarioIndex(8) | variant(2) = 15 bits, then checksum(5) → 20 bits → 4 chars.
 * Supports up to 256 role-play pairs and 4 variants (we use 3).
 */
export function encodeSessionCode(
  scenarioIndex: number,
  variant: CustomerVariant,
  salt = Math.floor(Math.random() * BASE),
): string {
  if (scenarioIndex < 0 || scenarioIndex > 255) {
    throw new Error('scenarioIndex out of range');
  }
  const variantIndex = CUSTOMER_VARIANTS.indexOf(variant);
  if (variantIndex < 0) throw new Error('invalid variant');
  const s = salt & 31;
  const payload = (s << 10) | ((scenarioIndex & 255) << 2) | (variantIndex & 3);
  const full = (payload << 5) | checksum(payload);
  return toBase32(full, 4);
}

export function decodeSessionCode(code: string): {
  scenarioIndex: number;
  variant: CustomerVariant;
  salt: number;
} | null {
  const cleaned = code.trim().toUpperCase().replace(/[^2-9A-HJ-NP-Z]/g, '');
  if (cleaned.length !== 4) return null;
  const full = fromBase32(cleaned);
  if (full === null) return null;
  const cs = full & 31;
  const payload = full >> 5;
  if (checksum(payload) !== cs) return null;
  const variantIndex = payload & 3;
  const scenarioIndex = (payload >> 2) & 255;
  const salt = (payload >> 10) & 31;
  if (variantIndex >= CUSTOMER_VARIANTS.length) return null;
  return {
    scenarioIndex,
    variant: CUSTOMER_VARIANTS[variantIndex],
    salt,
  };
}
