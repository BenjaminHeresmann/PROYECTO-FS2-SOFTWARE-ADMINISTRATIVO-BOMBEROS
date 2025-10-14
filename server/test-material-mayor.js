import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api'
let authToken = ''
let carroId = null
let cajoneraId = null
let materialId = null
let asignacionId = null
let bomberoId = null

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logSection(title) {
  console.log('\n' + '='.repeat(60))
  log(`  ${title}`, 'cyan')
  console.log('='.repeat(60))
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green')
}

function logError(message, error) {
  log(`❌ ${message}`, 'red')
  if (error.response?.data) {
    console.log('   Error:', error.response.data.message || error.response.data)
  } else {
    console.log('   Error:', error.message)
  }
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue')
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// ============================================
// TEST 1: AUTENTICACIÓN
// ============================================
async function testAuth() {
  logSection('TEST 1: AUTENTICACIÓN')
  
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin',
      password: '1234'
    })
    
    authToken = response.data.data.token
    logSuccess('Login exitoso')
    logInfo(`Token obtenido: ${authToken.substring(0, 20)}...`)
    return true
  } catch (error) {
    logError('Login fallido', error)
    return false
  }
}

// ============================================
// TEST 2: LISTAR CARROS
// ============================================
async function testListarCarros() {
  logSection('TEST 2: LISTAR CARROS')
  
  try {
    const response = await axios.get(`${BASE_URL}/carros`, {
      headers: { Authorization: `Bearer ${authToken}` },
      params: {
        page: 1,
        limit: 10
      }
    })
    
    const carros = response.data.data.data
    logSuccess(`${carros.length} carros encontrados`)
    
    carros.forEach(carro => {
      logInfo(`- ${carro.nombre} (${carro.tipo}) - ${carro.estadoOperativo}`)
      logInfo(`  Patente: ${carro.patente} | Cajoneras: ${carro._count.cajoneras}`)
    })
    
    if (carros.length > 0) {
      carroId = carros[0].id
      logInfo(`Usando carro ID ${carroId} para tests posteriores`)
    }
    
    return true
  } catch (error) {
    logError('Error al listar carros', error)
    return false
  }
}

// ============================================
// TEST 3: ESTADÍSTICAS
// ============================================
async function testEstadisticas() {
  logSection('TEST 3: ESTADÍSTICAS DE CARROS')
  
  try {
    const response = await axios.get(`${BASE_URL}/carros/estadisticas`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const stats = response.data.data
    logSuccess('Estadísticas obtenidas')
    logInfo(`Total Carros: ${stats.totalCarros}`)
    logInfo(`Operativos: ${stats.operativos}`)
    logInfo(`En Mantenimiento: ${stats.enMantenimiento}`)
    logInfo(`Fuera de Servicio: ${stats.fueraServicio}`)
    logInfo(`Total Alertas: ${stats.alertas.total}`)
    
    return true
  } catch (error) {
    logError('Error al obtener estadísticas', error)
    return false
  }
}

// ============================================
// TEST 4: SISTEMA DE ALERTAS
// ============================================
async function testAlertas() {
  logSection('TEST 4: SISTEMA DE ALERTAS')
  
  try {
    const response = await axios.get(`${BASE_URL}/carros/alertas`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const alertas = response.data.data
    logSuccess('Alertas obtenidas')
    
    logInfo(`Alertas Críticas: ${alertas.totales.criticas}`)
    logInfo(`Advertencias: ${alertas.totales.advertencias}`)
    
    // Mantención
    log(`\n  📋 Mantenimiento:`, 'yellow')
    logInfo(`  - Atrasadas: ${alertas.mantencion.atrasadas.length}`)
    logInfo(`  - Próximas: ${alertas.mantencion.proximas.length}`)
    
    // Revisión Técnica
    log(`\n  🔧 Revisión Técnica:`, 'yellow')
    logInfo(`  - Atrasadas: ${alertas.revisionTecnica.atrasadas.length}`)
    logInfo(`  - Próximas: ${alertas.revisionTecnica.proximas.length}`)
    
    // Permiso Circulación
    log(`\n  📄 Permiso Circulación:`, 'yellow')
    logInfo(`  - Atrasados: ${alertas.permisoCirculacion.atrasados.length}`)
    logInfo(`  - Próximos: ${alertas.permisoCirculacion.proximos.length}`)
    
    return true
  } catch (error) {
    logError('Error al obtener alertas', error)
    return false
  }
}

// ============================================
// TEST 5: DETALLE DE CARRO
// ============================================
async function testDetalleCarro() {
  logSection('TEST 5: DETALLE COMPLETO DE CARRO')
  
  if (!carroId) {
    logError('No hay carroId disponible')
    return false
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/carros/${carroId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const carro = response.data.data
    logSuccess(`Detalle del carro "${carro.nombre}" obtenido`)
    
    logInfo(`Tipo: ${carro.tipo}`)
    logInfo(`Marca/Modelo: ${carro.marca} ${carro.modelo}`)
    logInfo(`Patente: ${carro.patente}`)
    logInfo(`Estado: ${carro.estadoOperativo}`)
    logInfo(`Año: ${carro.anioFabricacion}`)
    
    if (carro.capacidadAgua) {
      logInfo(`Capacidad Agua: ${carro.capacidadAgua}L`)
    }
    
    logInfo(`\nCantidades:`)
    logInfo(`- Cajoneras: ${carro.cajoneras.length}`)
    logInfo(`- Material Asignado: ${carro.asignacionesMaterial.length}`)
    logInfo(`- Conductores: ${carro.conductoresHabilitados.length}`)
    logInfo(`- Mantenciones: ${carro.mantenciones.length}`)
    logInfo(`- Historial: ${carro.historial.length} registros`)
    
    return true
  } catch (error) {
    logError('Error al obtener detalle del carro', error)
    return false
  }
}

// ============================================
// TEST 6: CREAR NUEVO CARRO
// ============================================
async function testCrearCarro() {
  logSection('TEST 6: CREAR NUEVO CARRO')
  
  // Generar patente única con timestamp
  const timestamp = Date.now().toString().slice(-6)
  const nuevoCarro = {
    nombre: 'Bomba B2 Test',
    tipo: 'Bomba',
    marca: 'Volvo',
    modelo: 'FL280',
    anioFabricacion: 2023,
    patente: `TST-${timestamp}`,
    estadoOperativo: 'Operativo',
    capacidadAgua: 4000,
    capacidadEspuma: 250,
    potenciaMotobomba: '600 GPM',
    capacidadMotobomba: '2500 L/min',
    capacidadCarga: '6 personas',
    fechaProximaMantencion: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    fechaRevisionTecnica: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    fechaPermisoCirculacion: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    caracteristicas: {
      altura: '3.8m',
      peso: '14000kg',
      traccion: '4x4'
    },
    observaciones: 'Carro de prueba creado por script de testing'
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/carros`, nuevoCarro, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const carro = response.data.data
    logSuccess(`Carro "${carro.nombre}" creado exitosamente`)
    logInfo(`ID: ${carro.id}`)
    logInfo(`Patente: ${carro.patente}`)
    
    // Guardar para tests posteriores
    carroId = carro.id
    
    return true
  } catch (error) {
    logError('Error al crear carro', error)
    return false
  }
}

// ============================================
// TEST 7: CAJONERAS
// ============================================
async function testCajoneras() {
  logSection('TEST 7: GESTIÓN DE CAJONERAS')
  
  if (!carroId) {
    logError('No hay carroId disponible')
    return false
  }
  
  try {
    // Listar cajoneras existentes
    log('\n📦 Listando cajoneras...', 'yellow')
    const listResponse = await axios.get(`${BASE_URL}/carros/${carroId}/cajoneras`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    logSuccess(`${listResponse.data.data.length} cajoneras encontradas`)
    
    // Crear nueva cajonera
    log('\n📦 Creando nueva cajonera...', 'yellow')
    const nuevaCajonera = {
      nombre: 'Cajonera Test - Lateral',
      estado: 'Operativa',
      posicion: 99,
      observaciones: 'Cajonera de prueba'
    }
    
    const createResponse = await axios.post(
      `${BASE_URL}/carros/${carroId}/cajoneras`,
      nuevaCajonera,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    cajoneraId = createResponse.data.data.id
    logSuccess(`Cajonera creada con ID: ${cajoneraId}`)
    
    // Actualizar cajonera
    log('\n📦 Actualizando cajonera...', 'yellow')
    const updateData = {
      nombre: 'Cajonera Test - Lateral Actualizada',
      estado: 'Operativa',
      posicion: 100,
      observaciones: 'Cajonera actualizada por script'
    }
    
    await axios.put(
      `${BASE_URL}/carros/cajoneras/${cajoneraId}`,
      updateData,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    logSuccess('Cajonera actualizada exitosamente')
    
    return true
  } catch (error) {
    logError('Error en gestión de cajoneras', error)
    return false
  }
}

// ============================================
// TEST 8: CONDUCTORES HABILITADOS
// ============================================
async function testConductores() {
  logSection('TEST 8: CONDUCTORES HABILITADOS')
  
  if (!carroId) {
    logError('No hay carroId disponible')
    return false
  }
  
  try {
    // Obtener lista de bomberos
    log('\n👨‍🚒 Obteniendo bomberos...', 'yellow')
    const bomberosResponse = await axios.get(`${BASE_URL}/bomberos?limit=5`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const bomberos = bomberosResponse.data.data
    if (!bomberos || bomberos.length === 0) {
      logError('No hay bomberos disponibles')
      return false
    }
    
    bomberoId = bomberos[0].id
    logInfo(`Usando bombero: ${bomberos[0].nombres} ${bomberos[0].apellidos}`)
    
    // Listar conductores actuales
    log('\n👨‍✈️ Listando conductores actuales...', 'yellow')
    const listResponse = await axios.get(`${BASE_URL}/carros/${carroId}/conductores`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    logSuccess(`${listResponse.data.data.length} conductores habilitados`)
    
    // Asignar nuevo conductor
    log('\n👨‍✈️ Asignando conductor...', 'yellow')
    const conductorData = {
      bomberoId: bomberoId,
      observaciones: 'Conductor de prueba asignado por script'
    }
    
    try {
      await axios.post(
        `${BASE_URL}/carros/${carroId}/conductores`,
        conductorData,
        { headers: { Authorization: `Bearer ${authToken}` } }
      )
      
      logSuccess('Conductor asignado exitosamente')
    } catch (error) {
      if (error.response?.data?.message?.includes('ya está habilitado')) {
        logInfo('El conductor ya estaba habilitado (esto es normal)')
      } else {
        throw error
      }
    }
    
    return true
  } catch (error) {
    logError('Error en gestión de conductores', error)
    return false
  }
}

// ============================================
// TEST 9: MANTENCIONES
// ============================================
async function testMantenciones() {
  logSection('TEST 9: MANTENCIONES')
  
  if (!carroId) {
    logError('No hay carroId disponible')
    return false
  }
  
  try {
    // Listar mantenciones
    log('\n🔧 Listando mantenciones...', 'yellow')
    const listResponse = await axios.get(`${BASE_URL}/carros/${carroId}/mantenciones`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    logSuccess(`${listResponse.data.data.length} mantenciones registradas`)
    
    // Registrar nueva mantención
    log('\n🔧 Registrando nueva mantención...', 'yellow')
    const mantencionData = {
      tipo: 'Preventiva',
      descripcion: 'Mantención preventiva de prueba realizada por script de testing',
      fechaRealizada: new Date().toISOString(),
      proximaFecha: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
      costo: 150000,
      realizadoPor: 'Taller Test',
      observaciones: 'Mantención de prueba - todas las revisiones OK'
    }
    
    await axios.post(
      `${BASE_URL}/carros/${carroId}/mantenciones`,
      mantencionData,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    logSuccess('Mantención registrada exitosamente')
    
    return true
  } catch (error) {
    logError('Error en gestión de mantenciones', error)
    return false
  }
}

// ============================================
// TEST 10: ASIGNACIÓN DE MATERIAL
// ============================================
async function testAsignacionMaterial() {
  logSection('TEST 10: ASIGNACIÓN DE MATERIAL AL CARRO')
  
  if (!carroId || !cajoneraId) {
    logError('No hay carroId o cajoneraId disponible')
    return false
  }
  
  try {
    // Obtener material disponible
    log('\n🔧 Obteniendo material disponible...', 'yellow')
    const materialResponse = await axios.get(`${BASE_URL}/material?limit=5&estado=Disponible`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    const materiales = materialResponse.data.data
    if (!materiales || materiales.length === 0) {
      logInfo('No hay material disponible (esto es normal si se ejecutó el test previamente)')
      logInfo('Saltando prueba de asignación de material')
      return true // No es un error, simplemente no hay material disponible
    }
    
    // Buscar material tipo INDIVIDUAL que no esté asignado
    const materialIndividual = materiales.find(m => m.tipo === 'INDIVIDUAL')
    
    if (!materialIndividual) {
      logInfo('No hay material INDIVIDUAL disponible, usando el primero disponible')
      materialId = materiales[0].id
    } else {
      materialId = materialIndividual.id
    }
    
    logInfo(`Material seleccionado: ${materiales.find(m => m.id === materialId).nombre}`)
    
    // Listar material actual del carro
    log('\n📦 Material actual del carro...', 'yellow')
    const listResponse = await axios.get(`${BASE_URL}/carros/${carroId}/material`, {
      headers: { Authorization: `Bearer ${authToken}` }
    })
    
    logSuccess(`${listResponse.data.data.length} materiales asignados actualmente`)
    
    // Asignar material al carro
    log('\n📦 Asignando material al carro...', 'yellow')
    const asignacionData = {
      materialId: materialId,
      cajoneraId: cajoneraId,
      motivo: 'Prueba de asignación desde script de testing',
      observaciones: 'Material de prueba'
    }
    
    const asignarResponse = await axios.post(
      `${BASE_URL}/carros/${carroId}/asignar-material`,
      asignacionData,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    asignacionId = asignarResponse.data.data.id
    logSuccess(`Material asignado exitosamente (ID: ${asignacionId})`)
    logInfo(`Ubicación: Cajonera ID ${cajoneraId}`)
    
    // Cambiar de cajonera
    log('\n📦 Cambiando material a "sin cajonera"...', 'yellow')
    await axios.put(
      `${BASE_URL}/carros/asignaciones/${asignacionId}/cambiar-cajonera`,
      { cajoneraId: null },
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    logSuccess('Material reubicado a "sin cajonera específica"')
    
    // Listar material filtrado
    log('\n📦 Filtrando material sin cajonera...', 'yellow')
    const filtroResponse = await axios.get(
      `${BASE_URL}/carros/${carroId}/material?cajoneraId=null`,
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    
    logSuccess(`${filtroResponse.data.data.length} materiales sin cajonera específica`)
    
    return true
  } catch (error) {
    logError('Error en asignación de material', error)
    return false
  }
}

// ============================================
// TEST 11: HISTORIAL
// ============================================
async function testHistorial() {
  logSection('TEST 11: HISTORIAL DEL CARRO')
  
  if (!carroId) {
    logError('No hay carroId disponible')
    return false
  }
  
  try {
    const response = await axios.get(`${BASE_URL}/carros/${carroId}/historial`, {
      headers: { Authorization: `Bearer ${authToken}` },
      params: { limit: 20 }
    })
    
    const historial = response.data.data
    logSuccess(`${historial.length} registros de historial`)
    
    log('\n📚 Últimos registros:', 'yellow')
    historial.slice(0, 5).forEach((registro, index) => {
      logInfo(`${index + 1}. [${registro.tipo}] ${registro.descripcion}`)
      logInfo(`   ${new Date(registro.createdAt).toLocaleString()} - ${registro.usuario?.nombre || 'Sistema'}`)
    })
    
    return true
  } catch (error) {
    logError('Error al obtener historial', error)
    return false
  }
}

// ============================================
// TEST 12: LIMPIEZA
// ============================================
async function testLimpieza() {
  logSection('TEST 12: LIMPIEZA DE DATOS DE PRUEBA')
  
  try {
    // Desasignar material
    if (asignacionId) {
      log('\n🗑️  Desasignando material...', 'yellow')
      await axios.delete(`${BASE_URL}/carros/asignaciones/${asignacionId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      logSuccess('Material desasignado')
    }
    
    // Eliminar conductor
    if (carroId && bomberoId) {
      log('\n🗑️  Eliminando conductor...', 'yellow')
      try {
        await axios.delete(`${BASE_URL}/carros/${carroId}/conductores/${bomberoId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
        logSuccess('Conductor eliminado')
      } catch (error) {
        logInfo('Conductor ya no existe o no era de prueba')
      }
    }
    
    // Eliminar cajonera
    if (cajoneraId) {
      log('\n🗑️  Eliminando cajonera...', 'yellow')
      await axios.delete(`${BASE_URL}/carros/cajoneras/${cajoneraId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      logSuccess('Cajonera eliminada')
    }
    
    // Eliminar carro (solo si es el de prueba)
    if (carroId) {
      log('\n🗑️  Verificando si el carro es de prueba...', 'yellow')
      const carroResponse = await axios.get(`${BASE_URL}/carros/${carroId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      
      if (carroResponse.data.data.patente.startsWith('TST-')) {
        log('🗑️  Eliminando carro de prueba...', 'yellow')
        await axios.delete(`${BASE_URL}/carros/${carroId}`, {
          headers: { Authorization: `Bearer ${authToken}` }
        })
        logSuccess('Carro de prueba eliminado')
      } else {
        logInfo('El carro no es de prueba, se mantiene')
      }
    }
    
    return true
  } catch (error) {
    logError('Error en limpieza', error)
    return false
  }
}

// ============================================
// EJECUTAR TODOS LOS TESTS
// ============================================
async function runAllTests() {
  log('\n🚒 INICIANDO TESTS DEL MÓDULO MATERIAL MAYOR (CARROS) 🚒\n', 'magenta')
  log('Fecha: ' + new Date().toLocaleString(), 'cyan')
  log('Backend URL: ' + BASE_URL, 'cyan')
  
  const tests = [
    { name: 'Autenticación', fn: testAuth },
    { name: 'Listar Carros', fn: testListarCarros },
    { name: 'Estadísticas', fn: testEstadisticas },
    { name: 'Sistema de Alertas', fn: testAlertas },
    { name: 'Detalle de Carro', fn: testDetalleCarro },
    { name: 'Crear Carro', fn: testCrearCarro },
    { name: 'Gestión de Cajoneras', fn: testCajoneras },
    { name: 'Conductores Habilitados', fn: testConductores },
    { name: 'Mantenciones', fn: testMantenciones },
    { name: 'Asignación de Material', fn: testAsignacionMaterial },
    { name: 'Historial', fn: testHistorial },
    { name: 'Limpieza', fn: testLimpieza }
  ]
  
  let passed = 0
  let failed = 0
  
  for (const test of tests) {
    await sleep(500) // Pequeña pausa entre tests
    const result = await test.fn()
    if (result) {
      passed++
    } else {
      failed++
    }
  }
  
  // Resumen final
  logSection('RESUMEN DE TESTS')
  log(`\nTotal Tests: ${tests.length}`, 'cyan')
  log(`✅ Exitosos: ${passed}`, 'green')
  log(`❌ Fallidos: ${failed}`, 'red')
  
  if (failed === 0) {
    log('\n🎉 ¡TODOS LOS TESTS PASARON EXITOSAMENTE! 🎉\n', 'green')
    log('El módulo de Material Mayor está funcionando correctamente.\n', 'green')
  } else {
    log('\n⚠️  Algunos tests fallaron. Revisa los errores arriba.\n', 'yellow')
  }
  
  log('=' .repeat(60) + '\n', 'cyan')
}

// Ejecutar
runAllTests().catch(error => {
  log('\n❌ Error fatal en la ejecución de tests:', 'red')
  console.error(error)
  process.exit(1)
})
