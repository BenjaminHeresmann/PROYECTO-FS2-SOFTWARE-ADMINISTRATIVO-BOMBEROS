import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  citaciones: [],
  loading: false,
  error: null,
  selectedCitacion: null,
}

const citacionesSlice = createSlice({
  name: 'citaciones',
  initialState,
  reducers: {
    fetchCitacionesStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchCitacionesSuccess: (state, action) => {
      state.loading = false
      state.citaciones = action.payload
      state.error = null
    },
    fetchCitacionesFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addCitacionSuccess: (state, action) => {
      state.citaciones.push(action.payload)
    },
    updateCitacionSuccess: (state, action) => {
      const index = state.citaciones.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.citaciones[index] = action.payload
      }
    },
    deleteCitacionSuccess: (state, action) => {
      state.citaciones = state.citaciones.filter(c => c.id !== action.payload)
    },
    selectCitacion: (state, action) => {
      state.selectedCitacion = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const {
  fetchCitacionesStart,
  fetchCitacionesSuccess,
  fetchCitacionesFailure,
  addCitacionSuccess,
  updateCitacionSuccess,
  deleteCitacionSuccess,
  selectCitacion,
  clearError,
} = citacionesSlice.actions

export default citacionesSlice.reducer