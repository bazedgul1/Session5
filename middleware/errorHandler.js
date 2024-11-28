

const errorHandle = (err,req,res,next) => {
    const statusCode = err.statusCode || 5000;

    res.status(statusCode).json({
        status: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorHandle;