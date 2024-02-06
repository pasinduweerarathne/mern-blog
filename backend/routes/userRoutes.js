import { Router } from "express";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/userControllers.js";
import { authProtect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authProtect, userProfile);

export default router;
