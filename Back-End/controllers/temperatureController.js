const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

// Utilizar la URI de la variable de entorno
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getTemperatures = async (req, res) => {
    try {
        await client.connect();
        const temperaturesCollection = client.db("pv_data").collection("weather");

        // Obtener los datos directamente sin transformar mucho
        const temperatures = await temperaturesCollection.find().toArray();

        console.log('Datos obtenidos:', temperatures);
        res.status(200).json(temperatures);
    } catch (error) {
        console.error('Error al obtener las temperaturas:', error);
        res.status(500).json({ message: 'Error al obtener las temperaturas' });
    } finally {
        await client.close();
    }
};

module.exports = { getTemperatures };
