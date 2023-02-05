import express from "express";
import { directories } from "../constants/directories";
import {
  postUsers,
  deleteUsers,
  getAllUsers,
  getUsersById,
  putUsers,
  patchUsers,
  postProfileVideo,
} from "../controllers/user.controller";
import { uploadFileToLocalStorage, parseFormdata } from "../middlewares";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUsersById);
router.post(
  "/users",
  uploadFileToLocalStorage(directories.PROFILE_PICTURE_UPLOAD_DIR).single("profilePic"),
  postUsers,
);

router.post(
  "/users/:id/upload/video",
  uploadFileToLocalStorage(directories.PROFILE_VIDEOS_UPLOAD_DIR).single("profileVideo"),
  postProfileVideo,
);

// if profilePic field does not contain file, req.file will be undefined.
router.put(
  "/users/:id",
  uploadFileToLocalStorage(directories.PROFILE_PICTURE_UPLOAD_DIR).single("profilePic"),
  putUsers,
);
router.patch("/users/:id", patchUsers);
router.delete("/users/:id", deleteUsers);

export default router;
