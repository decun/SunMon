const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Ruta para ver las colecciones (movida desde server.js)
router.get('/collections', async (req, res) => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  
  try {
    await client.connect();
    const db = client.db("pv_data"); // Cambiado a pv_data para consistencia
    const collections = await db.listCollections().toArray();
    
    const collectionsWithSample = await Promise.all(
      collections.map(async (collection) => {
        const sampleData = await db.collection(collection.name)
          .find()
          .limit(1)
          .toArray();
        
        return {
          collectionName: collection.name,
          sampleData: sampleData
        };
      })
    );
    
    res.json(collectionsWithSample);
  } catch (error) {
    console.error('Error al obtener las colecciones:', error);
    res.status(500).json({ error: 'Error al obtener las colecciones' });
  } finally {
    await client.close();
  }
});

module.exports = router; 