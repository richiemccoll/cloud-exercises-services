import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { getAuth, ClerkClient } from '@clerk/fastify';

const allowedPaths = ['documentation', 'api/projects'];

export default async function userPlugin(fastify: FastifyInstance) {
  fastify.decorateRequest('user', null);

  async function getUser(request: FastifyRequest, reply: FastifyReply) {
    if (allowedPaths.some((path) => request.url.startsWith(`/${path}`))) {
      return;
    }

    const { userId } = getAuth(request);
    const clerkClient = fastify.getDecorator<ClerkClient>('clerkClient');

    // If user isn't authenticated, return a 401 error
    if (!userId) {
      return reply.code(401).send({ error: 'User not authenticated' });
    }

    const user = userId ? await clerkClient.users.getUser(userId) : null;

    request.setDecorator('user', {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress || '',
      name: user.fullName || '',
      role: 'learner',
    });
  }

  fastify.addHook('preHandler', getUser);
}
