import { test, type TestContext } from 'node:test';

import request from 'supertest';
import { ENV } from 'varlock/env';

import { server } from './server.ts';

test('print process.env', (context: TestContext) => {
  console.table({
    host: process.env.HOST,
    port: Number(process.env.PORT),
    env: String(process.env.NODE_ENV),
    ci: Boolean(process.env.CI === 'true'),
  });

  context.assert.ok(process.env.HOST);
  context.assert.ok(process.env.PORT);
  context.assert.ok(process.env.NODE_ENV);
});

test('print ENV variables', (context: TestContext) => {
  console.table({
    host: ENV.HOST,
    port: ENV.PORT,
    env: ENV.NODE_ENV,
    ci: ENV.CI,
  });

  context.assert.ok(ENV.HOST);
  context.assert.ok(ENV.PORT);
  context.assert.ok(ENV.NODE_ENV);
});

test('http server test', async (context: TestContext) => {
  const response = await request(server)
    .get('/')
    .expect(200)
    .expect('Content-Type', 'application/json')
    .expect({
      host: String(ENV.HOST),
      port: Number(ENV.PORT),
      env: String(ENV.NODE_ENV),
      ci: Boolean(ENV.CI),
    });

  context.assert.ok(response);
});
