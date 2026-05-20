const express = require("express");
const User = require("../models/User");

const router = express.Router();

//POST registro

router.post("/register", async (req, res) => {

    // console.log(req.body);
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });

        }

        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {

            return res.status(409).json({
                message: "El email ya está registrado"
            });

        }

        const user = await User.create({
            name,
            email,
            password
        });
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error al registrar usuario"
        });


    }
});

router.post("/login", async (req, res) => {
    try {
        //recibir datos
        const { email, password } = req.body;

        //validar
        if (!email || !password) {
            return res.status(400).json({
                message: "Email y contraseña son obligatorios",
            });
        }

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        if (user.password !== password) {
            return res.status(401).json({
                message: "Contraseña incorrecta",
            });
        }

        res.status(200).json({
            message: "Login correcto",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error al iniciar sesión",
        });
    }
});

module.exports = router;