import express from "express";
import { addComment, getComments } from "../controllers/comment";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);

export default router;
