import { FastifyPluginAsync } from 'fastify';

import swagger from './plugins/external/swagger.js';
import clerkAPIPlugin from './plugins/external/clerk.js';
import firestorePlugin from './plugins/external/firestore.js';

import projectsRoutes from './routes/projects/projects.js';
import profileRoutes from './routes/profile/profile.js';

import config from './config.js';
import { createUserStorage } from './plugins/userStorage.js';
import healthCheck from './routes/health/index.js';

const buildApp: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.decorate('config', config);

  await swagger(fastify);
  await clerkAPIPlugin(fastify);
  await firestorePlugin(fastify);

  createUserStorage(fastify);

  await fastify.register(projectsRoutes);
  await fastify.register(profileRoutes);
  await fastify.register(healthCheck);
};

export default buildApp;

export { buildApp };
