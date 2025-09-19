import { StorageImplementation } from './types.js';

export class StorageImplementationMemory<T> implements StorageImplementation<T> {
  private storage: Map<string, T> = new Map();

  async get(id: string): Promise<T | null> {
    return this.storage.get(id) || null;
  }

  async set(id: string, value: T): Promise<void> {
    this.storage.set(id, value);
  }

  async delete(id: string): Promise<void> {
    this.storage.delete(id);
  }
}
