const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const getVoltages = async (req, res) => {
    try {
        await client.connect();
        const energyCollection = client.db("pv_data").collection("energy");

        const energyData = await energyCollection.find().sort({ timestamp: -1 }).toArray();

        // Transformar los datos para incluir voltage, current y power
        const formattedData = energyData.map(item => ({
            voltage: item.voltage || 0,
            current: item.current || 0,
            power: item.power || 0,
            timestamp: item.timestamp
        }));

        console.log('Datos de energía obtenidos:', formattedData);
        res.status(200).json(formattedData);
    } catch (error) {
        console.error('Error al obtener los datos de energía:', error);
        res.status(500).json({ message: 'Error al obtener los datos de energía' });
    } finally {
        await client.close();
    }
};

module.exports = { getVoltages };