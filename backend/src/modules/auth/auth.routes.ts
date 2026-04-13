import { Router } from "express";
import { login, refresh, logout, createUser } from "./auth.controller";

const router = Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/createUser", createUser);

export default router;