import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeders...')

  // Limpiar datos existentes
  await prisma.asignacionCargo.deleteMany()
  await prisma.cargo.deleteMany()
  await prisma.bomberoCitacion.deleteMany()
  await prisma.citacion.deleteMany()
  await prisma.bombero.deleteMany()
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
        nombres: 'Pedro',
        apellidos: 'Sánchez',
        rango: 'Bombero',
        especialidad: 'Rescate urbano',
        telefono: '+56 9 1234 5678',
        email: 'bombero@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-1.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Carlos',
        apellidos: 'Mendoza',
        rango: 'Cabo',
        especialidad: 'Materiales peligrosos',
        telefono: '+56 9 2345 6789',
        fotoUrl: '/assets/bomberos/bombero-2.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Ana',
        apellidos: 'García',
        rango: 'Sargento',
        especialidad: 'Primeros auxilios',
        telefono: '+56 9 3456 7890',
        fotoUrl: '/assets/bomberos/bombero-3.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Miguel',
        apellidos: 'Torres',
        rango: 'Bombero',
        especialidad: 'Conductor máquina bomba',
        telefono: '+56 9 4567 8901',
        fotoUrl: '/assets/bomberos/bombero-4.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Laura',
        apellidos: 'Vargas',
        rango: 'Teniente',
        especialidad: 'Incendios forestales',
        telefono: '+56 9 5678 9012',
        email: 'laura.vargas@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-5.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Roberto',
        apellidos: 'Silva',
        rango: 'Capitán',
        especialidad: 'Rescate en altura',
        telefono: '+56 9 6789 0123',
        email: 'roberto.silva@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-6.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Patricia',
        apellidos: 'Morales',
        rango: 'Cabo',
        especialidad: 'Comunicaciones',
        telefono: '+56 9 7890 1234',
        email: 'patricia.morales@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-7.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Jorge',
        apellidos: 'Ramírez',
        rango: 'Bombero',
        especialidad: 'Rescate vehicular',
        telefono: '+56 9 8901 2345',
        email: 'jorge.ramirez@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-8.jpg',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Isabel',
        apellidos: 'Rojas',
        rango: 'Sargento',
        especialidad: 'Prevención de riesgos',
        telefono: '+56 9 9012 3456',
        email: 'isabel.rojas@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-5.jpg',
        estado: 'Licencia',
        createdById: admin.id
      }
    }),
    prisma.bombero.create({
      data: {
        nombres: 'Fernando',
        apellidos: 'Castillo',
        rango: 'Teniente',
        especialidad: 'Buceo y rescate acuático',
        telefono: '+56 9 0123 4567',
        email: 'fernando.castillo@bomberos.cl',
        fotoUrl: '/assets/bomberos/bombero-6.jpg',
        createdById: admin.id
      }
    })
  ])

  console.log('🚒 Bomberos creados:', bomberos.length)

  // Crear citaciones variadas
  const citaciones = await Promise.all([
    // 1. Reunión Mensual Ordinaria (pasada - se convertirá en Realizada)
    prisma.citacion.create({
      data: {
        titulo: 'Reunión Mensual Ordinaria',
        fecha: new Date('2025-09-30T19:00:00'),
        hora: '19:00',
        lugar: 'Cuartel Segunda Compañía',
        motivo: 'Reunión mensual ordinaria para revisar actividades y planificación del próximo mes',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 2. Reunión Extraordinaria (próxima)
    prisma.citacion.create({
      data: {
        titulo: 'Reunión Extraordinaria',
        fecha: new Date('2025-10-15T20:00:00'),
        hora: '20:00',
        lugar: 'Cuartel Segunda Compañía',
        motivo: 'Reunión extraordinaria para tratar asuntos urgentes relacionados con la adquisición de nuevo equipamiento y modificaciones al protocolo de emergencias',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 3. Academia de Rescate Vehicular
    prisma.citacion.create({
      data: {
        titulo: 'Academia de Rescate Vehicular',
        fecha: new Date('2025-10-20T09:00:00'),
        hora: '09:00',
        lugar: 'Patio de Maniobras - Cuartel',
        motivo: 'Capacitación teórico-práctica en técnicas de rescate vehicular, uso de equipos de corte y extracción de víctimas en accidentes de tránsito',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 4. Academia de Rescate con Cuerda
    prisma.citacion.create({
      data: {
        titulo: 'Academia de Rescate con Cuerda',
        fecha: new Date('2025-10-25T08:00:00'),
        hora: '08:00',
        lugar: 'Torre de Entrenamiento',
        motivo: 'Entrenamiento en técnicas de rescate vertical, nudos de seguridad, anclajes y descenso controlado para rescate en altura',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 5. Academia de Rescate Urbano
    prisma.citacion.create({
      data: {
        titulo: 'Academia de Rescate Urbano',
        fecha: new Date('2025-11-05T09:00:00'),
        hora: '09:00',
        lugar: 'Zona de Entrenamiento Urbano',
        motivo: 'Capacitación en técnicas de búsqueda y rescate en estructuras colapsadas, uso de herramientas de remoción de escombros y localización de víctimas',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 6. Academia de Ventilación en Incendios Estructurales
    prisma.citacion.create({
      data: {
        titulo: 'Academia de Ventilación en Incendios Estructurales',
        fecha: new Date('2025-11-10T10:00:00'),
        hora: '10:00',
        lugar: 'Casa de Humo - Centro de Entrenamiento',
        motivo: 'Entrenamiento en técnicas de ventilación positiva y negativa, control de humo y gases en incendios estructurales para mejorar condiciones de rescate',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 7. Academia de Incendios Forestales
    prisma.citacion.create({
      data: {
        titulo: 'Academia de Incendios Forestales',
        fecha: new Date('2025-11-18T08:30:00'),
        hora: '08:30',
        lugar: 'Zona Forestal - Sector El Salto',
        motivo: 'Capacitación en combate de incendios forestales, técnicas de línea de fuego, uso de herramientas forestales y coordinación con brigadas CONAF',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 8. Reunión de Oficiales
    prisma.citacion.create({
      data: {
        titulo: 'Reunión de Oficiales',
        fecha: new Date('2025-11-22T19:30:00'),
        hora: '19:30',
        lugar: 'Sala de Oficiales - Cuartel',
        motivo: 'Reunión mensual del cuerpo de oficiales para evaluar el desempeño operacional, planificar capacitaciones y coordinar actividades administrativas',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 9. Consejo de Disciplina - Caso 1
    prisma.citacion.create({
      data: {
        titulo: 'Consejo de Disciplina',
        fecha: new Date('2025-11-28T18:00:00'),
        hora: '18:00',
        lugar: 'Sala de Consejo - Cuartel',
        motivo: 'Sesión del consejo de disciplina para revisar y resolver procedimientos disciplinarios conforme al reglamento interno de la compañía',
        estado: 'Programada',
        createdById: admin.id
      }
    }),

    // 10. Consejo de Disciplina - Caso 2
    prisma.citacion.create({
      data: {
        titulo: 'Consejo de Disciplina',
        fecha: new Date('2025-12-05T18:00:00'),
        hora: '18:00',
        lugar: 'Sala de Consejo - Cuartel',
        motivo: 'Segunda sesión del consejo de disciplina para tratar casos pendientes y resolver apelaciones presentadas por el cuerpo activo',
        estado: 'Programada',
        createdById: admin.id
      }
    })
  ])

  // Asignar bomberos a las citaciones de forma variada
  await Promise.all([
    // Reunión Ordinaria - 3 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[0].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[0].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[2].id, citacionId: citaciones[0].id }
    }),

    // Reunión Extraordinaria - 5 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[1].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[1].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[1].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[4].id, citacionId: citaciones[1].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[5].id, citacionId: citaciones[1].id }
    }),

    // Academia Rescate Vehicular - 6 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[2].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[2].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[2].id, citacionId: citaciones[2].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[6].id, citacionId: citaciones[2].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[7].id, citacionId: citaciones[2].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[8].id, citacionId: citaciones[2].id }
    }),

    // Academia Rescate con Cuerda - 4 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[2].id, citacionId: citaciones[3].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[3].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[4].id, citacionId: citaciones[3].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[9].id, citacionId: citaciones[3].id }
    }),

    // Academia Rescate Urbano - 7 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[5].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[6].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[7].id, citacionId: citaciones[4].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[8].id, citacionId: citaciones[4].id }
    }),

    // Academia Ventilación - 5 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[5].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[2].id, citacionId: citaciones[5].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[4].id, citacionId: citaciones[5].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[7].id, citacionId: citaciones[5].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[9].id, citacionId: citaciones[5].id }
    }),

    // Academia Incendios Forestales - 8 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[2].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[5].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[6].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[8].id, citacionId: citaciones[6].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[9].id, citacionId: citaciones[6].id }
    }),

    // Reunión de Oficiales - 4 bomberos (los de mayor rango)
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[7].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[7].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[7].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[5].id, citacionId: citaciones[7].id }
    }),

    // Consejo de Disciplina 1 - 3 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[8].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[8].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[3].id, citacionId: citaciones[8].id }
    }),

    // Consejo de Disciplina 2 - 3 bomberos
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[0].id, citacionId: citaciones[9].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[1].id, citacionId: citaciones[9].id }
    }),
    prisma.bomberoCitacion.create({
      data: { bomberoId: bomberos[5].id, citacionId: citaciones[9].id }
    })
  ])

  console.log('📅 Citaciones creadas:', citaciones.length)
  console.log('📅 Bomberos asignados a citaciones')

  // Crear cargos de la compañía
  const cargos = await Promise.all([
    // RAMA ADMINISTRATIVA
    prisma.cargo.create({
      data: {
        nombre: 'Director',
        descripcion: 'Autoridad máxima de la compañía. Representa legalmente a la institución y dirige todas las operaciones.',
        rama: 'ADMINISTRATIVA',
        jerarquia: 1,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Secretario',
        descripcion: 'Responsable de la documentación oficial, actas y comunicaciones de la compañía.',
        rama: 'ADMINISTRATIVA',
        jerarquia: 2,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Tesorero',
        descripcion: 'Administra los recursos financieros, presupuesto y contabilidad de la compañía.',
        rama: 'ADMINISTRATIVA',
        jerarquia: 3,
        maxOcupantes: 1,
        activo: true
      }
    }),
    
    // RAMA OPERATIVA
    prisma.cargo.create({
      data: {
        nombre: 'Capitán',
        descripcion: 'Comandante de las operaciones de emergencia. Máxima autoridad en el terreno.',
        rama: 'OPERATIVA',
        jerarquia: 1,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Teniente Primero',
        descripcion: 'Segundo al mando en operaciones. Asiste al Capitán en la coordinación de emergencias.',
        rama: 'OPERATIVA',
        jerarquia: 2,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Teniente Segundo',
        descripcion: 'Tercer oficial en la línea de mando operativo.',
        rama: 'OPERATIVA',
        jerarquia: 3,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Teniente Tercero',
        descripcion: 'Cuarto oficial en la línea de mando operativo.',
        rama: 'OPERATIVA',
        jerarquia: 4,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Ayudante',
        descripcion: 'Asiste en las operaciones y coordina el personal en terreno.',
        rama: 'OPERATIVA',
        jerarquia: 5,
        maxOcupantes: 1,
        activo: true
      }
    }),
    
    // CONSEJOS DE DISCIPLINA
    prisma.cargo.create({
      data: {
        nombre: 'Consejero de Disciplina 1',
        descripcion: 'Miembro del consejo encargado de velar por el cumplimiento del reglamento y la disciplina.',
        rama: 'CONSEJOS',
        jerarquia: 1,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Consejero de Disciplina 2',
        descripcion: 'Miembro del consejo encargado de velar por el cumplimiento del reglamento y la disciplina.',
        rama: 'CONSEJOS',
        jerarquia: 2,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Consejero de Disciplina 3',
        descripcion: 'Miembro del consejo encargado de velar por el cumplimiento del reglamento y la disciplina.',
        rama: 'CONSEJOS',
        jerarquia: 3,
        maxOcupantes: 1,
        activo: true
      }
    }),
    prisma.cargo.create({
      data: {
        nombre: 'Consejero de Disciplina 4',
        descripcion: 'Miembro del consejo encargado de velar por el cumplimiento del reglamento y la disciplina.',
        rama: 'CONSEJOS',
        jerarquia: 4,
        maxOcupantes: 1,
        activo: true
      }
    })
  ])

  console.log('🏛️ Cargos creados:', cargos.length)

  // Crear algunas asignaciones de ejemplo (Director, Capitán y 2 Consejeros)
  const añoActual = new Date().getFullYear()
  
  await prisma.asignacionCargo.create({
    data: {
      cargoId: cargos[0].id, // Director
      bomberoId: bomberos[2].id, // Ana García (Sargento)
      fechaInicio: new Date(`${añoActual}-01-01`),
      periodoAnio: añoActual,
      activo: true,
      observaciones: 'Asignación período ' + añoActual
    }
  })

  await prisma.asignacionCargo.create({
    data: {
      cargoId: cargos[3].id, // Capitán
      bomberoId: bomberos[4].id, // Laura Vargas (Teniente)
      fechaInicio: new Date(`${añoActual}-01-01`),
      periodoAnio: añoActual,
      activo: true,
      observaciones: 'Asignación período ' + añoActual
    }
  })

  await prisma.asignacionCargo.create({
    data: {
      cargoId: cargos[8].id, // Consejero 1
      bomberoId: bomberos[1].id, // Carlos Mendoza (Cabo)
      fechaInicio: new Date(`${añoActual}-01-01`),
      periodoAnio: añoActual,
      activo: true,
      observaciones: 'Asignación período ' + añoActual
    }
  })

  await prisma.asignacionCargo.create({
    data: {
      cargoId: cargos[9].id, // Consejero 2
      bomberoId: bomberos[6].id, // Fernando Rojas (Cabo)
      fechaInicio: new Date(`${añoActual}-01-01`),
      periodoAnio: añoActual,
      activo: true,
      observaciones: 'Asignación período ' + añoActual
    }
  })

  console.log('� Asignaciones de cargos creadas: 4')
  console.log('👨‍✈️ Sistema de cargos configurado')

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