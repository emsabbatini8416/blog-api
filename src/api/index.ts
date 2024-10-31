import express from "express";
const router = express.Router();

import postRoutes from "./post";

router.use("/posts", postRoutes);

router.get("/", (req, res) => {
  res.json({
    message: "ON LIVE!!!",
  });
});

export default router;
