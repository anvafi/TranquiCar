const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

//POST
router.post("/", async (req, res) => {
    try {
        const { brand, model, year, mileage, image, userId } = req.body;

        if (!brand || !model || !year || !mileage || !userId) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const vehicle = await Vehicle.create({
            brand,
            model,
            year,
            mileage,
            image,
            //rel
            UserId: userId,
        });

        res.status(201).json({
            message: "Vehículo creado correctamente",
            vehicle,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al crear vehículo",
        });
    }
});

//GET x User
router.get("/user/:userId", async (req, res) => {

    try {

        const { userId } = req.params;

        const vehicles = await Vehicle.findAll({    //findAll
            where: {
                UserId: userId
            }
        });

        res.status(200).json(vehicles);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al obtener vehículos"
        });

    }

});

//GET x Vehículo
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const vehicle = await Vehicle.findByPk(id);     //findByPk
        //innecesario?
        if (!vehicle) {
            return res.status(404).json({
                message: "Vehículo no encontrado",
            });
        }

        res.status(200).json(vehicle);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al obtener vehículo",
        });
    }
});

module.exports = router;