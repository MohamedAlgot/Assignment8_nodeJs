import { Router } from "express";
import { creatLog } from "./log.service.js";
const router = Router();

router.post("/logs", async (req, res, next) => {
  try {
    const log = await creatLog(req.body);
    if (!log) throw new Error("fail created log",{cause:404});
    res
      .status(200)
      .json({ message: "created log successfully", data: { log } });
  } catch (error) {
    res.status(error.cause||500).json({message:error.message});
  }
});
export default router;
