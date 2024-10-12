// controllers/sensorController.js
const Sensor = require('../models/sensorModel');

// Función que maneja la lógica para añadir datos del sensor
const addSensorData = async (req, res) => {
  const { temperature, humidity } = req.body;

  try {
    const sensorData = new Sensor({
      temperature,
      humidity,
    });

    const savedData = await sensorData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save sensor data' });
  }
};

module.exports = { addSensorData };
