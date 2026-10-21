import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { content, screens, gamePreviewScreens, screensWithNav, capturedScreenSizes, type Locale } from '../site/content';
import { guideSlugs, guidePath, guides, type GuideSlug } from '../site/guides';
import { guideView, guideLinks } from '../site/guide-view';
import { metadata, sitemap } from '../site/seo';

const seo: { indexingEnabled: boolean; readingPlanYear: number } = JSON.parse(await readFile('site/seo.json', 'utf8'));

if (typeof seo.indexingEnabled !== 'boolean' || !Number.isInteger(seo.readingPlanYear)) {
  throw new Error('Invalid SEO release configuration');
}

const aboutArtwork: Array<{ file: string; width: number; height: number; position: string; source: string; sha256: string }> =
  JSON.parse(await readFile('site/about-artwork.json', 'utf8'));
await mkdir('dist/assets/lesson-mosaic', { recursive: true });
for (const image of aboutArtwork) {
  const target = `dist/assets/lesson-mosaic/${image.file}`;
  if (!await Bun.file(target).exists()) {
    if (!process.env.CHRUST_SOURCE_ROOT) throw new Error(`Restore ${image.file} from the Chrust app repository using CHRUST_SOURCE_ROOT.`);
    await copyFile(resolve(process.env.CHRUST_SOURCE_ROOT, image.source), target);
  }
  const bytes = await readFile(target);
  if (createHash('sha256').update(bytes).digest('hex') !== image.sha256) {
    throw new Error(`Lesson illustration checksum mismatch: ${image.file}`);
  }
}

const links: Record<string, string | null> = JSON.parse(await readFile('site/links.json', 'utf8'));
for (const [key, value] of Object.entries(links)) {
  if (value && !/^https:\/\//.test(value)) throw new Error(`Expected an HTTPS URL for ${key}`);
}
const icons: Record<string, string> = {};
for (const name of ['apple', 'googleplay', 'rustore', 'telegram', 'instagram', 'threads', 'youtube']) {
  icons[name] = (await readFile(`dist/assets/icons/${name}.svg`, 'utf8')).replace(/<\?xml[^>]*>/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
}
icons.download = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/></svg>';
icons.pause = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/></svg>';

const escape = (s: string): string => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const home = (lang: Locale): string => `/${lang}/`;
const download = (lang: Locale): string => `${home(lang)}download/`;

function publicUrl(path: string): string {
  if (!links.siteUrl) {
    throw new Error('Expected a public site URL in site/links.json');
  }

  return new URL(path, links.siteUrl).href;
}

function brand(lang: Locale, isDownload: boolean): string {
  return `<a class="brand" href="${isDownload ? home(lang) : '#top'}" aria-label="${content[lang].home}"><img src="/assets/chrust-rays-transparent.webp" alt="" width="56" height="56"><span>Chrust</span></a>`;
}

function externalControl(url: string | null | undefined, body: string, cls: string, label: string): string {
  return url
    ? `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label)}" title="${escape(label)}">${body}</a>`
    : `<button class="${cls} is-coming-soon" type="button" disabled aria-label="${escape(label)}" title="${escape(label)}">${body}</button>`;
}

function storeButtons(lang: Locale): string {
  const t = content[lang];
  const stores = (['appStore', 'googlePlay', 'ruStore'] as const).map((key) => {
    const icon = { appStore: 'apple', googlePlay: 'googleplay', ruStore: 'rustore' }[key];
    const label = t.platforms[key];
    const body = `<span class="store-icon">${icons[icon]}</span>`;

    return externalControl(links[key], body, `compact-button icon-button store-button store-${key}`, label);
  }).join('');
  const webApp = externalControl(links.webApp, `<span>${escape(t.platforms.webApp)}</span>`, 'compact-button store-webApp', t.platforms.webApp);

  return `<div class="store-buttons">${stores}${webApp}</div>`;
}

function downloadSection(lang: Locale, standalone: boolean): string {
  const t = content[lang];

  return `<section id="download" class="support download-section ${standalone ? 'download-standalone' : 'wrap'}" aria-labelledby="download-title">
    <div class="support-copy"><${standalone ? 'h1' : 'h2'} id="download-title">${t.downloadTitle}</${standalone ? 'h1' : 'h2'}><p>${t.downloadDescription}</p></div>
    ${storeButtons(lang)}
    ${standalone ? `<a class="back-link" href="${home(lang)}">${t.back}</a>` : ''}
  </section>`;
}

function header(lang: Locale, isDownload: boolean, guide?: GuideSlug): string {
  const t = content[lang];
  return `<header class="site-header site-header--hero wrap">
    ${brand(lang, isDownload || Boolean(guide))}
    <div class="header-controls">
      <nav class="desktop-nav" aria-label="${t.nav}">${screens.map((f, i) => `<a href="${isDownload || guide ? home(lang) : ''}#${f.id}">${t.features[i].name}</a>`).join('')}</nav>
      <nav class="language-switch" aria-label="${t.language}">
        ${(['ru', 'en'] as const).map(code => `<a data-language="${code}" lang="${code}" hreflang="${code}" aria-label="${code === 'ru' ? 'Русский' : 'English'}" title="${code === 'ru' ? 'Русский' : 'English'}" href="${guide ? guidePath(code, guide) : isDownload ? download(code) : home(code)}"${lang === code ? ' aria-current="page"' : ''}>${code === 'ru' ? 'RU' : 'EN'}</a>`).join('')}
      </nav>
      <a class="compact-button header-download" href="${download(lang)}" aria-label="${t.download}">${icons.download}<span>${t.download}</span></a>
    </div>
  </header>`;
}

function collage(lang: Locale, files: string[]): string {
  const t = content[lang];
  return `<div class="collage collage-${files.length}">${files.map((file, i) => {
    const label = t.screenLabels[file as keyof typeof t.screenLabels];
    const size = capturedScreenSizes[file] ?? { width: 780, height: 1688 };
    return `<a class="screen-tile tile-${i + 1}${screensWithNav.has(file) ? ' screen-without-nav' : ''}" style="--screen-aspect:${size.width} / ${size.height}" href="${download(lang)}" aria-label="${escape(`${label}. ${t.downloadAction}`)}">
      <img src="/assets/screens/${file}.webp" alt="${escape(label)}" width="${size.width}" height="${size.height}" loading="lazy" decoding="async">
    </a>`;
  }).join('')}</div>`;
}

function hero(lang: Locale): string {
  const t = content[lang];
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-art" aria-hidden="true"><img src="/assets/chrust-hero-oak.jpg" alt="" width="1672" height="941" fetchpriority="high" decoding="async"><canvas class="wind-canvas" hidden></canvas></div>
    <div class="hero-copy wrap"><h1 id="hero-title">${t.heroTitle}</h1><p class="hero-description">${t.heroDescription}</p>
      <div class="hero-actions"><a class="button hero-download" data-appearance="secondary" href="${download(lang)}">${t.download}</a><a class="button hero-open" data-appearance="secondary" href="${links.webApp ? escape(links.webApp) : download(lang)}">${t.start}</a></div>
    </div>
    <button class="wind-toggle" type="button" hidden aria-label="${t.windOn}" data-pause-label="${t.windOn}" data-play-label="${t.windOff}" aria-pressed="false">${icons.pause}</button>
  </section>`;
}

function about(lang: Locale): string {
  const t = content[lang];

  return `<section id="about" class="about wrap" aria-labelledby="about-title"><h2 id="about-title">${t.aboutTitle}</h2>
    <div class="about-image about-mosaic" role="img" aria-label="${escape(t.aboutImageAlt)}">${aboutArtwork.map((image, index) => `<span class="about-mosaic-tile about-mosaic-tile-${index + 1}" aria-hidden="true"><img src="/assets/lesson-mosaic/${image.file}" alt="" width="${image.width}" height="${image.height}" style="object-position:${image.position}" loading="lazy" decoding="async"></span>`).join('')}</div>
    <div class="about-text">${t.about.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="community"><h3>${t.communityDescription}</h3><div class="social-buttons">${(['telegram', 'instagram', 'threads', 'youtube'] as const).map(key => externalControl(links[key], `<span class="social-icon">${icons[key]}</span>`, `compact-button icon-button social-button social-${key}`, t.socialLabels[key])).join('')}</div></div>
  </section>`;
}

function footer(lang: Locale, guide?: GuideSlug): string {
  const t = content[lang];
  const appLink = externalControl(links.webApp, `<span>${escape(t.platforms.webApp)}</span>`, 'compact-button footer-app', t.platforms.webApp);

  return `<footer class="site-footer"><div class="wrap footer-top"><div class="footer-info">${brand(lang, true)}<p class="footer-mission">${t.footer}</p>
    <div class="footer-actions"><a class="compact-button footer-download" href="${download(lang)}">${t.download}</a>${appLink}</div>
    </div>${guideLinks(lang, guide)}</div><div class="wrap footer-bottom">© ${new Date().getFullYear()} Chrust</div></footer>`;
}

function page(lang: Locale, isDownload: boolean, guide?: GuideSlug): string {
  const t = content[lang];
  const other = lang === 'ru' ? 'en' : 'ru';
  const path = guide ? guidePath(lang, guide) : isDownload ? download(lang) : home(lang);
  const counterpart = guide ? guidePath(other, guide) : isDownload ? download(other) : home(other);
  const title = guide ? `${guides[guide][lang].title} | Chrust` : isDownload ? `${t.downloadPageTitle} | Chrust`
    : lang === 'ru' ? 'Chrust: Библия, библейские игры и план чтения' : 'Chrust: Bible study, games and a daily reading plan';
  const description = guide ? guides[guide][lang].description : isDownload ? t.downloadDescription : t.heroDescription;
  const guidePreview = guide === 'bible-games' ? collage(lang, gamePreviewScreens) : '';

  return `<!doctype html><html lang="${lang}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#263632"><meta name="color-scheme" content="only light">
  ${metadata({ locale: lang, title, description, path, counterpart, fallback: guide ? guidePath('en', guide) : isDownload ? '/download/' : '/', siteUrl: publicUrl('/'), indexable: seo.indexingEnabled && !isDownload })}
  <link rel="icon" type="image/png" href="/assets/chrust-logo.png">
  <script src="/language.js"></script>
  <link rel="stylesheet" href="/assets/3a1e1e33-bp.css"><link rel="stylesheet" href="/assets/a44d755a-bp-compat.css"><link rel="stylesheet" href="/assets/e22dadcd-global-D38g-Y4N.css"><link rel="stylesheet" href="/assets/ab7d641d-button-D8QqDKPm.css"><link rel="stylesheet" href="/project.css">
  <script src="/interactions.js" defer></script></head><body id="top"${guide ? ' class="guide-page"' : isDownload ? ' class="download-page"' : ''}>
  <a class="skip-link" href="#content">${t.skip}</a>${header(lang, isDownload, guide)}<main id="content">
  ${guide ? `${guideView(lang, guide, seo.readingPlanYear, guidePreview)}${downloadSection(lang, false)}` : isDownload ? downloadSection(lang, true) : `${hero(lang)}<div class="features wrap">${screens.map((f, i) => `<section id="${f.id}" class="feature ${i % 2 === 0 ? 'image-first' : ''}" aria-labelledby="${f.id}-title"><div class="feature-copy"><h2 id="${f.id}-title">${t.features[i].title}</h2><p class="text home-hub-section-description">${t.features[i].description}</p></div>${collage(lang, f.files)}</section>`).join('')}</div>${about(lang)}${downloadSection(lang, false)}`}
  </main>${footer(lang, guide)}
  </body></html>`;
}

const languageBuild = await Bun.build({
  entrypoints: ['site/language.ts'],
  outdir: 'dist',
  target: 'browser',
  format: 'iife',
});

if (!languageBuild.success) {
  throw new AggregateError(languageBuild.logs, 'Language selection build failed.');
}

for (const lang of ['ru', 'en'] as const) {
  for (const isDownload of [false, true]) {
    const dir = `dist${isDownload ? download(lang) : home(lang)}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}index.html`, page(lang, isDownload).replace(/[ \t]+$/gm, ''));
  }

  for (const slug of guideSlugs) {
    const dir = `dist${guidePath(lang, slug)}`;

    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}index.html`, page(lang, false, slug).replace(/[ \t]+$/gm, ''));
  }
}
await mkdir('dist/download', { recursive: true });
await Promise.all([copyFile('dist/en/index.html', 'dist/index.html'), copyFile('dist/en/download/index.html', 'dist/download/index.html'), copyFile('site/styles.css', 'dist/project.css'), copyFile('site/interactions.js', 'dist/interactions.js')]);
await writeFile('dist/sitemap.xml', sitemap(publicUrl('/')));
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${publicUrl('/sitemap.xml')}\n`);
console.log('Built 14 pages, sitemap and robots for Russian and English.');
