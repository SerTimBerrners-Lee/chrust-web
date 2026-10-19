import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';

type Screen = {
  file: string;
  label: string;
  position?: string;
};

type Feature = {
  id: string;
  name: string;
  title: string;
  description: string;
  screens: Screen[];
};

const features: Feature[] = [
  {
    id: 'growth',
    name: 'Рост',
    title: 'Рост',
    description: 'Отмечайте духовные практики в календаре и наблюдайте за ростом своего дерева.',
    screens: [
      { file: 'growth-tree', label: 'Ваше дерево' },
      { file: 'growth-calendar', label: 'Календарь практик' },
      { file: 'growth-activity', label: 'Отметка действия', position: 'bottom' },
    ],
  },
  {
    id: 'courses',
    name: 'Курсы',
    title: 'Курсы Ветхого и Нового Завета',
    description: 'Курсы с картой уроков и заданиями для проверки знаний готовятся к запуску.',
    screens: [
      { file: 'course-map', label: 'Карта Ветхого Завета' },
      { file: 'course-lesson', label: 'Короткий урок' },
      { file: 'course-question', label: 'Проверка понимания', position: 'center' },
    ],
  },
  {
    id: 'games',
    name: 'Игры',
    title: 'Игры',
    description: 'Закрепляйте изученное в библейских играх с уровнями и разными заданиями.',
    screens: [
      { file: 'games-levels', label: 'Уровни игры', position: '62%' },
      { file: 'games-wordsearch', label: 'Филворд', position: '62%' },
      { file: 'games-verse', label: 'Собери стих', position: 'bottom' },
      { file: 'games-catalog', label: 'Каталог игр' },
    ],
  },
  {
    id: 'bible',
    name: 'Библия',
    title: 'Библия',
    description: 'Читайте Библию, выделяйте стихи и сохраняйте свои заметки.',
    screens: [
      { file: 'bible-reader', label: 'Чтение Библии' },
      { file: 'bible-highlight', label: 'Выделение стихов', position: 'bottom' },
      { file: 'bible-note', label: 'Личная заметка', position: 'bottom' },
    ],
  },
];

function screenTile(screen: Screen, index: number, eager = false): string {
  return `<div class="screen-tile tile-${index + 1}" style="--focus:${screen.position ?? 'top'}">
    <img src="/assets/screens/${screen.file}.webp" alt="${screen.label} в приложении Chrust" width="780" height="1688" loading="${eager ? 'eager' : 'lazy'}" ${eager && index === 0 ? 'fetchpriority="high"' : ''}>
  </div>`;
}

function collage(screens: Screen[], eager = false): string {
  return `<div class="collage collage-${screens.length}">${screens.map((screen, index) => screenTile(screen, index, eager)).join('\n')}</div>`;
}

function brand(): string {
  return '<a class="brand" href="#top" aria-label="Chrust, в начало"><img src="/assets/chrust-logo.png" alt="" width="40" height="40"><span>Chrust</span></a>';
}

const heroCarousel = await readFile('site/hero-carousel.html', 'utf8');

const html = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Библия и духовная практика в одном приложении.">
  <meta name="theme-color" content="#ffffff">
  <meta name="color-scheme" content="only light">
  <meta name="robots" content="noindex, nofollow">
  <title>Chrust</title>
  <link rel="icon" type="image/png" href="/assets/chrust-logo.png">
  <link rel="stylesheet" href="/assets/3a1e1e33-bp.css">
  <link rel="stylesheet" href="/assets/a44d755a-bp-compat.css">
  <link rel="stylesheet" href="/assets/e22dadcd-global-D38g-Y4N.css">
  <link rel="stylesheet" href="/assets/ab7d641d-button-D8QqDKPm.css">
  <link rel="stylesheet" href="/project.css">
</head>
<body id="top">
  <a class="skip-link" href="#content">К содержимому</a>
  <header class="site-header wrap">
    ${brand()}
    <nav class="desktop-nav" aria-label="Возможности приложения">
      ${features.map((f) => `<a href="#${f.id}">${f.name}</a>`).join('')}
    </nav>
  </header>
  <main id="content">
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero-copy wrap">
        <h1 id="hero-title">Библия и духовная практика в одном приложении.</h1>
        <div class="hero-actions">
          <button class="button app-placeholder" type="button" data-appearance="secondary" aria-disabled="true" title="Скоро">Скачать</button>
          <button class="button app-placeholder" type="button" data-appearance="secondary" aria-disabled="true" title="Скоро">Открыть приложение</button>
        </div>
      </div>
      ${heroCarousel}
    </section>
    <div class="features wrap">
      ${features.map((feature, index) => `<section id="${feature.id}" class="feature ${index % 2 === 0 ? 'image-first' : ''}" aria-labelledby="${feature.id}-title">
        <div class="feature-copy">
          <h2 id="${feature.id}-title">${feature.title}</h2>
          <p>${feature.description}</p>
        </div>
        ${collage(feature.screens)}
      </section>`).join('\n')}
    </div>
    <section id="about" class="about wrap" aria-labelledby="about-title">
      <h2 id="about-title">О Chrust</h2>
      <div class="about-image">
        <img src="/assets/78327f16-home-hub-about-image.png" alt="Коллаж команды BibleProject из исходного референса" loading="lazy" decoding="async">
      </div>
      <div class="about-text">
        <p>Chrust объединяет чтение Библии, изучение Ветхого и Нового Завета, игры для закрепления знаний и календарь духовных практик, чтобы помогать людям понимать Писание и сохранять регулярность в духовной жизни.</p>
      </div>
    </section>
    <section id="support" class="support wrap" aria-labelledby="support-title">
      <div class="support-copy">
        <h2 id="support-title">Поддержите Chrust</h2>
        <p>Ваша поддержка помогает нам развивать приложение.</p>
      </div>
      <button class="button app-placeholder" type="button" data-appearance="secondary" aria-disabled="true" title="Скоро">Поддержать проект</button>
    </section>
  </main>
  <footer class="site-footer">
    <div class="wrap footer-top">
      <div>${brand()}<p class="footer-mission">Помогаем читать Библию, понимать прочитанное и сохранять духовную практику.</p></div>
    </div>
    <div class="wrap footer-bottom">© ${new Date().getFullYear()} Chrust</div>
  </footer>
</body>
</html>`;

await mkdir('dist/ru', { recursive: true });
await Promise.all([
  writeFile('dist/index.html', html),
  writeFile('dist/ru/index.html', html),
  copyFile('site/styles.css', 'dist/project.css'),
]);

console.log('Built Chrust landing: / and /ru/.');
