import express from "express";
import authRoutes from "./auth";
import postRoutes from "./posts";
import commentRoutes from "./comments";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

export default router;
