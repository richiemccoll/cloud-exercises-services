import fastify from 'fastify';
import closeWithGrace from 'close-with-grace';

import appService from './app.js';
import config from './config.js';

const app = fastify({
  logger: {
    level: config.LOG_LEVEL || 'trace',
  },
});

const PORT = config.PORT;
const HOST = config.API_HOST;

async function start() {
  app.register(appService);

  await app.listen({
    port: PORT,
    host: HOST,
  });

  closeWithGrace({ delay: 500 }, async function ({ err }: { err?: Error }) {
    if (err) {
      app.log.error(err);
    }
    await app.close();
  });
}

start();
