import { Router } from "express";
import { body } from "express-validator";
import { createUser, User } from "../../database/models/user";
import { ValidationError } from "../../errors/types";
import { asyncWrapper, validateBody } from "../../middleware";

const router = Router();

router.post(
  "/",
  body("username").exists().isString(),
  body("password").exists().isString(),
  validateBody,
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    let user: User;

    try {
      user = await createUser(username, password);
    } catch (err) {
      throw new ValidationError(400, "User already exists");
    }

    res.status(201).send({
      payload: { user },
    });
  })
);

export default router;
