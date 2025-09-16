import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import buildApp from '../../src/app';

describe.todo('Roadmap API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /roadmaps returns array of roadmaps', async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/roadmaps',
    });
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].id).toBeDefined();
      expect(data[0].title).toBeDefined();
    }
  });

  it('POST /roadmaps creates a roadmap', async () => {
    const newRoadmap = {
      title: 'Test Roadmap',
      role: 'Learner',
      phases: [],
    };
    const res = await fastify.inject({
      method: 'POST',
      url: '/roadmaps',
      payload: newRoadmap,
    });
    expect(res.statusCode).toBe(201);
    const roadmap = res.json();
    expect(roadmap.title).toBe(newRoadmap.title);
  });
});
