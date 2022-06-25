import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);
router.delete("/logout", logout);

export default router;
