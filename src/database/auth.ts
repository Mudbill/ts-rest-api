import jwt from "jsonwebtoken";
import { findUser } from "./models/user";

const secret = process.env.TOKEN_SECRET;
if (!secret) throw Error("No TOKEN_SECRET found in .env file");

/**
 * Generates a token if the given username and password is a match
 * in the database.
 *
 * @param username
 * @param password
 * @returns
 */
export const login = async (username: string, password: string) => {
  const user = await findUser(username, password);
  if (user) {
    return jwt.sign({ username }, secret);
  }
  return false;
};

/**
 * Check if a token is valid or not
 *
 * @param token
 * @returns
 */
export const authenticate = (token: string) => {
  return jwt.verify(token, secret);
};
