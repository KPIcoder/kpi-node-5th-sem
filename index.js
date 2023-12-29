import { router } from './lib/file-router.js';
import { createHttpServer } from './lib/http-server.js';

const PORT = 8000;

createHttpServer(router, PORT);
