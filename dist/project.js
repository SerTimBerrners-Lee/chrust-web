const icons = {"arrow-up-right":"<!----><svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m328 96c13.3 0 24 10.7 24 24v240c0 13.3-10.7 24-24 24s-24-10.7-24-24v-182.1l-231 231.1c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l231-231h-182.1c-13.3 0-24-10.7-24-24s10.7-24 24-24h240z\"></path></svg>","angle-down":"<!----><svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m360.5 217.5-152 143.1c-4.6 5.2-10.6 7.4-16.5 7.4s-11.88-2.188-16.5-6.562l-152-143.938c-9.63-9.2-10.03-24.4-.94-34 9.13-9.7 24.38-10 33.94-.9l135.5 128.3 135.5-128.4c9.562-9.094 24.75-8.75 33.94.9375 9.06 9.6625 8.66 24.8625-.94 34.0625z\"></path></svg>","solid:play":"<!----><svg viewBox=\"0 0 384 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m361 215c14.3 8.8 23 24.3 23 41s-8.7 32.2-23 40.1l-287.97 176c-14.82 9.9-33.37 10.3-48.51 1.8-15.143-8.5-24.52-24.5-24.52-41.9v-352c0-17.36 9.377-33.37 24.52-41.87 15.14-8.49 33.69-8.14 48.51.91z\"></path></svg>","xmark":"<!----><svg viewBox=\"0 0 320 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m312.1 375c9.369 9.369 9.369 24.57 0 33.94s-24.57 9.369-33.94 0l-118.16-119.04-119 119c-9.369 9.369-24.57 9.369-33.94 0s-9.369-24.57 0-33.94l119.04-118.96-119.073-119.9c-9.369-9.369-9.369-24.57 0-33.94s24.57-9.369 33.94 0l119.033 119.94 119-119c9.369-9.369 24.57-9.369 33.94 0s9.369 24.57 0 33.94l-119.04 118.96z\"></path></svg>","angle-right":"<!----><svg viewBox=\"0 0 256 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m89.45 87.5 143.1 152c4.375 4.625 6.562 10.56 6.562 16.5 0 5.937-2.188 11.87-6.562 16.5l-143.1 152c-9.12 9.6-24.31 10-33.93.9-9.688-9.125-10.03-24.38-.9375-33.94l128.4-135.5-128.4-135.5c-9.0925-9.56-8.7525-24.71.9375-33.9 9.62-9.09 24.81-8.69 33.93.94z\"></path></svg>","brand:youtube":"<!----><svg viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M711 1128l484-250-484-253v503zm185-862q168 0 324.5 4.5T1450 280l73 4q1 0 17 1.5t23 3 23.5 4.5 28.5 8 28 13 31 19.5 29 26.5q6 6 15.5 18.5t29 58.5 26.5 101q8 64 12.5 136.5T1792 788v176q1 145-18 290-7 55-25 99.5t-32 61.5l-14 17q-14 15-29 26.5t-31 19-28 12.5-28.5 8-24 4.5-23 3-16.5 1.5q-251 19-627 19-207-2-359.5-6.5T336 1512l-49-4-36-4q-36-5-54.5-10t-51-21-56.5-41q-6-6-15.5-18.5t-29-58.5T18 1254q-8-64-12.5-136.5T0 1004V828q-1-145 18-290 7-55 25-99.5T75 377l14-17q14-15 29-26.5t31-19.5 28-13 28.5-8 23.5-4.5 23-3 17-1.5q251-18 627-18z\"></path></svg>"};
for (const el of document.querySelectorAll('bp-icon')) {el.innerHTML = icons[el.getAttribute('icon')] || '';el.setAttribute('aria-hidden','true');}
/* Presentation-only interactions for this project. */
'use strict';
for (const button of document.querySelectorAll('.accordion-item-label')) {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    if (open) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', 'until-found');
  });
  panel.addEventListener('beforematch', () => button.setAttribute('aria-expanded', 'true'));
}
const modal = document.querySelector('.video-modal');
const modalPanel = modal.querySelector('.video-modal-panel');
const player = document.createElement('video');
player.controls = true;
player.playsInline = true;
player.preload = 'metadata';
player.className = 'video-player';
const videoTitle = document.createElement('p');
videoTitle.className = 'video-title';
const videoFallback = document.createElement('a');
videoFallback.className = 'video-fallback';
videoFallback.textContent = 'Открыть на YouTube';
videoFallback.target = '_blank';
videoFallback.rel = 'noopener noreferrer';
modalPanel.append(player, videoTitle, videoFallback);
let lastPlayButton;
for (const button of document.querySelectorAll('.home-hub-play-button')) {
  button.addEventListener('click', () => {
    const row = button.closest('.home-hub-collection-list-item');
    const source = row.querySelector('a[href*="stream.mux.com"]');
    const youtube = row.querySelector('a[href*="youtube.com"]');
    videoTitle.textContent = row.querySelector('.home-hub-collection-list-item-title').textContent.trim();
    modal.setAttribute('aria-label', videoTitle.textContent);
    videoFallback.href = youtube?.href || 'https://www.youtube.com/';
    videoFallback.hidden = !youtube;
    if (source) player.src = source.href.split('?')[0];
    player.hidden = !source;
    lastPlayButton = button;
    modal.showModal();
    if (source) player.play().catch(() => {});
  });
}
function closeVideo() {modal.close();}
modal.querySelector('.video-modal-close').addEventListener('click', closeVideo);
modal.addEventListener('click', event => {if (event.target === modal) closeVideo();});
modal.addEventListener('close', () => {player.pause();player.removeAttribute('src');player.load();lastPlayButton?.focus({preventScroll:true});});
