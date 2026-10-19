import { resolve, extname } from 'node:path';

const root = resolve(process.env.CHRUST_STATIC_ROOT ?? 'dist');
const port = Number(process.env.PORT ?? 4173);
const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.wasm': 'application/wasm',
  '.json': 'application/json',
};

Bun.serve({
  hostname: '0.0.0.0',
  port,
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathname = decodeURIComponent(url.pathname);
    const path = resolve(root, `.${pathname.endsWith('/') ? `${pathname}index.html` : pathname}`);

    if (path !== root && !path.startsWith(`${root}\\`) && !path.startsWith(`${root}/`)) {
      return new Response('Not found', { status: 404 });
    }

    const file = Bun.file(path);

    if (!await file.exists()) {
      if (process.env.CHRUST_SPA === '1' && !extname(path)) {
        return new Response(Bun.file(resolve(root, 'index.html')), { headers: { 'Content-Type': mime['.html'] } });
      }

      return new Response('Not found', { status: 404 });
    }

    return new Response(file, { headers: {
      'Content-Type': mime[extname(path)] ?? file.type,
      'Cache-Control': 'no-cache',
    } });
  },
});

console.log(`Serving ${root} at http://127.0.0.1:${port}/`);
