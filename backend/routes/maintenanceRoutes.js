const express = require("express");
const Maintenance = require("../models/Maintenance");

const router = express.Router();

//POST maintenance

router.post("/", async (req, res) => {
    try {
        const {
            maintenanceType,
            date,
            kilometers,
            cost,
            notes,
            vehicleId,
        } = req.body;

        if (!maintenanceType || !date || !kilometers || !vehicleId) {
            return res.status(400).json({
                message: "Tipo, fecha, kilómetros y vehículo son obligatorios",
            });
        }

        const maintenance = await Maintenance.create({
            maintenanceType,
            date,
            kilometers,
            cost,
            notes,
            VehicleId: vehicleId,
        });

        res.status(201).json({
            message: "Mantenimiento creado correctamente",
            maintenance,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al crear mantenimiento",
        });
    }
});

// GET maintenances x vehículo

router.get("/vehicle/:vehicleId", async (req, res) => {

    try {

        const { vehicleId } = req.params;

        const maintenances = await Maintenance.findAll({

            where: {
                VehicleId: vehicleId
            },

            order: [["date", "DESC"]]

        });

        res.status(200).json(maintenances);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error obteniendo mantenimientos"
        });

    }

});

module.exports = router;