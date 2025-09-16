import { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { authenticatedHeadersSchema } from '../../shared/headers.js';
import { labDetailParamsSchema } from './projects.schemas.js';
import { projects } from './db.js';
import { labSchema } from '../../schemas/lab.js';

export default function getLabDetail(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

  server.route({
    method: 'GET',
    url: '/api/projects/:id/labs/:labId',
    schema: {
      operationId: 'getLabDetail',
      tags: ['projects', 'labs'],
      params: labDetailParamsSchema,
      headers: authenticatedHeadersSchema,
      response: {
        200: labSchema,
      },
    },
    handler: async (request, reply) => {
      const { id, labId } = request.params;
      const project = projects.find((p) => p.id === id);
      const lab = project?.labs.find((l) => l.id === labId);
      reply.send(lab);
    },
  });
}
