# BibleProject RU design project

Private Sites project reproducing the presentation of https://bibleproject.com/ru/ as inspected on 2026-10-17. This design is scoped to this project.

## Files

- `dist/index.html`: complete Russian page, including 11 video categories, 157 video entries and 22 reading plans.
- `dist/ru/index.html`: matching entry point at `/ru/`.
- `dist/assets/`: local reference styles, fonts and image assets.
- `dist/project.css`: local presentation adjustments and carousel movement.
- `dist/project.js`: local icon rendering, accessible accordion behavior and a video dialog.
- `asset-sources.json`: provenance for bundled reference assets.
- `.openai/hosting.json`: persistent Sites identity and static deployment settings.

## Current scope

Presentation and local interactions only. No custom backend, CMS, accounts or donation collection. Video playback, reading plans, posters and other outbound links retain the original external destinations. Original analytics scripts, consent integrations and application runtime are excluded. The page is marked noindex.

## Preview

Serve `dist` with any static HTTP server. No build step or package installation is required.
