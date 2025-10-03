import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Alert,
  Autocomplete,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  PhotoCamera as PhotoCameraIcon,
  Person as PersonIcon
} from '@mui/icons-material'
import { useFormik } from 'formik'
import * as Yup from 'yup'

// Opciones de rangos en orden jerárquico
const RANGOS_OPTIONS = [
  { value: 'COMANDANTE', label: 'Comandante', nivel: 7 },
  { value: 'CAPITAN', label: 'Capitán', nivel: 6 },
  { value: 'TENIENTE', label: 'Teniente', nivel: 5 },
  { value: 'ALFEREZ', label: 'Alférez', nivel: 4 },
  { value: 'SARGENTO', label: 'Sargento', nivel: 3 },
  { value: 'CABO', label: 'Cabo', nivel: 2 },
  { value: 'BOMBERO', label: 'Bombero', nivel: 1 }
]

// Opciones de departamentos
const DEPARTAMENTOS_OPTIONS = [
  { value: 'COMANDO', label: 'Comando' },
  { value: 'OPERACIONES', label: 'Operaciones' },
  { value: 'CAPACITACION', label: 'Capacitación' },
  { value: 'MANTENIMIENTO', label: 'Mantenimiento' },
  { value: 'COMUNICACIONES', label: 'Comunicaciones' },
  { value: 'ADMINISTRACION', label: 'Administración' }
]

// Validación RUT chileno
const validarRUT = (rut) => {
  if (!rut) return false
  
  const rutPattern = /^(\d{1,2}\.)?\d{3}\.\d{3}-[\dkK]$/
  if (!rutPattern.test(rut)) return false
  
  const cleanRut = rut.replace(/[.-]/g, '')
  const body = cleanRut.slice(0, -1)
  const dv = cleanRut.slice(-1).toUpperCase()
  
  let sum = 0
  let multiplier = 2
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier
    multiplier = multiplier < 7 ? multiplier + 1 : 2
  }
  
  const expectedDV = 11 - (sum % 11)
  const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString()
  
  return dv === calculatedDV
}

// Esquema de validación
const validationSchema = Yup.object({
  nombres: Yup.string()
    .min(2, 'Los nombres deben tener al menos 2 caracteres')
    .max(100, 'Los nombres no pueden exceder 100 caracteres')
    .required('Los nombres son requeridos'),
  apellidos: Yup.string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(100, 'Los apellidos no pueden exceder 100 caracteres')
    .required('Los apellidos son requeridos'),
  rut: Yup.string()
    .test('rut-valid', 'RUT inválido', validarRUT)
    .required('El RUT es requerido'),
  email: Yup.string()
    .email('Email inválido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  telefono: Yup.string()
    .matches(/^(\+56)?[0-9]{8,9}$/, 'Teléfono debe tener formato válido'),
  rango: Yup.string()
    .oneOf(RANGOS_OPTIONS.map(r => r.value), 'Rango inválido')
    .required('El rango es requerido'),
  departamento: Yup.string()
    .oneOf(DEPARTAMENTOS_OPTIONS.map(d => d.value), 'Departamento inválido'),
  especialidad: Yup.string()
    .max(100, 'La especialidad no puede exceder 100 caracteres'),
  experienciaAnios: Yup.number()
    .min(0, 'La experiencia no puede ser negativa')
    .max(50, 'La experiencia no puede exceder 50 años'),
  fechaIngreso: Yup.date()
    .max(new Date(), 'La fecha de ingreso no puede ser futura'),
  fechaNacimiento: Yup.date()
    .max(new Date(), 'La fecha de nacimiento no puede ser futura'),
  direccion: Yup.string()
    .max(255, 'La dirección no puede exceder 255 caracteres'),
  observaciones: Yup.string()
    .max(500, 'Las observaciones no pueden exceder 500 caracteres')
})

const OficialForm = ({ 
  open, 
  onClose, 
  oficial = null, 
  onSubmit, 
  oficiales = [], // Para seleccionar superior
  loading = false 
}) => {
  const [photoFile, setPhotoFile] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(oficial?.fotoUrl || null)
  
  const isEditing = Boolean(oficial)

  const formik = useFormik({
    initialValues: {
      nombres: oficial?.nombres || '',
      apellidos: oficial?.apellidos || '',
      rut: oficial?.rut || '',
      email: oficial?.email || '',
      telefono: oficial?.telefono || '',
      rango: oficial?.rango || '',
      departamento: oficial?.departamento || '',
      especialidad: oficial?.especialidad || '',
      experienciaAnios: oficial?.experienciaAnios || '',
      fechaIngreso: oficial?.fechaIngreso ? oficial.fechaIngreso.split('T')[0] : '',
      fechaNacimiento: oficial?.fechaNacimiento ? oficial.fechaNacimiento.split('T')[0] : '',
      direccion: oficial?.direccion || '',
      observaciones: oficial?.observaciones || '',
      superiorId: oficial?.superiornId || '',
      activo: oficial?.activo ?? true
    },
    validationSchema,
    onSubmit: (values) => {
      const submitData = {
        ...values,
        experienciaAnios: values.experienciaAnios ? parseInt(values.experienciaAnios) : null,
        superiornId: values.superiorId || null
      }
      
      if (photoFile) {
        submitData.photo = photoFile
      }
      
      onSubmit(submitData)
    }
  })

  const handlePhotoChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPhotoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPhotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClose = () => {
    formik.resetForm()
    setPhotoFile(null)
    setPhotoPreview(oficial?.fotoUrl || null)
    onClose()
  }

  // Filtrar oficiales para superior (solo rangos superiores)
  const getSuperioresOptions = () => {
    if (!formik.values.rango) return []
    
    const rangoActual = RANGOS_OPTIONS.find(r => r.value === formik.values.rango)
    if (!rangoActual) return []
    
    return oficiales.filter(o => {
      if (isEditing && o.id === oficial.id) return false // No puede ser superior de sí mismo
      
      const rangoSuperior = RANGOS_OPTIONS.find(r => r.value === o.rango)
      return rangoSuperior && rangoSuperior.nivel > rangoActual.nivel && o.activo
    })
  }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh' }
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          {isEditing ? 'Editar Oficial' : 'Nuevo Oficial'}
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {/* Foto de perfil */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={photoPreview}
                  sx={{ width: 100, height: 100 }}
                >
                  {!photoPreview && <PersonIcon sx={{ fontSize: 50 }} />}
                </Avatar>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="photo-upload"
                  type="file"
                  onChange={handlePhotoChange}
                />
                <label htmlFor="photo-upload">
                  <Tooltip title="Cambiar foto">
                    <IconButton
                      component="span"
                      sx={{
                        position: 'absolute',
                        bottom: -8,
                        right: -8,
                        bgcolor: 'primary.main',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <PhotoCameraIcon />
                    </IconButton>
                  </Tooltip>
                </label>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* Información personal */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Información Personal
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  name="nombres"
                  value={formik.values.nombres}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                  helperText={formik.touched.nombres && formik.errors.nombres}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellidos"
                  name="apellidos"
                  value={formik.values.apellidos}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.apellidos && Boolean(formik.errors.apellidos)}
                  helperText={formik.touched.apellidos && formik.errors.apellidos}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="RUT"
                  name="rut"
                  value={formik.values.rut}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rut && Boolean(formik.errors.rut)}
                  helperText={formik.touched.rut && formik.errors.rut}
                  placeholder="12.345.678-9"
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                  helperText={formik.touched.telefono && formik.errors.telefono}
                  placeholder="+56912345678"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formik.values.fechaNacimiento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                  helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Información profesional */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Información Profesional
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Rango</InputLabel>
                  <Select
                    name="rango"
                    value={formik.values.rango}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.rango && Boolean(formik.errors.rango)}
                    label="Rango"
                  >
                    {RANGOS_OPTIONS.map((rango) => (
                      <MenuItem key={rango.value} value={rango.value}>
                        {rango.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Departamento</InputLabel>
                  <Select
                    name="departamento"
                    value={formik.values.departamento}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.departamento && Boolean(formik.errors.departamento)}
                    label="Departamento"
                  >
                    <MenuItem value="">Sin departamento</MenuItem>
                    {DEPARTAMENTOS_OPTIONS.map((dept) => (
                      <MenuItem key={dept.value} value={dept.value}>
                        {dept.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Especialidad"
                  name="especialidad"
                  value={formik.values.especialidad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.especialidad && Boolean(formik.errors.especialidad)}
                  helperText={formik.touched.especialidad && formik.errors.especialidad}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Años de Experiencia"
                  name="experienciaAnios"
                  type="number"
                  value={formik.values.experienciaAnios}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.experienciaAnios && Boolean(formik.errors.experienciaAnios)}
                  helperText={formik.touched.experienciaAnios && formik.errors.experienciaAnios}
                  inputProps={{ min: 0, max: 50 }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de Ingreso"
                  name="fechaIngreso"
                  type="date"
                  value={formik.values.fechaIngreso}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fechaIngreso && Boolean(formik.errors.fechaIngreso)}
                  helperText={formik.touched.fechaIngreso && formik.errors.fechaIngreso}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              {/* Jerarquía */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={getSuperioresOptions()}
                  getOptionLabel={(option) => `${option.nombres} ${option.apellidos} (${option.rango})`}
                  value={oficiales.find(o => o.id === formik.values.superiorId) || null}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('superiorId', newValue?.id || '')
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Superior Jerárquico"
                      error={formik.touched.superiorId && Boolean(formik.errors.superiorId)}
                      helperText={formik.touched.superiorId && formik.errors.superiorId}
                    />
                  )}
                  disabled={!formik.values.rango || formik.values.rango === 'COMANDANTE'}
                />
              </Grid>

              {/* Información adicional */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="direccion"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                  helperText={formik.touched.direccion && formik.errors.direccion}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Observaciones"
                  name="observaciones"
                  multiline
                  rows={3}
                  value={formik.values.observaciones}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
                  helperText={formik.touched.observaciones && formik.errors.observaciones}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formik.values.activo}
                      onChange={(e) => formik.setFieldValue('activo', e.target.checked)}
                      name="activo"
                    />
                  }
                  label="Oficial activo"
                />
              </Grid>
            </Grid>

            {formik.errors.submit && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formik.errors.submit}
              </Alert>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading || !formik.isValid}
          >
            {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default OficialForm