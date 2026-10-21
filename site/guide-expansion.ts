import type { Locale } from './content';
import type { GuideCopy } from './guides';

export const draftGuideSlugs = [
  'spiritual-growth', 'old-testament-study', 'new-testament-study', 'bible-lessons',
  'bible-crossword', 'bible-quiz', 'bible-matching-pairs', 'build-a-bible-verse', 'guess-bible-verse',
] as const;

export type DraftGuideSlug = typeof draftGuideSlugs[number];

export const draftGuides: Record<DraftGuideSlug, Record<Locale, GuideCopy>> = {
  'spiritual-growth': {
    ru: {
      title: 'Рост: календарь духовной практики',
      description: 'Отмечайте чтение Библии, молитву и другие духовные практики в Chrust. Дерево, календарь и записи помогают замечать ежедневные шаги.',
      intro: 'Сохраняйте небольшие ежедневные шаги: чтение, молитву и другие духовные практики.',
      sections: [
        { title: 'Дерево, календарь и ваши действия', paragraphs: ['В «Росте» можно наблюдать за деревом, открывать календарь и отмечать выполненное действие. Календарь показывает записи практик, а план чтения Библии отдельно помогает выбрать главы.'] },
        { title: 'С чего начать сегодня', items: ['Выберите одно действие: например, прочитать короткий отрывок.', 'Найдите удобное время и выполните его без спешки.', 'Добавьте запись в «Росте» и вернитесь к ней в календаре.'] },
        { title: 'Если был перерыв', paragraphs: ['Начните со следующего небольшого шага. Записи помогают вспомнить свой путь, но количество отметок не измеряет веру и не заменяет саму практику.'] },
      ],
    },
    en: {
      title: 'Growth: a spiritual practice calendar',
      description: 'Record Bible reading, prayer and other spiritual practices in Chrust. Your tree, calendar and activity records help you notice daily steps.',
      intro: 'Keep track of small daily steps: Bible reading, prayer and other spiritual practices.',
      sections: [
        { title: 'Your tree, calendar and activities', paragraphs: ['Growth brings together a tree, a calendar and records of completed practices. The calendar shows your activity records; the separate Bible reading plan helps you choose chapters.'] },
        { title: 'Start with one practice today', items: ['Choose one action, such as reading a short passage.', 'Set aside a comfortable time and take that step.', 'Record it in Growth and revisit it in your calendar.'] },
        { title: 'After a break', paragraphs: ['Begin with the next small step. Records help you remember your journey, but the number of entries does not measure faith or replace the practice itself.'] },
      ],
    },
  },
  'old-testament-study': {
    ru: {
      title: 'Изучение Ветхого Завета',
      description: 'Начните изучение Ветхого Завета с Бытия: последовательность событий, вопросы к рассказу о сотворении мира и знакомство с картой курса Chrust.',
      intro: 'Знакомьтесь с событиями Ветхого Завета последовательно, связывая каждый урок с библейским текстом.',
      sections: [
        { title: 'Первое занятие: Бытие 1', paragraphs: ['Прочитайте первую главу Бытия целиком. Отметьте последовательность событий, повторяющиеся слова и то, как завершается описание каждого дня.'] },
        { title: 'Вопросы к прочитанному', items: ['Какие выражения повторяются в главе?', 'Как организована последовательность дней?', 'Что текст говорит прямо, а какие вопросы остаются у вас?'] },
        { title: 'Карта курса в Chrust', paragraphs: ['Карта помогает видеть последовательность уроков и возвращаться к изучению. Иллюстрации и задания сопровождают знакомство с событиями; чтение самой Библии остаётся отдельной частью работы.'] },
      ],
    },
    en: {
      title: 'Old Testament study',
      description: 'Begin Old Testament study with Genesis: follow the creation narrative, ask questions about the text and explore the Chrust lesson map.',
      intro: 'Explore Old Testament events in sequence and connect each lesson with the biblical text.',
      sections: [
        { title: 'A first session: Genesis 1', paragraphs: ['Read the whole first chapter of Genesis. Notice the order of events, repeated words and the way each day is described.'] },
        { title: 'Questions for your reading', items: ['Which phrases recur throughout the chapter?', 'How is the sequence of days organised?', 'What does the text state directly, and what questions remain?'] },
        { title: 'The Chrust lesson map', paragraphs: ['The map presents a sequence of lessons and a place to return to your study. Illustrations and activities accompany the stories; reading Scripture remains a separate part of the process. The screenshots show the Russian interface.'] },
      ],
    },
  },
  'new-testament-study': {
    ru: {
      title: 'Изучение Нового Завета',
      description: 'Начните изучение Нового Завета с Евангелия: прочитайте начало Луки, задайте вопросы к тексту и познакомьтесь с направлением курса Chrust.',
      intro: 'Изучайте жизнь и учение Иисуса, историю апостолов и послания, сохраняя контекст каждого отрывка.',
      sections: [
        { title: 'Первое занятие: Луки 1:1-4', paragraphs: ['Начните с вступления к Евангелию от Луки. Найдите в тексте, кому обращено повествование и какую цель называет автор. Затем продолжите чтение главы.'] },
        { title: 'Как читать дальше', items: ['Выберите одно Евангелие и двигайтесь по нему последовательно.', 'Перед отдельной цитатой прочитайте начало разговора или события.', 'Сохраняйте вопросы и наблюдения, не подменяя ими слова текста.'] },
        { title: 'Новый Завет в Chrust', paragraphs: ['В приложении Ветхий и Новый Завет представлены отдельно. Экран выбора помогает перейти к нужному направлению. Это самостоятельное занятие на сайте не отмечает урок приложения пройденным.'] },
      ],
    },
    en: {
      title: 'New Testament study',
      description: 'Begin New Testament study with a Gospel: read the opening of Luke, ask questions about the text and explore the New Testament direction in Chrust.',
      intro: 'Study the life and teaching of Jesus, the apostles and the letters while keeping each passage in context.',
      sections: [
        { title: 'A first session: Luke 1:1-4', paragraphs: ['Start with the introduction to Luke. Identify the person addressed and the purpose the author gives for writing. Then continue with the rest of the chapter.'] },
        { title: 'Continue reading in context', items: ['Choose one Gospel and read it in sequence.', 'Read the beginning of a conversation or event before studying one quotation.', 'Keep your questions and observations distinct from the words of the text.'] },
        { title: 'The New Testament in Chrust', paragraphs: ['The app presents the Old and New Testaments as separate directions. The selection screen lets you choose which one to explore. This website exercise does not complete an app lesson, and screenshots show the Russian interface.'] },
      ],
    },
  },
  'bible-lessons': {
    ru: {
      title: 'Библейские лекции и уроки',
      description: 'Как построить библейское занятие: короткий отрывок, вопросы, проверка по тексту и личный вывод. Знакомство с уроками и курсами Chrust.',
      intro: 'От чтения и объяснения к вопросам и проверке: знакомьтесь с Библией через короткие занятия.',
      sections: [
        { title: 'Что входит в занятие', items: ['Отрывок Библии и его место в истории.', 'Объяснение событий и вопросы к содержанию.', 'Задание, после которого можно вернуться к тексту и проверить себя.'] },
        { title: 'Попробуйте составить мини-урок', paragraphs: ['Выберите небольшой законченный отрывок. Сформулируйте один вопрос о событиях, второй о действиях участников и третий о том, что осталось непонятным. Найдите в тексте основание для каждого ответа.'] },
        { title: 'Выберите направление', paragraphs: ['Для последовательного знакомства с историями подходят отдельные направления Ветхого и Нового Завета. Для первого самостоятельного занятия оставили отдельный материал об изучении Библии. Здесь речь о формате занятия, а не о каталоге видео- или аудиолекций.'] },
      ],
    },
    en: {
      title: 'Bible lessons and courses',
      description: 'Build a short Bible lesson around reading, questions and checking the text. Explore the structure of Chrust lessons and its two Testament courses.',
      intro: 'Move from reading and explanation to questions and reflection through short Bible lessons.',
      sections: [
        { title: 'The parts of a lesson', items: ['A Bible passage and its place in the surrounding story.', 'An explanation of the events and questions about the text.', 'An activity that leads back to Scripture to check your understanding.'] },
        { title: 'Try planning a short lesson', paragraphs: ['Choose a short, complete passage. Ask one question about the events, another about the people’s actions and a third about what remains unclear. Find a basis in the text for each answer.'] },
        { title: 'Choose your direction', paragraphs: ['Explore the Old and New Testaments separately for sequential study, or use the beginner guide for your first independent session. This page explains a lesson format, not a library of recorded video or audio lectures. It does not promise a completed English app course.'] },
      ],
    },
  },
  'bible-crossword': {
    ru: {
      title: 'Библейский кроссворд',
      description: 'Вспоминайте библейские имена по вопросам и проверяйте слова по пересечениям. Пример подсказки с ответом и знакомство с кроссвордом Chrust.',
      intro: 'Разгадывайте библейские слова по подсказкам и проверяйте себя по буквам на пересечениях.',
      sections: [
        { title: 'Как решать', items: ['Выберите слово и прочитайте вопрос.', 'Введите ответ целиком.', 'Используйте общие буквы для проверки соседних слов.'] },
        { title: 'Если слово не вспоминается', paragraphs: ['Начните с другого вопроса и вернитесь к пересечению. В Chrust стирание одного слова сохраняет буквы, которые уже введены для другого слова на пересечении.'] },
      ],
      example: { title: 'Попробуйте одну подсказку', prompt: 'Кто построил ковчег по Божьему указанию? В русском ответе три буквы.', answer: 'НОЙ. Проверьте рассказ в Бытии 6:13-22.' },
    },
    en: {
      title: 'Bible crossword',
      description: 'Recall biblical names from clues and check words at their intersections. Try an example clue with an answer and discover the Chrust crossword.',
      intro: 'Solve Bible clues and use intersecting letters to check your answers.',
      sections: [
        { title: 'How to solve the crossword', items: ['Select a word and read its clue.', 'Enter the complete answer.', 'Use shared letters to check neighbouring words.'] },
        { title: 'When an answer does not come to mind', paragraphs: ['Start with another clue and return to the intersection. In Chrust, clearing one word preserves letters already entered for another crossing word.'] },
      ],
      example: { title: 'Try one clue', prompt: 'Who built the ark at God’s instruction? The English answer has four letters.', answer: 'NOAH. Check the account in Genesis 6:13-22.' },
    },
  },
  'bible-quiz': {
    ru: {
      title: 'Библейский блиц: викторина',
      description: 'Библейская викторина с короткими вопросами и проверкой ответов. Узнайте, как устроен 60-секундный блиц в Chrust, и попробуйте вопрос.',
      intro: 'Проверьте, что запомнилось из Библии, в коротком раунде вопросов с вариантами ответа.',
      sections: [
        { title: 'Как устроен блиц', paragraphs: ['В приложении раунд длится 60 секунд активного времени. После ответа вариант подсвечивается и открывается следующий вопрос. Сворачивание приложения и открытие справки ставят таймер на паузу.'] },
        { title: 'Проверьте не только память', paragraphs: ['После раунда вернитесь к вопросам, которые вызвали сомнение, и найдите соответствующий рассказ в Библии. Пример на этой странице можно решать без таймера.'] },
      ],
      example: { title: 'Вопрос для разминки', prompt: 'Какая книга открывает Библию: Бытие, Исход или Псалтирь?', answer: 'Бытие. Посмотрите оглавление своей Библии и прочитайте начало первой главы.' },
    },
    en: {
      title: 'Bible quiz: Blitz',
      description: 'Try a Bible quiz question with an answer and learn how Chrust’s 60-second Blitz round works. Use the results to return to Scripture.',
      intro: 'Recall what you have read in a short round of Bible questions with answer choices.',
      sections: [
        { title: 'How Blitz works', paragraphs: ['An app round lasts 60 seconds of active time. Your answer is highlighted before the next question appears. Switching away from the app or opening help pauses the timer.'] },
        { title: 'Go beyond recall', paragraphs: ['Return to questions that made you hesitate and find the relevant account in the Bible. The website example below has no timer.'] },
      ],
      example: { title: 'A warm-up question', prompt: 'Which book opens the Bible: Genesis, Exodus or Psalms?', answer: 'Genesis. Check your Bible’s contents and read the beginning of its first chapter.' },
    },
  },
  'bible-matching-pairs': {
    ru: {
      title: 'Библейская игра «Найди пары»',
      description: 'Соединяйте связанные библейские имена и события. Правила игры «Найди пары» в Chrust и небольшой пример соответствий с ответом.',
      intro: 'Находите связи между библейскими именами и событиями, соединяя подходящие пары.',
      sections: [
        { title: 'Как выбирать пару', paragraphs: ['В приложении выберите карточку в одной колонке, затем соответствующую ей карточку в другой. Правильные пары соединяются, а карточки сохраняют свои места.'] },
        { title: 'Как проверить связь', paragraphs: ['Объясните себе, почему эти элементы подходят друг другу. Если связь непонятна, вернитесь к библейскому рассказу: знакомое имя само по себе ещё не объясняет событие.'] },
      ],
      example: { title: 'Соедините два имени и два описания', prompt: 'Имена: Ной, Аарон. Описания: брат Моисея; строитель ковчега.', answer: 'Ной построил ковчег, Аарон был братом Моисея. Основания: Бытие 6:13-22 и Исход 4:14.' },
    },
    en: {
      title: 'Bible matching pairs',
      description: 'Connect related biblical names and events. Read the rules of Chrust’s matching game and try a small matching example with an answer.',
      intro: 'Connect biblical names and events by finding the pairs that belong together.',
      sections: [
        { title: 'Choose a pair', paragraphs: ['In the app, select a card in one column and its partner in the other. Correct pairs are connected while the cards stay in their positions.'] },
        { title: 'Check the connection', paragraphs: ['Explain why the two items belong together. When the connection is unclear, return to the biblical account: recognising a name is not the same as understanding the event.'] },
      ],
      example: { title: 'Match two names to two descriptions', prompt: 'Names: Noah, Aaron. Descriptions: Moses’ brother; the builder of the ark.', answer: 'Noah built the ark; Aaron was Moses’ brother. Read Genesis 6:13-22 and Exodus 4:14.' },
    },
  },
  'build-a-bible-verse': {
    ru: {
      title: 'Библейская игра «Собери стих»',
      description: 'Восстанавливайте порядок слов библейского стиха в Chrust. Правила, пример сборки и проверка по тексту Библии.',
      intro: 'Восстанавливайте порядок слов и внимательнее вчитывайтесь в знакомый библейский стих.',
      sections: [
        { title: 'Как собирать стих', paragraphs: ['Выбирайте слова в нужном порядке. В приложении их можно переносить между набором и ответом и менять местами, если хотите исправить последовательность.'] },
        { title: 'Почему важно сверяться с переводом', paragraphs: ['Один стих может звучать по-разному в разных переводах. Восстанавливайте именно предложенный текст, а после ответа прочитайте соседние стихи, чтобы сохранить контекст.'] },
      ],
      example: { title: 'Соберите предложение', prompt: 'Расположите части: «землю», «В начале», «небо и», «Бог», «сотворил».', answer: 'В начале сотворил Бог небо и землю. Бытие 1:1, Синодальный перевод.' },
    },
    en: {
      title: 'Build a Bible verse',
      description: 'Put the words of a Bible verse in order. Explore the Chrust verse-building game, try a short example and check it against Scripture.',
      intro: 'Put the words back in order and take a closer look at a familiar Bible verse.',
      sections: [
        { title: 'How to build a verse', paragraphs: ['Choose words in their intended order. In the app, move them between the word bank and your answer or swap their positions to adjust the sequence.'] },
        { title: 'Use the same translation', paragraphs: ['Translations can phrase the same verse differently. Rebuild the text that was provided, then read its neighbouring verses to keep the context.'] },
      ],
      example: { title: 'Build the sentence', prompt: 'Order these parts: “the earth”, “In the beginning”, “God created”, “the heavens and”.', answer: 'In the beginning, God created the heavens and the earth. Genesis 1:1, World English Bible.' },
    },
  },
  'guess-bible-verse': {
    ru: {
      title: 'Библейская игра «Откуда стих?»',
      description: 'Определяйте книгу Библии по отрывку. Правила игры «Откуда стих?» в Chrust и пример со ссылкой для проверки ответа.',
      intro: 'Вспомните, в какой книге находится отрывок, и проверьте его в контексте.',
      sections: [
        { title: 'Выберите книгу', paragraphs: ['В приложении к каждому отрывку предлагаются четыре названия книг. Выберите источник, затем вернитесь к тексту при разборе ответа. В этой игре нет отдельного таймера.'] },
        { title: 'На что обращать внимание', items: ['Кто говорит и к кому обращается?', 'Это рассказ о событии, молитва или часть послания?', 'Какие имена и детали помогают определить место отрывка?'] },
      ],
      example: { title: 'Из какой книги этот стих?', prompt: '«В начале сотворил Бог небо и землю». Варианты: Бытие, Псалтирь, Луки, Римлянам.', answer: 'Бытие 1:1, Синодальный перевод. Прочитайте главу, чтобы увидеть продолжение рассказа.' },
    },
    en: {
      title: 'Where is this Bible verse?',
      description: 'Identify a Bible book from a passage. Explore Chrust’s verse-source game and try an example with a reference to check your answer.',
      intro: 'Recall which Bible book a passage comes from, then check it in context.',
      sections: [
        { title: 'Choose the book', paragraphs: ['The app offers four book names for each passage. Choose its source and revisit the text when reviewing the answer. This game has no separate round timer.'] },
        { title: 'Look for clues in the passage', items: ['Who is speaking, and to whom?', 'Is this a narrative, a prayer or part of a letter?', 'Which names and details help identify the setting?'] },
      ],
      example: { title: 'Which book contains this verse?', prompt: '“In the beginning, God created the heavens and the earth.” Choices: Genesis, Psalms, Luke, Romans.', answer: 'Genesis 1:1, World English Bible. Read the chapter to follow the account.' },
    },
  },
};
