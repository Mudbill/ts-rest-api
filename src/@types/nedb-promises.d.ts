// Fixed version of findOne which includes a possible null response

declare class Datastore extends EventEmitter {
  /**
   * Find a document that matches a query.
   *
   * It's basically the same as the original:
   * https://github.com/louischatriot/nedb#finding-documents
   */
  findOne<T>(
    query: any,
    projection?: { [p in keyof T | "_id" | "createdAt" | "updatedAt"]?: number }
  ): Promise<(T & Document) | null>;
}
