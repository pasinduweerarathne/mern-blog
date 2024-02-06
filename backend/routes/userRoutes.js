import { Router } from "express";
import {
  loginUser,
  registerUser,
  updateProfile,
  updateProfilePicture,
  userProfile,
} from "../controllers/userControllers.js";
import { authProtect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authProtect, userProfile);
router.put("/profile", authProtect, updateProfile);
router.put("/update-profile-picture", authProtect, updateProfilePicture);

export default router;
