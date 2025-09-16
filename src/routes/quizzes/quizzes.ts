import { FastifyInstance } from 'fastify';
import { QuizParams, CreateQuizBody } from './quizzes.schemas.js';

export default async function quizzesRoutes(fastify: FastifyInstance) {
  // GET /quizzes
  fastify.get('/quizzes', async (request, reply) => {
    reply.send([
      {
        id: 'quiz1',
        projectId: 'project1',
        questions: []
      }
    ]);
  });

  // POST /quizzes
  fastify.post('/quizzes', {
    schema: { body: CreateQuizBody },
  }, async (request, reply) => {
    const quiz = request.body as {
      projectId: string;
      questions: any[];
    };
    reply.code(201).send({
      id: 'quiz2',
      ...quiz
    });
  });
}
