require("dotenv").config();

const app = require("./App");
const sequelize = require("./config/db");
const User = require("./models/User");
const Vehicle = require("./models/Vehicle");

//relaciones sequelize
User.hasMany(Vehicle);
Vehicle.belongsTo(User);

const PORT = process.env.PORT || 3000;

const startServer = async () => {

  try {

    await sequelize.authenticate();

    console.log("Conectado a bd");

    await sequelize.sync();

    console.log("sync de tablas");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });

  } catch (error) {

    console.error("Error conexión:", error);

  }

};

startServer();