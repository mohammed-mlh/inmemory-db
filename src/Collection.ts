export type RecordId = number | string;

export interface WithId {
  id: RecordId;
}

export interface Column {
  name: string;
  type: "string" | "number" | "boolean";
}

export class Collection<T extends WithId> {
  private records: T[] = [];

  constructor(
    public name: string,
    public columns: Column[]
  ) {}

  private findIndexById(id: RecordId): number {
    return this.records.findIndex(r => r.id === id);
  }

  findById(id: RecordId): T | undefined {
    const index = this.findIndexById(id);

    if (index === -1) {
      return undefined;
    }

    return this.records[index];
  }

  insert(item: T): void {
    if (this.findIndexById(item.id) !== -1) {
      throw new Error("Record with that id already exists");
    }

    this.validate(item);

    this.records.push(item);
  }

  
  delete(id: RecordId): void {
    const index = this.findIndexById(id);

    if (index === -1) {
      throw new Error("No record was found with that id");
    }

    this.records.splice(index, 1);
  }

  
  update(item: T): void {
    const index = this.findIndexById(item.id);

    if (index === -1) {
      throw new Error("No record with that id was found");
    }

    this.validate(item);

    this.records[index] = item;
  }

  
  private validate(item: T): void {
    for (const col of this.columns) {
      const value = item[col.name as keyof T];

      if (value === undefined) {
        throw new Error(`Missing column ${col.name}`);
      }

      if (typeof value !== col.type) {
        throw new Error(`Column ${col.name} should be of type ${col.type}`);
      }
    }
  }
}