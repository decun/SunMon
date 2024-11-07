// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const { getPhotos } = require('../controllers/photoController');
const { getTemperatures } = require('../controllers/temperatureController');

// Ruta para obtener fotos
router.get('/photos', getPhotos);

// Ruta para obtener temperaturas
router.get('/temperatures', getTemperatures);

module.exports = router;
