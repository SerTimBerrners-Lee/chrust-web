(() => {
  // site/language.ts
  var languagePreferenceKey = "chrust.site.language";
  function supportedLocale(value) {
    return value === "en" || value === "ru" ? value : null;
  }
  function preferredLocale() {
    try {
      const saved = supportedLocale(localStorage.getItem(languagePreferenceKey));
      if (saved)
        return saved;
    } catch {}
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const language of languages) {
      const locale = supportedLocale(language?.toLowerCase().split(/[-_]/)[0] ?? null);
      if (locale)
        return locale;
    }
    return "en";
  }
  function selectEntryLanguage() {
    const pathname = location.pathname;
    const isHome = pathname === "/" || pathname === "/index.html";
    const isDownload = ["/download", "/download/", "/download/index.html"].includes(pathname);
    if (!isHome && !isDownload)
      return;
    const destination = `/${preferredLocale()}/${isDownload ? "download/" : ""}`;
    location.replace(`${destination}${location.search}${location.hash}`);
  }
  selectEntryLanguage();
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    if (!(event.target instanceof Element))
      return;
    const link = event.target.closest("a[data-language]");
    const locale = supportedLocale(link?.getAttribute("data-language") ?? null);
    if (!locale)
      return;
    try {
      localStorage.setItem(languagePreferenceKey, locale);
    } catch {}
  });
})();
