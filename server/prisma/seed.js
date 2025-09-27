import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeders...')

  // Limpiar datos existentes
  await prisma.bomberoCitacion.deleteMany()
  await prisma.citacion.deleteMany()
  await prisma.bombero.deleteMany()
  await prisma.oficial.deleteMany()
  await prisma.user.deleteMany()
  
  console.log('🧹 Datos existentes eliminados')

  // Crear usuarios del sistema
  const adminPassword = await bcrypt.hash('1234', 12)
  const userPassword = await bcrypt.hash('bomb345', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin',
      password: adminPassword,
      nombre: 'Administrador',
      rol: 'Comandante',
      tipo: 'admin'
    }
  })

  const pedro = await prisma.user.create({
    data: {
      email: 'bombero@bomberos.cl',
      password: userPassword,
      nombre: 'Pedro Sánchez',
      rol: 'Bombero',
      tipo: 'usuario'
    }
  })

  console.log('👥 Usuarios creados:', { admin: admin.nombre, pedro: pedro.nombre })

  // Crear bomberos (incluyendo a Pedro)
  const bomberos = await Promise.all([
    prisma.bombero.create({
      data: {
        nombre: 'Pedro Sánchez',
        rango: 'Bombero',
        especialidad: 'Rescate urbano',
        telefono: '+56 9 1234 5678',
        email: 'bombero@bomberos.cl',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombre: 'Carlos Mendoza',
        rango: 'Cabo',
        especialidad: 'Materiales peligrosos',
        telefono: '+56 9 2345 6789',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombre: 'Ana García',
        rango: 'Sargento',
        especialidad: 'Primeros auxilios',
        telefono: '+56 9 3456 7890',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombre: 'Miguel Torres',
        rango: 'Bombero',
        especialidad: 'Conductor máquina bomba',
        telefono: '+56 9 4567 8901',
        createdById: admin.id
      }
    })
  ])

  console.log('🚒 Bomberos creados:', bomberos.length)

  // Crear citación de ejemplo
  const citacion = await prisma.citacion.create({
    data: {
      titulo: 'Reunión Mensual Ordinaria',
      fecha: new Date('2025-09-30T19:00:00'),
      hora: '19:00',
      lugar: 'Cuartel Segunda Compañía',
      motivo: 'Reunión mensual ordinaria para revisar actividades y planificación del próximo mes',
      estado: 'Programada',
      createdById: admin.id
    }
  })

  // Asignar bomberos a la citación (incluyendo a Pedro)
  await Promise.all([
    prisma.bomberoCitacion.create({
      data: {
        bomberoId: bomberos[0].id, // Pedro Sánchez
        citacionId: citacion.id
      }
    }),
    prisma.bomberoCitacion.create({
      data: {
        bomberoId: bomberos[1].id, // Carlos Mendoza
        citacionId: citacion.id
      }
    }),
    prisma.bomberoCitacion.create({
      data: {
        bomberoId: bomberos[2].id, // Ana García
        citacionId: citacion.id
      }
    })
  ])

  console.log('📅 Citación creada con bomberos asignados')

  // Crear oficiales
  const oficiales = await Promise.all([
    prisma.oficial.create({
      data: {
        nombre: 'Roberto Silva',
        cargo: 'Comandante',
        responsabilidad: 'Dirección general de la compañía',
        telefono: '+56 9 5678 9012',
        email: 'comandante@bomberos.cl',
        fechaInicio: new Date('2010-01-15')
      }
    }),
    prisma.oficial.create({
      data: {
        nombre: 'Carmen López',
        cargo: 'Capitán',
        responsabilidad: 'Coordinación de operaciones y entrenamientos',
        telefono: '+56 9 6789 0123',
        email: 'capitan@bomberos.cl',
        fechaInicio: new Date('2015-03-20')
      }
    })
  ])

  console.log('👨‍✈️ Oficiales creados:', oficiales.length)

  console.log('✅ Seeders completados exitosamente!')
  console.log('')
  console.log('🔐 Credenciales de prueba:')
  console.log('📊 Admin: admin / 1234')
  console.log('👤 Usuario: bombero@bomberos.cl / bomb345')
}

main()
  .catch((e) => {
    console.error('❌ Error en seeders:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })