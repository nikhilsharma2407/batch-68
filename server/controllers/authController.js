import { verifyToken } from "../utils/jwtUtil.js";

const authController = (req, res, next) => {
    try {
        const { token } = req.body;
        const { username } = verifyToken(token)
        if (!username) {
            const error = new Error('Invalid Session, Please login to continue!!!');
            error.status = 401;
            throw error;
        }
        // invoke the next handler
        next();
    } catch (error) {
        next(error)
    }

    // check if user is loggedin and session is valid

}

export default authController