import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ redirect, cookies }) => {
  const clientId = import.meta.env.GOOGLE_CLIENT_ID;
  const siteUrl = import.meta.env.SITE_URL ?? 'http://localhost:4321';

  const state = crypto.randomUUID();
  cookies.set('oauth_state', state, { httpOnly: true, path: '/', maxAge: 600, sameSite: 'lax' });

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${siteUrl}/auth/callback`,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  });

  return redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
};
