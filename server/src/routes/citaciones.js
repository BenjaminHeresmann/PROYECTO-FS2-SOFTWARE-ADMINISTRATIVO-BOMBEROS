import express from 'express'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Rutas temporales para la Fase 1
router.get('/', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Citaciones API - En desarrollo para Fase 4'
  })
})

export default router