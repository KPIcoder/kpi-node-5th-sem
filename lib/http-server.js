import { Buffer } from 'node:buffer';
import process from 'node:process';
import http from 'node:http';

import { jsonParseSafe, errorResponse, successResponse } from './helpers.js';

const method = { get: 'read', post: 'create', put: 'update', options: 'options' };

const parseOptions = {
  'text/plain': (text) => text,
  'text/html': (text) => text,
  'application/json': (json) => jsonParseSafe(json, {}),
  'application/x-www-form-urlencoded': (text) => Object.fromEntries(new URLSearchParams(text)),
};

async function parseBody(req, parser) {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  return parser(data);
}

export function createHttpServer(routing, port = 8000) {
  const server = http
    .createServer(async (req, res) => {
      const route = routing.get(req.url);
      if (!route) return errorResponse(res, 'Not found');
      const handlerType = method[req.method.toLocaleLowerCase()];
      const handler = route[handlerType];
      if (!handler) return errorResponse(res, 'Not found');
      const args = [];
      if (handlerType === 'create' || handlerType === 'update') {
        if (!req.headers['content-type']) return errorResponse(res, `Couldn't process 'Content-Type' header`);
        const contentType = req.headers['content-type'].split(';')[0];
        const bodyParser = parseOptions[contentType];
        if (!bodyParser) return errorResponse(res, `Make sure that content type is either text, json or urlencoded`);
        const body = await parseBody(req, bodyParser);
        args.push(body);
      }
      try {
        const result = await handler(...args);
        successResponse(res, result);
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

  process.on('SIGINT', async () => {
    gracefulShutdown();
  });
}
