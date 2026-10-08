let plants = [
    {
        id: 1,
        namaTanaman: "Kangkung",
        jenis: "sayur",
        lokasiBedeng: "Bedeng 3",
        tanggalTanam: "2026-09-01",
        sudahPanen: false
    },
    {
        id: 2,
        namaTanaman: "Cabai Merah",
        jenis: "sayur",
        lokasiBedeng: "Bedeng 1",
        tanggalTanam: "2026-08-20",
        sudahPanen: true
    },
    {
        id: 3,
        namaTanaman: "Mangga Harum Manis",
        jenis: "buah",
        lokasiBedeng: "Bedeng 5",
        tanggalTanam: "2026-07-15",
        sudahPanen: false
    }
];

let nextId = 4;

function getAllPlants(jenis) {
    if (jenis) {
        return plants.filter((plant) => plant.jenis === jenis);
    }

    return plants;
}

function getPlantById(id) {
    return plants.find((plant) => plant.id === id);
}

function createPlant(data) {
    const newPlant = {
        id: nextId++,
        namaTanaman: data.namaTanaman,
        jenis: data.jenis,
        lokasiBedeng: data.lokasiBedeng,
        tanggalTanam: data.tanggalTanam,
        sudahPanen: data.sudahPanen ?? false
    };

    plants.push(newPlant);

    return newPlant;
}

function updatePlant(id, data) {
    const index = plants.findIndex((plant) => plant.id === id);

    if (index === -1) {
        return null;
    }

    const updatedPlant = {
        id,
        namaTanaman: data.namaTanaman,
        jenis: data.jenis,
        lokasiBedeng: data.lokasiBedeng,
        tanggalTanam: data.tanggalTanam,
        sudahPanen: data.sudahPanen ?? false
    };

    plants[index] = updatedPlant;

    return updatedPlant;
}

function deletePlant(id) {
    const index = plants.findIndex((plant) => plant.id === id);

    if (index === -1) {
        return false;
    }

    plants.splice(index, 1);

    return true;
}

module.exports = {
    getAllPlants,
    getPlantById,
    createPlant,
    updatePlant,
    deletePlant
};