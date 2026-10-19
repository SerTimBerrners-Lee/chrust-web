import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { content, screens, screensWithNav, type Locale } from '../site/content';

const links: Record<string, string | null> = JSON.parse(await readFile('site/links.json', 'utf8'));
for (const [key, value] of Object.entries(links)) {
  if (value && !/^https:\/\//.test(value)) throw new Error(`Expected an HTTPS URL for ${key}`);
}
const icons: Record<string, string> = {};
for (const name of ['apple', 'googleplay', 'rustore', 'telegram', 'instagram', 'youtube']) {
  icons[name] = (await readFile(`dist/assets/icons/${name}.svg`, 'utf8')).replace(/<\?xml[^>]*>/g, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
}
icons.web = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6.5h14M5 17.5h14"/></svg>';
icons.download = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v4h16v-4"/></svg>';
icons.pause = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/></svg>';

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const home = (lang: Locale) => lang === 'ru' ? '/' : '/en/';
const download = (lang: Locale) => `${home(lang)}download/`;

function brand(lang: Locale, isDownload: boolean) {
  return `<a class="brand" href="${isDownload ? home(lang) : '#top'}" aria-label="${content[lang].home}"><img src="/assets/chrust-rays-transparent.webp" alt="" width="56" height="56"><span>Chrust</span></a>`;
}

function externalControl(url: string | null | undefined, body: string, cls: string, label: string) {
  return url
    ? `<a class="${cls}" href="${escape(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escape(label)}">${body}</a>`
    : `<button class="${cls} is-coming-soon" type="button" disabled aria-label="${escape(label)}">${body}</button>`;
}

function storeButtons(lang: Locale) {
  const t = content[lang];
  return `<div class="store-buttons">${(['appStore', 'googlePlay', 'ruStore', 'webApp'] as const).map((key) => {
    const icon = { appStore: 'apple', googlePlay: 'googleplay', ruStore: 'rustore', webApp: 'web' }[key];
    const label = t.platforms[key];
    const body = `<span class="store-icon">${icons[icon]}</span><span class="store-label"><small>${key === 'webApp' ? t.webAction : t.storeAction}</small><strong>${label}</strong></span>${links[key] ? '' : `<span class="availability">${t.soon}</span>`}`;
    return externalControl(links[key], body, `store-button store-${key}`, `${label}${links[key] ? '' : `, ${t.soon}`}`);
  }).join('')}</div>`;
}

function downloadSection(lang: Locale, standalone: boolean) {
  const t = content[lang];
  return `<section id="download" class="support download-section ${standalone ? 'download-standalone' : 'wrap'}" aria-labelledby="download-title">
    <div class="support-copy"><${standalone ? 'h1' : 'h2'} id="download-title">${t.downloadTitle}</${standalone ? 'h1' : 'h2'}><p>${t.downloadDescription}</p></div>
    ${storeButtons(lang)}
    ${standalone ? `<a class="back-link" href="${home(lang)}">${t.back}</a>` : ''}
  </section>`;
}

function header(lang: Locale, isDownload: boolean) {
  const t = content[lang];
  return `<header class="site-header site-header--hero wrap">
    ${brand(lang, isDownload)}
    <div class="header-controls">
      <nav class="desktop-nav" aria-label="${t.nav}">${screens.map((f, i) => `<a href="${isDownload ? home(lang) : ''}#${f.id}">${t.features[i].name}</a>`).join('')}</nav>
      <nav class="language-switch" aria-label="${t.language}">
        ${(['ru', 'en'] as const).map(code => `<a data-language="${code}" lang="${code}" hreflang="${code}" aria-label="${code === 'ru' ? 'Русский' : 'English'}" title="${code === 'ru' ? 'Русский' : 'English'}" href="${isDownload ? download(code) : home(code)}"${lang === code ? ' aria-current="page"' : ''}>${code === 'ru' ? 'RU' : 'EN'}</a>`).join('')}
      </nav>
      <a class="header-download" href="${download(lang)}" aria-label="${t.download}">${icons.download}<span>${t.download}</span></a>
    </div>
  </header>`;
}

function collage(lang: Locale, files: string[]) {
  const t = content[lang];
  return `<div class="collage collage-${files.length}">${files.map((file, i) => {
    const label = t.screenLabels[file as keyof typeof t.screenLabels];
    return `<a class="screen-tile tile-${i + 1}${screensWithNav.has(file) ? ' screen-without-nav' : ''}" href="${download(lang)}" aria-label="${escape(`${label}. ${t.downloadAction}`)}">
      <img src="/assets/screens/${file}.webp" alt="${escape(label)}" width="780" height="1688" loading="lazy" decoding="async">
    </a>`;
  }).join('')}</div>`;
}

function hero(lang: Locale) {
  const t = content[lang];
  return `<section class="hero" aria-labelledby="hero-title">
    <div class="hero-art" aria-hidden="true"><img src="/assets/chrust-hero-oak.jpg" alt="" width="1672" height="941" fetchpriority="high" decoding="async"><canvas class="wind-canvas" hidden></canvas></div>
    <div class="hero-copy wrap"><h1 id="hero-title">${t.heroTitle}</h1><p class="hero-description">${t.heroDescription}</p>
      <div class="hero-actions"><a class="button hero-download" data-appearance="secondary" href="${download(lang)}">${t.download}</a><a class="button hero-open" data-appearance="secondary" href="${links.webApp ? escape(links.webApp) : download(lang)}">${t.start}</a></div>
    </div>
    <button class="wind-toggle" type="button" hidden aria-label="${t.windOn}" data-pause-label="${t.windOn}" data-play-label="${t.windOff}" aria-pressed="false">${icons.pause}</button>
  </section>`;
}

function about(lang: Locale) {
  const t = content[lang];
  return `<section id="about" class="about wrap" aria-labelledby="about-title"><h2 id="about-title">${t.aboutTitle}</h2>
    <div class="about-image"><img src="/assets/78327f16-home-hub-about-image.png" alt="${t.aboutImageAlt}" loading="lazy" decoding="async"></div>
    <div class="about-text">${t.about.map(p => `<p>${p}</p>`).join('')}</div>
    <div class="community"><h3>${t.communityTitle}</h3><p>${t.communityDescription}</p><div class="social-buttons">${(['telegram', 'instagram', 'youtube'] as const).map(key => externalControl(links[key], `<span class="social-icon">${icons[key]}</span><span>${t.socialLabels[key]}</span>${links[key] ? '' : `<small>${t.soon}</small>`}`, `social-button social-${key}`, `${t.socialLabels[key]}${links[key] ? '' : `, ${t.soon}`}`)).join('')}</div></div>
  </section>`;
}

function page(lang: Locale, isDownload: boolean) {
  const t = content[lang];
  return `<!doctype html><html lang="${lang}"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="${t.heroTitle}"><meta name="theme-color" content="#263632"><meta name="color-scheme" content="only light"><meta name="robots" content="noindex, nofollow">
  <title>${isDownload ? `${t.downloadPageTitle} | Chrust` : 'Chrust'}</title>
  <link rel="icon" type="image/png" href="/assets/chrust-logo.png"><link rel="alternate" hreflang="ru" href="${isDownload ? download('ru') : home('ru')}"><link rel="alternate" hreflang="en" href="${isDownload ? download('en') : home('en')}">
  <link rel="stylesheet" href="/assets/3a1e1e33-bp.css"><link rel="stylesheet" href="/assets/a44d755a-bp-compat.css"><link rel="stylesheet" href="/assets/e22dadcd-global-D38g-Y4N.css"><link rel="stylesheet" href="/assets/ab7d641d-button-D8QqDKPm.css"><link rel="stylesheet" href="/project.css">
  <script src="/interactions.js" defer></script></head><body id="top"${isDownload ? ' class="download-page"' : ''}>
  <a class="skip-link" href="#content">${t.skip}</a>${header(lang, isDownload)}<main id="content">
  ${isDownload ? downloadSection(lang, true) : `${hero(lang)}<div class="features wrap">${screens.map((f, i) => `<section id="${f.id}" class="feature ${i % 2 === 0 ? 'image-first' : ''}" aria-labelledby="${f.id}-title"><div class="feature-copy"><h2 id="${f.id}-title">${t.features[i].title}</h2><p class="text home-hub-section-description">${t.features[i].description}</p></div>${collage(lang, f.files)}</section>`).join('')}</div>${about(lang)}${downloadSection(lang, false)}`}
  </main><footer class="site-footer"><div class="wrap footer-top"><div>${brand(lang, true)}<p class="footer-mission">${t.footer}</p></div></div><div class="wrap footer-bottom">© ${new Date().getFullYear()} Chrust</div></footer>
  </body></html>`;
}

for (const lang of ['ru', 'en'] as const) {
  for (const isDownload of [false, true]) {
    const dir = `dist${isDownload ? download(lang) : home(lang)}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}index.html`, page(lang, isDownload).replace(/[ \t]+$/gm, ''));
  }
}
await mkdir('dist/ru/download', { recursive: true });
await Promise.all([copyFile('dist/index.html', 'dist/ru/index.html'), copyFile('dist/download/index.html', 'dist/ru/download/index.html'), copyFile('site/styles.css', 'dist/project.css'), copyFile('site/interactions.js', 'dist/interactions.js')]);
console.log('Built Russian and English home and download pages.');
