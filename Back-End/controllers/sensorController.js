// controllers/sensorController.js
const Sensor = require('../models/sensorModel');



// Función para obtener los datos del sensor

const getSensorData = async (req, res) => {
  try {
    const sensorData = await Sensor.find(); // Esto obtiene todos los datos de la colección
    console.log('Datos obtenidos desde la base de datos:', sensorData); // Ver los datos en la consola
    res.status(200).json(sensorData);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ message: 'Error al obtener los datos del sensor' });
  }
};


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

const logSensorData = async (req, res) => {
  try {
    const sensorData = await Sensor.find();
    console.log('Datos obtenidos desde MongoDB:', JSON.stringify(sensorData, null, 2)); // Usamos JSON.stringify para formatearlo
    res.status(200).json(sensorData);  // Si quieres devolver los datos al frontend también
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ message: 'Error al obtener los datos del sensor' });
  }
};

module.exports = { addSensorData, getSensorData, logSensorData };
