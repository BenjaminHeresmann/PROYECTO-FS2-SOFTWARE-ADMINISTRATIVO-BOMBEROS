import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

// ============================================
// ASYNC THUNKS
// ============================================

// Fetch carros con filtros y paginación
export const fetchCarros = createAsyncThunk(
  'carros/fetchCarros',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 10,
        search: params.search || '',
        tipo: params.tipo || '',
        estadoOperativo: params.estadoOperativo || '',
        sortBy: params.sortBy || 'nombre',
        sortOrder: params.sortOrder || 'asc'
      }).toString()

      const response = await api.get(`/carros?${queryParams}`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar carros'
      )
    }
  }
)

// Fetch carro específico
export const fetchCarroById = createAsyncThunk(
  'carros/fetchCarroById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/carros/${id}`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar carro'
      )
    }
  }
)

// Fetch estadísticas
export const fetchCarrosEstadisticas = createAsyncThunk(
  'carros/fetchEstadisticas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/carros/estadisticas')
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar estadísticas'
      )
    }
  }
)

// Fetch alertas
export const fetchCarrosAlertas = createAsyncThunk(
  'carros/fetchAlertas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/carros/alertas')
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar alertas'
      )
    }
  }
)

// Crear carro
export const createCarro = createAsyncThunk(
  'carros/createCarro',
  async (carroData, { rejectWithValue }) => {
    try {
      const response = await api.post('/carros', carroData)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al crear carro'
      )
    }
  }
)

// Actualizar carro
export const updateCarro = createAsyncThunk(
  'carros/updateCarro',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/carros/${id}`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al actualizar carro'
      )
    }
  }
)

// Eliminar carro
export const deleteCarro = createAsyncThunk(
  'carros/deleteCarro',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/carros/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al eliminar carro'
      )
    }
  }
)

// Fetch cajoneras de un carro
export const fetchCajoneras = createAsyncThunk(
  'carros/fetchCajoneras',
  async (carroId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/carros/${carroId}/cajoneras`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar cajoneras'
      )
    }
  }
)

// Crear cajonera
export const createCajonera = createAsyncThunk(
  'carros/createCajonera',
  async ({ carroId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/carros/${carroId}/cajoneras`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al crear cajonera'
      )
    }
  }
)

// Actualizar cajonera
export const updateCajonera = createAsyncThunk(
  'carros/updateCajonera',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/carros/cajoneras/${id}`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al actualizar cajonera'
      )
    }
  }
)

// Eliminar cajonera
export const deleteCajonera = createAsyncThunk(
  'carros/deleteCajonera',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/carros/cajoneras/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al eliminar cajonera'
      )
    }
  }
)

// Fetch conductores habilitados
export const fetchConductores = createAsyncThunk(
  'carros/fetchConductores',
  async (carroId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/carros/${carroId}/conductores`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar conductores'
      )
    }
  }
)

// Asignar conductor
export const asignarConductor = createAsyncThunk(
  'carros/asignarConductor',
  async ({ carroId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/carros/${carroId}/conductores`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al asignar conductor'
      )
    }
  }
)

// Eliminar conductor
export const eliminarConductor = createAsyncThunk(
  'carros/eliminarConductor',
  async ({ carroId, bomberoId }, { rejectWithValue }) => {
    try {
      await api.delete(`/carros/${carroId}/conductores/${bomberoId}`)
      return bomberoId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al eliminar conductor'
      )
    }
  }
)

// Fetch mantenciones
export const fetchMantenciones = createAsyncThunk(
  'carros/fetchMantenciones',
  async ({ carroId, tipo, limit }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (tipo) params.append('tipo', tipo)
      if (limit) params.append('limit', limit)
      
      const response = await api.get(`/carros/${carroId}/mantenciones?${params}`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar mantenciones'
      )
    }
  }
)

// Registrar mantencion
export const registrarMantencion = createAsyncThunk(
  'carros/registrarMantencion',
  async ({ carroId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/carros/${carroId}/mantenciones`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al registrar mantención'
      )
    }
  }
)

// Fetch material asignado
export const fetchMaterialCarro = createAsyncThunk(
  'carros/fetchMaterialCarro',
  async ({ carroId, cajoneraId, tipo }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (cajoneraId !== undefined) params.append('cajoneraId', cajoneraId)
      if (tipo) params.append('tipo', tipo)
      
      const response = await api.get(`/carros/${carroId}/material?${params}`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar material'
      )
    }
  }
)

// Asignar material a carro
export const asignarMaterialCarro = createAsyncThunk(
  'carros/asignarMaterialCarro',
  async ({ carroId, data }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/carros/${carroId}/asignar-material`, data)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.details ||
        error.response?.data?.message ||
        'Error al asignar material'
      )
    }
  }
)

// Cambiar material de cajonera
export const cambiarCajonera = createAsyncThunk(
  'carros/cambiarCajonera',
  async ({ asignacionId, cajoneraId }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/carros/asignaciones/${asignacionId}/cambiar-cajonera`, {
        cajoneraId
      })
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cambiar cajonera'
      )
    }
  }
)

// Desasignar material de carro
export const desasignarMaterial = createAsyncThunk(
  'carros/desasignarMaterial',
  async (asignacionId, { rejectWithValue }) => {
    try {
      await api.delete(`/carros/asignaciones/${asignacionId}`)
      return asignacionId
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al desasignar material'
      )
    }
  }
)

// Fetch historial
export const fetchHistorial = createAsyncThunk(
  'carros/fetchHistorial',
  async ({ carroId, tipo, limit }, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams()
      if (tipo) params.append('tipo', tipo)
      if (limit) params.append('limit', limit)
      
      const response = await api.get(`/carros/${carroId}/historial?${params}`)
      return response
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Error al cargar historial'
      )
    }
  }
)

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  // Lista de carros
  carros: [],
  pagination: {
    current: 1,
    pages: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  },

  // Carro seleccionado
  selectedCarro: null,

  // Estadísticas
  estadisticas: null,

  // Alertas
  alertas: null,

  // Cajoneras del carro actual
  cajoneras: [],

  // Conductores del carro actual
  conductores: [],

  // Mantenciones del carro actual
  mantenciones: [],

  // Material asignado al carro actual
  materialAsignado: [],

  // Historial del carro actual
  historial: [],

  // Estados de carga
  loading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  estadisticasLoading: false,
  alertasLoading: false,
  cajonerasLoading: false,
  conductoresLoading: false,
  mantencionesLoading: false,
  materialLoading: false,
  historialLoading: false,

  // Errores
  error: null,
  createError: null,
  updateError: null,
  deleteError: null,

  // Filtros actuales
  filters: {
    search: '',
    tipo: '',
    estadoOperativo: '',
    sortBy: 'nombre',
    sortOrder: 'asc'
  }
}

// ============================================
// SLICE
// ============================================

const carrosSlice = createSlice({
  name: 'carros',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
      state.createError = null
      state.updateError = null
      state.deleteError = null
    },

    clearSelectedCarro: (state) => {
      state.selectedCarro = null
      state.cajoneras = []
      state.conductores = []
      state.mantenciones = []
      state.materialAsignado = []
      state.historial = []
    },

    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },

    resetFilters: (state) => {
      state.filters = initialState.filters
    }
  },

  extraReducers: (builder) => {
    builder
      // Fetch carros
      .addCase(fetchCarros.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCarros.fulfilled, (state, action) => {
        state.loading = false
        state.carros = action.payload.data.data
        state.pagination = action.payload.data.pagination
      })
      .addCase(fetchCarros.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch carro by ID
      .addCase(fetchCarroById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCarroById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedCarro = action.payload.data
      })
      .addCase(fetchCarroById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      // Fetch estadísticas
      .addCase(fetchCarrosEstadisticas.pending, (state) => {
        state.estadisticasLoading = true
      })
      .addCase(fetchCarrosEstadisticas.fulfilled, (state, action) => {
        state.estadisticasLoading = false
        state.estadisticas = action.payload.data
      })
      .addCase(fetchCarrosEstadisticas.rejected, (state, action) => {
        state.estadisticasLoading = false
        state.error = action.payload
      })

      // Fetch alertas
      .addCase(fetchCarrosAlertas.pending, (state) => {
        state.alertasLoading = true
      })
      .addCase(fetchCarrosAlertas.fulfilled, (state, action) => {
        state.alertasLoading = false
        state.alertas = action.payload.data
      })
      .addCase(fetchCarrosAlertas.rejected, (state, action) => {
        state.alertasLoading = false
        state.error = action.payload
      })

      // Create carro
      .addCase(createCarro.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(createCarro.fulfilled, (state, action) => {
        state.createLoading = false
        state.carros.unshift(action.payload.data)
      })
      .addCase(createCarro.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload
      })

      // Update carro
      .addCase(updateCarro.pending, (state) => {
        state.updateLoading = true
        state.updateError = null
      })
      .addCase(updateCarro.fulfilled, (state, action) => {
        state.updateLoading = false
        const index = state.carros.findIndex(c => c.id === action.payload.data.id)
        if (index !== -1) {
          state.carros[index] = action.payload.data
        }
        if (state.selectedCarro?.id === action.payload.data.id) {
          state.selectedCarro = action.payload.data
        }
      })
      .addCase(updateCarro.rejected, (state, action) => {
        state.updateLoading = false
        state.updateError = action.payload
      })

      // Delete carro
      .addCase(deleteCarro.pending, (state) => {
        state.deleteLoading = true
        state.deleteError = null
      })
      .addCase(deleteCarro.fulfilled, (state, action) => {
        state.deleteLoading = false
        state.carros = state.carros.filter(c => c.id !== action.payload)
      })
      .addCase(deleteCarro.rejected, (state, action) => {
        state.deleteLoading = false
        state.deleteError = action.payload
      })

      // Fetch cajoneras
      .addCase(fetchCajoneras.pending, (state) => {
        state.cajonerasLoading = true
      })
      .addCase(fetchCajoneras.fulfilled, (state, action) => {
        state.cajonerasLoading = false
        state.cajoneras = action.payload.data
      })
      .addCase(fetchCajoneras.rejected, (state, action) => {
        state.cajonerasLoading = false
        state.error = action.payload
      })

      // Create cajonera
      .addCase(createCajonera.fulfilled, (state, action) => {
        state.cajoneras.push(action.payload.data)
      })

      // Update cajonera
      .addCase(updateCajonera.fulfilled, (state, action) => {
        const index = state.cajoneras.findIndex(c => c.id === action.payload.data.id)
        if (index !== -1) {
          state.cajoneras[index] = action.payload.data
        }
      })

      // Delete cajonera
      .addCase(deleteCajonera.fulfilled, (state, action) => {
        state.cajoneras = state.cajoneras.filter(c => c.id !== action.payload)
      })

      // Fetch conductores
      .addCase(fetchConductores.pending, (state) => {
        state.conductoresLoading = true
      })
      .addCase(fetchConductores.fulfilled, (state, action) => {
        state.conductoresLoading = false
        state.conductores = action.payload.data
      })
      .addCase(fetchConductores.rejected, (state, action) => {
        state.conductoresLoading = false
        state.error = action.payload
      })

      // Asignar conductor
      .addCase(asignarConductor.fulfilled, (state, action) => {
        state.conductores.push(action.payload.data)
      })

      // Eliminar conductor
      .addCase(eliminarConductor.fulfilled, (state, action) => {
        state.conductores = state.conductores.filter(c => c.bomberoId !== action.payload)
      })

      // Fetch mantenciones
      .addCase(fetchMantenciones.pending, (state) => {
        state.mantencionesLoading = true
      })
      .addCase(fetchMantenciones.fulfilled, (state, action) => {
        state.mantencionesLoading = false
        state.mantenciones = action.payload.data
      })
      .addCase(fetchMantenciones.rejected, (state, action) => {
        state.mantencionesLoading = false
        state.error = action.payload
      })

      // Registrar mantención
      .addCase(registrarMantencion.fulfilled, (state, action) => {
        state.mantenciones.unshift(action.payload.data)
      })

      // Fetch material
      .addCase(fetchMaterialCarro.pending, (state) => {
        state.materialLoading = true
      })
      .addCase(fetchMaterialCarro.fulfilled, (state, action) => {
        state.materialLoading = false
        state.materialAsignado = action.payload.data
      })
      .addCase(fetchMaterialCarro.rejected, (state, action) => {
        state.materialLoading = false
        state.error = action.payload
      })

      // Asignar material
      .addCase(asignarMaterialCarro.fulfilled, (state, action) => {
        state.materialAsignado.push(action.payload.data)
      })

      // Cambiar cajonera
      .addCase(cambiarCajonera.fulfilled, (state, action) => {
        const index = state.materialAsignado.findIndex(m => m.id === action.payload.data.id)
        if (index !== -1) {
          state.materialAsignado[index] = action.payload.data
        }
      })

      // Desasignar material
      .addCase(desasignarMaterial.fulfilled, (state, action) => {
        state.materialAsignado = state.materialAsignado.filter(m => m.id !== action.payload)
      })

      // Fetch historial
      .addCase(fetchHistorial.pending, (state) => {
        state.historialLoading = true
      })
      .addCase(fetchHistorial.fulfilled, (state, action) => {
        state.historialLoading = false
        state.historial = action.payload.data
      })
      .addCase(fetchHistorial.rejected, (state, action) => {
        state.historialLoading = false
        state.error = action.payload
      })
  }
})

// Exportar acciones
export const {
  clearError,
  clearSelectedCarro,
  setFilters,
  resetFilters
} = carrosSlice.actions

export default carrosSlice.reducer
