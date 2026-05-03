import { verifyToken } from "../utils/jwtUtil.js";

const authController = (req, res, next) => {
    try {
        let { authToken } = req.cookies;
        const { username } = verifyToken(authToken);
        if (!username) {
            const error = new Error('Invalid Session, Please login to continue!!!');
            error.status = 401;
            throw error;
        }
        // res.local is a placeholder to store data which can be shared among middlewares
        res.locals.username = username
        // invoke the next handler
        next();
    } catch (error) {
        next(error)
    }

    // check if user is loggedin and session is valid

}

export default authController