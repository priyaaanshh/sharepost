import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    images: [],
    description: {
        type: String,
    },
    likes: [],
    likeCount: {
        type: Number,
        default: 0,
    },
    comments: [{
        user: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            required: true
        }
    }],
    commentCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model('Post', PostSchema, 'PostCollection');