const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Maintenance = sequelize.define("Maintenance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    maintenanceType: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    kilometers: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    cost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },

    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Maintenance;