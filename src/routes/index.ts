import { Router } from "express";
import { authenticate } from "../db";
import { AuthorizationError } from "../errors/types";
import invoices from "./invoices";
import login from "./login";

const router = Router();

// Allowed anonymous routes

router.use("/login", login);

// Authenticate all other requests

router.all("*", (req, res, next) => {
  const token = req.headers["x-api-token"];

  if (!token) {
    throw new AuthorizationError(400, "Missing token");
  }

  const auth = authenticate(token.toString());
  if (!auth) {
    throw new AuthorizationError(403, "Invalid token");
  }

  next();
});

// Private routes requiring valid token

router.use("/invoices", invoices);

export default router;
