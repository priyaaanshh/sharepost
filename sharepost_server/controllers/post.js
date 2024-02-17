import Post from "../models/post.js";
import User from "../models/user.js";
import { createError } from "../utils/createError.js";


export const getPosts = async (req, res, next) => {
    const { page, limit } = req.params;
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        return res.status(200).json({ posts });
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}


export const createPost = async (req, res, next) => {
    const { description, images, ...otherDetails } = req.body;
    const id = req.user?.id;
    if (images === undefined || images.length === 0) {
        return next(createError(400, "Images are required"));
    }
    try {
        const user = await User.findById(id);
        if (!user) return next(createError(404, "User not found"));
        const post = new Post({ user: id, username: user.username, profilePicture: user.profilePicture, ...req.body });
        await post.save();
        return res.status(201).json({ success: true, message: "Posted Successfully", post: post });
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}

export const likePost = async (req, res, next) => {
    const { id } = req.body;
    const user = req.user;
    if (!id) {
        return next(createError(400, "Post Id not found"));
    }
    try {
        const post = await Post.findById(id);
        if (!post) return next(createError(404, "Post not found"));

        // Check if the user has already liked the post
        const userIndex = post.likes.findIndex(id => id === user.id);
        if (userIndex !== -1) {
            // If the user has already liked the post, remove the user ID from the likes array and decrease the like count
            post.likes.splice(userIndex, 1);
            post.likeCount -= 1;
        } else {
            // If the user hasn't liked the post, add the user ID to the likes array and increase the like count
            post.likes.push(user.id);
            post.likeCount += 1;
        }

        await post.save();
        res.status(200).json({ success: true, message: "Likes updated successfully", likesCount: post.likeCount });
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}


export const commentPost = async (req, res, next) => {
    const { id, comment } = req.body;
    const user = req.user;
    if (!id || !comment) {
        return next(createError(400, "Insufficient Data to comment"));
    }
    const commentData = {
        user: user.id,
        comment: comment,
        time: new Date()
    };
    try {
        const post = await Post.findById(id);
        if (!post) return next(createError(404, "Post not found"));
        post.comments.push(commentData);

        await post.save();

        return res.status(200).json({ success: true, comment: commentData })
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}

export const deletePost = async (req, res, next) => {
    const { id } = req.body;
    const user = req.user;
    try {
        const post = await Post.findById(id);
        if (!post) return next(createError(404, "Post not found"));

        if (post.user !== user.id) return next(createError(403, "Unauthorized"));

        await Post.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Post Deleted" });
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}


export const deleteComment = async (req, res, next) => {
    const { post_id, comment_id } = req.body;
    const user = req.user;
    if (!post_id || !comment_id) {
        return next(createError(400, "Insufficient Data to delete comment"))
    }
    try {
        const post = await Post.findById(post_id);
        if (!post) {
            return next(createError(404, "Post not found"));
        }
        // Find the index of the comment to be deleted
        const commentIndex = post.comments.findIndex(comment => comment._id.toString() === comment_id);
        if (commentIndex === -1) {
            return next(createError(404, "Comment not found"));
        }

        if (post.comments[commentIndex].user !== user.id) {
            return next(createError(403, "Unauthorized"));
        }

        post.comments.splice(commentIndex, 1);

        await post.save();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}