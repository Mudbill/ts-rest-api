import { ErrorRequestHandler, RequestHandler } from "express";
import { APIError } from "./types";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    // Thrown by API if request cannot be fulfilled
    return res.status(err.code).send({ error: err.name, message: err.message });
  }
  if (err instanceof SyntaxError) {
    // This is thrown if input JSON body is poorly formatted
    return res.status(400).send({ error: err.name, message: err.message });
  }
  if (err instanceof Error) {
    if (process.env.NODE_ENV === "development") {
      // Only print these details in dev environment, since it can be sensitive
      return res.status(500).send({ error: err.name, message: err.message });
    } else {
      // Otherwise just log it
      console.error(err);
    }
  }
  // Provide generic error response for uncaught errors
  return res
    .status(500)
    .send({ error: "UnknownError", message: "Internal server error" });
};

export const defaultRouteHandler: RequestHandler = (req, res, next) => {
  // Custom handler for 404 routes, since they are detected too late
  res.status(404).send({
    error: "UnknownResourceError",
    message: "The requested resource was not found.",
  });
};

export default errorHandler;
