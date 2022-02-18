import { Router } from "express";
import { authorizationHandler } from "../middleware";
import invoices from "./invoices";
import login from "./login";
import users from "./users";

const router = Router();

// Public routes
router.use("/login", login);
router.use("/users", users);

// Authenticate all other requests
router.all("*", authorizationHandler);

// Private routes requiring valid token
router.use("/invoices", invoices);

export default router;
