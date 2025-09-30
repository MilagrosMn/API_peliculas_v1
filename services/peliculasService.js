/* global process */
import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
const PER_TMDB_PAGE = 20

// Listar películas
export const listarPeliculas = async ({ page = 1, limit = 50, year, title }) => {
  const API_KEY = process.env.TMDB_API_KEY 
  if (!API_KEY) throw new Error('TMDB_API_KEY no configurada.')

  page = parseInt(page) || 1
  limit = parseInt(limit) || 50

  const offset = (page - 1) * limit
  const firstTmdbPage = Math.floor(offset / PER_TMDB_PAGE) + 1
  const startIndexInCollected = offset - (firstTmdbPage - 1) * PER_TMDB_PAGE
  const desiredCollectedLen = startIndexInCollected + limit

  let collected = []
  let tmdbPage = firstTmdbPage
  let totalPages = Infinity

  while (collected.length < desiredCollectedLen && tmdbPage <= totalPages) {
    const params = { api_key: API_KEY, language: 'es-ES', page: tmdbPage }
    if (title) params.query = title
    if (year && !title) params.primary_release_year = year
    if (year && title) params.year = year

    const url = title ? `${BASE_URL}/search/movie` : `${BASE_URL}/discover/movie`
    const { data } = await axios.get(url, { params })

    totalPages = data.total_pages || 0
    collected = collected.concat(data.results || [])
    tmdbPage++
    if (tmdbPage > 500) break
  }

  const window = collected.slice(startIndexInCollected, startIndexInCollected + limit)

  return window.map(m => ({
    id: m.id,
    titulo: m.title,
    anio: m.release_date ? parseInt(m.release_date.split('-')[0]) : null,
    genero_ids: m.genre_ids || [],
    overview: m.overview,
    poster: m.poster_path ? `https://image.tmdb.org/t/p/w342${m.poster_path}` : null
  }))
}

// Buscar película por ID
export const buscarPeliculaPorId = async (id) => {
  const API_KEY = process.env.TMDB_API_KEY 
  if (!API_KEY) throw new Error('TMDB_API_KEY no configurada.')

  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY, language: 'es-ES' }
    })

    return {
      id: data.id,
      titulo: data.title,
      anio: data.release_date ? parseInt(data.release_date.split('-')[0]) : null,
      generos: data.genres?.map(g => g.name) || [],
      overview: data.overview,
      runtime: data.runtime,
      poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null,
      homepage: data.homepage
    }
  } catch (err) {
    if (err.response?.status === 404) return null
    throw new Error(err.response?.data?.status_message || err.message || 'Error al comunicarse con TMDb')
  }
}
