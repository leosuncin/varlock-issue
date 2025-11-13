console.group('Node.js process.env variables');

console.debug('Printing process.env variables in a table');

console.table({
  host: process.env.HOST,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  ci: process.env.CI,
});

console.groupEnd();

console.group('Varlock parsed variables');

try {
  console.debug('Loading Varlock auto-load module...');
  await import('varlock/auto-load');
  console.debug('Loading Varlock env module...');
  const { ENV } = await import('varlock/env');
  console.debug('Printing Varlock ENV variables in a table');
  console.table({
    host: ENV.HOST,
    port: ENV.PORT,
    env: ENV.NODE_ENV,
    ci: ENV.CI,
  });
} catch (error) {
  console.error('Failed to load environment variables:', error);
}

console.groupEnd();

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason);
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception thrown:', error);
});
