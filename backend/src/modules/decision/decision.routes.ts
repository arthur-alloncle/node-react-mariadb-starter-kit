import { Router } from "express";
import { createDecision } from "./decision.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", authenticate, createDecision);

export default router;
