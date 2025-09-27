# Guía de Migración: Sistema Administrativo de Bomberos

## Resumen Ejecutivo
Este documento detalla la migración completa de un sistema web estático (HTML/CSS/JS) a una arquitectura moderna full-stack (React + Node.js + SQLite). La migración se realiza en fases para mantener la funcionalidad durante el proceso.

**Estado**: Fase 2 completada ✅ | **Próximo**: Fase 3 - Migración de módulos principales

**Última actualización**: 27 de Septiembre, 2025 - 13:35

## 🔄 Cambios Importantes Desde Última Sesión

### Base de Datos: MySQL → SQLite
- **Decisión**: Cambio de MySQL a SQLite para simplificar desarrollo
- **Razón**: Facilitar configuración y evitar dependencias externas
- **Impacto**: Totalmente funcional, sin pérdida de características

### Puertos de Desarrollo
- **Frontend**: http://localhost:5174 (cambió de 5173 por conflicto)
- **Backend**: http://localhost:3001 (mantenido)
- **CORS**: Configurado para ambos puertos (5173 y 5174)

## Estado Actual del Proyecto

### Proyecto Original
- Proyecto web estático construido con HTML, CSS y JavaScript
- Estructura de carpetas:
  - `/admin` - Panel de administración
  - `/auth` - Sistema de login
  - `/users` - Interfaz de usuarios
  - `/assets` - Recursos estáticos

### Nueva Arquitectura Implementada
- **Frontend**: React 18 + Vite ✅
  - Material-UI 5 para la interfaz ✅
  - Redux Toolkit para manejo de estado ✅
  - React Router para navegación ✅
  - Axios para llamadas API ✅
- **Backend**: Node.js + Express.js ✅
  - Prisma como ORM ✅
  - SQLite como base de datos ✅ (cambio de MySQL)
  - JWT para autenticación ✅
  - bcrypt para encriptación ✅
- **Estructura**: Monorepo (sin Docker) ✅

### Decisiones de Arquitectura Tomadas

#### Tecnologías Seleccionadas y Justificación
- **Express.js vs Alternativas**: Se eligió Express por simplicidad y compatibilidad con JWT ✅
- **Prisma vs Sequelize**: Se eligió Prisma por mejor DX y migración más sencilla ✅
- **SQLite vs MySQL**: Cambio a SQLite para desarrollo local sin dependencias ✅
- **Material-UI**: Para UI consistente y desarrollo rápido ✅
- **Redux Toolkit**: Para estado global centralizado con mejor DX ✅
- **Monorepo**: Para desarrollo unificado sin Docker ✅

#### Estructura de Autenticación Implementada
- **JWT Tokens**: Almacenados en localStorage con expiración de 24h
- **Refresh Strategy**: Token único con validación en cada request
- **Password Security**: bcrypt con salt rounds 12
- **CORS**: Configurado para múltiples puertos de desarrollo

### Características del Usuario Final
- Sistema administrativo interno
- Usuarios: Bomberos, oficiales, administradores
- Módulos: Gestión de personal, citaciones, administración
- Autenticación requerida para todas las funciones

## Progreso Actual

### ✅ Fase 1: Configuración Base (COMPLETADA)
Se ha establecido la estructura base del proyecto:

#### Frontend (/client)
- Configuración de Vite ✅
- Estructura de carpetas React ✅
- Material-UI theme configurado ✅
- Redux store y slices iniciales ✅
- Páginas placeholder creadas ✅:
  - LoginPage (ahora funcional)
  - DashboardPage
  - BomberosPage
  - CitacionesPage
  - OficialesPage
  - AdminPage
- Servicio API con Axios ✅

#### Backend (/server)
- Configuración de Express ✅
- Estructura de carpetas ✅
- Middleware JWT ✅
- Schema de Prisma completo ✅
- Rutas API funcionales ✅:
  - /auth (login, register, profile, logout)
  - /admin
  - /bomberos
  - /citaciones
  - /oficiales

### ✅ Fase 2: Sistema de Autenticación (COMPLETADA)

#### ✅ Backend Implementado
- **Base de datos SQLite**: Configurada y funcionando
- **Prisma Schema**: Completo con modelos User, Bombero, Citacion, Oficial
- **Endpoints de autenticación**:
  - `POST /api/auth/login` ✅ - Login con email/password
  - `POST /api/auth/register` ✅ - Registro de usuarios
  - `GET /api/auth/profile` ✅ - Perfil de usuario autenticado
  - `POST /api/auth/logout` ✅ - Logout con limpieza
- **Middleware JWT**: Completo con verificación y manejo de errores ✅
- **Password Hashing**: bcrypt con salt rounds 12 ✅
- **Seeders**: Datos de prueba con usuarios admin y bombero ✅

#### ✅ Frontend Implementado
- **Formulario de login**: Material-UI completo con validación ✅
- **Redux Integration**: 
  - authSlice con createAsyncThunk ✅
  - Actions: loginUser, logoutUser ✅
  - Estados: loading, error, user, isAuthenticated ✅
- **Persistencia**: Tokens en localStorage ✅
- **Rutas protegidas**: ProtectedRoute component ✅
- **Manejo de errores**: UI con mensajes informativos ✅
- **UX Features**: 
  - Botones de credenciales de prueba ✅
  - Toggle de visibilidad de contraseña ✅
  - Estados de carga durante login ✅

#### ✅ Integración y Pruebas
- **CORS**: Configurado para puertos 5173 y 5174 ✅
- **API Calls**: Axios configurado con baseURL correcta ✅
- **Token Validation**: JWT verificación en backend ✅
- **Flow Testing**: Login → Dashboard → Logout funcional ✅

#### Credenciales de Prueba Configuradas
```
Administrador:
- Email: admin
- Password: 1234
- Rol: Comandante

Bombero:
- Email: bombero@bomberos.cl  
- Password: bomb345
- Rol: Bombero
```

### Archivos Completados en Fases 1-2

#### Frontend Funcional
- `client/vite.config.js` - Configuración de Vite ✅
- `client/src/main.jsx` - Punto de entrada React ✅
- `client/src/App.jsx` - Componente principal con routing ✅
- `client/src/components/Layout.jsx` - Layout principal ✅
- `client/src/components/ProtectedRoute.jsx` - Rutas protegidas ✅
- `client/src/store/store.js` - Configuración Redux ✅
- `client/src/store/slices/authSlice.js` - Auth slice con async actions ✅
- `client/src/store/slices/bomberosSlice.js` - Bomberos slice (placeholder)
- `client/src/store/slices/citacionesSlice.js` - Citaciones slice (placeholder)
- `client/src/theme/theme.js` - Tema Material-UI ✅
- `client/src/services/api.js` - Cliente Axios ✅
- `client/src/pages/LoginPage.jsx` - Login funcional con Material-UI ✅
- `client/src/pages/DashboardPage.jsx` - Dashboard placeholder
- `client/src/pages/BomberosPage.jsx` - Bomberos placeholder  
- `client/src/pages/CitacionesPage.jsx` - Citaciones placeholder
- `client/src/pages/OficialesPage.jsx` - Oficiales placeholder
- `client/src/pages/AdminPage.jsx` - Admin placeholder

#### Backend Funcional
- `server/.env` y `.env.example` - Variables de entorno ✅
- `server/prisma/schema.prisma` - Schema completo SQLite ✅
- `server/prisma/seed.js` - Seeders con datos de prueba ✅
- `server/src/index.js` - Servidor Express completo ✅
- `server/src/middleware/auth.js` - Middleware JWT funcional ✅
- `server/src/utils/auth.js` - Utilidades de autenticación ✅
- `server/src/routes/auth.js` - Rutas auth completas ✅
- `server/src/routes/admin.js` - Rutas admin (placeholder)
- `server/src/routes/bomberos.js` - Rutas bomberos (placeholder)
- `server/src/routes/citaciones.js` - Rutas citaciones (placeholder)
- `server/src/routes/oficiales.js` - Rutas oficiales (placeholder)

#### Base de Datos
- `server/prisma/migrations/` - Migraciones SQLite aplicadas ✅
- `server/dev.db` - Base de datos SQLite con datos de prueba ✅

#### Configuración
- `package.json` (root, client, server) - Dependencias completas ✅
- `README-FULLSTACK.md` - Documentación actualizada ✅

## 📋 Plan de Migración Restante

### 🔄 Fase 3: Migración de Módulos Principales (PRÓXIMO)

El sistema de autenticación está completamente funcional. El siguiente paso es migrar los módulos principales del sistema original HTML/CSS/JS a React components con integración a la base de datos.

#### 3.1 Módulo de Bomberos 
**Prioridad: Alta** | **Estimado: 2-3 sesiones**

##### Tareas Backend:
- [ ] Completar endpoints CRUD en `/server/src/routes/bomberos.js`:
  - `GET /api/bomberos` - Listar bomberos con paginación
  - `GET /api/bomberos/:id` - Obtener bombero específico
  - `POST /api/bomberos` - Crear nuevo bombero
  - `PUT /api/bomberos/:id` - Actualizar bombero
  - `DELETE /api/bomberos/:id` - Eliminar bombero
- [ ] Implementar validaciones con Joi
- [ ] Agregar filtros y búsqueda
- [ ] Implementar carga de imágenes (opcional)

##### Tareas Frontend:
- [ ] Completar `BomberosPage.jsx` con Material-UI DataGrid/Table
- [ ] Crear componentes:
  - `BomberosList.jsx` - Listado con paginación
  - `BomberoForm.jsx` - Formulario crear/editar
  - `BomberoCard.jsx` - Vista detalle
- [ ] Implementar Redux slice completo en `bomberosSlice.js`:
  - Actions: fetchBomberos, createBombero, updateBombero, deleteBombero
  - Estados: loading, error, data, pagination
- [ ] Integrar con sistema de autenticación (permisos)

##### Datos a Migrar:
```javascript
// Del sistema original (users/script.js)
const bomberos = [
  { id: 1, nombre: 'Pedro Sánchez', rango: 'Bombero', especialidad: 'Rescate urbano', activo: true },
  { id: 2, nombre: 'María González', rango: 'Teniente', especialidad: 'Primeros auxilios', activo: true },
  // ... más bomberos del sistema original
]
```

#### 3.2 Módulo de Citaciones
**Prioridad: Alta** | **Estimado: 2-3 sesiones**

##### Tareas Backend:
- [ ] Completar endpoints CRUD en `/server/src/routes/citaciones.js`:
  - `GET /api/citaciones` - Listar citaciones
  - `GET /api/citaciones/:id` - Obtener citación específica
  - `POST /api/citaciones` - Crear nueva citación
  - `PUT /api/citaciones/:id` - Actualizar citación
  - `DELETE /api/citaciones/:id` - Eliminar citación
  - `GET /api/citaciones/bombero/:id` - Citaciones por bombero
- [ ] Implementar relaciones Bombero-Citacion
- [ ] Notificaciones por estado

##### Tareas Frontend:
- [ ] Completar `CitacionesPage.jsx` con filtros por estado/fecha
- [ ] Crear componentes:
  - `CitacionesList.jsx` - Listado con filtros
  - `CitacionForm.jsx` - Formulario crear/editar
  - `CitacionDetail.jsx` - Vista detalle expandida
- [ ] Implementar Redux slice completo
- [ ] Dashboard con estadísticas de citaciones

#### 3.3 Módulo de Oficiales
**Prioridad: Media** | **Estimado: 1-2 sesiones**

##### Tareas Backend:
- [ ] Completar endpoints CRUD en `/server/src/routes/oficiales.js`
- [ ] Implementar jerarquías y rangos
- [ ] Sistema de permisos por oficial

##### Tareas Frontend:
- [ ] Completar `OficialesPage.jsx`
- [ ] Implementar Redux slice
- [ ] Integrar con sistema de permisos

#### 3.4 Panel de Administración
**Prioridad: Media** | **Estimado: 2 sesiones**

##### Tareas Backend:
- [ ] Completar endpoints admin en `/server/src/routes/admin.js`:
  - Estadísticas generales
  - Gestión de usuarios
  - Logs del sistema
  - Configuraciones

##### Tareas Frontend:
- [ ] Completar `AdminPage.jsx` con dashboard
- [ ] Gráficos con Material-UI Charts
- [ ] Gestión de usuarios
- [ ] Configuraciones del sistema

### ✅ Pruebas Completadas Fase 2:
- [x] Login exitoso redirige al dashboard ✅
- [x] Token inválido redirige al login ✅
- [x] Formulario muestra errores correctamente ✅
- [x] Logout limpia el estado ✅
- [x] Persistencia de sesión funciona ✅
- [x] CORS configurado correctamente ✅

### Fase 4: Mejoras y Optimización 🚀
1. Implementar paginación avanzada
2. Agregar búsqueda y filtros complejos  
3. Optimizar rendimiento (lazy loading, memo)
4. Implementar manejo de errores global
5. Agregar validaciones cliente/servidor
6. Tests unitarios y de integración
7. PWA features (offline, notifications)

## Estado Técnico Actual

### Servidores de Desarrollo
```bash
# Frontend (React + Vite)
cd client && npm run dev
# URL: http://localhost:5174

# Backend (Node.js + Express)  
cd server && npm run dev
# URL: http://localhost:3001

# Base de datos (Prisma Studio)
cd server && npx prisma studio
# URL: http://localhost:5555
```

### Variables de Entorno Configuradas
```env
# server/.env (FUNCIONAL)
DATABASE_URL="file:./dev.db"           # SQLite local
JWT_SECRET="bomberos-jwt-secret-2024"  # JWT signing key
JWT_EXPIRES_IN="24h"                   # Token expiration
NODE_ENV="development"                 # Environment
PORT=3001                             # Server port
CORS_ORIGIN="http://localhost:5173"   # CORS policy
```

### Schema de Base de Datos (Implementado)
```prisma
// server/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  nombre    String
  rol       String
  tipo      String   @default("usuario") // admin, usuario
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Bombero {
  id            Int                @id @default(autoincrement())
  nombre        String
  rango         String
  especialidad  String
  telefono      String?
  email         String?
  activo        Boolean            @default(true)
  fechaIngreso  DateTime?
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt
  citaciones    BomberoCitacion[]
}

model Citacion {
  id          Int                @id @default(autoincrement())
  titulo      String
  descripcion String
  fecha       DateTime
  ubicacion   String
  estado      String             @default("programada") // programada, completada, cancelada
  tipo        String             @default("entrenamiento")
  createdAt   DateTime           @default(now())
  updatedAt   DateTime           @updatedAt
  bomberos    BomberoCitacion[]
}

model BomberoCitacion {
  id         Int      @id @default(autoincrement())
  bomberoId  Int
  citacionId Int
  asistio    Boolean  @default(false)
  observaciones String?
  createdAt  DateTime @default(now())
  
  bombero    Bombero  @relation(fields: [bomberoId], references: [id])
  citacion   Citacion @relation(fields: [citacionId], references: [id])
  
  @@unique([bomberoId, citacionId])
}

model Oficial {
  id        Int      @id @default(autoincrement())
  nombre    String
  rango     String
  telefono  String?
  email     String?
  activo    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Estructura de Carpetas (Implementada)
```
/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── components/              # Componentes reutilizables
│   │   │   ├── Layout.jsx          # ✅ Layout principal
│   │   │   └── ProtectedRoute.jsx  # ✅ Rutas protegidas
│   │   ├── pages/                   # Páginas principales
│   │   │   ├── LoginPage.jsx       # ✅ Login funcional
│   │   │   ├── DashboardPage.jsx   # 🔄 Placeholder
│   │   │   ├── BomberosPage.jsx    # 🔄 Para Fase 3
│   │   │   ├── CitacionesPage.jsx  # 🔄 Para Fase 3
│   │   │   ├── OficialesPage.jsx   # 🔄 Para Fase 3
│   │   │   └── AdminPage.jsx       # 🔄 Para Fase 3
│   │   ├── store/                   # Redux store
│   │   │   ├── store.js            # ✅ Store configurado
│   │   │   └── slices/
│   │   │       ├── authSlice.js    # ✅ Auth completo
│   │   │       ├── bomberosSlice.js # 🔄 Placeholder
│   │   │       └── citacionesSlice.js # 🔄 Placeholder
│   │   ├── services/
│   │   │   └── api.js              # ✅ Axios configurado
│   │   ├── theme/
│   │   │   └── theme.js            # ✅ Material-UI theme
│   │   └── utils/                   # Utilidades futuras
│   ├── vite.config.js              # ✅ Configuración Vite
│   └── package.json                # ✅ Dependencias frontend
├── server/                          # Backend Node.js
│   ├── src/
│   │   ├── routes/                  # Rutas API
│   │   │   ├── auth.js             # ✅ Auth completo
│   │   │   ├── bomberos.js         # 🔄 Placeholder para Fase 3
│   │   │   ├── citaciones.js       # 🔄 Placeholder para Fase 3
│   │   │   ├── oficiales.js        # 🔄 Placeholder para Fase 3
│   │   │   └── admin.js            # 🔄 Placeholder para Fase 3
│   │   ├── middleware/
│   │   │   └── auth.js             # ✅ JWT middleware
│   │   ├── utils/
│   │   │   └── auth.js             # ✅ Auth utilities
│   │   └── index.js                # ✅ Express server
│   ├── prisma/
│   │   ├── schema.prisma           # ✅ Schema completo
│   │   ├── seed.js                 # ✅ Datos de prueba
│   │   └── migrations/             # ✅ Migraciones aplicadas
│   ├── .env                        # ✅ Variables configuradas
│   └── package.json                # ✅ Dependencias backend
├── assets/                          # Recursos del sistema original
│   └── bomberos/                    # 🎨 Fotos AI generadas
│       ├── bombero-1.jpg           # ✅ 8 fotos profesionales
│       └── README.md               # ✅ Documentación fotos
├── admin/, auth/, users/            # 📂 Sistema HTML original (mantener)
├── README-FULLSTACK.md             # ✅ Documentación completa
├── MIGRATION-GUIDE.md              # ✅ Esta guía
└── package.json                     # ✅ Scripts principales
```

### Dependencias Instaladas y Verificadas

#### Frontend (client/package.json)
```json
{
  "dependencies": {
    "@emotion/react": "^11.11.1",      # ✅ Material-UI emotions
    "@emotion/styled": "^11.11.0",     # ✅ Material-UI styled
    "@mui/material": "^5.14.20",       # ✅ Material-UI components
    "@mui/icons-material": "^5.14.19", # ✅ Material-UI icons
    "@reduxjs/toolkit": "^1.9.7",      # ✅ Redux Toolkit
    "axios": "^1.6.2",                 # ✅ HTTP client
    "react": "^18.2.0",                # ✅ React 18
    "react-dom": "^18.2.0",            # ✅ React DOM
    "react-redux": "^8.1.3",           # ✅ React Redux
    "react-router-dom": "^6.20.1"      # ✅ React Router
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",  # ✅ Vite React plugin
    "vite": "^5.0.8"                   # ✅ Vite bundler
  }
}
```

#### Backend (server/package.json) 
```json
{
  "dependencies": {
    "@prisma/client": "^5.7.0",        # ✅ Prisma client
    "bcryptjs": "^2.4.3",              # ✅ Password hashing
    "cors": "^2.8.5",                  # ✅ CORS middleware
    "dotenv": "^16.3.1",               # ✅ Environment variables
    "express": "^4.18.2",              # ✅ Express server
    "express-rate-limit": "^7.1.5",    # ✅ Rate limiting
    "helmet": "^7.1.0",                # ✅ Security headers
    "joi": "^17.11.0",                 # ✅ Validation
    "jsonwebtoken": "^9.0.2",          # ✅ JWT tokens
    "morgan": "^1.10.0"                # ✅ HTTP logging
  },
  "devDependencies": {
    "nodemon": "^3.0.2",               # ✅ Auto restart
    "prisma": "^5.7.0"                 # ✅ Prisma CLI
  }
}
```

## Próximos Pasos Detallados

### Inmediatos (Próxima Sesión):
1. **Revisar estado del proyecto**:
   ```bash
   # Verificar servidores
   cd client && npm run dev    # Frontend: localhost:5174
   cd server && npm run dev    # Backend: localhost:3001
   
   # Probar login
   # Credenciales: admin / 1234
   # URL: http://localhost:5174
   ```

2. **Comenzar Fase 3.1 - Módulo Bomberos**:
   - Completar endpoints backend en `/server/src/routes/bomberos.js`
   - Crear componentes React para gestión de bomberos
   - Implementar Redux slice para bomberos

### Plan de Continuidad:

#### Si hay problemas de arranque:
```bash
# Reinstalar dependencias si es necesario
npm install
cd client && npm install
cd ../server && npm install

# Verificar base de datos
cd server
npx prisma migrate dev    # Aplicar migraciones
npx prisma generate      # Generar cliente
node prisma/seed.js      # Recrear datos de prueba
```

#### Si necesitas recordar el contexto:
1. Lee este documento completo
2. Revisa `/client/src/pages/LoginPage.jsx` para ver la implementación auth
3. Revisa `/server/src/routes/auth.js` para ver los endpoints
4. Revisa `/server/prisma/schema.prisma` para ver el modelo de datos
5. Prueba el login en http://localhost:5174

## Comandos Útiles para Continuar

### Desarrollo diario:
```bash
# Terminal 1 - Frontend (usar siempre)
cd client
npm run dev                         # http://localhost:5174

# Terminal 2 - Backend (usar siempre)  
cd server
npm run dev                         # http://localhost:3001

# Terminal 3 - Base de datos (cuando sea necesario)
cd server
npx prisma studio                   # http://localhost:5555
```

### Base de datos:
```bash
cd server

# Ver datos actuales
npx prisma studio

# Resetear datos de prueba
node prisma/seed.js

# Aplicar cambios al schema
npx prisma db push

# Crear nueva migración
npx prisma migrate dev --name "descripcion-cambio"

# Generar cliente después de cambios
npx prisma generate
```

### Debug y mantenimiento:
```bash
# Ver estado de git
git status
git log --oneline -10

# Limpiar node_modules si hay problemas
rm -rf node_modules client/node_modules server/node_modules
npm install
cd client && npm install
cd ../server && npm install

# Ver procesos en puertos (si hay conflictos)
netstat -ano | findstr :3001
netstat -ano | findstr :5174
```

## Estado de Features Implementadas

### ✅ Completamente Funcional:
- **Autenticación**: Login/logout con JWT
- **Base de datos**: SQLite con Prisma
- **Frontend**: React + Material-UI + Redux  
- **Backend**: Express + JWT + bcrypt
- **CORS**: Configurado para desarrollo
- **Validaciones**: Frontend y backend
- **Persistencia**: localStorage para tokens
- **UX**: Botones de prueba, loading states, error handling

### 🔄 Placeholder/Preparado para desarrollo:
- **Módulo Bomberos**: Schema listo, components placeholder
- **Módulo Citaciones**: Schema listo, components placeholder  
- **Módulo Oficiales**: Schema listo, components placeholder
- **Panel Admin**: Routes preparadas, components placeholder
- **Dashboard**: Layout listo, necesita widgets

### 📊 Métricas del Proyecto:
- **Archivos creados/modificados**: ~40
- **Líneas de código**: ~3000+
- **Dependencias**: 25+ packages
- **Endpoints funcionales**: 4 (/auth)
- **Páginas React**: 6 (1 funcional, 5 placeholder)
- **Base de datos**: 5 modelos, ~20 registros de prueba

## Notas Críticas para Continuidad

### ⚠️ Importante recordar:
1. **Puerto cambió**: Frontend en 5174 (no 5173)
2. **Base de datos**: SQLite (no MySQL)
3. **Credenciales de prueba**: `admin/1234` y `bombero@bomberos.cl/bomb345`
4. **CORS**: Configurado para ambos puertos 5173 y 5174
5. **Schema**: Relaciones entre Bombero-Citacion via tabla pivot

### 🚫 Problemas conocidos resueltos:
- ✅ Conflicto de puertos (solucionado con CORS múltiple)
- ✅ MySQL complexity (cambiado a SQLite)  
- ✅ Prisma annotations (corregidas para SQLite)
- ✅ Redux async actions (implementadas correctamente)
- ✅ Material-UI integration (configurada con theme)

### 📁 Archivos clave para referenciar:
- **Auth Flow**: `/client/src/pages/LoginPage.jsx`
- **Redux Store**: `/client/src/store/store.js` y `/client/src/store/slices/authSlice.js`
- **API Client**: `/client/src/services/api.js`
- **Server**: `/server/src/index.js`
- **Database**: `/server/prisma/schema.prisma`
- **Seed Data**: `/server/prisma/seed.js`

## Checklist de Continuación

### ✅ Al retomar desarrollo:
- [ ] Leer este documento completo
- [ ] Ejecutar servidores frontend y backend  
- [ ] Probar login con credenciales de prueba
- [ ] Verificar que dashboard se carga después del login
- [ ] Confirmar que logout funciona correctamente

### ✅ Antes de Fase 3:
- [ ] Login funcional confirmado
- [ ] Base de datos poblada con datos de prueba
- [ ] Todas las dependencias instaladas
- [ ] Servidores corriendo sin errores

### 🎯 Primer objetivo Fase 3:
1. Completar `/server/src/routes/bomberos.js` con CRUD completo
2. Crear `BomberosList.jsx` component con Material-UI Table
3. Implementar Redux actions en `bomberosSlice.js`
4. Conectar `BomberosPage.jsx` con el store

**Próxima sesión**: Comenzar con el módulo de Bomberos siguiendo el plan detallado en Fase 3.1.