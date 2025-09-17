import { FastifyPluginAsync } from 'fastify';

import swagger from './plugins/external/swagger.js';
import clerkAPIPlugin from './plugins/external/clerk.js';

import projectsRoutes from './routes/projects/projects.js';
import portfolioRoutes from './routes/portfolio/portfolio.js';
import quizzesRoutes from './routes/quizzes/quizzes.js';
import usersRoutes from './routes/users/users.js';
import roadmapsRoutes from './routes/roadmaps/roadmaps.js';

import config from './config.js';
import userPlugin from './plugins/user.js';
import healthCheck from './routes/health/index.js';

const buildApp: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.decorate('config', config);

  await swagger(fastify);
  await clerkAPIPlugin(fastify);
  await userPlugin(fastify);

  await fastify.register(projectsRoutes);
  await fastify.register(portfolioRoutes);
  await fastify.register(quizzesRoutes);
  await fastify.register(usersRoutes);
  await fastify.register(roadmapsRoutes);
  await fastify.register(healthCheck);
};

export default buildApp;

export { buildApp };
