import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { getAuth, ClerkClient } from '@clerk/fastify';
import { FastifyInstance } from 'fastify';

import { authenticatedHeadersSchema } from '../../shared/headers.js';
import { profileSchema } from './profile.schemas.js';
import { UserStorage } from '../../plugins/userStorage.js';

export default async function getProfile(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
  const userStorage = fastify.getDecorator<UserStorage>('userStorage');

  server.route({
    method: 'GET',
    url: '/api/profile',
    schema: {
      operationId: 'getProfile',
      tags: ['profile'],
      headers: authenticatedHeadersSchema,
      response: {
        200: profileSchema,
        404: Type.Object({}),
      },
    },
    handler: async (request, reply) => {
      const { userId } = getAuth(request);
      const clerkClient = fastify.getDecorator<ClerkClient>('clerkClient');

      // If user isn't authenticated, return empty object
      if (!userId) {
        request.log.info('no user id found in request');
        return reply.status(404).send({});
      }

      const userProfile = await userStorage.get(userId);

      if (userProfile) {
        request.log.info(`user ${userId} found in storage`);
        return reply.send(userProfile);
      } else {
        request.log.info(`fetching user ${userId} from Clerk`);

        const user = userId ? await clerkClient.users.getUser(userId) : null;
        if (user) {
          const userProfile = {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress || '',
            name: user.fullName || '',
            type: 'prospect',
          };

          request.log.info(`storing new user profile in storage ${user.id}`);
          userStorage.set(user.id, userProfile);
          return reply.send(userProfile);
        }
      }
    },
  });
}
