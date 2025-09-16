import { FastifyInstance } from 'fastify';
import clerk from '@clerk/fastify';
import { Config } from '../../config.js';
import { createClerkClient } from '@clerk/backend';

export default async function clerkAPIPlugin(fastify: FastifyInstance) {
  const config = fastify.getDecorator<Config>('config');

  if (clerk?.clerkPlugin) {
    await fastify.register(clerk?.clerkPlugin, {
      secretKey: config.CLERK_SECRET_KEY,
      publishableKey: config.CLERK_PUBLISHABLE_KEY,
    });

    const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

    fastify.decorate('clerkClient', clerkClient);
  }
}
