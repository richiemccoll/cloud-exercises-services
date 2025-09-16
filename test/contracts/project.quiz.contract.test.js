import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('Project Quiz API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /projects/:id/quizzes returns quizzes for a project', async () => {
    const projectId = 'test-project-id';
    const res = await fastify.inject({
      method: 'GET',
      url: `/projects/${projectId}/quizzes`,
    });
    expect(res.statusCode).toBe(200);
    const quizzes = res.json();
    expect(Array.isArray(quizzes)).toBe(true);
  });

  it('POST /projects/:id/quizzes/:quizId/submit submits quiz answers', async () => {
    const projectId = 'test-project-id';
    const quizId = 'test-quiz-id';
    const userId = 'test-user-id';
    const answers = [{ questionId: 'q1', answer: 'A' }];
    const res = await fastify.inject({
      method: 'POST',
      url: `/projects/${projectId}/quizzes/${quizId}/submit`,
      payload: { userId, answers },
    });
    expect(res.statusCode).toBe(200);
    const result = res.json();
    expect(result.quizId).toBe(quizId);
    expect(result.userId).toBe(userId);
    expect(Array.isArray(result.answers)).toBe(true);
  });
});
