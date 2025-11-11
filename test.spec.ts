import { test, type TestContext } from 'node:test';

test('http server test', async (context: TestContext) => {
  const host = process.env.HOST ?? 'localhost';
  const port = Number.parseInt(process.env.PORT!, 10) || 3000;
  const response = await fetch(`http://${host}:${port}`);

  context.assert.equal(response.status, 200);
});
