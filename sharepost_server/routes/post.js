import Express from "express";
import { commentPost, createPost, deleteComment, deletePost, getPosts, likePost } from "../controllers/post.js";
import { verifyToken, verifyUser } from "../utils/verification.js";
const router = Express.Router();

router.get('/get/:page/:limit', getPosts);
router.post('/create/:access_token/:id', verifyToken, verifyUser, createPost);
router.delete('/deletePost/:access_token/:id', verifyToken, verifyUser, deletePost);

router.put('/like/:access_token/:id', verifyToken, verifyUser, likePost);
router.put('/comment/:access_token/:id', verifyToken, verifyUser, commentPost);
router.put('/deleteComment/:access_token/:id', verifyToken, verifyUser, deleteComment);

export default router;