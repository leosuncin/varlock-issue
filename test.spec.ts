import { test } from 'node:test';

import request from 'supertest';
import { ENV } from 'varlock/env';

import { server } from './server.ts';

test('http server test', async () => {
  await request(server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json')
    .expect({
      host: String(ENV.HOST),
      port: Number(ENV.PORT),
      env: String(ENV.NODE_ENV),
      ci: Boolean(ENV.CI),
    });
});
