import { Collection, type Column } from "./Collection.js";
import type { WithId } from "./Collection.js";

export class Database {
  private collections: Map<string, Collection<any>> = new Map();

  constructor(public name: string) {}

  // Create a new collection
  createCollection<T extends WithId>(
    name: string,
    columns: Column[]
  ): Collection<T> {
    if (this.collections.has(name)) {
      throw new Error("Collection with that name already exists");
    }

    const collection = new Collection<T>(name, columns);

    this.collections.set(name, collection);

    return collection;
  }

  // Get existing collection
  getCollection<T extends WithId>(name: string): Collection<T> {
    const collection = this.collections.get(name);

    if (!collection) {
      throw new Error("Collection not found");
    }

    return collection as Collection<T>;
  }
}