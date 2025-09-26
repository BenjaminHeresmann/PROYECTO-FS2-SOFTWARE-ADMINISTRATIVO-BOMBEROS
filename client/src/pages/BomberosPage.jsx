import React from 'react'
import { Box, Typography, Alert } from '@mui/material'

const BomberosPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        👨‍🚒 Gestión de Bomberos
      </Typography>
      
      <Alert severity="info" sx={{ mt: 2 }}>
        <Typography variant="body2">
          Esta página será desarrollada en la <strong>Fase 4</strong> con toda la funcionalidad de gestión de bomberos.
        </Typography>
      </Alert>
    </Box>
  )
}

export default BomberosPage