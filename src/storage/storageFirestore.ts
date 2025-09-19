import { StorageImplementation } from './types.js';

export class StorageImplementationFirestore<T> implements StorageImplementation<T> {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(
    firestore: FirebaseFirestore.Firestore,
    collectionName: string
  ) {
    this.collection = firestore.collection(collectionName);
  }

  async get(id: string): Promise<T | null> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? (doc.data() as T) : null;
  }

  async set(id: string, value: T): Promise<void> {
    await this.collection.doc(id).set(value);
  }

  async delete(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}   