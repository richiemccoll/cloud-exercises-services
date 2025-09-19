import { StorageImplementation } from "./types.js";

export class Storage<T> {
  private implementation: StorageImplementation<T>;

  constructor(implementation: StorageImplementation<T>) {
    this.implementation = implementation;
  }

  async get(id: string): Promise<T | null> {
    return this.implementation.get(id);
  }

  async set(id: string, value: T): Promise<void> {
    return this.implementation.set(id, value);
  }

  async delete(id: string): Promise<void> {
    return this.implementation.delete(id);
  }
}
