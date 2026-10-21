import type { Locale } from './content';
import type { GuideSlug } from './guides';

export type GuideLink = { slug: GuideSlug; label: Record<Locale, string> };

export type GuideGroup = { id: string; title: Record<Locale, string>; links: GuideLink[] };

export const guideGroups: GuideGroup[] = [
  { id: 'growth', title: { ru: 'Рост', en: 'Growth' }, links: [
    { slug: 'spiritual-growth', label: { ru: 'Духовная практика', en: 'Spiritual practice' } },
  ] },
  { id: 'courses', title: { ru: 'Курсы и изучение', en: 'Courses and study' }, links: [
    { slug: 'bible-lessons', label: { ru: 'Библейские лекции', en: 'Bible lessons' } },
    { slug: 'old-testament-study', label: { ru: 'Ветхий Завет', en: 'Old Testament' } },
    { slug: 'new-testament-study', label: { ru: 'Новый Завет', en: 'New Testament' } },
    { slug: 'bible-study-for-beginners', label: { ru: 'Изучение Библии', en: 'Bible study for beginners' } },
  ] },
  { id: 'games', title: { ru: 'Игры', en: 'Games' }, links: [
    { slug: 'bible-games', label: { ru: 'Все игры', en: 'All games' } },
    { slug: 'bible-word-search', label: { ru: 'Филворд', en: 'Word search' } },
    { slug: 'bible-crossword', label: { ru: 'Кроссворд', en: 'Crossword' } },
    { slug: 'bible-quiz', label: { ru: 'Блиц', en: 'Blitz quiz' } },
    { slug: 'bible-matching-pairs', label: { ru: 'Найди пары', en: 'Match pairs' } },
    { slug: 'build-a-bible-verse', label: { ru: 'Собери стих', en: 'Build a verse' } },
    { slug: 'guess-bible-verse', label: { ru: 'Откуда стих?', en: 'Where is this verse?' } },
  ] },
  { id: 'bible', title: { ru: 'Библия и чтение', en: 'Bible and reading' }, links: [
    { slug: 'bible-reading-plan', label: { ru: 'План чтения Библии', en: 'Bible reading plan' } },
  ] },
];

export function relatedGuideSlugs(current?: GuideSlug): GuideSlug[] {
  const sameGroup = guideGroups.find(group => group.links.some(link => link.slug === current));
  const related = sameGroup?.links.map(link => link.slug) ?? [];
  const nextSteps: GuideSlug[] = ['bible-reading-plan', 'spiritual-growth', 'bible-study-for-beginners', 'bible-games'];

  return [...new Set([...related, ...nextSteps])].filter(slug => slug !== current).slice(0, 4);
}
