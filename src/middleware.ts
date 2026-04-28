import { defineMiddleware } from 'astro:middleware';
import { verifySession, isAllowedEmail } from './lib/session';

const PUBLIC_PATHS = ['/login', '/auth/google', '/auth/callback', '/auth/logout'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Libera rotas públicas e assets estáticos
  if (
    PUBLIC_PATHS.some(p => pathname.startsWith(p)) ||
    pathname.startsWith('/_astro/') ||
    pathname.match(/\.(ico|svg|png|jpg|webp|mp4|vtt|css|js|woff2?)$/)
  ) {
    return next();
  }

  const token = context.cookies.get('session')?.value;
  if (!token) return context.redirect('/login');

  const session = await verifySession(token);
  if (!session || !isAllowedEmail(session.email)) {
    context.cookies.delete('session', { path: '/' });
    return context.redirect('/login?error=acesso');
  }

  return next();
});
