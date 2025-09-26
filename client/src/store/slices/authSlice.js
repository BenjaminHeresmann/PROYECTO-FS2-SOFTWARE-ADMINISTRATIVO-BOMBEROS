import { createSlice } from '@reduxjs/toolkit'

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
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      // Guardar token en localStorage
      localStorage.setItem('bomberosToken', action.payload.token)
      localStorage.setItem('bomberosUser', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
      // Limpiar localStorage
      localStorage.removeItem('bomberosToken')
      localStorage.removeItem('bomberosUser')
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      // Limpiar localStorage
      localStorage.removeItem('bomberosToken')
      localStorage.removeItem('bomberosUser')
    },
    clearError: (state) => {
      state.error = null
    },
    // Para verificar token existente al cargar la app
    checkAuthToken: (state) => {
      const token = localStorage.getItem('bomberosToken')
      const user = localStorage.getItem('bomberosUser')
      
      if (token && user) {
        state.token = token
        state.user = JSON.parse(user)
        state.isAuthenticated = true
      } else {
        state.token = null
        state.user = null
        state.isAuthenticated = false
      }
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  clearError,
  checkAuthToken,
} = authSlice.actions

export default authSlice.reducer