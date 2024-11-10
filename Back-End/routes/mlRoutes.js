const express = require('express');
const router = express.Router();
const axios = require('axios');
const { MongoClient } = require('mongodb');

const ML_SERVICE_URL = 'http://localhost:5001/predict';

router.post('/process-image', async (req, res) => {
  try {
    console.log('Recibida petición de procesamiento de imagen');
    const { imageId, imageBase64 } = req.body;
    
    console.log('Llamando al servicio ML...');
    const mlResponse = await axios.post(ML_SERVICE_URL, {
      image: imageBase64,
      image_id: imageId
    });
    console.log('Respuesta recibida del servicio ML');

    // Guardar resultado en MongoDB
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db("pv_data");
    await db.collection("processed_images").insertOne({
      original_image_id: imageId,
      processed_image: mlResponse.data.processed_image,
      predictions: mlResponse.data.predictions,
      timestamp: new Date()
    });

    res.json(mlResponse.data);
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || 'No additional details'
    });
  }
});

module.exports = router;