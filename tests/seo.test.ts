import { expect, test } from 'bun:test';
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { guidePath, guideSlugs, guides } from '../site/guides';
import { wordExamples } from '../site/guide-view';
import { annualPlan, books } from '../site/reading-plan';
import { escapeHtml, indexablePaths, metadata } from '../site/seo';
import seo from '../site/seo.json';

const origin = 'https://chrust.org';
const dist = resolve('dist');
const locales = ['ru', 'en'] as const;
const publicRobots = seo.indexingEnabled ? 'index, follow' : 'noindex, follow';

for (const locale of locales) {
  for (const slug of guideSlugs) {
    test(`useful static content and reciprocal language links: ${locale}/${slug}`, async (): Promise<void> => {
      const path = guidePath(locale, slug);
      const html = await Bun.file(`dist${path}index.html`).text();
      const links = Array.from(html.matchAll(/<a data-language="(?:ru|en)"[^>]*href="([^"]+)"/g), match => match[1]);

      expect(html).toContain(`<html lang="${locale}">`);
      expect(html.match(/<h1[ >]/g)).toHaveLength(1);
      expect(html.match(/<title>/g)).toHaveLength(1);
      expect(html.match(/<meta name="description"/g)).toHaveLength(1);
      expect(html).toContain(`<h1>${escapeHtml(guides[slug][locale].title)}</h1>`);
      expect(html).toContain(`rel="canonical" href="${origin}${path}"`);
      expect(html).toContain(`content="${publicRobots}"`);
      expect(html).toContain(`property="og:url" content="${origin}${path}"`);
      expect(html).toContain(`hreflang="x-default" href="${origin}${guidePath('en', slug)}"`);
      expect(links).toEqual(locales.map(code => guidePath(code, slug)));
      expect(html).not.toContain('app.chrust.org');

      for (const code of locales) {
        expect(html).toContain(`hreflang="${code}" href="${origin}${guidePath(code, slug)}"`);
      }

      for (const section of guides[slug][locale].sections) {
        expect(html).toContain(`<h2>${escapeHtml(section.title)}</h2>`);
      }

      for (const match of html.matchAll(/(?:src|href)="(\/[^"]*|#[^"]*)"/g)) {
        const url = new URL(match[1], `${origin}${path}`);
        const target = resolve(dist, `.${decodeURIComponent(url.pathname)}`);

        expect(target.startsWith(`${dist}\\`) || target.startsWith(`${dist}/`)).toBe(true);

        const info = await stat(target);
        const targetHtml = info.isDirectory() ? await Bun.file(`${target}/index.html`).text()
          : url.pathname.endsWith('.html') ? await Bun.file(target).text() : '';

        if (url.hash) expect(targetHtml).toContain(`id="${url.hash.slice(1)}"`);
      }
    });
  }

  test(`homepage retains the original hero and exposes all four guides: ${locale}`, async (): Promise<void> => {
    const html = await Bun.file(`dist/${locale}/index.html`).text();
    const main = html.split('<main id="content">')[1].split('</main>')[0];
    const footer = html.split('<footer')[1];

    expect(main).toContain('class="hero"');
    expect(main).not.toContain('guide-article');

    for (const slug of guideSlugs) expect(footer).toContain(`href="${guidePath(locale, slug)}"`);
  });

  test(`examples are usable without an application session: ${locale}`, async (): Promise<void> => {
    const quiz = await Bun.file(`dist/${locale}/bible-games/index.html`).text();
    const puzzle = await Bun.file(`dist/${locale}/bible-word-search/index.html`).text();
    const plan = await Bun.file(`dist/${locale}/bible-reading-plan/index.html`).text();
    const study = await Bun.file(`dist/${locale}/bible-study-for-beginners/index.html`).text();

    expect(quiz.match(/<details class="guide-answer"/g)).toHaveLength(3);
    expect(puzzle).toContain('<table class="word-example">');
    expect(puzzle).toContain('<details class="guide-answer">');
    expect(plan.match(/<details class="guide-answer"/g)).toHaveLength(12);
    expect(plan.match(new RegExp(`<time datetime="${seo.readingPlanYear}-`, 'g'))).toHaveLength(annualPlan(seo.readingPlanYear, locale).length);
    expect(study).toContain(`https://ebible.org/${locale === 'ru' ? 'russyn' : 'engwebp'}/LUK10.htm`);
  });

  test(`word puzzle has complete, non-overlapping adjacent paths: ${locale}`, (): void => {
    const puzzle = wordExamples[locale];
    const width = puzzle.rows[0].length;
    const letters = puzzle.rows.join('');
    const allCells = puzzle.words.flatMap(word => word.path);

    expect(puzzle.rows.every(row => row.length === width)).toBe(true);
    expect(allCells.length).toBe(letters.length);
    expect(new Set(allCells).size).toBe(letters.length);

    for (const word of puzzle.words) {
      expect(word.path.map(index => letters[index]).join('')).toBe(word.name);

      for (let step = 1; step < word.path.length; step++) {
        const previous = word.path[step - 1];
        const current = word.path[step];
        const distance = Math.abs(Math.floor(previous / width) - Math.floor(current / width))
          + Math.abs(previous % width - current % width);

        expect(distance).toBe(1);
      }
    }
  });

  for (const year of [2026, 2028, 2100]) {
    test(`annual reading covers all 1189 chapters exactly once: ${locale}/${year}`, (): void => {
      const days = annualPlan(year, locale);
      const expected = books.flatMap(([ru, en, count]) => Array.from({ length: count }, (_, chapter) => `${locale === 'ru' ? ru : en} ${chapter + 1}`));
      const actual = days.flatMap(day => day.chapters);

      expect(books.length).toBe(66);
      expect(days.length).toBe(year === 2028 ? 366 : 365);
      expect(actual).toEqual(expected);
      expect(actual.length).toBe(1189);
      expect(new Set(actual).size).toBe(1189);
      expect(days[0].date).toBe(`${year}-01-01`);
      expect(days.at(-1)?.date).toBe(`${year}-12-31`);
      expect(days.some(day => day.date === `${year}-02-29`)).toBe(year === 2028);
      expect(days.every(day => [3, 4].includes(day.chapters.length))).toBe(true);
    });
  }
}

test('invalid plan years cannot silently produce an empty calendar', (): void => {
  for (const year of [NaN, Infinity, 1999, 2101, 2026.5]) {
    expect(() => annualPlan(year, 'en')).toThrow('Unsupported plan year');
  }
});

test('sitemap advertises only the ten indexable canonical site pages', async (): Promise<void> => {
  const xml = await Bun.file('dist/sitemap.xml').text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1]);
  const robots = await Bun.file('dist/robots.txt').text();

  expect(urls).toEqual(indexablePaths().map(path => `${origin}${path}`));
  expect(new Set(urls).size).toBe(10);
  expect(xml).not.toContain('download');
  expect(xml).not.toContain('app.chrust.org');
  expect(robots).toBe(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

  for (const url of urls) {
    const html = await Bun.file(`dist${new URL(url).pathname}index.html`).text();

    expect(html).toContain(`rel="canonical" href="${url}"`);
    expect(html).toContain(`content="${publicRobots}"`);
  }
});

test('metadata escapes text and supports a deliberate indexing stop', (): void => {
  const html = metadata({
    locale: 'en', title: '<script>"&', description: '<img "&', path: '/en/',
    counterpart: '/ru/', fallback: '/', siteUrl: origin, indexable: false,
  });

  expect(html).toContain('<title>&lt;script&gt;&quot;&amp;</title>');
  expect(html).toContain('content="&lt;img &quot;&amp;"');
  expect(html).toContain('content="noindex, follow"');
  expect(html).not.toContain('<script>');
});

test('each canonical page has a distinct title and description', async (): Promise<void> => {
  const pages = await Promise.all(indexablePaths().map(path => Bun.file(`dist${path}index.html`).text()));
  const titles = pages.map(html => html.match(/<title>([^<]+)<\/title>/)?.[1]);
  const descriptions = pages.map(html => html.match(/<meta name="description" content="([^"]+)"/)?.[1]);

  expect(new Set(titles).size).toBe(10);
  expect(new Set(descriptions).size).toBe(10);
});

test('new authored materials follow the project punctuation rule', async (): Promise<void> => {
  const files = ['site/guides.ts', 'site/guide-view.ts', 'docs/seo-plan.md'];

  for (const path of files) expect(await Bun.file(path).text()).not.toContain('\u2014');
});
