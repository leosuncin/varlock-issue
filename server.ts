import http from 'node:http';
import { fileURLToPath } from 'node:url';

import 'varlock/auto-load';
import { ENV } from 'varlock/env';

export const server = http.createServer((request, response) => {
  if (request.method === 'HEAD') {
    response.writeHead(200);
    response.end();
  } else if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(
      JSON.stringify({
        host: String(ENV.HOST),
        port: Number(ENV.PORT),
        env: String(ENV.NODE_ENV),
        ci: Boolean(ENV.CI),
      }),
    );
  } else {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
  }
});

if (fileURLToPath(import.meta.url) === process.argv.at(1)) {
  server.listen(
    {
      host: ENV.HOST,
      port: ENV.PORT,
    },
    () => {
      console.log(`Server running at http://${ENV.HOST}:${ENV.PORT}/`);
    },
  );
}
