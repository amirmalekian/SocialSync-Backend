import express from "express";
import authRoutes from "./auth";
import postRoutes from "./posts";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export default router;
