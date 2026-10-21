import { expect, test } from 'bun:test';
import { runInNewContext } from 'node:vm';

type LanguageOptions = {
  path?: string;
  languages?: string[];
  language?: string;
  saved?: string;
  storageBlocked?: boolean;
};

type ClickOptions = {
  button: number;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
  defaultPrevented: boolean;
};

class LanguageLink {
  constructor(private readonly locale: string) {}

  closest(selector: string): LanguageLink | null {
    return selector === 'a[data-language]' ? this : null;
  }

  getAttribute(name: string): string | null {
    return name === 'data-language' ? this.locale : null;
  }
}

type SimulatedClick = ClickOptions & { target: LanguageLink };

type LanguageSession = {
  redirects: string[];
  saved: Map<string, string>;
  choose: (locale: string, options?: Partial<ClickOptions>) => void;
};

async function runLanguage(options: LanguageOptions = {}): Promise<LanguageSession> {
  const script = await Bun.file('dist/language.js').text();
  const url = new URL(options.path ?? '/', 'https://chrust.org');
  const saved = new Map<string, string>();
  const redirects: string[] = [];
  let clickListener: ((event: SimulatedClick) => void) | undefined;

  if (options.saved !== undefined) saved.set('chrust.site.language', options.saved);

  runInNewContext(script, {
    Element: LanguageLink,
    navigator: { languages: options.languages ?? [], language: options.language ?? '' },
    location: {
      pathname: url.pathname,
      search: url.search,
      hash: url.hash,
      replace: (destination: string): void => { redirects.push(destination); },
    },
    localStorage: {
      getItem: (key: string): string | null => {
        if (options.storageBlocked) throw new Error('Storage unavailable');

        return saved.get(key) ?? null;
      },
      setItem: (key: string, value: string): void => {
        if (options.storageBlocked) throw new Error('Storage unavailable');

        saved.set(key, value);
      },
    },
    document: {
      addEventListener: (name: string, listener: (event: SimulatedClick) => void): void => {
        if (name === 'click') clickListener = listener;
      },
    },
  });

  return {
    redirects,
    saved,
    choose: (locale: string, clickOptions: Partial<ClickOptions> = {}): void => {
      clickListener?.({
        target: new LanguageLink(locale), button: 0, ctrlKey: false, metaKey: false,
        shiftKey: false, altKey: false, defaultPrevented: false, ...clickOptions,
      });
    },
  };
}

const browserCases: Array<{ languages: string[]; expected: string }> = [
  { languages: ['ru-RU', 'en-US'], expected: 'ru' },
  { languages: ['en-GB', 'ru'], expected: 'en' },
  { languages: ['es-MX', 'en', 'ru'], expected: 'en' },
  { languages: ['pt-BR', 'ru', 'en'], expected: 'ru' },
  { languages: ['de-DE', 'fr-FR'], expected: 'en' },
  { languages: ['RU_ru'], expected: 'ru' },
  { languages: [], expected: 'en' },
];

for (const { languages, expected } of browserCases) {
  test(`entry uses supported browser preference: ${languages.join(',') || 'none'}`, async (): Promise<void> => {
    const session = await runLanguage({ languages });

    expect(session.redirects).toEqual([`/${expected}/`]);
    expect(session.saved.size).toBe(0);
  });
}

test('navigator.language is used when the languages list is empty', async (): Promise<void> => {
  const session = await runLanguage({ language: 'ru-RU' });

  expect(session.redirects).toEqual(['/ru/']);
});

for (const saved of ['en', 'ru']) {
  test(`saved manual preference wins over browser: ${saved}`, async (): Promise<void> => {
    const session = await runLanguage({ saved, languages: [saved === 'en' ? 'ru' : 'en'] });

    expect(session.redirects).toEqual([`/${saved}/`]);
  });
}

test('invalid stored language is ignored', async (): Promise<void> => {
  const session = await runLanguage({ saved: 'https://example.com', languages: ['ru'] });

  expect(session.redirects).toEqual(['/ru/']);
});

for (const path of ['/ru/', '/en/', '/ru/download/', '/en/download/', '/ru/index.html', '/en/index.html', '/unknown/']) {
  test(`explicit or unknown URL is never automatically redirected: ${path}`, async (): Promise<void> => {
    const session = await runLanguage({ path, languages: ['en', 'ru'], saved: 'ru' });

    expect(session.redirects).toEqual([]);
  });
}

for (const path of ['/download/', '/download', '/download/index.html']) {
  test(`download entry keeps its destination and incoming parameters: ${path}`, async (): Promise<void> => {
    const session = await runLanguage({ path: `${path}?utm_source=youtube#platforms`, languages: ['ru'] });

    expect(session.redirects).toEqual(['/ru/download/?utm_source=youtube#platforms']);
  });
}

test('home entry preserves incoming anchor and campaign parameters', async (): Promise<void> => {
  const session = await runLanguage({ path: '/index.html?utm_source=telegram#games', languages: ['en'] });

  expect(session.redirects).toEqual(['/en/?utm_source=telegram#games']);
});

test('manual selection is saved without changing scroll, hash, or navigation', async (): Promise<void> => {
  const session = await runLanguage({ path: '/en/#games' });

  session.choose('ru');

  expect(session.saved.get('chrust.site.language')).toBe('ru');
  expect(session.redirects).toEqual([]);

  const returning = await runLanguage({ saved: session.saved.get('chrust.site.language'), languages: ['en'] });

  expect(returning.redirects).toEqual(['/ru/']);
});

test('storage restrictions do not break automatic or manual language selection', async (): Promise<void> => {
  const session = await runLanguage({ languages: ['ru'], storageBlocked: true });

  expect(session.redirects).toEqual(['/ru/']);
  expect(() => session.choose('en')).not.toThrow();
});

test('unsupported manual language is not persisted', async (): Promise<void> => {
  const session = await runLanguage({ path: '/en/' });

  session.choose('es');

  expect(session.saved.size).toBe(0);
});

for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
  test(`opening another tab or cancelled click does not change the preference: ${JSON.stringify(options)}`, async (): Promise<void> => {
    const session = await runLanguage({ path: '/en/' });

    session.choose('ru', options);

    expect(session.saved.size).toBe(0);
  });
}

for (const route of ['/', '/en/', '/ru/', '/download/', '/en/download/', '/ru/download/']) {
  test(`static language, canonical and alternate links remain crawlable: ${route}`, async (): Promise<void> => {
    const html = await Bun.file(`dist${route}index.html`).text();
    const locale = route.startsWith('/ru/') ? 'ru' : 'en';
    const suffix = route.includes('/download/') ? 'download/' : '';

    expect(html).toContain(`<html lang="${locale}">`);
    expect(html).toContain(`rel="canonical" href="https://chrust.org/${locale}/${suffix}"`);
    expect(html).toContain(`hreflang="ru" href="https://chrust.org/ru/${suffix}"`);
    expect(html).toContain(`hreflang="en" href="https://chrust.org/en/${suffix}"`);
    expect(html).toContain(`hreflang="x-default" href="https://chrust.org/${suffix}"`);
    expect(html).toContain('<script src="/language.js"></script>');
    expect(html.indexOf('/language.js')).toBeLessThan(html.indexOf('<body'));
    expect(html).toContain('content="noindex, nofollow"');
  });
}
