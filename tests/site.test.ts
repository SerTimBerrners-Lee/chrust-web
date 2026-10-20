import { expect, test } from 'bun:test';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const routes = ['/', '/ru/', '/en/', '/download/', '/ru/download/', '/en/download/'];
const dist = resolve('dist');

for (const route of routes) {
  test(`built page and local resources: ${route}`, async (): Promise<void> => {
    const html = await Bun.file(`${dist}${route}index.html`).text();

    expect(html).toContain('https://app.chrust.org');
    expect(html).toContain('rel="canonical" href="https://chrust.org');

    const appLabel = route.startsWith('/en/') ? 'Open the app' : 'В приложение';
    const webControl = html.match(/<a class="compact-button store-webApp"[^>]*>[\s\S]*?<\/a>/)?.[0];

    expect(webControl).toContain('href="https://app.chrust.org"');
    expect(webControl).toContain(`<span>${appLabel}</span>`);
    expect(webControl).not.toContain('<svg');
    expect(webControl).not.toContain('icon-button');
    expect(html.match(/class="compact-button icon-button store-button store-/g)).toHaveLength(3);

    for (const match of html.matchAll(/(?:src|href)="(\/[^"]*)"/g)) {
      const url = new URL(match[1], 'https://chrust.org');
      const path = resolve(dist, `.${decodeURIComponent(url.pathname)}`);

      expect(path.startsWith(dist)).toBe(true);

      const info = await stat(path);

      if (info.isDirectory()) {
        expect(await Bun.file(`${path}/index.html`).exists()).toBe(true);
      } else {
        expect(info.isFile()).toBe(true);
      }
    }
  });
}

for (const route of ['/', '/ru/', '/en/']) {
  test(`community links and placeholder mosaic: ${route}`, async (): Promise<void> => {
    const html = await Bun.file(`${dist}${route}index.html`).text();

    expect(html.match(/class="about-mosaic-tile about-mosaic-tile-\d"/g)).toHaveLength(7);
    expect(html).not.toContain('/assets/78327f16-home-hub-about-image.png');
    expect(html).toMatch(/<a class="[^"]*social-telegram" href="https:\/\/t.me\/chrustapp" target="_blank" rel="noopener noreferrer"/);
    expect(html).toMatch(/<a class="[^"]*social-instagram" href="https:\/\/www\.instagram\.com\/chrust\.app\/" target="_blank" rel="noopener noreferrer"/);
    expect(html).toMatch(/<a class="[^"]*social-threads" href="https:\/\/www\.threads\.com\/@chrust\.app" target="_blank" rel="noopener noreferrer"/);
    expect(html).toMatch(/<a class="[^"]*social-youtube" href="https:\/\/www\.youtube\.com\/@ChrustApp" target="_blank" rel="noopener noreferrer"/);
  });
}

test('download controls and text contrast use the shared styles', async (): Promise<void> => {
  const css = await Bun.file(`${dist}/project.css`).text();
  const source = await Bun.file('site/styles.css').text();

  expect(css).toBe(source);
  expect(css).toMatch(/\.store-buttons\s*\{[^}]*align-items: center;[^}]*justify-content: center;/);
  expect(css).toMatch(/\.store-button\s*\{[^}]*place-items: center;/);
  expect(css).toMatch(/\.support-copy::before\s*\{[^}]*radial-gradient/);
  expect(css).toMatch(/\.icon-button\s*\{[^}]*place-items: center;[^}]*padding: 0;[^}]*line-height: 0;/);
  expect(css).toMatch(/\.compact-button\s*\{[^}]*line-height: 1;[^}]*text-align: center;/);
  expect(css).toMatch(/\.wind-toggle\s*\{[^}]*place-items: center;[^}]*padding: 0;[^}]*line-height: 0;/);
  expect(css).toMatch(/\.wind-toggle svg\s*\{ width: 18px; height: 18px; \}/);
  expect(css).toMatch(/\.wind-toggle svg\s*\{ width: 14px; height: 14px; \}/);
  expect(css).toContain('.download-standalone .support-copy::before { inset-inline: -20px; }');
});

test('wind play and pause glyphs share the same horizontal center', async (): Promise<void> => {
  const html = await Bun.file(`${dist}/index.html`).text();
  const js = await Bun.file(`${dist}/interactions.js`).text();

  expect(html).toContain('<rect x="7" y="5" width="3" height="14" rx="1"/><rect x="14" y="5" width="3" height="14" rx="1"/>');
  expect(js).toContain('<path d="M7 5v14l10-7z"/>');
});
