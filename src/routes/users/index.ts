import { Router } from "express";
import { body } from "express-validator";
import { createUser } from "../../database/store";
import { APIError } from "../../errors/types";
import { asyncWrapper, validateBody } from "../../middleware";

const router = Router();

router.post(
  "/",
  body("username").exists().isString(),
  body("password").exists().isString(),
  validateBody,
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    if (!user) throw new APIError(500, "Unknown error");
    res.status(201).send({
      payload: { user },
    });
  })
);

export default router;
