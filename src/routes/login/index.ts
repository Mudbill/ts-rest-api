import { Router } from "express";
import { body } from "express-validator";
import { login } from "../../db";
import { asyncWrapper, validateBody } from "../../errors/handlers";
import { ValidationError } from "../../errors/types";

const router = Router();

router.post(
  "/",
  body("username").exists().isString(),
  body("password").exists().isString(),
  validateBody,
  asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body;
    const token = await login(username, password);
    if (!token) throw new ValidationError(400, "Invalid credentials");
    res.send({
      payload: {
        token,
      },
    });
  })
);

export default router;
