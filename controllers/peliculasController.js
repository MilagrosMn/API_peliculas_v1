import { listarPeliculas, buscarPeliculaPorId } from '../services/peliculasService.js'

export const getPeliculas = async (req, res) => {
  try {
    const { page, limit, year, title } = req.query
    const data = await listarPeliculas({ page, limit, year, title })
    res.status(200).json({ status: 'ok', data })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', msg: err.message || 'Error inesperado al obtener la información' })
  }
}

export const getPeliculaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const pelicula = await buscarPeliculaPorId(id)
    if (!pelicula) {
      return res.status(404).json({ status: 'error', msg: 'Película no encontrada' })
    }
    res.status(200).json({ status: 'ok', data: pelicula })
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', msg: err.message || 'Error inesperado al obtener la información' })
  }
}
