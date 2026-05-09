export const errorHandler = (error, req, res, next) => {
    console.log("error handler");
    console.log(error)
    
    if (error.name === 'TokenExpiredError'){
        error.status = 401;
        error.message = 'Session Expired, please login again to continue'
    }
    if (error.name === "MongoServerError" || error.name === "ValidationError") {
        error.status = 403;
        if (error.code === 11000) {
            error.message = 'username already exists'
        }
    }
    
    // Handle SMTP/Email errors
    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
        error.status = 503;
        error.message = 'Email service temporarily unavailable. Please try again in a moment.';
    }
    
    // Default to 500 if no status is set
    res.status(error.status || 500);
    res.send({ success: false, message: error.message })
}