"""
Singleton loader + inference helpers for the Diabetic Retinopathy CNN model.

Keeping the model load logic separate from views.py means the (relatively
expensive) tf.keras.models.load_model call only ever runs once per process,
instead of once per request.
"""
import io
import os
import threading

import numpy as np
from django.conf import settings
from PIL import Image

_model = None
_model_lock = threading.Lock()


def get_model():
    """Lazily load and cache the Keras model (thread-safe)."""
    global _model
    if _model is None:
        with _model_lock:
            if _model is None:
                import tensorflow as tf

                model_path = settings.ML_MODEL_PATH
                if not os.path.exists(model_path) or os.path.getsize(model_path) == 0:
                    raise FileNotFoundError(
                        f"ML model not found (or empty) at '{model_path}'. "
                        "Copy your trained my_model.keras file into "
                        "backend/detector/ml_model/ before starting the server."
                    )
                print(f"🔄 Loading Diabetic Retinopathy model from {model_path} ...")
                _model = tf.keras.models.load_model(model_path)
                print("✅ Model loaded successfully!")
    return _model


def preprocess_image(pil_image: Image.Image):
    """Resize + normalise a PIL image the same way the model was trained."""
    img = pil_image.convert("RGB").resize(settings.ML_IMG_SIZE)
    arr = np.array(img).astype("float32") / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr


def run_inference(image_bytes: bytes):
    """
    Run the model on raw image bytes and return a result dict:
    {
        predicted_class, confidence, dr_probability, no_dr_probability
    }
    """
    model = get_model()
    pil_image = Image.open(io.BytesIO(image_bytes))
    processed = preprocess_image(pil_image)

    predictions = model.predict(processed, verbose=0)[0]
    class_labels = settings.ML_CLASS_LABELS

    predicted_index = int(np.argmax(predictions))
    predicted_class = class_labels[predicted_index]
    dr_probability = float(predictions[0])
    no_dr_probability = float(predictions[1])
    confidence = float(predictions[predicted_index])

    return {
        "predicted_class": predicted_class,
        "confidence": confidence,
        "dr_probability": dr_probability,
        "no_dr_probability": no_dr_probability,
    }
