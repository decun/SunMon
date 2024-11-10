from flask import Flask, request, jsonify
from ultralytics import YOLO
import base64
import os
from datetime import datetime

app = Flask(__name__)

# Configuración
MODEL_PATH = "models/best.pt"
RESULTS_PATH = "results"
model = YOLO(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    print("Recibida petición de predicción")
    try:
        data = request.json
        print(f"ID de imagen recibido: {data['image_id']}")
        image_base64 = data['image']
        image_id = data['image_id']
        
        # Crear directorio de resultados si no existe
        results_dir = os.path.join(os.path.dirname(__file__), 'results')
        os.makedirs(results_dir, exist_ok=True)
        
        # Generar nombres de archivo únicos
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        temp_path = os.path.join(results_dir, f"temp_{image_id}_{timestamp}.jpg")
        output_dir = os.path.join(results_dir, f"pred_{image_id}_{timestamp}")
        
        # Decodificar y guardar imagen
        img_data = base64.b64decode(image_base64)
        with open(temp_path, 'wb') as f:
            f.write(img_data)
        
        # Realizar inferencia
        results = model.predict(
            temp_path,
            conf=0.1,
            iou=0.2,
            save=True,
            project=results_dir,
            name=f"pred_{image_id}_{timestamp}"
        )
        
        # Obtener imagen procesada
        result_path = os.path.join(output_dir, os.path.basename(temp_path))
        with open(result_path, 'rb') as f:
            processed_image = base64.b64encode(f.read()).decode()
        
        # Limpiar archivos temporales
        os.remove(temp_path)
        
        return jsonify({
            'success': True,
            'processed_image': processed_image,
            'predictions': results[0].boxes.data.tolist(),
            'result_path': result_path
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5001)