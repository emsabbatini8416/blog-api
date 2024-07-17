import express from "express";
const router = express.Router();

import itemRoutes from "./item"

router.use("/item", itemRoutes)

router.get("/", (req, res) => {
  res.json({
    message: "ON LIVE!!!",
  });
});
export default router;