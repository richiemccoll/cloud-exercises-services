import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('Project Start API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('POST /projects/:id/start starts or resumes a project for user', async () => {
    const projectId = 'test-project-id';
    const userId = 'test-user-id';
    const res = await fastify.inject({
      method: 'POST',
      url: `/projects/${projectId}/start`,
      payload: { userId },
    });
    expect(res.statusCode).toBe(200);
    const result = res.json();
    expect(result.projectId).toBe(projectId);
    expect(result.userId).toBe(userId);
    expect(['started', 'resumed']).toContain(result.status);
  });
});
