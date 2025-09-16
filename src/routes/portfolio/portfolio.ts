import { FastifyInstance } from 'fastify';
import { CreatePortfolioItemBody } from './portfolio.schemas.js';

export default async function portfolioRoutes(fastify: FastifyInstance) {
  // GET /portfolio
  fastify.get('/portfolio', async (request, reply) => {
    reply.send([
      {
        id: 'portfolio1',
        userId: 'user1',
        projectId: 'project1',
        title: 'Test Portfolio',
        description: 'Test Desc',
        attachments: [],
        shareUrl: 'https://portfolio.example.com/user1',
        createdAt: new Date().toISOString()
      }
    ]);
  });

  // POST /portfolio
  fastify.post('/portfolio', {
    schema: { body: CreatePortfolioItemBody },
  }, async (request, reply) => {
    const item = request.body as {
      userId: string;
      projectId: string;
      title: string;
      description: string;
      attachments: any[];
      shareUrl: string;
      createdAt: string;
    };
    reply.code(201).send({
      id: 'portfolio2',
      ...item
    });
  });
}
