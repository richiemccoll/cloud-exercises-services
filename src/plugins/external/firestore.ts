import { FastifyInstance } from 'fastify';
import { Config } from '../../config.js';
import { Firestore } from '@google-cloud/firestore';

export default async function firestorePlugin(fastify: FastifyInstance) {
  const config = fastify.getDecorator<Config>('config');

  fastify.decorate(
    'firestore',
    new Firestore({
      projectId: config.GCP_PROJECT_ID,
    })
  );
}
