function cekApiKey(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
        const error = new Error("API key wajib disertakan");
        error.status = 401;

        return next(error);
    }

    if (apiKey !== process.env.API_KEY) {
        const error = new Error("API key tidak valid");
        error.status = 401;

        return next(error);
    }

    next();
}

module.exports = cekApiKey;