import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('Project Steps API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /projects/:id/steps returns step-by-step instructions', async () => {
    const projectId = 'test-project-id';
    const res = await fastify.inject({
      method: 'GET',
      url: `/projects/${projectId}/steps`,
    });
    expect(res.statusCode).toBe(200);
    const steps = res.json();
    expect(Array.isArray(steps)).toBe(true);
    if (steps.length > 0) {
      expect(steps[0].content).toBeDefined();
      expect(Array.isArray(steps[0].hints)).toBe(true);
      expect(Array.isArray(steps[0].assets)).toBe(true);
      expect(Array.isArray(steps[0].checklist)).toBe(true);
    }
  });

  it('POST /projects/:id/steps/:stepId/checklist checks off a step', async () => {
    const projectId = 'test-project-id';
    const stepId = 'test-step-id';
    const userId = 'test-user-id';
    const res = await fastify.inject({
      method: 'POST',
      url: `/projects/${projectId}/steps/${stepId}/checklist`,
      payload: { userId, checked: true },
    });
    expect(res.statusCode).toBe(200);
    const result = res.json();
    expect(result.stepId).toBe(stepId);
    expect(result.userId).toBe(userId);
    expect(result.checked).toBe(true);
  });
});
