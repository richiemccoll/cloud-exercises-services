import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import buildApp from '../../src/app';

describe.todo('User Progress API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /users/:userId/progress returns progress for projects and roadmap phases', async () => {
    const userId = 'test-user-id';
    const res = await fastify.inject({
      method: 'GET',
      url: `/users/${userId}/progress`,
    });
    expect(res.statusCode).toBe(200);
    const progress = res.json();
    expect(progress.projects).toBeDefined();
    expect(progress.roadmapPhases).toBeDefined();
  });
});
