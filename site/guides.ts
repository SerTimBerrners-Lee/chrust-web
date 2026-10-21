import type { Locale } from './content';

export const guideSlugs = ['bible-games', 'bible-word-search', 'bible-reading-plan', 'bible-study-for-beginners'] as const;

export type GuideSlug = typeof guideSlugs[number];

export type GuideSection = { title: string; paragraphs?: string[]; items?: string[] };

export type GuideCopy = {
  title: string;
  description: string;
  intro: string;
  sections: GuideSection[];
};

export const guides: Record<GuideSlug, Record<Locale, GuideCopy>> = {
  'bible-games': {
    ru: {
      title: 'Библейские игры',
      description: 'Повторите библейские истории: вопросы с ответами и ссылками на Писание, филворд и знакомство с шестью играми Chrust.',
      intro: 'Начните с трёх вопросов ниже, проверьте ответы по Писанию и выберите, что хотите повторить дальше.',
      sections: [
        { title: 'Как использовать викторину', paragraphs: ['Сначала попробуйте ответить самостоятельно. Затем раскройте ответ и прочитайте указанный отрывок в своей Библии. Важно не только вспомнить имя или событие, но и увидеть его в контексте истории.'] },
        { title: 'Какие игры есть в Chrust', items: ['Филворд: находите библейские имена и понятия в сетке букв.', 'Кроссворд: вспоминайте слова по вопросам и проверяйте пересечения.', 'Блиц: отвечайте на вопросы за ограниченное время.', 'Найди пары: соединяйте связанные элементы.', 'Собери стих: восстанавливайте порядок слов.', 'Откуда стих?: определяйте источник библейского отрывка.'] },
        { title: 'Игра как продолжение чтения', paragraphs: ['Если ответ оказался неожиданным, вернитесь к соответствующей главе. Можно выписать один вопрос для следующего чтения или обсудить его с другими. Викторина помогает вспомнить текст, но не заменяет его изучение.'] },
      ],
    },
    en: {
      title: 'Bible games',
      description: 'Try Bible trivia questions with answers and Scripture references, explore a word-search example, and discover the six games in Chrust.',
      intro: 'Start with the three questions below, check each answer in Scripture, and choose what you would like to explore next.',
      sections: [
        { title: 'How to use the Bible quiz', paragraphs: ['Try answering before opening the explanation. Then read the referenced passage in your Bible. The aim is not only to remember a name or event, but to place it in the surrounding story.'] },
        { title: 'Six games in Chrust', items: ['Word search: find biblical names and ideas in a letter grid.', 'Crossword: recall words from clues and check their intersections.', 'Blitz: answer Bible questions against a timer.', 'Match pairs: connect related items.', 'Build a verse: put the words back in order.', 'Where is this verse?: identify the source of a biblical passage.'] },
        { title: 'Let the game lead back to reading', paragraphs: ['When an answer surprises you, return to the chapter. Write down one question for your next reading or discuss it with someone else. Trivia can help you recall Scripture, but it does not replace studying the text.'] },
      ],
    },
  },
  'bible-word-search': {
    ru: {
      title: 'Библейский филворд с примером и ответами',
      description: 'Найдите три библейских имени в небольшом филворде. Правила, поле и ответы со ссылками на Писание доступны без регистрации.',
      intro: 'В филворде Chrust слова идут по соседним клеткам и могут поворачивать. Попробуйте небольшой пример прямо на этой странице.',
      sections: [
        { title: 'Как искать слова', items: ['Начинайте с первой буквы имени.', 'Двигайтесь по соседним клеткам вверх, вниз, влево или вправо.', 'Не используйте диагонали и не перескакивайте через клетки.', 'Одно слово может поворачивать. Прочитайте его от начала к концу.'] },
        { title: 'Чем этот филворд отличается от обычного поиска слов', paragraphs: ['В привычном поиске слов ответ часто лежит на одной прямой, иногда по диагонали или в обратном порядке. Здесь путь может изгибаться, а случайных букв для заполнения нет. Поэтому знакомые имена приходится искать по соседним клеткам.'] },
        { title: 'Что делать после решения', paragraphs: ['Раскройте ответы и найдите имена в указанных отрывках. Попробуйте вспомнить не только написание, но и место каждого человека в библейской истории. Этот пример не сохраняет прогресс приложения.'] },
      ],
    },
    en: {
      title: 'Bible word search with a word-path example',
      description: 'Find three biblical names in a small word-path puzzle. Read the rules and reveal answers with Bible references, without signing in.',
      intro: 'In Chrust, words follow neighbouring cells and can turn corners. Try this small example before exploring the full word-search game.',
      sections: [
        { title: 'How to find a word', items: ['Start at the first letter of a name.', 'Move one cell up, down, left or right at a time.', 'Do not move diagonally or skip a cell.', 'A word can turn a corner. Read it from its first letter to its last.'] },
        { title: 'A different kind of Bible word search', paragraphs: ['A conventional word search often hides words in straight lines, sometimes diagonally or backwards. This word-path example uses turns and contains no random filler letters. Look for a connected path rather than only a straight row.'] },
        { title: 'After finding the names', paragraphs: ['Open the answers and look up the Scripture references. Recall where each person appears in the biblical story, not only how the name is spelled. This website example does not save progress in the app.'] },
      ],
    },
  },
  'bible-reading-plan': {
    ru: {
      title: 'План чтения Библии на каждый день и на год',
      description: 'Годовой план чтения 66 книг Библии: список глав на каждую дату, канонический порядок и простой способ вернуться к чтению после перерыва.',
      intro: 'Откройте нужный месяц и прочитайте указанные главы в своей Библии. За календарный год этот план проходит 66 книг от Бытия до Откровения.',
      sections: [
        { title: 'Как устроен годовой план', paragraphs: ['1189 глав распределены по дням календарного года: обычно это три или четыре главы в день. Список следует порядку книг, а не предполагаемой хронологии событий. Длина глав различается, поэтому одинаковое время чтения каждый день не гарантируется.', 'План соответствует составу из 66 книг. Если ваш перевод включает дополнительные книги, для них понадобится отдельное чтение. Ссылки на псалмы сверяйте с нумерацией вашего перевода.'] },
        { title: 'Если начинаете не с января', paragraphs: ['Можно начать с сегодняшней даты и затем вернуться к пропущенным главам, либо с первого пункта и двигаться в собственном темпе. Во втором случае завершение плана уже не привязано к 31 декабря.'] },
        { title: 'Если пропустили день', paragraphs: ['Не обязательно читать большой объём за один раз. Вернитесь к последнему прочитанному месту и продолжайте. После чтения полезно записать одну мысль или вопрос, к которому захотите вернуться.'] },
      ],
    },
    en: {
      title: 'A daily Bible reading plan for a year',
      description: 'Read the Bible in a year with a dated plan covering 66 books in canonical order. Find each day’s chapters and a practical way to resume after a break.',
      intro: 'Open a month and read the listed chapters in your own Bible. This calendar-year plan covers 66 books from Genesis through Revelation.',
      sections: [
        { title: 'How the yearly plan works', paragraphs: ['The 1,189 chapters are divided across the calendar year, usually three or four chapters a day. The sequence follows book order, not a reconstructed chronology of events. Chapter lengths vary, so daily reading time will vary too.', 'This plan covers the 66-book canon. If your Bible contains additional books, schedule separate reading for those books. Check Psalm numbering against your edition.'] },
        { title: 'Starting after January', paragraphs: ['You can begin with today’s date and return to earlier chapters later, or start at the first entry and keep your own pace. If you choose the second approach, your finish date will no longer be tied to December 31.'] },
        { title: 'When you miss a day', paragraphs: ['You do not have to catch up in one long sitting. Return to the last passage you read and continue. After reading, write down one observation or question that you would like to revisit.'] },
      ],
    },
  },
  'bible-study-for-beginners': {
    ru: {
      title: 'С чего начать изучение Библии',
      description: 'Первое самостоятельное изучение Библии: короткий отрывок, вопросы к тексту и пример занятия по притче о добром самарянине.',
      intro: 'Для первого занятия выберите небольшой законченный отрывок. Прочитайте его, сформулируйте вопросы и проверьте ответы по самому тексту.',
      sections: [
        { title: 'Четыре шага первого занятия', items: ['Прочитайте отрывок целиком и посмотрите, что происходит до и после него.', 'Отметьте участников, действия и повторяющиеся слова.', 'Отделите то, что прямо сказано в тексте, от своих предположений.', 'Сформулируйте основную мысль и один вопрос или практический вывод.'] },
        { title: 'Пример на притче о добром самарянине', paragraphs: ['Откройте Луки 10:25-37. Перед притчей собеседник задаёт вопрос о вечной жизни, а затем спрашивает, кто его ближний. Сначала прочитайте весь разговор, а не только сам рассказ.', 'Кто замечает раненого? Кто проходит мимо? Какие действия совершает самарянин? Найдите ответы в стихах 30-35. Затем сопоставьте исходный вопрос в стихе 29 с вопросом Иисуса в стихе 36.'], items: ['Наблюдение: самарянин подходит, заботится о раненом и оплачивает дальнейшую помощь.', 'Вопрос к смыслу: почему разговор заканчивается вопросом о том, кто оказался ближним?', 'Личный отклик: кому я могу помочь конкретным действием? Не превращайте свой ответ в цитату из Библии.'] },
        { title: 'Как продолжить изучение', paragraphs: ['На следующем занятии вернитесь к соседним отрывкам Евангелия от Луки. Если слово, историческая деталь или мысль непонятны, запишите вопрос и обратитесь к проверенному комментарию или обсудите его с наставником. Разные христианские традиции могут по-разному объяснять отдельные места.', 'Этот материал является самостоятельным вводным занятием на сайте. Он не заменяет полный курс Chrust и не отмечает урок приложения пройденным.'] },
      ],
    },
    en: {
      title: 'Bible study for beginners: your first session',
      description: 'Begin studying the Bible with a short passage, questions to ask, and a worked first session on the parable of the Good Samaritan.',
      intro: 'Choose a short, complete passage for your first session. Read it, ask questions, and check your answers against the text itself.',
      sections: [
        { title: 'Four steps for a first Bible study', items: ['Read the whole passage and look at what comes before and after it.', 'Notice the people, actions and repeated words.', 'Separate what the passage states from your own assumptions.', 'Summarise the main idea and write one question or practical response.'] },
        { title: 'A worked example: the Good Samaritan', paragraphs: ['Open Luke 10:25-37. Before the parable, a conversation begins with a question about eternal life and then about who counts as a neighbour. Read that conversation as well as the story.', 'Who notices the injured man? Who passes by? What does the Samaritan do? Look for answers in verses 30-35, then compare the original question in verse 29 with Jesus’ question in verse 36.'], items: ['Observation: the Samaritan approaches, cares for the man and pays for further help.', 'A question about meaning: why does the conversation end by asking who became a neighbour?', 'A personal response: whom could I help through a concrete action? Keep your response distinct from a quotation of Scripture.'] },
        { title: 'Continue with context', paragraphs: ['In your next session, return to the surrounding passages in Luke. If a word, historical detail or idea is unclear, record the question and consult a reliable commentary or discuss it with a mentor. Christian traditions may interpret particular passages differently.', 'This is a standalone introductory session on the website. It is not the full Chrust course and does not mark an app lesson as completed.'] },
      ],
    },
  },
};

export function guidePath(locale: Locale, slug: GuideSlug): string {
  return `/${locale}/${slug}/`;
}
