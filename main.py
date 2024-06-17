import os
import io
import numpy as np
import tensorflow as tf
from flask import Flask, request, jsonify
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import sqlite3
from io import BytesIO
import datetime
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = load_model(r"C:/Users/fillo/Downloads/Tugas nih/model5.h5")

# Predefined classes
classes = ['Buruk', 'Baik', 'Kurang Matang']

def prepare_image(image, target):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    return image


def init_db():
    conn = sqlite3.connect('history.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS classification_history (
            id INTEGER PRIMARY KEY,
            image BLOB,
            label TEXT,
            date TEXT
        )
    ''')
    conn.commit()
    conn.close()


@app.route('/history', methods=['GET'])
def get_history():
    try:
        conn = sqlite3.connect('history.db')
        c = conn.cursor()
        c.execute('SELECT * FROM classification_history')
        rows = c.fetchall()
        conn.close()

        encoded_rows = []
        for row in rows:
            encoded_row = list(row)
            encoded_row[1] = base64.b64encode(row[1]).decode('utf-8')
            encoded_rows.append({
                'id': encoded_row[0],
                'image': encoded_row[1],
                'label': encoded_row[2],
                'date': encoded_row[3]
            })

        return jsonify(encoded_rows)

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/classify', methods=['POST'])
def classify():
    try:

        if 'image' in request.files:
            file = request.files['image']
        elif request.is_json:
            data = request.get_json()
            image_b64 = data.get('image', '')
            if image_b64:
                file = BytesIO(base64.b64decode(image_b64))
            else:
                return jsonify({'error': 'No image provided'}), 400
        else:
            return jsonify({'error': 'No image provided'}), 400

        image = Image.open(file)

        thumbnail_size = (128, 128)
        image_pil = image
        image_pil.thumbnail(thumbnail_size)
        image_byte = BytesIO()
        image_pil.save(image_byte, format='JPEG')
        image_byte = image_byte.getvalue()

        image = prepare_image(image, target=(244, 224))
        prediction = model.predict(image)
        predicted_class = classes[np.argmax(prediction[0])]

        current_date = datetime.datetime.now().strftime('%Y-%m-%d')

        conn = sqlite3.connect('history.db')
        c = conn.cursor()
        c.execute('INSERT INTO classification_history (image, label, date) VALUES (?, ?, ?)',
                  (image_byte, predicted_class, current_date))
        conn.commit()
        conn.close()

        return jsonify({'label': predicted_class})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    init_db()
    app.run(debug=True)
