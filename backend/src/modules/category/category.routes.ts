import { Router } from "express";
import { create, list } from "./category.controller";
import { authenticate } from "../../middleware/auth.middleware";

const router = Router()

router.get('/', list)
router.post('/', authenticate, create)

export default router;