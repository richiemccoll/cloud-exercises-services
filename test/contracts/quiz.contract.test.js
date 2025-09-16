import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import buildApp from '../../src/app';

describe.todo('Quiz API', () => {
  let fastify;
  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /quizzes returns array of quizzes', async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/quizzes',
    });
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].id).toBeDefined();
      expect(data[0].projectId).toBeDefined();
    }
  });

  it('POST /quizzes creates a quiz', async () => {
    const newQuiz = {
      projectId: 'project1',
      questions: [],
    };
    const res = await fastify.inject({
      method: 'POST',
      url: '/quizzes',
      payload: newQuiz,
    });
    expect(res.statusCode).toBe(201);
    const quiz = res.json();
    expect(quiz.projectId).toBe(newQuiz.projectId);
  });
});
