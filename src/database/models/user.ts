import { db } from "..";
import crypto from "crypto";

/**
 * Describes a user object in the database
 */
export interface User {
  type: "user";
  data: UserData;
}

/**
 * Describes the data specific to the user
 */
export interface UserData {
  username: string;
  password: string;
  salt: string;
}

/**
 * Fetch a user from the database based on credentials
 *
 * @param username
 * @param password
 * @returns User if both username and password match, else false
 */
export async function findUser(username: string, password: string) {
  const user = await db.findOne<User>({
    type: "user",
    "data.username": username,
  });
  if (!user) return false;

  const salt = user.data.salt;
  const hashedPassword = hash(`${salt}.${password}`);

  if (hashedPassword === user.data.password) {
    return user;
  }
  return false;
}

/**
 * Simple function for inserting a new user into the database. Creates
 * a basic salt to hash the password with.
 * @param username
 * @param password
 * @returns the created user
 * @throws Error if username already exists
 */
export async function createUser(username: string, password: string) {
  if (await db.findOne({ type: "user", "data.username": username })) {
    throw new Error("Username is already in use");
  }

  const salt = hash(new Date().toISOString());
  const hashedPassword = hash(`${salt}.${password}`);

  return await db.insert<User>({
    type: "user",
    data: {
      username,
      password: hashedPassword,
      salt,
    },
  });
}

/**
 * Hash a string using SHA256
 * @param source
 * @returns hex hash
 */
function hash(source: string) {
  return crypto.createHmac("sha256", source).digest("hex");
}
