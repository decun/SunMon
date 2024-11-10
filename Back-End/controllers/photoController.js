// controllers/photoController.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://fevgaray:nfeLBgBJI0Q9yM95@sunmoncluster.oq80t.mongodb.net/?retryWrites=true&w=majority&appName=SunMonCluster";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getPhotos = async (req, res) => {
  try {
    await client.connect();
    const photosCollection = client.db("pv_data").collection("photos");

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
