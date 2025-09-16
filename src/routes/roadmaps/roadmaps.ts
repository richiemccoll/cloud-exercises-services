import { FastifyInstance } from 'fastify';
import { RoadmapParams, CreateRoadmapBody } from './roadmaps.schemas.js';

export default async function roadmapsRoutes(fastify: FastifyInstance) {
  // GET /roadmaps
  fastify.get('/roadmaps', async (request, reply) => {
    reply.send([
      {
        id: 'roadmap1',
        title: 'Cloud Engineer Roadmap',
        role: 'Learner',
        phases: []
      }
    ]);
  });

  // POST /roadmaps
  fastify.post('/roadmaps', {
    schema: { body: CreateRoadmapBody },
  }, async (request, reply) => {
    const roadmap = request.body as {
      title: string;
      role: string;
      phases: any[];
    };
    reply.code(201).send({
      id: 'roadmap2',
      ...roadmap
    });
  });
}
