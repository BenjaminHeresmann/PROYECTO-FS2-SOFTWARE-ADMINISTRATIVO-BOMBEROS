import React from 'react'
import { Box, Typography, Alert } from '@mui/material'

const CitacionesPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📅 Gestión de Citaciones
      </Typography>
      
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          Esta página será desarrollada en la <strong>Fase 4</strong> con toda la funcionalidad de gestión de citaciones.
        </Typography>
      </Alert>
    </Box>
  )
}

export default CitacionesPage