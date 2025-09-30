/* global process */
import express from 'express'
import peliculasRoutes from './routes/peliculas.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Rutas
app.use('/api/v1/peliculas', peliculasRoutes)

app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    msg: 'Bienvenido a la API de películas. Usa /api/v1/peliculas'
  })
})

// 404
app.use((req, res) => {
  res.status(404).json({ status: 'error 404', msg: 'Ruta no encontrada' })
})

// Manejo de errores
app.use((err, res) => {
  console.error(err)
  res.status(500).json({ status: 'error 500', msg: err.message || 'Error inesperado' })
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
}

export default app
