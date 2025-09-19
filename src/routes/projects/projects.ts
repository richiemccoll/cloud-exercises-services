import { FastifyInstance } from 'fastify';
import listProjects from './listProjects.js';
import getProjectDetail from './getProjectDetail.js';
import getLabDetail from './getLabDetail.js';

export default async function projectsRoutes(fastify: FastifyInstance) {
  listProjects(fastify);
  getProjectDetail(fastify);
  getLabDetail(fastify);
}
