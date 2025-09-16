import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('Project Details API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /projects/:id returns project details', async () => {
    const projectId = 'test-project-id';
    const res = await fastify.inject({
      method: 'GET',
      url: `/projects/${projectId}`,
    });
    expect(res.statusCode).toBe(200);
    const project = res.json();
    expect(project.title).toBeDefined();
    expect(project.valueProp).toBeDefined();
    expect(project.timeEffort).toBeDefined();
    expect(Array.isArray(project.prerequisites)).toBe(true);
  });
});
