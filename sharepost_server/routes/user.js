import Express from "express";
import { verifyToken, verifyUser } from "../utils/verification.js";
import { getUser } from "../controllers/user.js";
const router = Express.Router();

router.get('/get/:access_token', verifyToken, getUser)
export default router;