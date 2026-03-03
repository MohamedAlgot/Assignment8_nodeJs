import { Router } from "express";
import { creatauthors } from "./authors.service.js";

const router =Router();
router.post("/collection/authors", async (req, res, next) => {
  try {
    const result = await creatauthors(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;