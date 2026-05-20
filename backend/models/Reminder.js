const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Reminder = sequelize.define("Reminder", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    maintenanceType: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    reminderType: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    kilometersInterval: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    monthsInterval: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    nextReminderKm: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    nextReminderDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },

    isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

module.exports = Reminder;
