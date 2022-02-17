import Datastore from "nedb-promises";

export const db = Datastore.create({
  filename: "./datastore.db",
  autoload: true,
});

export function findUser(username: string, password: string) {
  return db.findOne({ username, password });
}
