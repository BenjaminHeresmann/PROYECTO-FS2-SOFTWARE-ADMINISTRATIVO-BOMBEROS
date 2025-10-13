import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice.js'
import bomberosSlice from './slices/bomberosSlice.js'
import citacionesSlice from './slices/citacionesSlice.js'
import cargosSlice from './slices/cargosSlice.js'
import categoriasSlice from './slices/categoriasSlice.js'
import materialSlice from './slices/materialSlice.js'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    bomberos: bomberosSlice,
    citaciones: citacionesSlice,
    cargos: cargosSlice,
    categorias: categoriasSlice,
    material: materialSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export default store