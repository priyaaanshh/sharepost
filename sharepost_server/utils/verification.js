import jwt from "jsonwebtoken";
import { createError } from "./createError.js";

export const verifyToken = (req, res, next) => {
    const token = req.params.access_token;

    if (!token)
        return res.status(401).json({ error: "Unauthorized" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        next(createError(403, "Token is not valid"));
    }

}

export const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return next(createError(403, "Unauthorized User"));
    }
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "Unauthorized Admin"));
        }
    });
};
