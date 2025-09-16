import { FastifyInstance } from 'fastify';
import listProjects from './listProjects.js';
import getProjectDetail from './getProjectDetail.js';
import getLabDetail from './getLabDetail.js';

export default async function projectsRoutes(fastify: FastifyInstance) {
  listProjects(fastify);
  getProjectDetail(fastify);
  getLabDetail(fastify);

  // // POST /projects/:id/start
  // fastify.post(
  //   '/projects/:id/start',
  //   {
  //     schema: { params: ProjectParams, body: StartBody },
  //   },
  //   async (request, reply) => {
  //     const { id } = request.params as { id: string };
  //     const { userId } = request.body as { userId: string };
  //     reply.send({
  //       projectId: id,
  //       userId,
  //       status: 'started',
  //     });
  //   }
  // );

  // // GET /projects/:id/steps
  // fastify.get(
  //   '/projects/:id/steps',
  //   {
  //     schema: { params: ProjectParams },
  //   },
  //   async (request, reply) => {
  //     const { id } = request.params as { id: string };
  //     reply.send([
  //       {
  //         id: 'step1',
  //         projectId: id,
  //         order: 1,
  //         content: 'Step 1: Do something',
  //         hints: ['Hint 1'],
  //         assets: [],
  //         checklist: ['Check this'],
  //       },
  //     ]);
  //   }
  // );

  // // POST /projects/:id/steps/:stepId/checklist
  // fastify.post(
  //   '/projects/:id/steps/:stepId/checklist',
  //   {
  //     schema: { params: StepParams, body: ChecklistBody },
  //   },
  //   async (request, reply) => {
  //     const { stepId } = request.params as { stepId: string };
  //     const { userId, checked } = request.body as { userId: string; checked: boolean };
  //     reply.send({
  //       stepId,
  //       userId,
  //       checked,
  //     });
  //   }
  // );

  // // GET /projects/:id/quizzes
  // fastify.get(
  //   '/projects/:id/quizzes',
  //   {
  //     schema: { params: ProjectParams },
  //   },
  //   async (request, reply) => {
  //     const { id } = request.params as { id: string };
  //     reply.send([
  //       {
  //         id: 'quiz1',
  //         projectId: id,
  //         questions: [],
  //       },
  //     ]);
  //   }
  // );

  // // POST /projects/:id/quizzes/:quizId/submit
  // fastify.post(
  //   '/projects/:id/quizzes/:quizId/submit',
  //   {
  //     schema: { params: QuizParams, body: QuizSubmitBody },
  //   },
  //   async (request, reply) => {
  //     const { quizId } = request.params as { quizId: string };
  //     const { userId, answers } = request.body as { userId: string; answers: any[] };
  //     reply.send({
  //       quizId,
  //       userId,
  //       answers: answers || [],
  //     });
  //   }
  // );
}
