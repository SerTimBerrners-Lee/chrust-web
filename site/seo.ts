import type { Locale } from './content';
import { guideSlugs, guidePath } from './guides';

export function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function indexablePaths(): string[] {
  return (['ru', 'en'] as const).flatMap(locale => [`/${locale}/`, ...guideSlugs.map(slug => guidePath(locale, slug))]);
}

export function ownershipMetadata(tokens: { google: string; yandex: string }): string {
  return [
    tokens.google ? `<meta name="google-site-verification" content="${escapeHtml(tokens.google)}">` : '',
    tokens.yandex ? `<meta name="yandex-verification" content="${escapeHtml(tokens.yandex)}">` : '',
  ].filter(Boolean).join('\n');
}

export function metadata(options: {
  locale: Locale; title: string; description: string; path: string;
  counterpart: string; fallback: string; siteUrl: string; indexable: boolean;
}): string {
  const { locale, title, description, path, counterpart, fallback, siteUrl, indexable } = options;
  const url = (relative: string): string => escapeHtml(new URL(relative, siteUrl).href);

  return `<title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="${indexable ? 'index, follow' : 'noindex, follow'}">
  <link rel="canonical" href="${url(path)}"><link rel="alternate" hreflang="${locale}" href="${url(path)}"><link rel="alternate" hreflang="${locale === 'ru' ? 'en' : 'ru'}" href="${url(counterpart)}"><link rel="alternate" hreflang="x-default" href="${url(fallback)}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Chrust"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${url(path)}"><meta property="og:locale" content="${locale === 'ru' ? 'ru_RU' : 'en_US'}"><meta property="og:image" content="${url('/assets/chrust-hero-oak.jpg')}"><meta property="og:image:alt" content="${locale === 'ru' ? 'Дерево Chrust' : 'The Chrust tree'}">
  <meta name="twitter:card" content="summary_large_image">`;
}

export function sitemap(siteUrl: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexablePaths().map(path => `  <url><loc>${escapeHtml(new URL(path, siteUrl).href)}</loc></url>`).join('\n')}\n</urlset>\n`;
}
