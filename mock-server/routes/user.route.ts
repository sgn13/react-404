import express from "express";
import {
  postUsers,
  deleteUsers,
  getAllUsers,
  getUsersById,
  putUsers,
  patchUsers,
} from "../controllers/user.controller";
import { uploadFileToLocalStorage, parseFormdata } from "../middlewares";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUsersById);
router.post("/users", uploadFileToLocalStorage().single("profilePic"), postUsers);

// if profilePic field does not contain file, req.file will be undefined.
router.put("/users/:id", uploadFileToLocalStorage().single("profilePic"), putUsers);
router.patch("/users/:id", patchUsers);
router.delete("/users/:id", deleteUsers);

export default router;
