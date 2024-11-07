// controllers/photoController.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://fevgaray:I46NseN9caK7Jq1q@sunmoncluster.oq80t.mongodb.net/?retryWrites=true&w=majority&appName=SunMonCluster";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getPhotos = async (req, res) => {
  try {
    await client.connect();
    const photosCollection = client.db("weather_data").collection("photos");

    const photos = await photosCollection.find().toArray();
    res.status(200).json(photos);
  } catch (error) {
    console.error('Error al obtener las fotos:', error);
    res.status(500).json({ message: 'Error al obtener las fotos' });
  } finally {
    await client.close();
  }
};

module.exports = { getPhotos };
