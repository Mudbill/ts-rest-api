import { NextFunction, Request, RequestHandler, Response } from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { validationResult } from "express-validator";
import { authenticate } from "../database";
import { AuthorizationError, ValidationError } from "../errors/types";

type DefaultRequest = Request<
  ParamsDictionary,
  any,
  any,
  Query,
  Record<string, any>
>;
type DefaultResponse = Response<any, Record<string, any>>;
type Callback = (
  req: DefaultRequest,
  res: DefaultResponse,
  next: NextFunction
) => Promise<void>;
type AsyncRequestHandler = (callback: Callback) => RequestHandler;

/**
 * This middleware handler ensures all handlers after it are authorized
 * with a valid JWT provided in the x-api-token header.
 * @param req request
 * @param res response
 * @param next next handler
 */
export const authorizationHandler: RequestHandler = (req, res, next) => {
  let token = req.headers["x-api-token"];
  if (Array.isArray(token)) token = token[0];

  if (!token) {
    throw new AuthorizationError(400, "Missing token");
  }

  const auth = authenticate(token);

  if (!auth) {
    throw new AuthorizationError(403, "Invalid token");
  }

  next();
};

/**
 * This handler allows the use of an async/await handler as
 * the callback argument, and passes errors to the error handler
 * @param callback the request handler
 */
export const asyncWrapper: AsyncRequestHandler =
  (callback) => (req, res, next) =>
    callback(req, res, next).catch(next);

/**
 * Middleware for performing express-validator validation using
 * preceding rules. Passes errors to the error handler.
 */
export const validateBody: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [error] = errors.array();
    throw new ValidationError(400, `${error.msg} '${error.param}'`);
  }
  next();
};
