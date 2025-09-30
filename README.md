# API de Películas (TMDb)

Proyecto de **API REST con Express.js** que consume la API pública de **The Movie Database (TMDb)**.  
---

##  Instalación y ejecución

Clonar el proyecto y entrar en la carpeta:

git clone <URL_REPO>
cd \API_tmdb

Instalar dependencias:
npm install

Configurar variables de entorno:  
Copiar el archivo `sample.env` a `.env` y completar con la API key de TMDb.
cp sample.env .env

Editar `.env`:
env
PORT=3000
DOMAIN=http://localhost:3000
TMDB_API_KEY=tu_api_key_real

Ejecutar el servidor:
npm run start

El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

---

##  Endpoints

### Listado de películas
GET /api/v1/peliculas

**Parámetros de query opcionales:**
- `page` → número de página (por defecto: 1)
- `limit` → cantidad de resultados (por defecto: 50)
- `year` → filtrar por año de lanzamiento
- `title` → búsqueda por título

**Ejemplo:**
GET /api/v1/peliculas?page=1&limit=5&year=2023&title=Matrix

---

### Película por ID
GET /api/v1/peliculas/:id

**Ejemplo:**
GET /api/v1/peliculas/603

---

##  Respuestas de la API

Formato uniforme:

- **Éxito (200):**json
{
  "status": "ok",
  "data": [...]
}

- **Error (404):**json
{
  "status": "error",
  "msg": "Película no encontrada"
}

- **Error (500):**json
{
  "status": "error",
  "msg": "Mensaje de error"
}

---

## Archivos importantes

- `app.js` → configuración principal de la aplicación.
- `routes/` → definición de rutas.
- `controllers/` → lógica de controladores.
- `services/` → conexión con TMDb.
- `.env` → variables de entorno (no subir al repo).
- `sample.env` → plantilla de variables de entorno.
- `.gitignore` → incluye `.env` y `node_modules`.

---

# Render 
https://api-peliculas-v1.onrender.com

---

## Autora
Milagros Muñoz Nicosia
