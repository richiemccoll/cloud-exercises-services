import { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export default function healthCheck(fastify: FastifyInstance) {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>();

  server.route({
    method: 'GET',
    url: '/health',
    handler: async (request, reply) => {
      reply.send({ status: 'ok' });
    },
  });
}
