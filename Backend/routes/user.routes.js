import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { authenticator } from  "../middleware/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//protected routes
router.get("/profile", authenticator, (req, res) => {
  res.json({ message: `Welcome ${req.user.email}` });
});

export default router;
