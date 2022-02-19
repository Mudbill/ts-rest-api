import { Router } from "express";
import { body } from "express-validator";
import { createProduct, getProducts } from "../../database/models/product";
import { asyncWrapper, validateBody } from "../../middleware";

const router = Router();

router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const products = await getProducts();
    res.send({ payload: { products } });
  })
);

router.post(
  "/",
  body("name").isString(),
  body("price").isNumeric(),
  validateBody,
  asyncWrapper(async (req, res) => {
    const { name, price } = req.body;
    const product = await createProduct({ name, price });
    res.send({
      payload: {
        product,
      },
    });
  })
);

export default router;
