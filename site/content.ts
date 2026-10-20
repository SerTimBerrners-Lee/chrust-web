export type Locale = 'ru' | 'en';
export const screens = [
  { id: 'growth', files: ['growth-tree', 'growth-calendar', 'growth-activity'] },
  { id: 'courses', files: ['course-map-live', 'course-intro-live', 'course-learn-live'] },
  { id: 'games', files: ['games-levels', 'games-wordsearch', 'games-verse', 'games-catalog'] },
  { id: 'bible', files: ['bible-reader', 'bible-highlight', 'bible-note'] },
];
export const screensWithNav = new Set(['growth-tree', 'growth-calendar', 'growth-activity', 'games-catalog', 'bible-reader', 'bible-highlight', 'bible-note']);
export const capturedScreenSizes: Record<string, { width: number; height: number }> = {
  'course-map-live': { width: 390, height: 780 },
  'course-intro-live': { width: 390, height: 844 },
  'course-learn-live': { width: 390, height: 780 },
};
export const content = {
  ru: {
    skip: 'К содержимому', home: 'Chrust, в начало', nav: 'Возможности приложения', language: 'Язык сайта',
    heroTitle: 'Библия и духовная практика в одном приложении.',
    heroDescription: 'Читайте Писание, открывайте библейские истории и укрепляйте духовную практику каждый день.',
    download: 'Скачать', start: 'Начать', downloadAction: 'Перейти к скачиванию Chrust',
    features: [
      { name: 'Рост', title: 'Рост', description: 'Отмечайте духовные практики в календаре и наблюдайте за ростом своего дерева.' },
      { name: 'Курсы', title: 'Курсы Ветхого и Нового Завета', description: 'Курсы с картой уроков и заданиями для проверки знаний готовятся к запуску.' },
      { name: 'Игры', title: 'Игры', description: 'Закрепляйте изученное в библейских играх с уровнями и разными заданиями.' },
      { name: 'Библия', title: 'Библия', description: 'Читайте Библию, выделяйте стихи и сохраняйте свои заметки.' },
    ],
    screenLabels: {
      'growth-tree': 'Ваше дерево', 'growth-calendar': 'Календарь практик', 'growth-activity': 'Отметка действия',
      'course-map': 'Карта Ветхого Завета', 'course-lesson': 'Короткий урок', 'course-question': 'Проверка понимания',
      'course-map-live': 'Карта Ветхого Завета', 'course-intro-live': 'Начало урока «Сотворение мира»', 'course-learn-live': 'Выбор Ветхого и Нового Завета',
      'games-levels': 'Уровни игры', 'games-wordsearch': 'Филворд', 'games-verse': 'Собери стих', 'games-catalog': 'Каталог игр',
      'bible-reader': 'Чтение Библии', 'bible-highlight': 'Выделение стихов', 'bible-note': 'Личная заметка',
    },
    aboutTitle: 'О Chrust', aboutImageAlt: 'Макет мозаики из семи серых блоков для иллюстраций уроков',
    about: [
      'Наша цель - объединять людей по всему миру и помогать делать чтение Библии естественной частью каждого дня. Chrust создаётся для тех, кто хочет лучше понимать Писание, находить в нём опору и расти духовно вместе с другими.',
      'Чтение, изучение библейских историй, игры и молитва становятся небольшими шагами на этом пути. Нам важно, чтобы каждый мог двигаться в своём темпе, возвращаться к прочитанному и постепенно превращать добрые намерения в ежедневную привычку.',
      'Духовный рост похож на маленький росток. Ему нужны свет, вода и постоянная забота: без внимания он слабеет и увядает. Так и внутренняя жизнь крепнет благодаря тому, что мы делаем день за днём. Chrust помогает замечать эти шаги и бережно растить своё дерево.',
    ],
    communityDescription: 'Подписывайтесь, следите за новостями и общайтесь с сообществом Chrust.',
    socialLabels: { telegram: 'Канал Chrust в Telegram', instagram: 'Следить в Instagram', threads: 'Следить в Threads', youtube: 'Смотреть на YouTube' },
    downloadTitle: 'Chrust всегда рядом', downloadDescription: 'Выберите удобный способ начать: на телефоне или прямо в браузере.',
    platforms: { appStore: 'App Store', googlePlay: 'Google Play', ruStore: 'RuStore', webApp: 'В приложение' },
    storeAction: 'Загрузить в', webAction: 'Открыть веб-версию', soon: 'Скоро', downloadPageTitle: 'Скачать Chrust',
    footer: 'Помогаем читать Библию, понимать прочитанное и сохранять духовную практику.',
    back: 'На главную', windOn: 'Остановить лёгкий ветер', windOff: 'Включить лёгкий ветер',
  },
  en: {
    skip: 'Skip to content', home: 'Chrust, back to top', nav: 'App features', language: 'Website language',
    heroTitle: 'The Bible and spiritual practice in one app.',
    heroDescription: 'Read Scripture, discover biblical stories, and nurture your spiritual life every day.',
    download: 'Download', start: 'Get started', downloadAction: 'Download Chrust',
    features: [
      { name: 'Growth', title: 'Growth', description: 'Track your spiritual practices in a calendar and watch your tree grow.' },
      { name: 'Courses', title: 'Old and New Testament courses', description: 'Courses with lesson maps and questions to deepen your understanding are being prepared for launch.' },
      { name: 'Games', title: 'Games', description: 'Revisit what you have learned through Bible games with levels and varied challenges.' },
      { name: 'Bible', title: 'Bible', description: 'Read the Bible, highlight verses, and keep your own notes.' },
    ],
    screenLabels: {
      'growth-tree': 'Your tree', 'growth-calendar': 'Practice calendar', 'growth-activity': 'Record a practice',
      'course-map': 'Old Testament map', 'course-lesson': 'A short lesson', 'course-question': 'Check your understanding',
      'course-map-live': 'Old Testament map', 'course-intro-live': 'The Creation lesson introduction', 'course-learn-live': 'Old and New Testament selection',
      'games-levels': 'Game levels', 'games-wordsearch': 'Word search', 'games-verse': 'Build a verse', 'games-catalog': 'Game library',
      'bible-reader': 'Reading the Bible', 'bible-highlight': 'Highlighted verses', 'bible-note': 'A personal note',
    },
    aboutTitle: 'About Chrust', aboutImageAlt: 'Seven grey placeholder tiles for a mosaic of lesson illustrations',
    about: [
      'Our goal is to bring people together around the world and make reading the Bible a natural part of everyday life. Chrust is being created for those who want to understand Scripture more deeply, find strength in it, and grow spiritually alongside others.',
      'Reading, exploring biblical stories, playing games, and praying can become small steps along that path. We want everyone to move at their own pace, return to what they have read, and gradually turn good intentions into a daily habit.',
      'Spiritual growth is like a young sapling. It needs light, water, and ongoing care; without attention it weakens and withers. Our inner life grows stronger through what we do day after day. Chrust helps you notice those small steps and nurture your own tree.',
    ],
    communityDescription: 'Follow our updates and connect with the Chrust community.',
    socialLabels: { telegram: 'Chrust Telegram channel', instagram: 'Follow on Instagram', threads: 'Follow on Threads', youtube: 'Watch on YouTube' },
    downloadTitle: 'Keep Chrust close', downloadDescription: 'Choose how you would like to begin: on your phone or in your browser.',
    platforms: { appStore: 'App Store', googlePlay: 'Google Play', ruStore: 'RuStore', webApp: 'Open the app' },
    storeAction: 'Download on', webAction: 'Use the web version', soon: 'Coming soon', downloadPageTitle: 'Download Chrust',
    footer: 'Helping you read the Bible, understand its message, and nurture a daily spiritual practice.',
    back: 'Back to home', windOn: 'Pause gentle wind', windOff: 'Play gentle wind',
  },
} as const;
