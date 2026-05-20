const express = require("express");
const Reminder = require("../models/Reminder");

const router = express.Router();

//POST crear

router.post("/", async (req, res) => {
    try {
        const {
            maintenanceType,
            reminderType,
            kilometersInterval,
            monthsInterval,
            nextReminderKm,
            nextReminderDate,
            vehicleId,
        } = req.body;

        if (!maintenanceType || !reminderType || !vehicleId) {
            return res.status(400).json({
                message: "Tipo de mantenimiento, tipo de recordatorio y vehículo son obligatorios",
            });
        }

        const reminder = await Reminder.create({
            maintenanceType,
            reminderType,
            kilometersInterval,
            monthsInterval,
            nextReminderKm,
            nextReminderDate,
            VehicleId: vehicleId,
        });

        res.status(201).json({
            message: "Recordatorio creado",
            reminder,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error al crear recordatorio",
        });
    }
});

//GET recordat

router.get("/vehicle/:vehicleId", async (req, res) => {
    try {
        const { vehicleId } = req.params;

        const reminders = await Reminder.findAll({
            where: {
                VehicleId: vehicleId,
            },
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json(reminders);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error cargando recordatorios",
        });
    }
});

module.exports = router;