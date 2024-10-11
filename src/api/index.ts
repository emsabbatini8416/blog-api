import express from "express";
const router = express.Router();

import survivorRoutes from "./survivor";
import itemRoutes from "./item";
import reportRoutes from "./report";

router.use("/survivor", survivorRoutes);
router.use("/item", itemRoutes);
router.use("/report", reportRoutes);

router.get("/", (req, res) => {
  res.json({
    message: "ON LIVE!!!",
  });
});

export default router;
