import Datastore from "nedb-promises";

export const db = Datastore.create({
  filename: "./datastore.db",
  autoload: true,
});
