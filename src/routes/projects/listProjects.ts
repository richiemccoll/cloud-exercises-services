import { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authenticatedHeadersSchema } from '../../shared/headers.js';
import { listProjectsResponseSchema } from './projects.schemas.js';
import { projects } from './db.js';

export default function listProjects(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

  server.route({
    method: 'GET',
    url: '/api/projects',
    schema: {
      operationId: 'listProjects',
      tags: ['projects'],
      headers: authenticatedHeadersSchema,
      response: {
        200: listProjectsResponseSchema,
      },
    },
    handler: async (request, reply) => {
      reply.send(projects);
    },
  });
}
