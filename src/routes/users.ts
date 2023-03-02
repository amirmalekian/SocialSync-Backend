import express from "express";
import { getUser } from "../controllers/user";

const router = express.Router();

router.get("/find/:userId", getUser);

export default router;
