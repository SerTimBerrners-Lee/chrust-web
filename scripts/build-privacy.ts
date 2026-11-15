import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { privacyHtml } from '../site/privacy';

export async function buildPrivacyPages(directory = 'dist'): Promise<void> {
  for (const locale of ['ru', 'en'] as const) {
    const target = join(directory, locale, 'privacy');
    await mkdir(target, { recursive: true });
    await writeFile(join(target, 'index.html'), privacyHtml(locale));
  }
  await mkdir(join(directory, 'privacy'), { recursive: true });
  await writeFile(join(directory, 'privacy/index.html'), privacyHtml('ru'));
  await copyFile('site/privacy.css', join(directory, 'privacy.css'));
}

if (import.meta.main) await buildPrivacyPages(process.argv[2]);
