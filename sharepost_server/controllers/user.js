import User from '../models/user.js';
import { createError } from '../utils/createError.js';

export const getUser = async (req, res, next) => {
    const id = req.user?.id;
    try {
        const user = await User.findById(id);
        if (!user) return next(createError(404, "User not found"));

        return res.status(200).json({
            success: true,
            user: {
                id: id,
                name: user.name,
                username: user.username,
                profilePicture: user.profilePicture || "",
                email: user.email
            }
        })
    } catch (error) {
        return next(createError(error.status, error.message));
    }
}