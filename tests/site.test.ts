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
    expect(html).toMatch(/<button class="[^"]*social-instagram is-coming-soon"[^>]*disabled/);
    expect(html).toMatch(/<button class="[^"]*social-youtube is-coming-soon"[^>]*disabled/);
  });
}

test('download controls and text contrast use the shared styles', async (): Promise<void> => {
  const css = await Bun.file(`${dist}/project.css`).text();
  const source = await Bun.file('site/styles.css').text();

  expect(css).toBe(source);
  expect(css).toMatch(/\.store-buttons\s*\{[^}]*align-items: center;[^}]*justify-content: center;/);
  expect(css).toMatch(/\.store-button\s*\{[^}]*place-items: center;/);
  expect(css).toMatch(/\.support-copy::before\s*\{[^}]*radial-gradient/);
});
