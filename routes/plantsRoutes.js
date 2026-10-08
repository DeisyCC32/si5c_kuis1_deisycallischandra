const express = require("express");

const router = express.Router();

const plantsController = require("../controllers/plantsController");
const cekApiKey = require("../middlewares/cekApiKey");

router.get(
    "/plants",
    plantsController.getAllPlants
);

router.get(
    "/plants/:id",
    plantsController.getPlantById
);

router.post(
    "/plants",
    cekApiKey,
    plantsController.createPlant
);

router.put(
    "/plants/:id",
    cekApiKey,
    plantsController.updatePlant
);

router.delete(
    "/plants/:id",
    cekApiKey,
    plantsController.deletePlant
);

module.exports = router;