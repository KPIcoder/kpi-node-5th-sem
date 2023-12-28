// import { router } from './lib/file-router.js';
import { router as declarativeRouter } from './lib/declarative-router.js';
import { createHttpServer } from './lib/http-2.js';

import { getController, postController } from './routes/example.controller.js';

const PORT = 8000;

declarativeRouter.addRoute('/example', 'GET', getController);
declarativeRouter.addRoute('/example', 'POST', postController);

createHttpServer(declarativeRouter.routes, PORT);
