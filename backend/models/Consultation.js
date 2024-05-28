// models/Consultation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Patient = require('./Patient');

const Consultation = sequelize.define('Consultation', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

Consultation.belongsTo(User, { as: 'officer', foreignKey: { allowNull: false } });
Consultation.belongsTo(Patient, { foreignKey: { allowNull: false } });

module.exports = Consultation;
