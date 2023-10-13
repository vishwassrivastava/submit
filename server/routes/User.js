import express from "express";
import { login, signup, getDetails } from "../controllers/User.js";
import { verifyToken } from "../verifytoken.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/getDetails", verifyToken, getDetails);

export default router;
