import type { Locale } from './content';
import { guides, guideSlugs, guidePath, type GuideSlug } from './guides';
import { annualPlan } from './reading-plan';
import { escapeHtml as escape } from './seo';

export function guideLinks(locale: Locale, current?: GuideSlug): string {
  return `<nav class="guide-links" aria-label="${locale === 'ru' ? 'Материалы Chrust' : 'Chrust resources'}">${guideSlugs.filter(slug => slug !== current).map(slug => `<a href="${guidePath(locale, slug)}">${escape(guides[slug][locale].title)}</a>`).join('')}</nav>`;
}

function quiz(locale: Locale): string {
  const entries = locale === 'ru' ? [
    ['Кто построил ковчег по Божьему указанию?', 'Ной. Бытие 6:14-22.'],
    ['Как звали брата Моисея, который должен был говорить вместе с ним?', 'Аарон. Исход 4:14-16.'],
    ['Кто позаботился о раненом путнике в притче Иисуса?', 'Самарянин. Луки 10:30-35.'],
  ] : [
    ['Who built the ark at God’s instruction?', 'Noah. Genesis 6:14-22.'],
    ['Which brother was to speak alongside Moses?', 'Aaron. Exodus 4:14-16.'],
    ['Who cared for the injured traveller in Jesus’ parable?', 'The Samaritan. Luke 10:30-35.'],
  ];

  return `<section class="guide-section" id="example"><h2>${locale === 'ru' ? 'Три вопроса для начала' : 'Three questions to begin'}</h2>${entries.map(([question, answer]) => `<details class="guide-answer"><summary>${escape(question)}</summary><p>${escape(answer)}</p></details>`).join('')}</section>`;
}

export const wordExamples = {
  ru: { rows: ['НОЛ', 'СЙО', 'ИМТ'], words: [
    { name: 'НОЙ', path: [0, 1, 4], reference: 'Бытие 6:9' },
    { name: 'ЛОТ', path: [2, 5, 8], reference: 'Бытие 12:5' },
    { name: 'СИМ', path: [3, 6, 7], reference: 'Бытие 5:32' },
  ] },
  en: { rows: ['NOSH', 'HAME', 'JOEL'], words: [
    { name: 'NOAH', path: [0, 1, 5, 4], reference: 'Genesis 6:9' },
    { name: 'SHEM', path: [2, 3, 7, 6], reference: 'Genesis 5:32' },
    { name: 'JOEL', path: [8, 9, 10, 11], reference: 'Joel 1:1' },
  ] },
};

function wordExample(locale: Locale): string {
  const puzzle = wordExamples[locale];
  const cell = (index: number): string => `${Math.floor(index / puzzle.rows[0].length) + 1}:${index % puzzle.rows[0].length + 1}`;

  return `<section class="guide-section" id="example"><h2>${locale === 'ru' ? 'Найдите три имени' : 'Find three names'}</h2>
    <p>${puzzle.words.map(word => word.name).join(', ')}. ${locale === 'ru' ? 'Можно решить в уме или переписать поле на бумагу.' : 'Trace the paths in your mind or copy the grid onto paper.'}</p>
    <table class="word-example"><caption>${locale === 'ru' ? 'Учебный пример филворда' : 'A word-path practice grid'}</caption><tbody>${puzzle.rows.map(row => `<tr>${[...row].map(letter => `<td>${letter}</td>`).join('')}</tr>`).join('')}</tbody></table>
    <details class="guide-answer"><summary>${locale === 'ru' ? 'Показать ответы' : 'Show the answers'}</summary><p>${locale === 'ru' ? 'Координаты: строка:столбец, счёт от верхнего левого угла.' : 'Coordinates are row:column, counted from the top-left corner.'}</p><ul>${puzzle.words.map(word => `<li>${word.name}: ${word.path.map(cell).join(' → ')}. ${word.reference}.</li>`).join('')}</ul></details></section>`;
}

function readingCalendar(locale: Locale, year: number): string {
  const days = annualPlan(year, locale);

  return `<section class="guide-section" id="example"><h2>${locale === 'ru' ? 'Главы на каждый день' : 'Chapters for every day'} ${year}</h2><p>${locale === 'ru' ? 'Все месяцы доступны без регистрации. Откройте месяц, чтобы увидеть даты и главы.' : 'Every month is available without signing in. Open a month to see its dates and chapters.'}</p><div class="reading-calendar">${Array.from({ length: 12 }, (_, month) => {
    const monthName = new Date(Date.UTC(year, month, 1)).toLocaleDateString(locale, { month: 'long', timeZone: 'UTC' });

    return `<details class="guide-answer"${month === 0 ? ' open' : ''}><summary>${monthName}</summary><dl class="reading-days">${days.filter(day => day.month === month).map(day => `<div><dt><time datetime="${day.date}">${escape(day.label)}</time></dt><dd>${day.chapters.map(escape).join('; ')}</dd></div>`).join('')}</dl></details>`;
  }).join('')}</div></section>`;
}

export function guideView(locale: Locale, slug: GuideSlug, year: number, previewHtml: string = ''): string {
  const copy = guides[slug][locale];
  const example = slug === 'bible-games' ? quiz(locale)
    : slug === 'bible-word-search' ? wordExample(locale)
    : slug === 'bible-reading-plan' ? readingCalendar(locale, year) : '';
  const source = slug === 'bible-study-for-beginners'
    ? `<p class="guide-source"><a href="https://ebible.org/${locale === 'ru' ? 'russyn' : 'engwebp'}/LUK10.htm" target="_blank" rel="noopener noreferrer">${locale === 'ru' ? 'Прочитать Луки 10 на eBible.org, Синодальный перевод' : 'Read Luke 10 at eBible.org, World English Bible'}</a></p>` : '';

  return `<article class="guide-article wrap"><nav class="guide-breadcrumb" aria-label="${locale === 'ru' ? 'Путь к странице' : 'Breadcrumb'}"><a href="/${locale}/">Chrust</a><span aria-current="page">${escape(copy.title)}</span></nav>
    <div class="guide-intro"><h1>${escape(copy.title)}</h1><p>${escape(copy.intro)}</p>${source}${example ? `<a class="compact-button" href="#example">${locale === 'ru' ? (slug === 'bible-reading-plan' ? 'Открыть план' : 'К примеру') : (slug === 'bible-reading-plan' ? 'See the plan' : 'Try the example')}</a>` : ''}</div>
    ${previewHtml ? `<div class="guide-screens">${previewHtml}</div>` : ''}
    ${copy.sections.map((section, index) => `<section class="guide-section"><h2>${escape(section.title)}</h2>${section.paragraphs?.map(text => `<p>${escape(text)}</p>`).join('') ?? ''}${section.items ? `<ul>${section.items.map(text => `<li>${escape(text)}</li>`).join('')}</ul>` : ''}</section>${index === 0 ? example : ''}`).join('')}
    <section class="guide-section"><h2>${locale === 'ru' ? 'Продолжить знакомство' : 'Keep exploring'}</h2>${guideLinks(locale, slug)}<p><a href="/${locale}/#about">${locale === 'ru' ? 'О проекте Chrust и его возможностях' : 'About Chrust and its features'}</a></p></section>
  </article>`;
}
