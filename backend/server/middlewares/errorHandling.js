let notFoundPage = (req, res, next) => {
    let err = new Error(`Page Not Found For ${req.url}`);
    res.locals.statusCode = 404;

    next(err); 
};

let errorHandling = (err, req, res, next) => {
    console.log(err.message);
    res.status(500).json({
        statusCode: res.locals.statusCode || 500,
        message: err.message,
    });
};

module.exports = {
    errorHandling,
    notFoundPage,
};
