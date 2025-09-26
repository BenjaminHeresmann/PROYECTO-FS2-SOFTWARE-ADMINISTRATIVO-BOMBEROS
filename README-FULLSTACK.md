# 🚒 Sistema Administrativo de Bomberos - Full Stack

Sistema completo de administración para la Segunda Compañía de Bomberos Viña del Mar, desarrollado con React + Node.js + MySQL + Prisma.

## 🏗️ Arquitectura

```
📁 sistema-bomberos-fullstack/
├── 📁 client/          # Frontend React + Vite + Material-UI
├── 📁 server/          # Backend Express + Prisma + MySQL
├── 📁 shared/          # Tipos y utilidades compartidas
├── 📁 assets/          # Recursos estáticos (mantenidos del proyecto original)
└── 📄 package.json     # Configuración del monorepo
```

## 🚀 Tecnologías

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Material-UI (MUI)** - Componentes de interfaz
- **Redux Toolkit** - Manejo de estado
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **Prisma** - ORM y migraciones
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **bcrypt** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js >= 16.0.0
- npm >= 7.0.0
- MySQL Server (local o remoto)

## 🛠️ Instalación

### 1. Clonar e instalar dependencias
```bash
# Instalar todas las dependencias del monorepo
npm run install:all
```

### 2. Configurar Base de Datos
```bash
# Crear archivo .env en /server con tu configuración MySQL
cp server/.env.example server/.env

# Editar server/.env con tus credenciales de MySQL
```

### 3. Configurar Prisma
```bash
# Generar cliente Prisma
npm run prisma:generate

# Ejecutar migraciones
npm run prisma:migrate

# (Opcional) Abrir Prisma Studio para ver/editar datos
npm run prisma:studio
```

## 🚀 Desarrollo

### Ejecutar aplicación completa
```bash
npm run dev
```

Esto iniciará:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001
- **Prisma Studio**: http://localhost:5555 (opcional)

### Ejecutar por separado
```bash
# Solo frontend
npm run dev:client

# Solo backend
npm run dev:server
```

## 👤 Usuarios de Prueba

### Administrador
- **Usuario**: admin
- **Contraseña**: admin123

### Usuarios Bomberos
- **Comandante**: comandante@bomberos.cl / admin123
- **Capitán**: capitan@bomberos.cl / cap456
- **Bombero**: bombero@bomberos.cl / bomb345

## 📁 Estructura del Proyecto

### Client (Frontend)
```
client/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación
│   ├── store/         # Redux store y slices
│   ├── services/      # APIs y servicios
│   ├── utils/         # Utilidades
│   └── App.jsx        # Componente principal
├── public/            # Archivos estáticos
└── package.json
```

### Server (Backend)
```
server/
├── src/
│   ├── routes/        # Rutas de la API
│   ├── controllers/   # Controladores
│   ├── middleware/    # Middleware personalizado
│   ├── services/      # Servicios de negocio
│   ├── utils/         # Utilidades
│   └── index.js       # Punto de entrada
├── prisma/
│   ├── schema.prisma  # Esquema de base de datos
│   └── migrations/    # Migraciones
└── package.json
```

## 🔧 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Ejecuta client y server en modo desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run start` | Inicia el servidor en producción |
| `npm run prisma:studio` | Abre Prisma Studio |
| `npm run prisma:migrate` | Ejecuta migraciones de base de datos |

## 🔄 Estado de Migración

- ✅ **Fase 1**: Configuración base del proyecto
- ⏳ **Fase 2**: Sistema de autenticación y login  
- ⏳ **Fase 3**: Dashboard y navegación principal
- ⏳ **Fase 4**: Módulos funcionales (bomberos, citaciones, etc.)
- ⏳ **Fase 5**: Optimizaciones y pulimiento

## 📞 Soporte

Para dudas o problemas, revisa la documentación de:
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Prisma](https://www.prisma.io/)
- [Express.js](https://expressjs.com/)

---
**Segunda Compañía de Bomberos Viña del Mar** 🚒