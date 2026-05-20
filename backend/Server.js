require("dotenv").config();

const app = require("./App");
const sequelize = require("./config/database");

const User = require("./models/User");
const Vehicle = require("./models/Vehicle");
const Maintenance = require("./models/Maintenance");
const Reminder = require("./models/Reminder");

//relaciones sequelize
User.hasMany(Vehicle);
Vehicle.belongsTo(User);
Vehicle.hasMany(Maintenance);
Maintenance.belongsTo(Vehicle);
Vehicle.hasMany(Reminder);
Reminder.belongsTo(Vehicle);


const PORT = process.env.PORT || 3000;

const startServer = async () => {

  try {

    await sequelize.authenticate();

    console.log("Conectado a bd");

    await sequelize.sync({ alter: true });                    //mantener alter?

    console.log("sync de tablas");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });

  } catch (error) {

    console.error("Error conexión:", error);

  }

};

startServer();