const express = require("express");

const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");
const Reminder = require("../models/Reminder");

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
            reminderId
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
        const vehicle = await Vehicle.findByPk(vehicleId);

        if (vehicle && Number(kilometers) > Number(vehicle.mileage)) {      //evitar que un mantenimiento antiguo baje el kilometraje actual del vehículo.
            await vehicle.update({
                mileage: Number(kilometers),
            });
        }
        //
        if (reminderId) {

            const reminder = await Reminder.findByPk(reminderId);

            if (reminder && reminder.kilometersInterval) {

                await reminder.update({
                    nextReminderKm:
                        Number(kilometers) + reminder.kilometersInterval,
                });

            }
        }

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

//GET maintenances x vehículo

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
            message: "Error obteniendo mantenimientos del vehiculo"
        });

    }

});

//GET maintenances x user (global)

router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const maintenances = await Maintenance.findAll({
            include: [
                {
                    model: Vehicle,
                    where: {
                        UserId: userId,
                    },
                },
            ],
            order: [["date", "DESC"]],              //ver si lo gestionamos de otra manera
        });

        res.status(200).json(maintenances);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error obteniendo mantenimientos del user",
        });
    }
});

//DELETE maintenace x id

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const maintenance = await Maintenance.findByPk(id);

        if (!maintenance) {
            return res.status(404).json({
                message: "Mantenimiento no encontrado",
            });
        }

        await maintenance.destroy();

        res.status(200).json({
            message: "Mantenimiento eliminado correctamente",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error eliminando mantenimiento",
        });
    }
});

//PUT maintenace x id

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            maintenanceType,
            date,
            kilometers,
            cost,
            notes,
        } = req.body;

        const maintenance = await Maintenance.findByPk(id);

        if (!maintenance) {
            return res.status(404).json({
                message: "Mantenimiento no encontrado",
            });
        }

        await maintenance.update({
            maintenanceType,
            date,
            kilometers,
            cost,
            notes,
        });

        res.status(200).json({
            message: "Mantenimiento actualizado correctamente",
            maintenance,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error actualizando mantenimiento",
        });
    }
});

module.exports = router;