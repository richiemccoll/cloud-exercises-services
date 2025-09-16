import Fastify from 'fastify';
import { describe, beforeAll, it, expect } from 'vitest';
import { buildApp } from '../../src/app';

describe.todo('User API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    await fastify.register(buildApp);
  });

  it('GET /users returns array of users', async () => {
    const res = await fastify.inject({
      method: 'GET',
      url: '/users',
    });
    expect(res.statusCode).toBe(200);
    const data = res.json();
    expect(Array.isArray(data)).toBe(true);
    if (data.length > 0) {
      expect(data[0].id).toBeDefined();
      expect(data[0].name).toBeDefined();
      expect(data[0].email).toBeDefined();
    }
  });

  it('POST /users creates a user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'Learner',
      progress: {},
      portfolio: [],
      badges: [],
    };
    const res = await fastify.inject({
      method: 'POST',
      url: '/users',
      payload: newUser,
    });
    expect(res.statusCode).toBe(201);
    const user = res.json();
    expect(user.name).toBe(newUser.name);
    expect(user.email).toBe(newUser.email);
  });
});
