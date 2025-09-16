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

    it('GET /project/slug returns a project', async () => {
      const res = await fastify.inject({
        method: 'GET',
        url: '/api/projects/slug',
        headers: {
          Authorization: 'Bearer valid_token',
        },
      });
      expect(res.statusCode).toBe(200);
      const data = res.json();
      expect(data.id).toBeDefined();
      expect(data.title).toBeDefined();
    });

  it.skip('POST /projects creates a project', async () => {
    const newProject = {
      title: 'Test Project',
      valueProp: 'Test Value',
      timeEffort: '1h',
      prerequisites: [],
      steps: [],
      track: 'none',
      phaseId: '',
      roadmapId: '',
      difficulty: 'easy',
      quizzes: [],
    };
    const res = await fastify.inject({
      method: 'POST',
      url: '/projects',
      payload: newProject,
    });
    expect(res.statusCode).toBe(201);
    const project = res.json();
    expect(project.title).toBe(newProject.title);
  });
});
