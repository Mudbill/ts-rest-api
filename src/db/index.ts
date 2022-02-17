import jwt from "jsonwebtoken";
import { findUser } from "./store";

const secret = process.env.TOKEN_SECRET;
if (!secret) throw Error("No TOKEN_SECRET found in .env file");

export const login = async (username: string, password: string) => {
  const user = await findUser(username, password);
  if (user) {
    return jwt.sign({ username }, secret);
  }
  return false;
};

export const authenticate = (token: string) => {
  return jwt.verify(token, secret);
};
