import { FastifyInstance } from 'fastify';
import { UserParams, UserProgressParams, CreateUserBody } from './users.schemas.js';

export default async function usersRoutes(fastify: FastifyInstance) {
  // GET /users
  fastify.get('/users', async (request, reply) => {
    reply.send([
      {
        id: 'user1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'Learner',
        progress: {},
        portfolio: [],
        badges: []
      }
    ]);
  });

  // GET /users/:id
  fastify.get('/users/:id', {
    schema: { params: UserParams },
  }, async (request, reply) => {
    const { id } = request.params as { id: string };
    reply.send({
      id,
      name: 'Test User',
      email: 'test@example.com',
      role: 'Learner',
      progress: {},
      portfolio: [],
      badges: []
    });
  });

  // POST /users
  fastify.post('/users', {
    schema: { body: CreateUserBody },
  }, async (request, reply) => {
    const user = request.body as {
      name: string;
      email: string;
      role: string;
      progress?: any;
      portfolio?: any[];
      badges?: any[];
    };
    reply.code(201).send({
      id: 'user2',
      ...user
    });
  });

  // GET /users/:userId/progress
  fastify.get('/users/:userId/progress', {
    schema: { params: UserProgressParams },
  }, async (request, reply) => {
    const { userId } = request.params as { userId: string };
    reply.send({
      projects: [{ id: 'project1', progress: 50 }],
      roadmapPhases: [{ id: 'phase1', progress: 80 }]
    });
  });
}
