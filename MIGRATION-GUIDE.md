# Guía de Migración: Sistema Administrativo de Bomberos

## Resumen Ejecutivo
Este documento detalla la migración completa de un sistema web estático (HTML/CSS/JS) a una arquitectura moderna full-stack (React + Node.js + MySQL). La migración se realiza en fases para mantener la funcionalidad durante el proceso.

**Estado**: Fase 1 completada ✅ | **Próximo**: Fase 2 - Autenticación

## Estado Actual del Proyecto

### Proyecto Original
- Proyecto web estático construido con HTML, CSS y JavaScript
- Estructura de carpetas:
  - `/admin` - Panel de administración
  - `/auth` - Sistema de login
  - `/users` - Interfaz de usuarios
  - `/assets` - Recursos estáticos

### Nueva Arquitectura Acordada
- **Frontend**: React 18 + Vite
  - Material-UI para la interfaz
  - Redux para manejo de estado
  - React Router para navegación
  - Axios para llamadas API
- **Backend**: Node.js + Express.js
  - Prisma como ORM
  - MySQL como base de datos
  - JWT para autenticación
  - bcrypt para encriptación
- **Estructura**: Monorepo (sin Docker)

## Decisiones de Arquitectura Tomadas

### Tecnologías Seleccionadas y Justificación
- **Express.js vs Alternativas**: Se eligió Express por simplicidad y compatibilidad con JWT
- **Prisma vs Sequelize**: Se eligió Prisma por mejor DX y migración más sencilla
- **Material-UI**: Para UI consistente y desarrollo rápido
- **Redux**: Para estado global centralizado
- **Monorepo**: Para desarrollo unificado sin Docker

### Características del Usuario Final
- Sistema administrativo interno
- Usuarios: Bomberos, oficiales, administradores
- Módulos: Gestión de personal, citaciones, administración
- Autenticación requerida para todas las funciones

## Progreso Actual

### Fase 1: Configuración Base ✅ (Completada)
Se ha establecido la estructura base del proyecto:

#### Frontend (/client)
- Configuración de Vite
- Estructura de carpetas React
- Material-UI theme configurado
- Redux store y slices iniciales
- Páginas placeholder creadas:
  - LoginPage
  - DashboardPage
  - BomberosPage
  - CitacionesPage
  - OficialesPage
  - AdminPage
- Servicio API con Axios

#### Backend (/server)
- Configuración de Express
- Estructura de carpetas
- Middleware JWT
- Schema de Prisma inicial
- Rutas API base:
  - /auth
  - /admin
  - /bomberos
  - /citaciones
  - /oficiales

### Archivos Creados en Fase 1
#### Frontend
- `client/vite.config.js` - Configuración de Vite
- `client/src/main.jsx` - Punto de entrada React
- `client/src/App.jsx` - Componente principal
- `client/src/components/Layout.jsx` - Layout principal
- `client/src/components/ProtectedRoute.jsx` - Rutas protegidas
- `client/src/store/store.js` - Configuración Redux
- `client/src/store/slices/` - Slices de Redux (auth, bomberos, citaciones)
- `client/src/theme/theme.js` - Tema Material-UI
- `client/src/services/api.js` - Cliente Axios
- `client/src/pages/` - Páginas placeholder

#### Backend
- `server/.env` y `.env.example` - Variables de entorno
- `server/prisma/schema.prisma` - Schema de base de datos
- `server/src/index.js` - Servidor Express
- `server/src/middleware/auth.js` - Middleware JWT
- `server/src/utils/auth.js` - Utilidades de autenticación
- `server/src/routes/` - Rutas API base

#### Configuración
- `package.json` (root, client, server) - Dependencias y scripts
- `README-FULLSTACK.md` - Documentación del proyecto

## Plan de Migración Restante

### Fase 2: Sistema de Autenticación 🔄 (PRÓXIMO)

#### Tareas Backend
1. **Configurar base de datos MySQL**
   - Ejecutar `npx prisma migrate dev`
   - Verificar conexión a MySQL

2. **Implementar endpoints de autenticación**
   - POST /api/auth/login
   - POST /api/auth/register
   - GET /api/auth/profile
   - POST /api/auth/logout

3. **Completar middleware JWT**
   - Verificación de tokens
   - Refresh tokens
   - Manejo de errores

#### Tareas Frontend
1. **Completar formulario de login**
   - Validación con Material-UI
   - Integración con Redux
   - Manejo de errores

2. **Implementar flujo de autenticación**
   - Persistencia de tokens
   - Redirecciones automáticas
   - Estado de loading

3. **Configurar rutas protegidas**
   - ProtectedRoute component
   - Verificación de permisos
   - Redirección a login

#### Pruebas de la Fase 2
- [ ] Login exitoso redirige al dashboard
- [ ] Token inválido redirige al login
- [ ] Formulario muestra errores correctamente
- [ ] Logout limpia el estado

### Fase 3: Migración de Módulos 📋
1. Módulo de Bomberos
   - Migrar modelo de datos
   - Implementar CRUD API
   - Crear interfaz React
   - Integrar con Redux

2. Módulo de Citaciones
   - Migrar modelo de datos
   - Implementar CRUD API
   - Crear interfaz React
   - Integrar con Redux

3. Módulo de Oficiales
   - Migrar modelo de datos
   - Implementar CRUD API
   - Crear interfaz React
   - Integrar con Redux

4. Panel de Administración
   - Migrar funcionalidades admin
   - Implementar CRUD API
   - Crear interfaz React
   - Integrar con Redux

### Fase 4: Mejoras y Optimización 🚀
1. Implementar paginación
2. Agregar búsqueda y filtros
3. Optimizar rendimiento
4. Implementar manejo de errores
5. Agregar validaciones

## Detalles Técnicos

### Variables de Entorno Requeridas
```env
# server/.env
DATABASE_URL="mysql://username:password@localhost:3306/bomberos_db"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"
PORT=5000
```

### Schema de Base de Datos (Prisma)
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
  OFICIAL
}

model Bombero {
  id        Int      @id @default(autoincrement())
  nombre    String
  rango     String
  telefono  String?
  email     String?
  activo    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Citacion {
  id          Int      @id @default(autoincrement())
  bomberoId   Int
  motivo      String
  descripcion String?
  fecha       DateTime
  estado      EstadoCitacion @default(PENDIENTE)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  bombero     Bombero  @relation(fields: [bomberoId], references: [id])
}

enum EstadoCitacion {
  PENDIENTE
  COMPLETADA
  CANCELADA
}
```

### Estructura de Carpetas
```
/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── utils/
│   ├── vite.config.js
│   └── package.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── utils/
│   ├── prisma/
│   └── package.json
└── shared/
```

### Dependencias Principales

#### Frontend
```json
{
  "dependencies": {
    "@emotion/react": "^11.x",
    "@emotion/styled": "^11.x",
    "@mui/material": "^5.x",
    "@reduxjs/toolkit": "^1.x",
    "axios": "^1.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-redux": "^8.x",
    "react-router-dom": "^6.x"
  }
}
```

#### Backend
```json
{
  "dependencies": {
    "@prisma/client": "^5.x",
    "bcrypt": "^5.x",
    "express": "^4.x",
    "jsonwebtoken": "^9.x",
    "joi": "^17.x",
    "morgan": "^1.x",
    "helmet": "^7.x",
    "dotenv": "^16.x"
  }
}
```

## Próximos Pasos

1. Revisar la configuración base (Fase 1)
2. Comenzar con la implementación del sistema de autenticación (Fase 2)
3. Migrar gradualmente cada módulo (Fase 3)
4. Implementar optimizaciones (Fase 4)

## Notas Importantes
- No se requiere configuración de Docker
- Desarrollo local solamente
- Migración gradual para mantener funcionalidad
- Pruebas manuales en cada fase
- Mantener compatibilidad con MySQL existente

## Comandos Útiles

```bash
# Configuración inicial (ejecutar una sola vez)
npm install                          # Instalar dependencias root
cd client && npm install            # Instalar dependencias frontend
cd ../server && npm install         # Instalar dependencias backend

# Base de datos
cd server
npx prisma generate                 # Generar cliente Prisma
npx prisma migrate dev              # Aplicar migraciones
npx prisma studio                   # Abrir Prisma Studio

# Desarrollo (ejecutar en terminales separados)
# Terminal 1 - Frontend
cd client
npm run dev                         # http://localhost:5173

# Terminal 2 - Backend  
cd server
npm run dev                         # http://localhost:5000

# Utilidades
npx prisma db push                  # Sincronizar schema sin migración
npx prisma migrate reset            # Resetear base de datos (¡cuidado!)
```

## Problemas Comunes y Soluciones

### Problema: Live Server no funciona
**Causa**: Conflicto con nueva estructura
**Solución**: Usar `npm run dev` desde `/client`

### Problema: Error de conexión MySQL
**Verificar**: 
- MySQL server ejecutándose
- Variables en .env correctas
- Base de datos existe

### Problema: JWT no funciona
**Verificar**: 
- JWT_SECRET definido en .env
- Headers Authorization en requests
- Token válido y no expirado

## Checklist de Continuación

### Antes de empezar Fase 2:
- [ ] Revisar que todos los archivos de Fase 1 existan
- [ ] Verificar que dependencies estén instaladas
- [ ] Confirmar conexión MySQL funcional
- [ ] Revisar variables de entorno configuradas

### Al retomar el trabajo:
1. Leer este documento completo
2. Ejecutar `npm install` si es necesario
3. Verificar estado de la base de datos
4. Iniciar con Fase 2: implementar login funcional