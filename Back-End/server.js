const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sensorRoutes = require('./routes/sensorRoutes');
const debugRoutes = require('./routes/debugRoutes');
const mlRoutes = require('./routes/mlRoutes');
const errorHandler = require('./middleware/errorHandler');

// Configuración de variables de entorno
dotenv.config();

// Inicialización de la app
const app = express();

// Conexión a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Rutas principales
app.use('/api/sensors', sensorRoutes);
app.use('/api/ml', mlRoutes);

// Rutas de debug (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use('/api/debug', debugRoutes);
}

// Ruta base
app.get('/', (req, res) => {
  res.json({
    message: 'API de SunMon - Sistema de Monitoreo de Paneles Solares',
    version: '1.0.0'
  });
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`Debug endpoint: http://localhost:${PORT}/api/debug/collections`);
  }
});
