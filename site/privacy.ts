import { escapeHtml } from './seo';

export const privacyVersion = '2026-11-11';
export const privacyContact = 'info@chrust.org';
export const privacyOperator = 'Перов Давид';

type PrivacySection = { title: string; paragraphs: string[] };
export const privacyContent: Record<'ru' | 'en', { title: string; updated: string; summary: string; sections: PrivacySection[] }> = {
  ru: {
    title: 'Политика конфиденциальности Chrust',
    updated: 'Редакция от 11 ноября 2026 года',
    summary: 'Как приложение Chrust и сайты chrust.org и app.chrust.org обрабатывают данные.',
    sections: [
      { title: '1. Оператор и область действия', paragraphs: [
        'Оператором персональных данных и разработчиком Chrust является Перов Давид. По вопросам обработки данных пишите на info@chrust.org. Политика распространяется на мобильное приложение, веб-приложение app.chrust.org и сайт chrust.org.',
        'Данные используются для предоставления выбранных пользователем возможностей, защиты аккаунта, работы сервиса и ответа на обращения. Основанием обработки служат предоставление запрошенного сервиса, согласие пользователя в случаях, когда оно требуется, и применимые обязанности оператора. Каждая цель ограничивается необходимыми для неё данными.',
      ] },
      { title: '2. Данные на вашем устройстве', paragraphs: [
        'Чтением Библии, уроками и играми можно пользоваться без аккаунта. На устройстве сохраняются настройки, скачанный перевод и иллюстрации, место чтения, заметки, выделения, избранные цитаты и молитвы, прогресс игр и уроков, отметки практики и состояние дерева. В браузере для этого используются локальное хранилище и база данных браузера.',
        'Возрастной диапазон, конфессия, духовные трудности, цели и привычки из анкеты добровольны. Эти ответы, включая сведения о религиозных убеждениях, хранятся локально. Текущая версия не отправляет их в аккаунт, платёжному провайдеру или рекламным системам. Анкету можно пропустить, ответы можно изменить в настройках.',
      ] },
      { title: '3. Аккаунт и загрузка материалов', paragraphs: [
        'Для входа по почте сервер получает email, указанное имя, технический идентификатор устройства и язык письма. Email нужен для отправки кода и восстановления доступа, имя используется в профиле. На сервере сохраняются данные аккаунта, защищённые сведения о сессиях и предусмотренный приложением учебный прогресс и журнал синхронизации.',
        'Код входа действует 10 минут. На сервере хранится его проверочное представление. После успешного использования запись удаляется, просроченные записи очищаются при последующих запросах кодов. Токен доступа действует 15 минут, токен продления сессии до 30 дней. Срок действия токена сам по себе не является сроком удаления всех записей аккаунта.',
        'При загрузке перевода, иллюстраций и фонов сервер получает IP-адрес, время обращения и запрашиваемый ресурс. Эти сведения обеспечивают доставку и диагностику. Скачанные файлы сохраняются на устройстве для повторного использования.',
      ] },
      { title: '4. Сайт, cookie и внешние ссылки', paragraphs: [
        'Сайт запоминает выбранный язык в локальном хранилище браузера. Веб-приложение использует защищённые cookie для сессии аккаунта и локальную базу для пользовательских данных. Очистить их можно средствами приложения или браузера. После очистки потребуется войти снова и повторно скачать материалы.',
        'В опубликованной версии рекламная аналитика, PostHog, Sentry и удалённые уведомления Firebase не настроены. Платные рекламные профили пользователей не создаются. При переходе в социальную сеть, магазин или другой внешний сервис действуют правила этого сервиса.',
      ] },
      { title: '5. Уведомления, виджеты и обои', paragraphs: [
        'Напоминания о цитатах, молитвах и состоянии дерева формируются локально после разрешения системных уведомлений. Их количество и время можно изменить в настройках, разрешение можно отозвать в системе. Виджеты и обои используют выбранные тексты и изображения на устройстве, дополнительные фоны загружаются с сервера Chrust.',
      ] },
      { title: '6. Поставщики услуг и поддержка проекта', paragraphs: [
        'Письма с кодами доставляет Resend, Plus Five Five, Inc. Для отправки ему передаются адрес получателя, язык и содержимое служебного письма с кодом. По документации Resend данные писем и журналы сервиса хранятся в США, в стандартном тарифе до 30 дней. Выбор европейского региона отправки не меняет страну хранения. Таким образом, отправка кода включает трансграничную передачу этих данных. Условия обработки и удаления у поставщика опубликованы на resend.com/security и resend.com/legal/privacy-policy.',
        'В опубликованной версии приём платежей отключён. Тестовое подключение ЮKassa используется при разработке, без списания реальных денег. При доступной оплате платёжные реквизиты вводятся на странице ЮKassa, а Chrust получает идентификатор, сумму, валюту и подтверждённый статус. Для ежемесячной поддержки отдельно сохраняются согласие, дата продления и защищённый идентификатор способа оплаты. Будущие списания можно отменить в приложении. Данные аккаунта не используются для продажи рекламы.',
      ] },
      { title: '7. Сроки хранения и защита', paragraphs: [
        'Локальные данные сохраняются до их удаления пользователем, очистки браузера или удаления приложения. Данные аккаунта обрабатываются в течение использования аккаунта и до исполнения запроса об удалении, если дальнейшее хранение не требуется для отдельной законной цели. Серверные журналы Nginx ротируются ежедневно, сохраняются текущий журнал и до 14 архивов.',
        'Удаление аккаунта очищает имя, email, сессии и связанные рабочие записи. Техническая отметка об удалении и отдельные платёжные записи могут сохраняться для безопасности и обязательного учёта. Резервные копии предназначены для аварийного восстановления и могут содержать ранее записанные данные. При обращении об удалении оператор отдельно проверяет их наличие и учитывает удаление при восстановлении.',
        'Для передачи используется HTTPS, доступ к серверу ограничен. Токены продления сессии хранятся на сервере в виде хешей, идентификаторы сохранённых способов оплаты защищаются шифрованием. Доступ к служебным копиям ограничивается задачами обслуживания и восстановления.',
      ] },
      { title: '8. Ваши права и удаление данных', paragraphs: [
        'Вы можете запросить сведения об обработке, доступ к своим данным, исправление, ограничение обработки, удаление и отзыв согласия. Экспорт и удаление аккаунта доступны в настройках приложения. Локальные записи очищаются отдельным действием в настройках. Удаление приложения с телефона само по себе не отменяет действующую ежемесячную поддержку.',
        'Для обращения напишите на info@chrust.org с адреса аккаунта и укажите, что требуется сделать. Для подтверждения владения может потребоваться код на этот адрес. Не присылайте пароль, код входа в сторонний сервис, полный номер банковской карты или документы без отдельного обоснованного запроса. Обращения рассматриваются в сроки, установленные применимым законодательством. Также можно обратиться в Роскомнадзор или иной компетентный орган.',
      ] },
      { title: '9. Несовершеннолетние и изменения политики', paragraphs: [
        'Для действий несовершеннолетнего, требующих участия законного представителя, обращение может направить представитель. Если сведения были предоставлены ошибочно, напишите на адрес поддержки для проверки и удаления.',
        'Новая редакция публикуется на этой странице с датой изменения. Перед подключением новых видов передачи данных или изменением целей обработки политика обновляется, а согласие запрашивается отдельно, когда оно необходимо. Вопросы по этой редакции принимаются по адресу info@chrust.org.',
      ] },
    ],
  },
  en: {
    title: 'Chrust Privacy Policy',
    updated: 'Effective November 11, 2026',
    summary: 'How Chrust and the chrust.org and app.chrust.org websites process data.',
    sections: [
      { title: '1. Controller and scope', paragraphs: [
        'The data controller and Chrust developer is David Perov (Перов Давид). For privacy requests, contact info@chrust.org. This policy covers the mobile application, app.chrust.org web application and chrust.org website.',
        'Data is used to deliver the features you choose, protect your account, operate the service and respond to requests. Processing relies on providing the requested service, consent where required and applicable legal obligations. Each purpose is limited to the data needed for it.',
      ] },
      { title: '2. Data on your device', paragraphs: [
        'Bible reading, lessons and games are available without an account. Your device stores settings, downloaded Bible text and artwork, reading position, notes, highlights, favorite verses and prayers, game and lesson progress, practice records and tree state. The web application uses browser storage and a local browser database.',
        'The introductory age range, denomination, spiritual challenges, goals and habits are optional. These answers, including information about religious beliefs, remain on your device. The current version does not send them to an account, payment provider or advertising system. You can skip the questionnaire and change answers in settings.',
      ] },
      { title: '3. Accounts and downloaded content', paragraphs: [
        'Email sign-in sends your email, the name you provide, a technical device identifier and email language to the server. Your email is used for sign-in codes and access recovery, and your name appears in your profile. The server stores account data, protected session records and the learning progress and synchronization records supported by the application.',
        'A sign-in code is valid for 10 minutes. The server stores its verification representation. The record is removed after successful use, and expired records are cleaned up during subsequent code requests. Access tokens last 15 minutes, and refresh tokens up to 30 days. Token validity does not determine the retention of all account records.',
        'Downloading Bible text, illustrations or backgrounds sends the IP address, request time and requested resource to Chrust servers for delivery and diagnostics. Downloaded files remain on your device for reuse.',
      ] },
      { title: '4. Website, cookies and external links', paragraphs: [
        'The website stores your chosen language in browser storage. The web application uses secure account-session cookies and a local database for your data. You can clear them through the application or browser. Clearing storage requires signing in again and downloading content again.',
        'Advertising analytics, PostHog, Sentry and Firebase remote notifications are not configured in the published version. The service does not create advertising profiles. Social networks, app stores and other external services apply their own policies when you follow their links.',
      ] },
      { title: '5. Notifications, widgets and wallpapers', paragraphs: [
        'Verse, prayer and tree reminders are scheduled locally after system notification permission. Their frequency and timing are adjustable in settings, and system permission can be revoked. Widgets and wallpapers use selected text and artwork on your device. Additional backgrounds are downloaded from Chrust servers.',
      ] },
      { title: '6. Service providers and project support', paragraphs: [
        'Sign-in emails are delivered by Resend, Plus Five Five, Inc. It receives the recipient address, language and the service email containing the code. Resend states that email data and logs are stored in the United States, for up to 30 days on standard plans. Choosing an EU sending region does not change the storage country. Code delivery therefore involves a cross-border transfer of this data. Its processing and deletion terms are published at resend.com/security and resend.com/legal/privacy-policy.',
        'Payment acceptance is disabled in the published version. A YooKassa test integration is used during development without charging real money. When payments are available, payment details are entered on YooKassa pages, while Chrust receives a payment identifier, amount, currency and verified status. Monthly support separately records consent, renewal date and a protected payment-method identifier. Future charges can be canceled in the application. Account data is not used to sell advertising.',
      ] },
      { title: '7. Retention and protection', paragraphs: [
        'Local data remains until you clear it, clear browser storage or uninstall the application. Account data is processed while you use the account and until a deletion request is fulfilled, except where a separate lawful purpose requires retention. Nginx server logs rotate daily, keeping the current log and up to 14 archives.',
        'Deleting an account clears its name, email, sessions and associated operational records. A technical deletion record and separate payment records may remain for security and mandatory accounting. Disaster-recovery backups may contain previously stored data. A deletion request includes checking these backups and accounting for the deletion when restoring data.',
        'Data is transmitted over HTTPS, and server access is restricted. Refresh tokens are stored as hashes on the server, and saved payment-method identifiers use encryption. Access to service backups is limited to maintenance and recovery purposes.',
      ] },
      { title: '8. Your rights and deleting data', paragraphs: [
        'You may request information about processing, access, correction, restriction, deletion or withdrawal of consent. Account export and deletion are available in application settings. Local records are cleared separately in settings. Uninstalling the mobile application does not cancel an active monthly support arrangement.',
        'Email info@chrust.org from your account address and describe the action you request. Ownership verification may require a code sent to that address. Do not send passwords, third-party sign-in codes, full payment-card numbers or identity documents without a separate justified request. Requests are handled within applicable statutory time limits. You may also contact Roskomnadzor or another competent supervisory authority.',
      ] },
      { title: '9. Minors and policy updates', paragraphs: [
        'A legal representative may contact us for actions by a minor that require representative involvement. Contact support if information was provided in error so it can be reviewed and deleted.',
        'Updates are published on this page with their revision date. Before introducing new kinds of data transfer or changing processing purposes, this policy is updated and separate consent is requested where required. Questions about this version can be sent to info@chrust.org.',
      ] },
    ],
  },
};

export function privacyHtml(locale: 'ru' | 'en'): string {
  const t = privacyContent[locale];
  const url = `https://chrust.org/${locale}/privacy/`;
  const paragraphs = (value: string): string => escapeHtml(value)
    .replaceAll('info@chrust.org', '<a href="mailto:info@chrust.org">info@chrust.org</a>')
    .replaceAll('resend.com/security', '<a href="https://resend.com/security" rel="noopener noreferrer">resend.com/security</a>')
    .replaceAll('resend.com/legal/privacy-policy', '<a href="https://resend.com/legal/privacy-policy" rel="noopener noreferrer">resend.com/legal/privacy-policy</a>');

  return `<!doctype html><html lang="${locale}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="robots" content="index, follow">
<title>${t.title}</title><meta name="description" content="${t.summary}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ru" href="https://chrust.org/ru/privacy/">
<link rel="alternate" hreflang="en" href="https://chrust.org/en/privacy/">
<link rel="alternate" hreflang="x-default" href="https://chrust.org/privacy/">
<link rel="icon" type="image/png" href="/assets/chrust-logo.png">
<link rel="stylesheet" href="/privacy.css"></head><body>
<a class="skip" href="#privacy-content">${locale === 'ru' ? 'К тексту политики' : 'Skip to policy'}</a>
<header><a class="brand" href="/${locale}/"><img src="/assets/chrust-rays-transparent.webp" width="36" height="36" alt="">Chrust</a>
<nav aria-label="${locale === 'ru' ? 'Язык' : 'Language'}"><a href="/ru/privacy/" lang="ru"${locale === 'ru' ? ' aria-current="page"' : ''}>RU</a><a href="/en/privacy/" lang="en"${locale === 'en' ? ' aria-current="page"' : ''}>EN</a></nav></header>
<main id="privacy-content"><h1>${t.title}</h1><p class="revision">${t.updated}</p><p>${t.summary}</p>
${t.sections.map((section, i) => `<section aria-labelledby="privacy-${i + 1}"><h2 id="privacy-${i + 1}">${section.title}</h2>${section.paragraphs.map(text => `<p>${paragraphs(text)}</p>`).join('')}</section>`).join('\n')}
</main><footer><a href="/${locale}/">${locale === 'ru' ? 'На сайт Chrust' : 'Chrust website'}</a><a href="https://app.chrust.org/">${locale === 'ru' ? 'Открыть приложение' : 'Open the application'}</a></footer>
</body></html>\n`;
}
