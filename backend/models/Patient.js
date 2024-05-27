// models/Patient.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Patient = sequelize.define('Patient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Patient;
