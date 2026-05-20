const express = require("express");
const Reminder = require("../models/Reminder");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

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

router.get("/user/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        const reminders = await Reminder.findAll({
            include: [
                {
                    model: Vehicle,
                    where: {
                        UserId: userId,
                    },
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json(reminders);

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: "Error obteniendo recordatorios del usuario", });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const {
            maintenanceType,
            reminderType,
            kilometersInterval,
            monthsInterval,
            nextReminderKm,
            nextReminderDate,
            isCompleted,
        } = req.body;

        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({
                message: "Recordatorio no encontrado",
            });
        }

        await reminder.update({
            maintenanceType,
            reminderType,
            kilometersInterval,
            monthsInterval,
            nextReminderKm,
            nextReminderDate,
            isCompleted,
        });

        res.status(200).json({
            message: "Recordatorio actualizado correctamente",
            reminder,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error actualizando recordatorio",
        });
    }
});

router.put("/:id/complete", async (req, res) => {
    try {
        const { id } = req.params;

        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({ message: "Recordatorio no encontrado", });
        }

        const newNextReminderKm =
            reminder.nextReminderKm && reminder.kilometersInterval
                ? reminder.nextReminderKm + reminder.kilometersInterval
                : reminder.nextReminderKm;

        await reminder.update({
            nextReminderKm: newNextReminderKm,
            isCompleted: false,
        });

        res.status(200).json({
            message: "Mantenimiento completado. Próximo recordatorio actualizado.",
            reminder,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error completando recordatorio",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const reminder = await Reminder.findByPk(id);

        if (!reminder) {
            return res.status(404).json({
                message: "Recordatorio no encontrado",
            });
        }

        await reminder.destroy();

        res.status(200).json({
            message: "Recordatorio eliminado correctamente",
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error eliminando recordatorio",
        });
    }
});

module.exports = router;