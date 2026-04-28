# Onboarding HubSpot — Hagens × HubSpot Academy

Plataforma de videoaulas do programa de parceria Hagens × HubSpot. Acesso restrito à equipe interna.

## Stack

- [Astro 4](https://astro.build) — geração estática
- [Tailwind CSS v3](https://tailwindcss.com) — estilização
- Legendas em VTT (pt-BR) via `<track>` nativo do HTML5
- Progresso persistido em `localStorage`

## Estrutura

```
src/
├── components/       # Header, Footer, VideoPlayer, ChatBot, etc.
├── content/aulas/    # 15 aulas em Markdown com frontmatter
├── layouts/          # BaseLayout (home) e AulaLayout (aulas)
├── pages/            # index.astro + aulas/[...slug].astro
└── styles/           # global.css

public/
└── videos/           # .mp4 e .vtt — não versionados (.gitignore)
```

## Módulos

| # | Módulo | Aulas |
|---|--------|-------|
| 1 | Selling Series | 2 |
| 2 | Servicing Series | 2 |
| 3 | CRM Setup | 1 |
| 4 | Marketing Hub | 3 |
| 5 | Sales Hub | 4 |
| 6 | Service Hub | 3 |

## Rodar localmente

```bash
npm install
npm run dev
```

Os vídeos ficam em `public/videos/` (não estão no repositório). Copie os arquivos `.mp4` e `.vtt` para essa pasta antes de rodar.

## Deploy

Build estático — compatível com qualquer CDN (Firebase Hosting, Vercel, Netlify).

```bash
npm run build   # gera dist/
```
