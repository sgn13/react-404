import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
  logout,
  profile,
} from "../controllers/auth.controller";
import { parseFormdata } from "../middlewares";

const router = express.Router();

router.post("/login", parseFormdata().none(), login);
router.get("/profile", profile);
router.post("/register", parseFormdata().none(), register);
router.get("/forgotPassword", parseFormdata().none(), forgotPassword);
router.post("/resetPassword", parseFormdata().none(), resetPassword);
router.delete("/logout", logout);

export default router;
