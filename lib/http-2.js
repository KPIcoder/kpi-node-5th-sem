import { Buffer } from 'node:buffer';
import process from 'node:process';
import http from 'node:http';

import { jsonParseSafe, errorResponse } from './helpers.js';

const parseOptions = {
  'text/plain': (text) => text,
  'text/html': (text) => text,
  'application/json': (json) => jsonParseSafe(json, {}),
  'application/x-www-form-urlencoded': (text) => Object.fromEntries(new URLSearchParams(text)),
};

async function parseBody(req, parser) {
  const buffers = [];
  // let rawRequest = ''
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return parser(data);
}

export function createHttpServer(routing, port = 8000) {
  const server = http
    .createServer(async (req, res) => {
      const handlerKey = req.method?.toUpperCase() + req.url;
      const handler = routing.get(handlerKey);
      if (!handler) return errorResponse(res, 'Not found');
      const contentType = req.headers['content-type']?.split(';')[0];
      const parser = parseOptions[contentType];
      let payload = {};
      if (contentType && parser) payload = await parseBody(req, parser);
      try {
        await handler(req, res, payload);
      } catch (error) {
        console.error(error);
        errorResponse(res, 'Server error');
      }
    })
    .listen(port, () => console.log('Server started on port: ', port));

  function gracefulShutdown() {
    console.log('graceful shutdown');
    server.close((error) => {
      if (error) {
        console.error(error);
        process.exit(1);
      }
    });
  }

  server.on('clientError', (err, socket) => {
    console.error(err);
    socket.end('Bad Request');
  });

  process.on('SIGINT', () => {
    gracefulShutdown();
  });
}
