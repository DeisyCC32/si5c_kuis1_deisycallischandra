const plantsModel = require("../models/plantsModel");

function validatePlant(data) {
    const {
        namaTanaman,
        jenis,
        lokasiBedeng,
        tanggalTanam,
        sudahPanen
    } = data;

    if (!namaTanaman) {
        return "Field namaTanaman wajib diisi";
    }

    if (!jenis) {
        return "Field jenis wajib diisi";
    }

    if (!["sayur", "buah", "hias"].includes(jenis)) {
        return "Field jenis harus berupa sayur, buah, atau hias";
    }

    if (!lokasiBedeng) {
        return "Field lokasiBedeng wajib diisi";
    }

    if (!tanggalTanam) {
        return "Field tanggalTanam wajib diisi";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(tanggalTanam)) {
        return "Field tanggalTanam harus menggunakan format YYYY-MM-DD";
    }

    if (
        sudahPanen !== undefined &&
        typeof sudahPanen !== "boolean"
    ) {
        return "Field sudahPanen harus bernilai true atau false";
    }

    return null;
}

function getAllPlants(req, res, next) {
    try {
        const { jenis } = req.query;
        const plants = plantsModel.getAllPlants(jenis);

        res.status(200).json(plants);
    } catch (error) {
        next(error);
    }
}

function getPlantById(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const plant = plantsModel.getPlantById(id);

        if (!plant) {
            const error = new Error(
                `Data dengan id ${id} tidak ditemukan`
            );

            error.status = 404;
            throw error;
        }

        res.status(200).json(plant);
    } catch (error) {
        next(error);
    }
}

function createPlant(req, res, next) {
    try {
        const validationError = validatePlant(req.body);

        if (validationError) {
            const error = new Error(validationError);
            error.status = 400;
            throw error;
        }

        const newPlant = plantsModel.createPlant(req.body);

        res.status(201).json({
            status: "success",
            message: "Data tanaman berhasil ditambahkan",
            data: newPlant
        });
    } catch (error) {
        next(error);
    }
}

function updatePlant(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const existingPlant = plantsModel.getPlantById(id);

        if (!existingPlant) {
            const error = new Error(
                `Data dengan id ${id} tidak ditemukan`
            );

            error.status = 404;
            throw error;
        }

        const validationError = validatePlant(req.body);

        if (validationError) {
            const error = new Error(validationError);
            error.status = 400;
            throw error;
        }

        const updatedPlant = plantsModel.updatePlant(
            id,
            req.body
        );

        res.status(200).json({
            status: "success",
            message: `Data tanaman dengan id ${id} berhasil diubah`,
            data: updatedPlant
        });
    } catch (error) {
        next(error);
    }
}

function deletePlant(req, res, next) {
    try {
        const id = parseInt(req.params.id);

        const deleted = plantsModel.deletePlant(id);

        if (!deleted) {
            const error = new Error(
                `Data dengan id ${id} tidak ditemukan`
            );

            error.status = 404;
            throw error;
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
};