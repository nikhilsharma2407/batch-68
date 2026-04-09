export const errorHandler = (error, req, res, next) => {
    console.log("error handler");
    console.log(error)
    if (error.name === "MongoServerError" || error.name === "ValidationError") {
        error.status = 403;
        if (error.code === 11000) {
            error.message = 'username already exists'
        }
    }
    res.status(error.status || 500);
    res.send({ success: false, message: error.message })
}