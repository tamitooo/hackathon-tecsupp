# 🚀 Hackaton Tecsup – Backend

## 🐍 Crear y activar un entorno virtual (venv)

```bash
python -m venv venv
source venv/bin/activate
```

## 📦 Instalar dependencias
```bash
python -m pip install -r app/requirements.txt
```

## ▶️ Ejecutar el servidor local
```bash
uvicorn app.main:app --reload
```

El backend estará disponible en: http://localhost:8000