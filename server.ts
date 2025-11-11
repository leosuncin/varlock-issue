import http from 'node:http';

const server = http.createServer((request, response) => {
  if (request.method === 'HEAD') {
    response.writeHead(200);
    response.end();
  } else if (request.method === 'GET') {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end(`Hello, world!\n`);
  } else {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
  }
});

server.listen(
  {
    host: process.env.HOST,
    port: Number.parseInt(process.env.PORT!, 10),
  },
  () => {
    console.log(
      `Server running at http://${process.env.HOST}:${process.env.PORT}/`,
    );
  },
);
