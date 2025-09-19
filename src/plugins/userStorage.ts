import { FastifyInstance } from 'fastify';


import { createStorage } from '../storage/index.js';
import { Storage } from '../storage/storage.js';

const allowedPaths = ['documentation', 'api/projects'];

type User = {
  id: string;
  email: string;
  name: string;
  type: string;
};

export type UserStorage = Storage<User>;

export function createUserStorage(fastify: FastifyInstance) {
  // TODO - make this configurable via env var
  const firestoreCollectionName = undefined;

  const storageImplementation = createStorage<User>(
    'userStorage',
    fastify,
    firestoreCollectionName
  );

  return storageImplementation;
}

export function getUserStorage(fastify: FastifyInstance) {
  return fastify.getDecorator<UserStorage>('userStorage');
}
