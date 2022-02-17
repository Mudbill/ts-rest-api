import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send({ payload: { invoices: [] } });
});

export default router;
