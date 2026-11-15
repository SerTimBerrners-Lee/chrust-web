import { expect, test } from 'bun:test';
import { privacyContent, privacyHtml, privacyOperator, privacyVersion } from '../site/privacy';

for (const locale of ['ru', 'en'] as const) {
  test(`privacy policy is complete and accessible in ${locale}`, async () => {
    const html = privacyHtml(locale);
    expect(privacyOperator).toBe('Перов Давид');
    expect(privacyVersion).toBe('2026-11-11');
    expect(html).toContain(`<html lang="${locale}">`);
    expect(html.match(/<h1[ >]/g)).toHaveLength(1);
    expect(html.match(/<h2[ >]/g)).toHaveLength(9);
    expect(html).toContain('mailto:info@chrust.org');
    expect(html).toContain('https://resend.com/security');
    expect(html).toContain('https://chrust.org/ru/privacy/');
    expect(html).toContain('https://chrust.org/en/privacy/');
    expect(html).not.toMatch(/\[подтвердить|TODO|Статус: проект|Draft for review/);
    expect(html).not.toContain('\u2014');
    const built = await Bun.file(`dist/${locale}/privacy/index.html`).text();
    expect(built).toBe(html);
    const home = await Bun.file(`dist/${locale}/index.html`).text();
    expect(home).toContain(`href="/${locale}/privacy/"`);
  });
}

test('the two policies have matching sections and no third-party scripts', () => {
  expect(privacyContent.ru.sections.length).toBe(privacyContent.en.sections.length);
  expect(privacyHtml('ru')).not.toContain('<script');
  expect(privacyHtml('en')).not.toContain('<script');
});
