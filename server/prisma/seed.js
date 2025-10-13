import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seeders...')

  // Limpiar datos existentes (orden importante por relaciones)
  await prisma.asignacionMaterial.deleteMany()
  await prisma.material.deleteMany()
  await prisma.categoria.deleteMany()
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

  // ==================== MATERIAL MENOR ====================
  
  // Crear categorías con jerarquía
  const categorias = await Promise.all([
    // Categorías principales (sin parent)
    prisma.categoria.create({
      data: {
        nombre: 'Equipos de Protección Personal',
        descripcion: 'Equipamiento de protección individual para bomberos',
        icono: 'Shield',
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Herramientas de Rescate',
        descripcion: 'Herramientas especializadas para operaciones de rescate',
        icono: 'Build',
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Equipos de Comunicación',
        descripcion: 'Dispositivos de comunicación y señalización',
        icono: 'PhoneInTalk',
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Material Médico',
        descripcion: 'Equipamiento para primeros auxilios y atención médica',
        icono: 'LocalHospital',
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Equipamiento Vehicular',
        descripcion: 'Material y accesorios para vehículos de emergencia',
        icono: 'DirectionsCar',
        activo: true
      }
    })
  ])

  // Subcategorías (con parent)
  const subcategorias = await Promise.all([
    // Subcategorías de EPP
    prisma.categoria.create({
      data: {
        nombre: 'Cascos',
        descripcion: 'Cascos de protección contra impactos',
        icono: 'Security',
        parentId: categorias[0].id,
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Guantes',
        descripcion: 'Guantes de protección térmica y mecánica',
        icono: 'PanTool',
        parentId: categorias[0].id,
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Botas',
        descripcion: 'Calzado de seguridad especializado',
        icono: 'DirectionsWalk',
        parentId: categorias[0].id,
        activo: true
      }
    }),
    
    // Subcategorías de Herramientas
    prisma.categoria.create({
      data: {
        nombre: 'Herramientas Manuales',
        descripcion: 'Herramientas de mano para rescate y corte',
        icono: 'Handyman',
        parentId: categorias[1].id,
        activo: true
      }
    }),
    prisma.categoria.create({
      data: {
        nombre: 'Herramientas Hidráulicas',
        descripcion: 'Equipos hidráulicos de rescate vehicular',
        icono: 'Settings',
        parentId: categorias[1].id,
        activo: true
      }
    }),
    
    // Subcategorías de Comunicación
    prisma.categoria.create({
      data: {
        nombre: 'Radios',
        descripcion: 'Equipos de radio comunicación',
        icono: 'Radio',
        parentId: categorias[2].id,
        activo: true
      }
    }),
    
    // Subcategorías de Material Médico
    prisma.categoria.create({
      data: {
        nombre: 'Botiquines',
        descripcion: 'Kits de primeros auxilios',
        icono: 'MedicalServices',
        parentId: categorias[3].id,
        activo: true
      }
    })
  ])

  console.log('📦 Categorías creadas:', categorias.length + subcategorias.length)

  // Crear material de ejemplo (mixto: individual y cantidad)
  const materiales = await Promise.all([
    // Material individual (con número de serie)
    prisma.material.create({
      data: {
        nombre: 'Casco Structura MSA',
        descripcion: 'Casco estructural MSA, certificado NFPA 1971',
        categoriaId: subcategorias[0].id, // Cascos
        estado: 'En Uso',
        tipo: 'individual',
        numeroSerie: 'CSC-001',
        fechaAdquisicion: new Date('2024-03-15'),
        ubicacionFisica: 'Cuartel - Bodega A',
        fechaMantencion: new Date('2025-12-15'),
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Casco Structura MSA',
        descripcion: 'Casco estructural MSA, certificado NFPA 1971',
        categoriaId: subcategorias[0].id,
        estado: 'Disponible',
        tipo: 'individual',
        numeroSerie: 'CSC-002',
        fechaAdquisicion: new Date('2024-03-15'),
        ubicacionFisica: 'Cuartel - Bodega A',
        fechaMantencion: new Date('2025-12-15'),
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Radio Motorola XPR7550',
        descripcion: 'Radio portátil digital VHF/UHF',
        categoriaId: subcategorias[5].id, // Radios
        estado: 'En Uso',
        tipo: 'individual',
        numeroSerie: 'RAD-101',
        fechaAdquisicion: new Date('2024-06-20'),
        ubicacionFisica: 'Cuartel - Sala de Comunicaciones',
        fechaMantencion: new Date('2025-11-20'),
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Radio Motorola XPR7550',
        descripcion: 'Radio portátil digital VHF/UHF',
        categoriaId: subcategorias[5].id,
        estado: 'Mantenimiento',
        tipo: 'individual',
        numeroSerie: 'RAD-102',
        fechaAdquisicion: new Date('2024-06-20'),
        ubicacionFisica: 'Taller - Mantención',
        fechaMantencion: new Date('2025-11-20'),
        observaciones: 'En reparación por problema con batería',
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Spreader Hidráulico Holmatro',
        descripcion: 'Separador hidráulico para rescate vehicular',
        categoriaId: subcategorias[4].id, // Herramientas Hidráulicas
        estado: 'Disponible',
        tipo: 'individual',
        numeroSerie: 'SPR-HID-001',
        fechaAdquisicion: new Date('2023-11-10'),
        ubicacionFisica: 'Maquina 21',
        fechaMantencion: new Date('2025-10-20'),
        observaciones: 'Próximo a mantención programada',
        activo: true
      }
    }),

    // Material por cantidad
    prisma.material.create({
      data: {
        nombre: 'Guantes Structura Dragonfire',
        descripcion: 'Guantes de protección estructural, resistentes al calor',
        categoriaId: subcategorias[1].id, // Guantes
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 25,
        unidadMedida: 'pares',
        fechaAdquisicion: new Date('2024-08-10'),
        ubicacionFisica: 'Cuartel - Bodega A',
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Botas Structura Globe',
        descripcion: 'Botas de seguridad estructural, certificadas',
        categoriaId: subcategorias[2].id, // Botas
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 18,
        unidadMedida: 'pares',
        fechaAdquisicion: new Date('2024-07-05'),
        ubicacionFisica: 'Cuartel - Bodega B',
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Vendas Elásticas',
        descripcion: 'Vendas elásticas para primeros auxilios',
        categoriaId: subcategorias[6].id, // Botiquines
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 50,
        unidadMedida: 'unidades',
        fechaAdquisicion: new Date('2024-09-12'),
        ubicacionFisica: 'Cuartel - Enfermería',
        fechaVencimiento: new Date('2026-09-12'),
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Suero Fisiológico 500ml',
        descripcion: 'Solución salina estéril para lavado',
        categoriaId: subcategorias[6].id,
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 30,
        unidadMedida: 'unidades',
        fechaAdquisicion: new Date('2024-05-20'),
        ubicacionFisica: 'Cuartel - Enfermería',
        fechaVencimiento: new Date('2025-11-20'),
        observaciones: 'Revisar vencimiento próximamente',
        activo: true
      }
    }),
    prisma.material.create({
      data: {
        nombre: 'Hacha Forestral',
        descripcion: 'Hacha de mano para combate de incendios forestales',
        categoriaId: subcategorias[3].id, // Herramientas Manuales
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 8,
        unidadMedida: 'unidades',
        fechaAdquisicion: new Date('2023-12-01'),
        ubicacionFisica: 'Cuartel - Bodega C',
        fechaMantencion: new Date('2025-11-01'),
        activo: true
      }
    })
  ])

  console.log('🔧 Material creado:', materiales.length)

  // Crear asignaciones de material (algunas activas, otras como historial)
  const asignaciones = await Promise.all([
    // Asignación activa de casco
    prisma.asignacionMaterial.create({
      data: {
        materialId: materiales[0].id, // Casco CSC-001
        bomberoId: bomberos[0].id, // Pedro Sánchez
        fechaAsignacion: new Date('2024-09-01'),
        motivo: 'Asignación de EPP operativo',
        observaciones: 'Verificar estado antes de cada guardia',
        activo: true
      }
    }),

    // Asignación activa de radio
    prisma.asignacionMaterial.create({
      data: {
        materialId: materiales[2].id, // Radio RAD-101
        bomberoId: bomberos[4].id, // Laura Vargas (Teniente)
        fechaAsignacion: new Date('2024-10-05'),
        motivo: 'Radio para oficial al mando',
        activo: true
      }
    }),

    // Asignación histórica (devuelta)
    prisma.asignacionMaterial.create({
      data: {
        materialId: materiales[3].id, // Radio RAD-102
        bomberoId: bomberos[1].id, // Carlos Mendoza
        fechaAsignacion: new Date('2024-08-15'),
        fechaDevolucion: new Date('2024-10-01'),
        motivo: 'Radio operativa guardia',
        observaciones: 'Devuelto por falla en batería',
        activo: false
      }
    }),

    // Asignación activa de cantidad (guantes)
    prisma.asignacionMaterial.create({
      data: {
        materialId: materiales[5].id, // Guantes
        bomberoId: bomberos[3].id, // Miguel Torres
        fechaAsignacion: new Date('2024-09-10'),
        cantidadAsignada: 1,
        motivo: 'EPP personal operativo',
        activo: true
      }
    }),

    prisma.asignacionMaterial.create({
      data: {
        materialId: materiales[5].id, // Guantes (otro par del mismo stock)
        bomberoId: bomberos[7].id, // Jorge Ramírez
        fechaAsignacion: new Date('2024-09-12'),
        cantidadAsignada: 1,
        motivo: 'EPP personal operativo',
        activo: true
      }
    })
  ])

  console.log('📋 Asignaciones de material creadas:', asignaciones.length)
  console.log('📦 Sistema de Material Menor configurado')

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