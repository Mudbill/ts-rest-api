import {
  ErrorRequestHandler,
  RequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { ParamsDictionary, Query } from "express-serve-static-core";
import { validationResult } from "express-validator";
import { APIError, ValidationError } from "./types";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.code).send({ error: err.name, message: err.message });
  }
  if (err instanceof SyntaxError) {
    return res.status(400).send({ error: err.name, message: err.message });
  }
  if (err instanceof Error) {
    return res.status(500).send({ error: err.name, message: err.message });
  }
  return res.status(500).send({ error: "UnknownError" });
};

export const defaultRouteHandler: RequestHandler = (req, res, next) => {
  res.status(404).send({
    error: "UnknownResourceError",
    message: "The requested resource was not found.",
  });
};

export const validateBody: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const [error] = errors.array();
    throw new ValidationError(400, `${error.msg} '${error.param}'`);
  }
  next();
};

export function asyncWrapper(
  cb: (
    req: Request<ParamsDictionary, any, any, Query, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ) => Promise<void>
): RequestHandler {
  return (req, res, next) => {
    cb(req, res, next).catch(next);
  };
}

export default errorHandler;
