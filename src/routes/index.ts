import { Router } from "express";
import { authorizationHandler } from "../middleware";
import products from "./products";
import login from "./login";
import users from "./users";

const router = Router();

// Public routes
router.use("/login", login);
router.use("/users", users);

// Authenticate all other requests
router.all("*", authorizationHandler);

// Private routes requiring valid token
router.use("/products", products);

export default router;
