import express from "express";
import userRoutes from "./user.route";
import movieRoutes from "./movie.route";
import authRoutes from "./auth.route";

const router = express.Router();

const root = "/";
const suffix = "api/v1";

router.use(root + suffix, authRoutes);
router.use(root + suffix, userRoutes);
router.use(root + suffix, movieRoutes);

export default router;
