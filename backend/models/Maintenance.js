const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Maintenance = sequelize.define("Maintenance", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

});

module.exports = Maintenance;