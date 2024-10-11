import express from "express";
import { getReport } from "../controllers/report.controller";
import { NotFoundError } from "../errors";
import { ErrorCode } from "../errors/custom.errors";

const router = express.Router();

router.get("/", getReport);

export default router;
