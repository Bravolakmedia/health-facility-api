// routes/consultation.js
const express = require('express');
const Consultation = require('../models/Consultation');
const Patient = require('../models/Patient');
const User = require('../models/User');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');

router.post('/', authenticateJWT, async (req, res) => {
    try {
        const consultation = await Consultation.create(req.body);
        res.status(201).json(consultation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const consultations = await Consultation.findAll({
            include: [{ model: User, as: 'officer' }, { model: Patient }],
        });
        res.json(consultations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const consultation = await Consultation.findByPk(req.params.id, {
            include: [{ model: User, as: 'officer' }, { model: Patient }],
        });
        if (consultation) {
            res.json(consultation);
        } else {
            res.status(404).json({ message: 'Consultation not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
