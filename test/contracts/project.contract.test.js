import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

let fastify;

describe('Project API', () => {
  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /projects returns array of projects', async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/api/projects',
      headers: {
        Authorization: 'Bearer valid_token',
      },
    });
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].id).toBeDefined();
      expect(data[0].title).toBeDefined();
    }
  });
});
