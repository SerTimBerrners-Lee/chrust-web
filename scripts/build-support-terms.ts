import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { supportTermsHtml, supportTermsPath } from '../site/support-terms';

export async function buildSupportTerms(directory = 'dist'): Promise<void> {
  for (const locale of ['ru', 'en'] as const) {
    const target = join(directory, supportTermsPath(locale));
    await mkdir(target, { recursive: true });
    await writeFile(join(target, 'index.html'), supportTermsHtml(locale));
  }
  const target = join(directory, 'support/terms');
  await mkdir(target, { recursive: true });
  await writeFile(join(target, 'index.html'), supportTermsHtml('ru'));
}
