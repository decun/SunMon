const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../.env') });

// Verificar MONGO_URI
if (!process.env.MONGO_URI) {
    console.error('Error: Falta la variable de entorno MONGO_URI');
    process.exit(1);
}

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function downloadImages() {
    try {
        console.log('Conectando a MongoDB...');
        await client.connect();
        
        const db = client.db("pv_data");
        const photosCollection = db.collection("photos");
        const temperaturesCollection = client.db("pv_data").collection("weather");

        const outputDir = path.join(__dirname, '../downloads');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputFile = path.join(outputDir, `panel_images_${timestamp}.zip`);

        console.log('Directorio de salida:', outputDir);
        console.log('Archivo de salida:', outputFile);

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            console.log('Directorio de descargas creado');
        }

        const output = fs.createWriteStream(outputFile);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', () => {
            console.log(`\nArchivo ZIP creado exitosamente: ${outputFile}`);
            console.log(`Tamaño total: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
            client.close();
        });

        archive.on('error', (err) => {
            console.error('Error al crear el archivo:', err);
            client.close();
            throw err;
        });

        archive.pipe(output);

        console.log('Obteniendo fotos de la base de datos...');
        const photos = await photosCollection.find().toArray();
        console.log(`Encontradas ${photos.length} fotos`);

        for (const [index, photo] of photos.entries()) {
            const timestamp = photo.timestamp || new Date().toISOString();
            const fileName = `node_${photo.nodeId || 'unknown'}_${timestamp.replace(/[:.]/g, '-')}.jpg`;

            try {
                const imageBuffer = Buffer.from(photo.photo, 'base64');
                archive.append(imageBuffer, { name: fileName });
                process.stdout.write(`\rProcesando imagen ${index + 1}/${photos.length}`);
            } catch (err) {
                console.error(`\nError al procesar imagen ${fileName}:`, err);
            }
        }

        const readme = `Panel Solar Images Export
Generated: ${new Date().toISOString()}
Total Images: ${photos.length}
Nodes: ${new Set(photos.map(p => p.nodeId)).size}

File Format:
node_{nodeId}_{timestamp}.jpg

For more information, contact support@sunmon.com
`;

        archive.append(readme, { name: 'README.txt' });
        console.log('\n\nFinalizando archivo ZIP...');

        await archive.finalize();

    } catch (error) {
        console.error('Error al procesar las imágenes:', error);
        process.exit(1);
    }
}

console.log('Iniciando descarga de imágenes...');
downloadImages().catch(err => {
    console.error('Error general:', err);
    client.close();
    process.exit(1);
}); 