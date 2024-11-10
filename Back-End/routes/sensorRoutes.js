// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const { getPhotos } = require('../controllers/photoController');
const { getTemperatures } = require('../controllers/temperatureController');
const { getVoltages } = require('../controllers/voltageController');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Configuración de la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Rutas básicas
router.get('/photos', getPhotos);
router.get('/temperatures', getTemperatures);
router.get('/voltages', getVoltages);

// Rutas por nodo específico
router.get('/node/:nodeId/photos', getPhotos);
router.get('/node/:nodeId/temperatures', getTemperatures);
router.get('/node/:nodeId/voltages', getVoltages);

// Ruta para obtener todos los datos de un nodo específico
router.get('/node/:nodeId', async (req, res) => {
  try {
    const nodeId = req.params.nodeId;
    const [photos, temperatures, voltages] = await Promise.all([
      getPhotos(nodeId),
      getTemperatures(nodeId),
      getVoltages(nodeId)
    ]);

    res.json({
      nodeId,
      photos,
      temperatures,
      voltages
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos del nodo' });
  }
});

// Ruta para descargar todas las imágenes
router.get('/download-images', async (req, res) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const zipFileName = `panel_images_${timestamp}.zip`;

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${zipFileName}`);

    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    // Pipe el archivo directamente a la respuesta
    archive.pipe(res);

    // Obtener imágenes de la base de datos
    const { rows } = await pool.query(`
      SELECT 
        p.id,
        p.node_id,
        p.photo,
        p.created_at,
        n.name as node_name
      FROM photos p
      LEFT JOIN nodes n ON p.node_id = n.id
      ORDER BY p.created_at DESC
    `);

    // Procesar cada imagen
    for (const row of rows) {
      const timestamp = row.created_at.toISOString().replace(/[:.]/g, '-');
      const nodeName = row.node_name || `node_${row.node_id}`;
      const fileName = `${nodeName}_${timestamp}.jpg`;

      const imageBuffer = Buffer.from(row.photo, 'base64');
      archive.append(imageBuffer, { name: fileName });
    }

    // Añadir README
    const readme = `Panel Solar Images Export
Generated: ${new Date().toISOString()}
Total Images: ${rows.length}
Nodes: ${new Set(rows.map(r => r.node_id)).size}

File Format:
{node_name}_{timestamp}.jpg

For more information, contact support@sunmon.com
`;

    archive.append(readme, { name: 'README.txt' });

    // Finalizar el archivo
    await archive.finalize();

  } catch (error) {
    console.error('Error al crear el archivo ZIP:', error);
    res.status(500).json({ message: 'Error al descargar las imágenes' });
  }
});

module.exports = router;
