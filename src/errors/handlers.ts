import { ErrorRequestHandler, RequestHandler } from "express";
import { APIError } from "./types";

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

export default errorHandler;
