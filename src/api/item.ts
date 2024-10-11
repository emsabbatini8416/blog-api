import express from "express";
import { getAll } from "../controllers/item.controller";

const router = express.Router();

router.get("/", getAll);

export default router;
