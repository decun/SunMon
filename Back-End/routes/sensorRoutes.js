// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const { addSensorData } = require('../controllers/sensorController'); // Asegúrate que esté correctamente importada

router.post('/', addSensorData); // Aquí definimos la ruta POST para los datos del sensor

module.exports = router;
