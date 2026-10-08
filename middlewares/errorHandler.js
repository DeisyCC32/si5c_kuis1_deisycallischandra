function notFound(req, res, next) {
    const error = new Error(
        `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan`
    );

    error.status = 404;

    next(error);
}

function errorHandler(error, req, res, next) {
    let status = error.status || 500;
    let message = error.message || "Terjadi kesalahan pada server";

    if (
        error instanceof SyntaxError &&
        error.status === 400 &&
        error.type === "entity.parse.failed"
    ) {
        status = 400;
        message = "Format JSON tidak valid";
    }

    res.status(status).json({
        status: "error",
        message,
        data: null
    });
}

module.exports = {
    notFound,
    errorHandler
};