export const errorHandler = (error, req, res, next) => {
    console.log("error handler");
    console.log(error)
    res.status(error.status || 500);
    res.send({ success: false, message: error.message })
}