const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensorRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para interpretar JSON
app.use(express.json());

// Rutas
app.use('/api/sensors', sensorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
