import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

/**
 * This plugins adds public API swagger documentation
 */
export default fp(async (fastify) => {
  await fastify.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'cloud-exercises-api public API',
        description: 'cloud-exercises-api public API swagger docs',
        version: '0.1.0',
      },
    },
    swagger: {
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  await fastify.register(swaggerUI, {
    routePrefix: '/documentation',
  });
});
