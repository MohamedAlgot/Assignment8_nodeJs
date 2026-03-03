import { Router } from "express";
import { cappedCollection } from "./collection.service.js";

const router=Router();

router.post("/collection/:name/capped", async (req, res, next) => {
  try {
    const {name}=req.params;
    const collections = await cappedCollection(name);
    if(collections.length!=0)throw new Error("collection already exists",{cause:409});
    res.status(200).json({ success: true, ok:1,data:{collections}});
  } catch (error) {
    res.status(error.cause||500).json({ message: error.message });
  }
});

export default router;