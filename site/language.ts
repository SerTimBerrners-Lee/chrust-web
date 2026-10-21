type SupportedLocale = 'en' | 'ru';

const languagePreferenceKey = 'chrust.site.language';

function supportedLocale(value: string | null): SupportedLocale | null {
  return value === 'en' || value === 'ru' ? value : null;
}

function preferredLocale(): SupportedLocale {
  try {
    const saved = supportedLocale(localStorage.getItem(languagePreferenceKey));

    if (saved) return saved;
  } catch {
    // Language selection still works when browser storage is unavailable.
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const language of languages) {
    const locale = supportedLocale(language?.toLowerCase().split(/[-_]/)[0] ?? null);

    if (locale) return locale;
  }

  return 'en';
}

function selectEntryLanguage(): void {
  const pathname = location.pathname;
  const isHome = pathname === '/' || pathname === '/index.html';
  const isDownload = ['/download', '/download/', '/download/index.html'].includes(pathname);

  // Explicit language URLs never redirect based on browser preferences.
  if (!isHome && !isDownload) return;

  const destination = `/${preferredLocale()}/${isDownload ? 'download/' : ''}`;

  location.replace(`${destination}${location.search}${location.hash}`);
}

selectEntryLanguage();

document.addEventListener('click', (event: MouseEvent): void => {
  if (event.defaultPrevented || event.button !== 0
      || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  if (!(event.target instanceof Element)) return;

  const link = event.target.closest('a[data-language]');
  const locale = supportedLocale(link?.getAttribute('data-language') ?? null);

  if (!locale) return;

  try {
    localStorage.setItem(languagePreferenceKey, locale);
  } catch {
    // The normal link remains usable even if the preference cannot be saved.
  }
});
