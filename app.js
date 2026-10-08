require("dotenv").config();

const express = require("express");
const cors = require("cors");

const plantsRoutes = require("./routes/plantsRoutes");
const logger = require("./middlewares/logger");
const {
    notFound,
    errorHandler
} = require("./middlewares/errorHandler");

const app = express();

app.use(cors());

app.use(logger);

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        nama: "Deisy Callisca Chandra",
        nim: "2428240054",
        kelas: "SI5B",
        nomorTopik: 10,
        topik: "Kebun - Tanaman",
        endpoints: [
            "GET /plants",
            "GET /plants/:id",
            "GET /plants?jenis=sayur",
            "POST /plants",
            "PUT /plants/:id",
            "DELETE /plants/:id"
        ]
    });
});

app.use(plantsRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;