import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bomberos: [],
  loading: false,
  error: null,
  selectedBombero: null,
}

const bomberosSlice = createSlice({
  name: 'bomberos',
  initialState,
  reducers: {
    fetchBomberosStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchBomberosSuccess: (state, action) => {
      state.loading = false
      state.bomberos = action.payload
      state.error = null
    },
    fetchBomberosFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addBomberoSuccess: (state, action) => {
      state.bomberos.push(action.payload)
    },
    updateBomberoSuccess: (state, action) => {
      const index = state.bomberos.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.bomberos[index] = action.payload
      }
    },
    deleteBomberoSuccess: (state, action) => {
      state.bomberos = state.bomberos.filter(b => b.id !== action.payload)
    },
    selectBombero: (state, action) => {
      state.selectedBombero = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchBomberosStart,
  fetchBomberosSuccess,
  fetchBomberosFailure,
  addBomberoSuccess,
  updateBomberoSuccess,
  deleteBomberoSuccess,
  selectBombero,
  clearError,
} = bomberosSlice.actions

export default bomberosSlice.reducer