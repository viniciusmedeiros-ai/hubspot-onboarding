import type { APIRoute } from 'astro';
import { createSession, isAllowedEmail } from '../../lib/session';

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const code  = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const savedState = cookies.get('oauth_state')?.value;

  cookies.delete('oauth_state', { path: '/' });

  if (!code || !state || state !== savedState) {
    return redirect('/login?error=estado');
  }

  const clientId     = import.meta.env.GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
  const siteUrl      = import.meta.env.SITE_URL ?? 'http://localhost:4321';

  // Troca o código pelo token
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: `${siteUrl}/auth/callback`,
      grant_type: 'authorization_code',
    }),
  });

  if (!tokenRes.ok) return redirect('/login?error=token');

  const { access_token } = await tokenRes.json();

  // Busca dados do usuário
  const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });

  if (!userRes.ok) return redirect('/login?error=usuario');

  const { email } = await userRes.json();

  if (!isAllowedEmail(email)) {
    return redirect('/login?error=dominio');
  }

  const token = await createSession(email);
  cookies.set('session', token, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: siteUrl.startsWith('https'),
  });

  return redirect('/');
};
