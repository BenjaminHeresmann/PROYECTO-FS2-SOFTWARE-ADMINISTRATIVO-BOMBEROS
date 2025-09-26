import React from 'react'
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Container,
  Alert 
} from '@mui/material'

const LoginPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            🚒 Sistema Bomberos
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Segunda Compañía Viña del Mar
          </Typography>
          
          <Alert severity="info" sx={{ mt: 3 }}>
            <Typography variant="body2">
              <strong>¡Página de Login en construcción!</strong><br/>
              Esta será reemplazada en la Fase 2 con el formulario completo de autenticación.
            </Typography>
          </Alert>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Próximamente podrás acceder con:
            </Typography>
            <Typography variant="body2">
              <strong>Admin:</strong> admin / admin123<br/>
              <strong>Usuario:</strong> bombero@bomberos.cl / bomb345
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginPage