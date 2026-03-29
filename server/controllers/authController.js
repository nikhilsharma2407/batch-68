const authController = (req, res, next) => {
    try {
        const isSessionValid = Math.floor(Math.random() * 10) % 2 === 0;
        console.log("🚀 ~ authController ~ isSessionValid:", isSessionValid)
        if (!isSessionValid) {
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