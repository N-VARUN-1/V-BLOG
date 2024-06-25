import express from "express";
import {verifyUser} from '../utils/verifyUser.js';
import { create, deletePosts, getPosts, updatePost } from "../controllers/post.controller.js";

const router = express.Router();

router.post('/create', verifyUser, create);
router.get('/getPosts', getPosts);
router.delete('/deletePosts/:postId/:userId', verifyUser, deletePosts);
router.put('/updatePosts/:postId/:userId', verifyUser, updatePost);

export default router;