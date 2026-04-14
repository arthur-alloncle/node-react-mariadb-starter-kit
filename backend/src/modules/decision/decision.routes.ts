import { Router } from "express";
import { create, list } from "./decision.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post("/create", authenticate, create);
router.get('/list', authenticate, list)
export default router;
