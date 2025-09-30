import express from 'express'
import { getPeliculas, getPeliculaById } from '../controllers/peliculasController.js'

const router = express.Router()

router.get('/', getPeliculas)
router.get('/:id', getPeliculaById)

export default router
