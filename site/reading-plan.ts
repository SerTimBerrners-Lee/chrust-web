import type { Locale } from './content';

// Chapter counts and book order match the app's bundled RU/EN Bible manifest.
// Only references are used here, not the translated Bible text.
export const books: Array<[string, string, number]> = [
  ['Бытие', 'Genesis', 50], ['Исход', 'Exodus', 40], ['Левит', 'Leviticus', 27],
  ['Числа', 'Numbers', 36], ['Второзаконие', 'Deuteronomy', 34], ['Иисус Навин', 'Joshua', 24],
  ['Судьи', 'Judges', 21], ['Руфь', 'Ruth', 4], ['1 Царств', '1 Samuel', 31],
  ['2 Царств', '2 Samuel', 24], ['3 Царств', '1 Kings', 22], ['4 Царств', '2 Kings', 25],
  ['1 Паралипоменон', '1 Chronicles', 29], ['2 Паралипоменон', '2 Chronicles', 36],
  ['Ездра', 'Ezra', 10], ['Неемия', 'Nehemiah', 13], ['Есфирь', 'Esther', 10],
  ['Иов', 'Job', 42], ['Псалтирь', 'Psalms', 150], ['Притчи', 'Proverbs', 31],
  ['Екклесиаст', 'Ecclesiastes', 12], ['Песнь песней', 'Song of Solomon', 8],
  ['Исаия', 'Isaiah', 66], ['Иеремия', 'Jeremiah', 52], ['Плач Иеремии', 'Lamentations', 5],
  ['Иезекииль', 'Ezekiel', 48], ['Даниил', 'Daniel', 12], ['Осия', 'Hosea', 14],
  ['Иоиль', 'Joel', 3], ['Амос', 'Amos', 9], ['Авдий', 'Obadiah', 1], ['Иона', 'Jonah', 4],
  ['Михей', 'Micah', 7], ['Наум', 'Nahum', 3], ['Аввакум', 'Habakkuk', 3],
  ['Софония', 'Zephaniah', 3], ['Аггей', 'Haggai', 2], ['Захария', 'Zechariah', 14],
  ['Малахия', 'Malachi', 4], ['Матфей', 'Matthew', 28], ['Марк', 'Mark', 16],
  ['Лука', 'Luke', 24], ['Иоанн', 'John', 21], ['Деяния', 'Acts', 28], ['Римлянам', 'Romans', 16],
  ['1 Коринфянам', '1 Corinthians', 16], ['2 Коринфянам', '2 Corinthians', 13],
  ['Галатам', 'Galatians', 6], ['Ефесянам', 'Ephesians', 6], ['Филиппийцам', 'Philippians', 4],
  ['Колоссянам', 'Colossians', 4], ['1 Фессалоникийцам', '1 Thessalonians', 5],
  ['2 Фессалоникийцам', '2 Thessalonians', 3], ['1 Тимофею', '1 Timothy', 6],
  ['2 Тимофею', '2 Timothy', 4], ['Титу', 'Titus', 3], ['Филимону', 'Philemon', 1],
  ['Евреям', 'Hebrews', 13], ['Иаков', 'James', 5], ['1 Петра', '1 Peter', 5],
  ['2 Петра', '2 Peter', 3], ['1 Иоанна', '1 John', 5], ['2 Иоанна', '2 John', 1],
  ['3 Иоанна', '3 John', 1], ['Иуда', 'Jude', 1], ['Откровение', 'Revelation', 22],
];

export type ReadingDay = { date: string; month: number; chapters: string[]; label: string };

export function annualPlan(year: number, locale: Locale): ReadingDay[] {
  if (!Number.isInteger(year) || year < 2000 || year > 2100) throw new Error('Unsupported plan year');

  const chapters = books.flatMap(([ru, en, count]) => Array.from(
    { length: count }, (_, index) => `${locale === 'ru' ? ru : en} ${index + 1}`,
  ));
  const start = Date.UTC(year, 0, 1);
  const totalDays = (Date.UTC(year + 1, 0, 1) - start) / 86400000;

  return Array.from({ length: totalDays }, (_, day) => {
    const date = new Date(start + day * 86400000);

    return {
      date: date.toISOString().slice(0, 10), month: date.getUTCMonth(),
      chapters: chapters.slice(Math.floor(chapters.length * day / totalDays), Math.floor(chapters.length * (day + 1) / totalDays)),
      label: date.toLocaleDateString(locale, { day: 'numeric', month: 'long', timeZone: 'UTC' }),
    };
  });
}
