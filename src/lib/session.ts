const ALLOWED_DOMAIN = '@hagens.com.br';

function getSecret(): string {
  const s = import.meta.env.SESSION_SECRET;
  if (!s) throw new Error('SESSION_SECRET não definido');
  return s;
}

async function getKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSession(email: string): Promise<string> {
  const payload = JSON.stringify({ email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 });
  const key = await getKey(getSecret());
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return btoa(payload) + '.' + sigB64;
}

export async function verifySession(token: string): Promise<{ email: string } | null> {
  try {
    const [payloadB64, sigB64] = token.split('.');
    if (!payloadB64 || !sigB64) return null;

    const payload = atob(payloadB64);
    const key = await getKey(getSecret());

    const sigBytes = Uint8Array.from(atob(sigB64), c => c.charCodeAt(0));
    const valid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(payload));
    if (!valid) return null;

    const data = JSON.parse(payload);
    if (data.exp < Date.now()) return null;

    return { email: data.email };
  } catch {
    return null;
  }
}

export function isAllowedEmail(email: string): boolean {
  return email.toLowerCase().endsWith(ALLOWED_DOMAIN);
}
