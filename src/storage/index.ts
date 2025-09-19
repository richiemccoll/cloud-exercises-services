import { Firestore } from '@google-cloud/firestore';
import { FastifyInstance } from 'fastify';
import { Storage } from './storage.js';
import { StorageImplementationMemory } from './storageMemory.js';
import { StorageImplementationFirestore } from './storageFirestore.js';

export function createStorageImplementation<T>(
  firestore: Firestore,
  firestoreCollectionName?: string
) {
  return firestoreCollectionName
    ? new StorageImplementationFirestore<T>(firestore, firestoreCollectionName)
    : new StorageImplementationMemory<T>();
}

export function createStorage<T>(
  name: string,
  fastify: FastifyInstance,
  firestoreCollectionName?: string
) {
  const storageImplementation = createStorageImplementation<T>(
    fastify.getDecorator<Firestore>('firestore'),
    firestoreCollectionName
  );

  fastify.decorate(name, new Storage(storageImplementation));

  return storageImplementation;
}
