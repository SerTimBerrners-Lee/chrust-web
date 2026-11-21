import type { Locale } from './content';
import { escapeHtml } from './seo';

export const supportTermsPath = (locale: Locale): string => `/${locale}/support/terms/`;

type Section = { title: string; paragraphs: string[] };
type Terms = { title: string; revision: string; summary: string; availability: string; sections: Section[] };

const content: Record<Locale, Terms> = {
  ru: {
    title: 'Условия добровольной поддержки Chrust',
    revision: 'Редакция от 19 ноября 2026 года',
    summary: 'Поддержка помогает развивать бесплатное приложение Chrust: готовить библейские уроки и материалы, улучшать чтение Библии и игры.',
    availability: 'Платёж можно сделать только тогда, когда в приложении доступен переход к оплате. Ежемесячная поддержка доступна, только если подключён этот способ оплаты.',
    sections: [
      { title: 'Кому и на что направляется поддержка', paragraphs: [
        'Получатель поддержки: Давид Перов, разработчик проекта Chrust. Контакт по платежам и возвратам: info@chrust.org.',
        'Поддержка добровольная. Она не открывает платные функции, материалы, привилегии или приоритет. Библия и основные разделы доступны без платежа. Chrust не является благотворительной организацией.',
      ] },
      { title: 'Разовая поддержка', paragraphs: [
        'Вы выбираете сумму в рублях. Приложение показывает сумму и вид поддержки перед переходом на защищённую платёжную страницу ЮKassa. Разовый платёж списывается один раз после подтверждения на этой странице и не включает автоматических списаний.',
      ] },
      { title: 'Ежемесячная поддержка', paragraphs: [
        'Для ежемесячной поддержки нужен аккаунт Chrust, чтобы управлять списаниями после переустановки приложения. При подключении вы отдельно соглашаетесь на ежемесячное списание выбранной суммы. Первое списание происходит после подтверждения оплаты на странице ЮKassa.',
        'Следующее списание назначается на то же число следующего месяца по московскому времени. Если такого числа нет, используется последний день месяца. В следующие месяцы снова используется исходное число. Сумма автоматически не меняется. Чтобы изменить её, отмените прежнюю поддержку и оформите новую с отдельным согласием.',
      ] },
      { title: 'Как отменить ежемесячные списания', paragraphs: [
        'Откройте «Профиль» → «Поддержать» → «Отменить ежемесячные списания». Если приложение недоступно, напишите на info@chrust.org. Отмена прекращает новые списания. Платёж, уже переданный провайдеру, может завершиться.',
        'Удаление аккаунта отменяет будущие списания. Удаление приложения с устройства само по себе их не отменяет. Если провайдер отклоняет очередной платёж, дальнейшие списания приостанавливаются. Для возобновления нужно заново оформить поддержку.',
      ] },
      { title: 'Статус платежа, вопросы и возвраты', paragraphs: [
        'Переход к оплате сам по себе не подтверждает платёж. Приложение показывает статус, полученный от ЮKassa. Если связь оборвалась, сначала проверьте статус платежа в приложении.',
        'При ошибочном или повторном списании либо по вопросу возврата напишите на info@chrust.org. Укажите дату, сумму и идентификатор платежа, если он у вас есть. Обращения рассматриваются с учётом применимого законодательства и обстоятельств платежа. Эти условия не ограничивают права, предусмотренные законом.',
        'Номер карты, срок её действия и защитный код вводятся на странице ЮKassa. Chrust их не получает. Не отправляйте эти данные, пароли и коды банка по электронной почте.',
      ] },
    ],
  },
  en: {
    title: 'Terms of voluntary support for Chrust',
    revision: 'Revised on November 19, 2026',
    summary: 'Your support helps develop the free Chrust app, prepare Bible lessons and materials, and improve Bible reading and games.',
    availability: 'You can make a payment only when checkout is available in the app. Monthly support is available only when this payment option is enabled.',
    sections: [
      { title: 'Who receives your support and how it is used', paragraphs: [
        'Support recipient: David Perov, the developer of Chrust. For payment and refund inquiries, email info@chrust.org.',
        'Support is voluntary and does not unlock paid features, materials, benefits, or priority. The Bible and the main sections are available without payment. Chrust is not a charitable organization.',
      ] },
      { title: 'One-time support', paragraphs: [
        'You choose an amount in Russian rubles. The app shows the amount and the type of support before opening YooKassa’s secure checkout. A one-time payment is charged once after confirmation on that page and does not enable recurring payments.',
      ] },
      { title: 'Monthly support', paragraphs: [
        'Monthly support requires a Chrust account so you can manage charges if you reinstall the app. You give separate consent to have the selected amount charged each month. The first payment is made after you confirm it on the YooKassa page.',
        'The next payment is scheduled for the same calendar day of the following month in Moscow time. If that month is shorter, it is scheduled for the last day, and later months return to the original day. The amount does not change automatically. To change it, cancel existing support and start new support with fresh consent.',
      ] },
      { title: 'How to cancel monthly payments', paragraphs: [
        'Open Profile → Support → Cancel monthly payments. If you cannot access the app, email info@chrust.org. Canceling prevents new payments from starting. A payment already sent to the payment provider may still complete.',
        'Deleting your account cancels future charges. Uninstalling the app alone does not cancel them. If the provider declines a payment, further charges are paused. To resume, start monthly support again.',
      ] },
      { title: 'Payment status, inquiries and refunds', paragraphs: [
        'Opening checkout alone does not confirm a payment. The app shows the status received from YooKassa. If your connection drops, first check the payment status in the app.',
        'For an incorrect or duplicate charge, or to request a refund, email info@chrust.org with the date, amount and payment identifier if available. Requests are considered under applicable law and the circumstances of the payment. These terms do not limit statutory rights.',
        'Enter your card number, expiry date and security code on the YooKassa page. Chrust does not receive these details. Do not email card details, passwords or bank codes.',
      ] },
    ],
  },
};

export function supportTermsHtml(locale: Locale): string {
  const t = content[locale];
  const ru = locale === 'ru';
  const origin = 'https://chrust.org';
  const path = supportTermsPath(locale);
  const text = (value: string) => escapeHtml(value)
    .replaceAll('info@chrust.org', '<a href="mailto:info@chrust.org">info@chrust.org</a>');
  return `<!doctype html><html lang="${locale}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="robots" content="index, follow">
<title>${escapeHtml(t.title)}</title><meta name="description" content="${escapeHtml(t.summary)}">
<link rel="canonical" href="${origin}${path}">
<link rel="alternate" hreflang="ru" href="${origin}${supportTermsPath('ru')}">
<link rel="alternate" hreflang="en" href="${origin}${supportTermsPath('en')}">
<link rel="alternate" hreflang="x-default" href="${origin}/support/terms/">
<link rel="icon" type="image/png" href="/assets/chrust-logo.png">
<link rel="stylesheet" href="/privacy.css"></head><body>
<a class="skip" href="#terms">${ru ? 'К условиям поддержки' : 'Skip to terms'}</a>
<header><a class="brand" href="/${locale}/"><img src="/assets/chrust-rays-transparent.webp" width="36" height="36" alt="">Chrust</a>
<nav aria-label="${ru ? 'Язык' : 'Language'}"><a href="${supportTermsPath('ru')}" lang="ru"${ru ? ' aria-current="page"' : ''}>RU</a><a href="${supportTermsPath('en')}" lang="en"${ru ? '' : ' aria-current="page"'}>EN</a></nav></header>
<main id="terms"><h1>${text(t.title)}</h1><p class="revision">${text(t.revision)}</p><p>${text(t.summary)}</p><p>${text(t.availability)}</p>
${t.sections.map((section, i) => `<section aria-labelledby="terms-${i + 1}"><h2 id="terms-${i + 1}">${text(section.title)}</h2>${section.paragraphs.map(value => `<p>${text(value)}</p>`).join('')}</section>`).join('\n')}
</main><footer><a href="/${locale}/">${ru ? 'На сайт Chrust' : 'Chrust website'}</a><a href="/${locale}/privacy/">${ru ? 'Политика конфиденциальности' : 'Privacy policy'}</a><a href="https://app.chrust.org/">${ru ? 'Открыть приложение' : 'Open the app'}</a></footer>
</body></html>\n`;
}
