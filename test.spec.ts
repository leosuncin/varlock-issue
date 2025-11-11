import { test, type TestContext } from 'node:test';

test('http server test', async (context: TestContext) => {
  const response = await fetch(`http://${process.env.HOST}:${process.env.PORT}`);

  context.assert.equal(response.status, 200);
});
