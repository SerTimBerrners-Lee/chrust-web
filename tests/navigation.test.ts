import { expect, test } from 'bun:test';
import { runInNewContext } from 'node:vm';

const routes = ['/', '/ru/', '/en/', '/download/', '/ru/download/', '/en/download/'];

for (const route of routes) {
  test(`language switching does not inherit a section anchor: ${route}`, async (): Promise<void> => {
    const html = await Bun.file(`dist${route}index.html`).text();
    const script = await Bun.file('dist/interactions.js').text();
    const languageLinks = Array.from(
      html.matchAll(/<a data-language="(?:ru|en)"[^>]*href="([^"]+)"[^>]*>/g),
      match => new URL(match[1], 'https://chrust.org'),
    );
    const expectedPaths = route.includes('/download/')
      ? ['/ru/download/', '/en/download/']
      : ['/ru/', '/en/'];

    expect(languageLinks.map(link => link.pathname)).toEqual(expectedPaths);
    expect(languageLinks.map(link => link.hash)).toEqual(['', '']);

    const location = new URL(`${route}#games`, 'https://chrust.org');
    const listeners: Record<string, Array<() => void>> = {};

    await runInNewContext(script, {
      location,
      matchMedia: (): { matches: boolean } => ({ matches: false }),
      document: {
        querySelector: (): null => null,
        querySelectorAll: (selector: string): URL[] => selector === '[data-language]' ? languageLinks : [],
      },
      addEventListener: (name: string, listener: () => void): void => {
        (listeners[name] ??= []).push(listener);
      },
    });

    for (const hash of ['#games', '#bible', '#top']) {
      location.hash = hash;

      for (const listener of listeners.hashchange ?? []) {
        listener();
      }

      expect(languageLinks.map(link => link.hash)).toEqual(['', '']);
      expect(languageLinks.map(link => link.pathname)).toEqual(expectedPaths);
    }
  });
}

test('hover decoration is limited to devices with a mouse-like pointer', async (): Promise<void> => {
  const css = await Bun.file('dist/project.css').text();
  const hoverBlock = css.match(/@media \(hover: hover\) and \(pointer: fine\) \{([\s\S]*?)\n\}/);

  expect(hoverBlock).not.toBeNull();
  expect(hoverBlock?.[1]).toContain('.site-header--hero .desktop-nav a:hover');
  expect(css.replace(hoverBlock?.[0] ?? '', '')).not.toContain(':hover');
  expect(css).toContain('a:focus-visible, button:focus-visible');
});
