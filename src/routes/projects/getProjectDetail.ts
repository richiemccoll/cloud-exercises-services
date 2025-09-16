import { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authenticatedHeadersSchema } from '../../shared/headers.js';
import { projectDetailParamsSchema } from './projects.schemas.js';
import { projects } from './db.js';
import { projectSchema } from '../../schemas/projects.js';

export default function getProjectDetail(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

  server.route({
    method: 'GET',
    url: '/api/projects/:id',
    schema: {
      operationId: 'getProjectDetail',
      tags: ['projects'],
      params: projectDetailParamsSchema,
      headers: authenticatedHeadersSchema,
      response: {
        200: projectSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      const project = projects.find((p) => p.id === id);

      reply.send(project);
    },
  });
}
