# 🚒 Sistema Administrativo de Bomberos - Full Stack

Sistema completo de administración para la Segunda Compañía de Bomberos Viña del Mar, desarrollado con React + Node.js + SQLite + Prisma.

**Estado**: ✅ **SISTEMA COMPLETO Y FUNCIONAL** | **100 bomberos + Material + Carros implementados**

**Última actualización**: 14 de Octubre, 2025

---

## 🏗️ Arquitectura

```
📁 sistema-bomberos-fullstack/
├── 📁 client/          # Frontend React + Vite + Material-UI
├── 📁 server/          # Backend Express + Prisma + SQLite
├── 📁 assets/          # Recursos estáticos (8 fotos bomberos + logo)
├── 📄 package.json     # Configuración del monorepo
└── 📄 README.md        # Documentación completa
```

## 🚀 Tecnologías

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Material-UI (MUI) 5** - Componentes de interfaz
- **Redux Toolkit** - Manejo de estado global
- **React Router 6** - Enrutamiento SPA
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Prisma** - ORM y migraciones
- **SQLite** - Base de datos embebida
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **Joi** - Validación de esquemas

## 📋 Requisitos Previos

- Node.js >= 16.0.0
- npm >= 7.0.0

## 🛠️ Instalación Rápida

```bash
# 1. Clonar repositorio
git clone https://github.com/duoc-fullstack2-9v/team_16.git
cd team_16
git checkout feature/proyecto-administracion-bomberos

# 2. Instalar dependencias (root, client y server)
npm install

# 3. Configurar variables de entorno
cd server
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Configurar base de datos
npx prisma migrate dev
npx prisma generate

# 5. Cargar datos de prueba (100 bomberos + material + carros)
node prisma/seed-100-bomberos.js

# 6. Volver a la raíz y ejecutar aplicación
cd ..
npm run dev
```

Esto iniciará:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3002

## 👤 Credenciales de Prueba

### Administrador
- **Usuario**: admin
- **Contraseña**: 1234

### Usuarios Bomberos
- **Email**: bombero@bomberos.cl
- **Contraseña**: bomb345

## 📊 Datos de Prueba Incluidos

El seed `seed-100-bomberos.js` carga:
- **100 Bomberos** chilenos con nombres reales
  - 85 en estado "Activo"
  - 10 en estado "Licencia"
  - 5 en estado "Inactivo"
  - Todos con rango "Bombero" (sin jerarquías)
  - Fotos asignadas cíclicamente (bombero-1.jpg a bombero-8.jpg)
- **12 Cargos** organizacionales (Administrativos, Operativos, Consejos)
- **5 Citaciones** de ejemplo
- **8 Categorías** de material (EPP, Herramientas, Comunicación, Médico)
- **8 Items de Material Menor** (cascos, radios, guantes, botiquines, etc.)
- **4 Carros Bomberos** (2 bombas, 1 escala, 1 rescate)

## 🎯 Estado del Sistema

### ✅ **MÓDULOS COMPLETAMENTE FUNCIONALES**

#### **1. 🔐 Sistema de Autenticación**
- Login/logout con JWT
- Protección de rutas
- Persistencia de sesión
- Validaciones frontend/backend

#### **2. 👨‍🚒 Módulo Bomberos** 
- ✅ CRUD completo con validación Joi
- ✅ **100 bomberos** cargados en base de datos
- ✅ Componentes React (BomberosList, BomberoForm, BomberoCard)
- ✅ Redux state management con async actions
- ✅ UI: Filtros por estado/rango, búsqueda, paginación (10 por página)
- ✅ Eliminación con confirmación
- ✅ Integración frontend-backend 100% funcional
- ✅ Fotos de perfil servidas desde backend (/assets/bomberos/)

#### **3. 📅 Módulo Citaciones**
- ✅ CRUD con relaciones complejas Citacion ↔ Bombero
- ✅ Asignación de bomberos a citaciones
- ✅ Control de asistencia post-evento
- ✅ Estadísticas y reportes
- ✅ Frontend: CitacionCard, CitacionForm, CitacionesList
- ✅ Redux: State management completo
- ✅ UI: Filtros avanzados, gestión de asistencia

#### **4. 👨‍💼 Módulo Cargos (Oficiales)**
- ✅ CRUD completo para cargos organizacionales
- ✅ Sistema de 3 ramas: ADMINISTRATIVA, OPERATIVA, CONSEJOS
- ✅ 12 cargos con jerarquías y límites de ocupantes
- ✅ Asignación de bomberos a cargos
- ✅ Historial de asignaciones con períodos
- ✅ Estadísticas por rama y jerarquía
- ✅ Frontend: CargosList, AsignarCargoDialog, LiberarCargoDialog
- ✅ Backend: Rutas corregidas (/estadisticas antes de /:id)

#### **5. 🧰 Módulo Material Menor**
- ✅ CRUD completo de material
- ✅ Sistema de categorías jerárquico (padre-hijo)
- ✅ Tipos: Individual (con N° serie) y Cantidad (con stock)
- ✅ 8 categorías organizadas (EPP, Herramientas, Comunicación, Médico)
- ✅ Control de ubicación física y fechas
- ✅ Estadísticas y alertas de stock
- ✅ Asignación de material a bomberos y carros

#### **6. 🚛 Módulo Material Mayor (Carros)**
- ✅ CRUD de carros bomberos
- ✅ 4 carros implementados (Bombas, Escala, Rescate)
- ✅ Gestión de cajoneras por carro
- ✅ Asignación de material a cajoneras
- ✅ Historial de cambios y mantenciones
- ✅ Conductores habilitados por carro
- ✅ Estadísticas operacionales
- ✅ Sistema de tabs (Carros, Cajoneras, Historial)

#### **7. 🌙 Módulo Guardias Nocturnas**
- ✅ Creación de guardias mensuales
- ✅ Sistema de plantillas reutilizables
- ✅ Asignación de bomberos por día
- ✅ Calendario visual mensual
- ✅ Control de disponibilidad de bomberos

#### **8. 📊 Dashboard Administrativo**
- ✅ Estadísticas generales del sistema
- ✅ Métricas de bomberos por estado
- ✅ Resumen de citaciones
- ✅ Estado de cargos organizacionales
- ✅ Alertas de material y carros
- ✅ Interfaz responsive con Material-UI

## 🔧 APIs Backend Implementadas

### Autenticación
```
POST /api/auth/login     # Login con email/password o usuario
POST /api/auth/logout    # Logout (limpia token)
GET  /api/auth/me        # Datos del usuario autenticado
```

### Bomberos
```
GET    /api/bomberos                    # Lista con filtros y paginación
POST   /api/bomberos                    # Crear nuevo bombero
GET    /api/bomberos/:id                # Obtener bombero específico
PUT    /api/bomberos/:id                # Actualizar bombero
DELETE /api/bomberos/:id                # Eliminar bombero
GET    /api/bomberos/stats/general      # Estadísticas generales
```

### Cargos
```
GET    /api/cargos                      # Lista de todos los cargos
POST   /api/cargos                      # Crear nuevo cargo
GET    /api/cargos/estadisticas         # Estadísticas por rama
GET    /api/cargos/:id                  # Obtener cargo específico
PUT    /api/cargos/:id                  # Actualizar cargo
DELETE /api/cargos/:id                  # Eliminar cargo
POST   /api/cargos/:id/asignar          # Asignar bombero a cargo
POST   /api/cargos/:id/liberar          # Liberar cargo
GET    /api/cargos/:id/historial        # Historial de asignaciones
```

### Citaciones
```
GET    /api/citaciones                                          # Lista con filtros
POST   /api/citaciones                                          # Crear citación
GET    /api/citaciones/:id                                      # Detalles específicos
PUT    /api/citaciones/:id                                      # Actualizar citación
DELETE /api/citaciones/:id                                      # Eliminar citación
POST   /api/citaciones/:id/asignar                             # Asignar bomberos
PUT    /api/citaciones/:id/bomberos/:bomberoId/asistencia      # Control asistencia
GET    /api/citaciones/stats/general                           # Estadísticas
```

### Material Menor
```
GET    /api/material                    # Lista de material
POST   /api/material                    # Crear material
GET    /api/material/:id                # Obtener material específico
PUT    /api/material/:id                # Actualizar material
DELETE /api/material/:id                # Eliminar material
GET    /api/material/estadisticas       # Estadísticas de material
GET    /api/material/alertas            # Alertas de stock bajo
POST   /api/material/:id/asignar        # Asignar a bombero/carro
```

### Categorías
```
GET    /api/categorias                  # Árbol de categorías
POST   /api/categorias                  # Crear categoría
GET    /api/categorias/:id              # Obtener categoría
PUT    /api/categorias/:id              # Actualizar categoría
DELETE /api/categorias/:id              # Eliminar categoría
```

### Material Mayor (Carros)
```
GET    /api/carros                      # Lista de carros
POST   /api/carros                      # Crear carro
GET    /api/carros/:id                  # Obtener carro específico
PUT    /api/carros/:id                  # Actualizar carro
DELETE /api/carros/:id                  # Eliminar carro
GET    /api/carros/estadisticas         # Estadísticas operacionales
GET    /api/carros/alertas              # Alertas de mantenimiento
POST   /api/carros/:id/cajoneras        # Crear cajonera
PUT    /api/carros/:id/cajoneras/:cid   # Actualizar cajonera
DELETE /api/carros/:id/cajoneras/:cid   # Eliminar cajonera
POST   /api/carros/:id/conductores      # Habilitar conductor
```

### Guardias Nocturnas
```
GET    /api/guardias/mensuales          # Lista de guardias mensuales
POST   /api/guardias/mensuales          # Crear guardia mensual
GET    /api/guardias/mensuales/:id      # Obtener guardia específica
PUT    /api/guardias/mensuales/:id      # Actualizar guardia
DELETE /api/guardias/mensuales/:id      # Eliminar guardia
POST   /api/guardias/mensuales/:id/aplicar-plantilla  # Aplicar plantilla
GET    /api/guardias/plantillas         # Lista de plantillas
POST   /api/guardias/plantillas         # Crear plantilla
GET    /api/guardias/bomberos           # Bomberos disponibles para guardia
```

## 🗄️ Esquema de Base de Datos

```sql
-- Usuarios del sistema
User (id, email, password, nombre, rol, tipo, activo, createdAt, updatedAt)

-- Bomberos (100 registros)
Bombero (id, nombres, apellidos, rango, especialidad, estado, telefono, email, direccion, fechaIngreso, fotoUrl, createdById, createdAt, updatedAt)

-- Cargos organizacionales (12 registros)
Cargo (id, nombre, descripcion, rama, jerarquia, maxOcupantes, activo, createdAt, updatedAt)

-- Asignaciones de cargos
AsignacionCargo (id, cargoId, bomberoId, fechaInicio, fechaFin, periodoAnio, activo, observaciones, createdAt, updatedAt)

-- Citaciones
Citacion (id, titulo, fecha, hora, lugar, motivo, estado, createdById, createdAt, updatedAt)

-- Relación Many-to-Many Bomberos ↔ Citaciones
BomberoCitacion (id, bomberoId, citacionId, asistio, observaciones, createdAt)

-- Categorías de material (jerárquico)
Categoria (id, nombre, descripcion, icono, parentId, activo, createdAt, updatedAt)

-- Material menor (8 items)
Material (id, nombre, descripcion, categoriaId, estado, tipo, numeroSerie, cantidad, unidadMedida, fechaAdquisicion, ubicacionFisica, activo, createdAt, updatedAt)

-- Asignaciones de material
AsignacionMaterial (id, materialId, bomberoId, carroId, cajoneraId, cantidad, fechaAsignacion, fechaDevolucion, estadoDevolucion, observaciones, createdAt)

-- Carros bomberos (4 registros)
Carro (id, nombre, tipo, marca, modelo, anioFabricacion, patente, estadoOperativo, capacidadAgua, capacidadEspuma, potenciaMotobomba, caracteristicas, activo, createdAt, updatedAt)

-- Cajoneras por carro
Cajonera (id, carroId, nombre, descripcion, posicion, capacidad, activo, createdAt, updatedAt)

-- Conductores habilitados
ConductorHabilitado (id, carroId, bomberoId, fechaHabilitacion, vigente, observaciones, createdAt, updatedAt)

-- Historial de carros
HistorialCarro (id, carroId, tipo, descripcion, fecha, realizadoPor, createdAt)

-- Guardias mensuales
GuardiaMensual (id, mes, anio, descripcion, activo, createdAt, updatedAt)

-- Días de guardia
GuardiaDia (id, guardiaMensualId, dia, activo, observaciones, createdAt)

-- Bomberos por día de guardia
GuardiaDiaBombero (id, guardiaDiaId, bomberoId, rol, observaciones, createdAt)

-- Plantillas de guardias
PlantillaGuardia (id, nombre, descripcion, activo, createdAt, updatedAt)
PlantillaDia (id, plantillaGuardiaId, numeroDia, nombreDia, createdAt)
PlantillaDiaBombero (id, plantillaDiaId, posicion, createdAt)
```

## 📁 Estructura del Proyecto

### Client (Frontend React)
```
client/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── Layout.jsx      # ✅ Layout principal con navegación
│   │   ├── ProtectedRoute.jsx # ✅ Rutas protegidas por autenticación
│   │   ├── ErrorBoundary.jsx  # ✅ Manejo de errores React
│   │   ├── bomberos/       # ✅ BomberoCard, BomberoForm, BomberosList
│   │   ├── cargos/         # ✅ CargosList, AsignarCargoDialog, etc.
│   │   ├── citaciones/     # ✅ CitacionCard, CitacionForm, etc.
│   │   ├── carros/         # ✅ CarroCard, CarroForm, CajoneraForm, etc.
│   │   └── guardias/       # ✅ Plantillas, calendario mensual
│   ├── pages/              # Páginas de la aplicación
│   │   ├── LoginPage.jsx   # ✅ Login funcional con validación
│   │   ├── DashboardPage.jsx # ✅ Dashboard con estadísticas
│   │   ├── BomberosPage.jsx  # ✅ Gestión de 100 bomberos
│   │   ├── CitacionesPage.jsx # ✅ Gestión de citaciones
│   │   ├── OficialesPage.jsx  # ✅ Gestión de cargos
│   │   ├── MaterialMenorPage.jsx # ✅ Gestión de material
│   │   ├── MaterialMayorPage.jsx # ✅ Gestión de carros
│   │   ├── GuardiasPage.jsx      # ✅ Guardias nocturnas
│   │   └── AdminPage.jsx   # ✅ Panel admin
│   ├── store/              # Redux store
│   │   ├── index.js        # ✅ Store configurado con serialization
│   │   └── slices/         # Slices de Redux
│   │       ├── authSlice.js       # ✅ Autenticación
│   │       ├── bomberosSlice.js   # ✅ Bomberos
│   │       ├── citacionesSlice.js # ✅ Citaciones
│   │       ├── cargosSlice.js     # ✅ Cargos
│   │       ├── materialSlice.js   # ✅ Material menor
│   │       ├── categoriasSlice.js # ✅ Categorías
│   │       ├── carrosSlice.js     # ✅ Material mayor
│   │       ├── guardiasSlice.js   # ✅ Guardias
│   │       └── oficialesSlice.js  # ✅ Oficiales
│   ├── services/
│   │   └── api.js          # ✅ Cliente Axios (corregido serialization)
│   ├── utils/
│   │   └── theme.js        # ✅ Tema Material-UI personalizado
│   └── main.jsx            # ✅ Punto de entrada React
├── index.html              # HTML principal
├── vite.config.js          # ✅ Vite con proxy /api y /assets
└── package.json           # Dependencias frontend
```

### Server (Backend Node.js)
```
server/
├── src/
│   ├── routes/             # Rutas de la API
│   │   ├── auth.js         # ✅ Autenticación JWT
│   │   ├── bomberos.js     # ✅ CRUD bomberos
│   │   ├── citaciones.js   # ✅ CRUD citaciones
│   │   ├── cargos.js       # ✅ CRUD cargos (corregido routing)
│   │   ├── material.js     # ✅ CRUD material menor
│   │   ├── categorias.js   # ✅ CRUD categorías
│   │   ├── carros.js       # ✅ CRUD carros y cajoneras
│   │   ├── guardias.js     # ✅ CRUD guardias
│   │   ├── oficiales.js    # ✅ CRUD oficiales
│   │   └── admin.js        # ✅ Rutas administrativas
│   ├── middleware/
│   │   └── auth.js         # ✅ Middleware JWT con verificación
│   ├── utils/
│   │   └── auth.js         # ✅ Utilidades de autenticación
│   └── index.js            # ✅ Servidor Express configurado
├── prisma/
│   ├── schema.prisma       # ✅ Esquema completo (15 modelos)
│   ├── seed.js             # ✅ Seed original (10 bomberos)
│   ├── seed-100-bomberos.js # ✅ Seed nuevo (100 bomberos + material)
│   └── migrations/         # ✅ 10 migraciones aplicadas
├── .env                    # ✅ Variables de entorno (JWT_SECRET, etc.)
├── .env.example            # Plantilla de variables
└── package.json            # Dependencias backend
```

### Assets
```
assets/
└── bomberos/
    ├── bombero-1.jpg       # ✅ 1.6 MB
    ├── bombero-2.jpg       # ✅ 2.1 MB
    ├── bombero-3.jpg       # ✅ 2.0 MB
    ├── bombero-4.jpg       # ✅ 2.0 MB
    ├── bombero-5.jpg       # ✅ 2.0 MB
    ├── bombero-6.jpg       # ✅ 2.1 MB
    ├── bombero-7.jpg       # ✅ 2.0 MB
    ├── bombero-8.jpg       # ✅ 2.0 MB
    └── README.md           # Documentación de assets
```

## 🚀 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecuta client (5173) y server (3002) en modo desarrollo |
| `npm run dev:client` | Solo frontend en modo desarrollo |
| `npm run dev:server` | Solo backend en modo desarrollo |
| `npm run install:all` | Instala dependencias de root, client y server |
| `npm run build` | Construye client y server para producción |
| `npm run start` | Inicia el servidor en producción |
| `npm run prisma:studio` | Abre Prisma Studio (GUI para BD) |
| `npm run prisma:migrate` | Ejecuta migraciones pendientes |
| `npm run prisma:generate` | Regenera cliente Prisma |

### Scripts de Base de Datos
```bash
cd server

# Ver datos en Prisma Studio (GUI)
npx prisma studio

# Aplicar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Cargar 100 bomberos + material + carros
node prisma/seed-100-bomberos.js

# Cargar seed original (10 bomberos)
node prisma/seed.js

# Reset completo de BD
npx prisma migrate reset
```

## 🌟 Características Implementadas

### Frontend
- ✅ **Material-UI 5**: Interfaz profesional y responsive
- ✅ **Redux Toolkit 2**: Manejo de estado global con 9 slices
- ✅ **React Router 6**: Navegación SPA con rutas protegidas
- ✅ **Vite 5**: Build tool con HMR y proxy configurado
- ✅ **Formularios**: Validación completa y manejo de errores
- ✅ **Tablas**: Paginación, filtros avanzados, búsqueda
- ✅ **Modales**: Confirmaciones, asignaciones, detalles
- ✅ **Loading States**: Skeletons y spinners
- ✅ **Error Handling**: ErrorBoundary y manejo global
- ✅ **Optimizaciones**: SerializableCheck configurado correctamente

### Backend
- ✅ **API REST**: 60+ endpoints CRUD completos
- ✅ **Validación**: Joi schemas en todos los endpoints
- ✅ **Autenticación**: JWT con middleware de protección
- ✅ **Base de Datos**: Prisma ORM con SQLite
- ✅ **Relaciones**: Many-to-many, One-to-many, jerárquicas
- ✅ **Transacciones**: Operaciones atómicas en asignaciones
- ✅ **Estadísticas**: Endpoints agregados para dashboards
- ✅ **CORS**: Configurado para desarrollo seguro
- ✅ **Assets**: Servidor de archivos estáticos (/assets)
- ✅ **Migraciones**: 10 migraciones aplicadas

### Seguridad
- ✅ **JWT**: Tokens seguros con expiración configurable
- ✅ **bcrypt**: Encriptación de contraseñas con salt rounds 12
- ✅ **Validación**: Doble validación frontend y backend
- ✅ **CORS**: Configuración restrictiva por origen
- ✅ **Middleware**: Protección de rutas sensibles
- ✅ **Environment**: Variables sensibles en .env

## 📊 Métricas del Sistema

- **Archivos implementados**: 101
- **Líneas de código**: +31,751
- **Endpoints API**: 60+
- **Páginas React**: 8 funcionales
- **Componentes**: 50+
- **Modelos de BD**: 15 completos
- **Redux Slices**: 9 implementados
- **Migraciones**: 10 aplicadas
- **Assets**: 9 archivos (~16MB)
- **Funcionalidad**: 100% completa

## 🎯 Funcionalidades Avanzadas

### Dashboard
- Estadísticas generales del sistema en tiempo real
- Métricas de bomberos por estado (Activo, Licencia, Inactivo)
- Resumen de citaciones programadas y realizadas
- Estado de ocupación de cargos organizacionales
- Alertas de material con stock bajo
- Alertas de carros en mantenimiento

### Gestión de Bomberos (100 registros)
- CRUD completo con validaciones frontend y backend
- Filtros por rango, estado, especialidad
- Búsqueda en tiempo real por nombre
- Paginación eficiente (10 por página, 10 páginas)
- Fotos de perfil servidas desde backend
- Estadísticas generales agregadas

### Gestión de Citaciones
- CRUD completo con asignación múltiple de bomberos
- Control de asistencia post-evento
- Filtros por estado, fecha, tipo
- Estadísticas de participación
- Historial completo de asistencias

### Gestión de Cargos
- Sistema de 3 ramas organizacionales (Administrativa, Operativa, Consejos)
- 12 cargos con jerarquías y límites de ocupantes
- Asignación con períodos anuales
- Liberación de cargos con fechas
- Historial completo de asignaciones
- Estadísticas por rama

### Gestión de Material Menor
- CRUD con categorías jerárquicas (padre-hijo)
- Tipos: Individual (N° serie) y Cantidad (stock)
- Control de ubicación física
- Alertas de stock mínimo
- Asignación a bomberos y carros
- Historial de asignaciones

### Gestión de Carros (Material Mayor)
- 4 carros bomberos (Bombas, Escala, Rescate)
- Sistema de cajoneras por carro
- Asignación de material a cajoneras
- Conductores habilitados
- Historial de cambios y mantenciones
- Características técnicas en JSON
- Alertas de mantención programada

### Guardias Nocturnas
- Creación de calendarios mensuales
- Sistema de plantillas reutilizables
- Asignación de bomberos por día
- Vista de calendario visual
- Control de disponibilidad

## 🔧 Desarrollo y Mantenimiento

### Variables de Entorno
```env
# server/.env
DATABASE_URL="file:./dev.db"
JWT_SECRET="tu-secreto-jwt-super-seguro-2025"
JWT_EXPIRES_IN="24h"
NODE_ENV="development"
PORT=3002
CORS_ORIGIN="http://localhost:5173"
```

### Puertos Configurados
- **Frontend (Vite)**: 5173
- **Backend (Express)**: 3002
- **Prisma Studio**: 5555 (cuando se ejecuta)

### Comandos Útiles
```bash
# Desarrollo diario
npm run dev                    # Inicia frontend (5173) y backend (3002)

# Base de datos
cd server
npx prisma studio             # Interface gráfica BD (puerto 5555)
npx prisma migrate reset      # Resetear BD completa
node prisma/seed-100-bomberos.js  # Cargar 100 bomberos

# Debug y producción
cd client && npm run build    # Build frontend para producción
cd server && npm start        # Servidor en modo producción

# Git
git status                     # Ver estado de cambios
git add .                      # Agregar todos los cambios
git commit -m "mensaje"        # Commit con mensaje
git push origin feature/proyecto-administracion-bomberos  # Push a rama
```

## 🚀 Mejoras Futuras Sugeridas

### Funcionalidades Adicionales
- [ ] **Reportes PDF**: Exportación de listados y estadísticas
- [ ] **Exportación Excel**: Datos de bomberos, material, carros
- [ ] **Notificaciones Push**: Sistema de alertas en tiempo real
- [ ] **Calendario Completo**: Vista calendario para citaciones y guardias
- [ ] **Gestión de Cursos**: Módulo de capacitaciones y certificaciones
- [ ] **Sistema de Licencias**: Control de licencias médicas y permisos
- [ ] **Chat Interno**: Mensajería entre bomberos
- [ ] **App Móvil**: React Native para iOS/Android
- [ ] **Firma Digital**: Firma de asistencias y documentos
- [ ] **Geolocalización**: Ubicación de bomberos en servicio

### Optimizaciones Técnicas
- [ ] **Testing**: Jest + React Testing Library + Vitest
- [ ] **Performance**: 
  - Lazy loading de componentes
  - Memoización con useMemo/useCallback
  - Virtual scrolling para listas largas
- [ ] **PWA**: Service workers, offline first, instalable
- [ ] **Docker**: Contenedorización completa (docker-compose)
- [ ] **CI/CD**: GitHub Actions para deploy automático
- [ ] **Monitoring**: Sentry para errores, Analytics
- [ ] **SEO**: Optimización para motores de búsqueda
- [ ] **i18n**: Internacionalización (español/inglés)

### Escalabilidad
- [ ] **PostgreSQL**: Migración de SQLite a PostgreSQL
- [ ] **Redis**: Cache para sesiones y queries frecuentes
- [ ] **S3/CloudStorage**: Almacenamiento de fotos en la nube
- [ ] **Load Balancer**: Escalado horizontal del backend
- [ ] **Microservicios**: Separación de módulos en servicios independientes

## 📞 Soporte Técnico

### Enlaces Útiles
- [React Documentation](https://react.dev/)
- [Material-UI Components](https://mui.com/)
- [Prisma Documentation](https://www.prisma.io/)
- [Express.js Guide](https://expressjs.com/)

### Debug Common Issues
```bash
# Puerto ocupado (Windows)
netstat -ano | findstr :3002
netstat -ano | findstr :5173
taskkill /F /PID <PID>

# Problemas de dependencias
rm -rf node_modules client/node_modules server/node_modules package-lock.json
npm install

# Problemas de BD
cd server
npx prisma migrate reset    # Resetea todo
npx prisma generate          # Regenera cliente
node prisma/seed-100-bomberos.js  # Recarga datos

# Limpiar cache de Vite
cd client
rm -rf node_modules/.vite
npm run dev

# Problemas con Redux serialization
# Verificar que client/src/store/index.js tenga serializableCheck configurado
# Verificar que client/src/services/api.js retorne {data, status, statusText}
```

## 📚 Documentación Adicional

### Archivos Importantes
- `README.md` - Este archivo (documentación general)
- `server/prisma/schema.prisma` - Esquema completo de la BD
- `server/.env.example` - Plantilla de variables de entorno
- `assets/bomberos/README.md` - Información de assets
- `client/vite.config.js` - Configuración de Vite con proxies
- `server/prisma/seed-100-bomberos.js` - Seed con 100 bomberos

### Rutas Principales del Sistema
- `/` - Login
- `/dashboard` - Dashboard principal
- `/bomberos` - Gestión de 100 bomberos
- `/citaciones` - Citaciones y asistencias
- `/oficiales` - Cargos organizacionales
- `/material` - Material menor
- `/carros` - Material mayor (carros)
- `/guardias` - Guardias nocturnas
- `/admin` - Panel administrativo

---

**🚒 Segunda Compañía de Bomberos Viña del Mar**  
*Sistema de Gestión Administrativa Completo v2.0*

**Estado**: ✅ **PRODUCTION READY** - Sistema 100% funcional  
**Tecnologías**: React 18 + Vite 5 + Node.js + Express + SQLite + Prisma 6 + Material-UI 5  
**Módulos**: Auth, Bomberos (100), Citaciones, Cargos, Material Menor, Carros, Guardias  
**Repositorio**: https://github.com/duoc-fullstack2-9v/team_16  
**Rama**: feature/proyecto-administracion-bomberos