import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('Portfolio API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /portfolio returns array of portfolio items', async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/portfolio',
    });
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].id).toBeDefined();
      expect(data[0].title).toBeDefined();
    }
  });

  it('POST /portfolio creates a portfolio item', async () => {
    const newItem = {
      userId: 'user1',
      projectId: 'project1',
      title: 'Test Portfolio',
      description: 'Test Desc',
      attachments: [],
      shareUrl: '',
      createdAt: new Date().toISOString(),
    };
    const res = await fastify.inject({
      method: 'POST',
      url: '/portfolio',
      payload: newItem,
    });
    expect(res.statusCode).toBe(201);
    const item = res.json();
    expect(item.title).toBe(newItem.title);
  });
});
