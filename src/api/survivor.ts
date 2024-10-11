import express from "express";
import {
  createSurvivor,
  getAll,
  updateSurvivor,
} from "../controllers/survivor.controller";

const router = express.Router();

router.get("/", getAll);
router.post("/", createSurvivor);
router.patch("/:id", updateSurvivor);

export default router;
