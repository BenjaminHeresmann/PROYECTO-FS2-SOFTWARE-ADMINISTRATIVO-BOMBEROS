import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Configurar la URL base de la API
const API_BASE_URL = 'http://localhost:3001/api'

// Acción asíncrona para login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
      return response.data.data // { user, token }
    } catch (error) {
      const message = error.response?.data?.message || 'Error de conexión'
      return rejectWithValue(message)
    }
  }
)

// Acción asíncrona para logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`)
      return true
    } catch (error) {
      // Aún si falla el logout en el servidor, limpiamos el cliente
      return true
    }
  }
)

const initialState = {
  user: null,
  token: localStorage.getItem('bomberosToken') || null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    // Para verificar token existente al cargar la app
    checkAuthToken: (state) => {
      const token = localStorage.getItem('bomberosToken')
      const user = localStorage.getItem('bomberosUser')
      
      if (token && user) {
        try {
          state.token = token
          state.user = JSON.parse(user)
          state.isAuthenticated = true
        } catch (error) {
          // Si hay error al parsear, limpiar todo
          localStorage.removeItem('bomberosToken')
          localStorage.removeItem('bomberosUser')
          state.token = null
          state.user = null
          state.isAuthenticated = false
        }
      } else {
        state.token = null
        state.user = null
        state.isAuthenticated = false
      }
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
        state.token = action.payload.token
        state.error = null
        // Guardar en localStorage
        localStorage.setItem('bomberosToken', action.payload.token)
        localStorage.setItem('bomberosUser', JSON.stringify(action.payload.user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = action.payload
        // Limpiar localStorage
        localStorage.removeItem('bomberosToken')
        localStorage.removeItem('bomberosUser')
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false
        state.user = null
        state.token = null
        state.error = null
        state.loading = false
        // Limpiar localStorage
        localStorage.removeItem('bomberosToken')
        localStorage.removeItem('bomberosUser')
      })
  },
})

export const {
  clearError,
  checkAuthToken,
} = authSlice.actions

// Exportar async actions
export { loginUser, logoutUser }

export default authSlice.reducer