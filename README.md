# 👁️ RetinaScan AI — Diabetic Retinopathy Detection

A full-stack, CNN-powered screening app.

- **Backend:** Django 5 + Django REST Framework, serving your trained Keras
  model (`my_model.keras`) behind a clean REST API, with every scan saved to
  a SQLite database.
- **Frontend:** React (Vite) + Tailwind CSS + Framer Motion + Recharts — an
  animated, glassmorphic "aurora" themed dashboard with drag-and-drop upload,
  live confidence charts, a stats dashboard and a searchable scan history.

```
dr_fullstack/
├── backend/            Django project (API)
│   ├── dr_backend/     settings, urls, wsgi
│   ├── detector/       app: model, views, serializers, ml_engine.py
│   └── requirements.txt
└── frontend/            React app (Vite)
    ├── src/
    │   ├── api/api.js
    │   ├── components/
    │   └── pages/
    └── package.json
```

## 1. Backend setup (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

The trained model is already included at:
`backend/detector/ml_model/my_model.keras`

If you retrain the model, just drop the new `my_model.keras` file into that
same folder (it must accept a 224×224×3 RGB input and output a 2-class
softmax `["DR", "No DR"]`, matching your original `predict.py` / `app.py`).

```bash
python manage.py migrate
python manage.py createsuperuser   # optional, for /admin
python manage.py runserver
```

The API now runs at **http://127.0.0.1:8000**

| Method | Endpoint             | Description                              |
|--------|-----------------------|-------------------------------------------|
| POST   | `/api/predict/`       | Upload `image` (+ optional `patient_name`), returns prediction |
| GET    | `/api/history/`       | Paginated list of past scans              |
| DELETE | `/api/history/<id>/`  | Delete a scan record                      |
| GET    | `/api/stats/`         | Aggregate dashboard stats                 |
| GET    | `/api/health/`        | Health check / model status               |

## 2. Frontend setup (React)

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** — the Vite dev server proxies `/api` and
`/media` requests to the Django backend at `127.0.0.1:8000`, so both must be
running at the same time.

To build a production bundle:

```bash
npm run build      # outputs to frontend/dist
```

## 3. Notes

- Tested end-to-end: Django migrations generate cleanly (`python manage.py
  check` passes) and `npm run build` compiles the React app with no errors.
- `tensorflow` is a heavy dependency — first `pip install` and the first
  model load can take a few minutes.
- The model is loaded once per server process (see `detector/ml_engine.py`)
  and cached, so predictions after the first one are fast.
- This project is for educational / portfolio purposes and is **not** a
  medical device — it must not be used for real clinical diagnosis.
