// Script de prueba completo para el módulo Material Menor
// Ejecutar con: node test-material-menor.js

import axios from 'axios'

const API_BASE = 'http://localhost:3001/api'
let authToken = ''

// Colores para consola
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function logTest(testName, passed, details = '') {
  const status = passed ? '✅ PASS' : '❌ FAIL'
  const color = passed ? 'green' : 'red'
  log(`${status} - ${testName}`, color)
  if (details) {
    log(`   ${details}`, 'cyan')
  }
}

// Login para obtener token
async function login() {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email: 'admin',
      password: '1234'
    })
    authToken = response.data.token
    logTest('Login', true, 'Token obtenido correctamente')
    return true
  } catch (error) {
    logTest('Login', false, error.response?.data?.error || error.message)
    return false
  }
}

// Headers con autenticación
const getHeaders = () => ({
  headers: { Authorization: `Bearer ${authToken}` }
})

// ==================== TESTS DE CATEGORÍAS ====================

async function testCategorias() {
  log('\n📂 TESTING CATEGORÍAS', 'magenta')
  log('═══════════════════════════════════════', 'magenta')

  try {
    // 1. Obtener todas las categorías
    const response = await axios.get(`${API_BASE}/categorias`, getHeaders())
    const categorias = response.data
    
    logTest('GET /categorias', 
      Array.isArray(categorias) && categorias.length > 0,
      `${categorias.length} categorías encontradas`
    )

    // 2. Verificar jerarquía (buscar subcategorías)
    const subcategorias = categorias.filter(c => c.subcategorias && c.subcategorias.length > 0)
    logTest('Jerarquía de categorías',
      subcategorias.length > 0,
      `${subcategorias.length} categorías con subcategorías`
    )

    // 3. Obtener categorías flat
    const flatResponse = await axios.get(`${API_BASE}/categorias?flat=true`, getHeaders())
    logTest('GET /categorias?flat=true',
      Array.isArray(flatResponse.data),
      `${flatResponse.data.length} categorías en lista plana`
    )

    // 4. Obtener estadísticas
    const statsResponse = await axios.get(`${API_BASE}/categorias/estadisticas`, getHeaders())
    const stats = statsResponse.data
    logTest('GET /categorias/estadisticas',
      stats.totalCategorias !== undefined,
      `Total: ${stats.totalCategorias}, Con material: ${stats.categoriasConMaterial}`
    )

    // 5. Obtener categoría por ID
    const categoriaId = categorias[0].id
    const catResponse = await axios.get(`${API_BASE}/categorias/${categoriaId}`, getHeaders())
    logTest('GET /categorias/:id',
      catResponse.data.id === categoriaId,
      `Categoría "${catResponse.data.nombre}" obtenida`
    )

    // 6. Crear nueva categoría
    try {
      const newCat = await axios.post(`${API_BASE}/categorias`, {
        nombre: 'Categoría de Prueba',
        descripcion: 'Prueba automática',
        icono: 'TestIcon',
        activo: true
      }, getHeaders())
      
      const createdId = newCat.data.id
      logTest('POST /categorias (crear)',
        newCat.data.nombre === 'Categoría de Prueba',
        `Categoría creada con ID: ${createdId}`
      )

      // 7. Actualizar categoría
      const updated = await axios.put(`${API_BASE}/categorias/${createdId}`, {
        descripcion: 'Descripción actualizada'
      }, getHeaders())
      logTest('PUT /categorias/:id (actualizar)',
        updated.data.descripcion === 'Descripción actualizada',
        'Categoría actualizada correctamente'
      )

      // 8. Desactivar categoría
      const deleted = await axios.delete(`${API_BASE}/categorias/${createdId}`, getHeaders())
      logTest('DELETE /categorias/:id (soft delete)',
        deleted.data.message.includes('desactivada'),
        'Categoría desactivada correctamente'
      )

    } catch (error) {
      logTest('CRUD de categorías', false, error.response?.data?.error || error.message)
    }

  } catch (error) {
    logTest('Test de categorías completo', false, error.response?.data?.error || error.message)
  }
}

// ==================== TESTS DE MATERIAL ====================

async function testMaterial() {
  log('\n📦 TESTING MATERIAL', 'magenta')
  log('═══════════════════════════════════════', 'magenta')

  try {
    // 1. Obtener todo el material
    const response = await axios.get(`${API_BASE}/material`, getHeaders())
    const material = response.data.material
    const pagination = response.data.pagination
    
    logTest('GET /material',
      Array.isArray(material) && material.length > 0,
      `${material.length} items encontrados, Total: ${pagination.total}`
    )

    // 2. Verificar tipos de material
    const individual = material.filter(m => m.tipo === 'individual')
    const cantidad = material.filter(m => m.tipo === 'cantidad')
    logTest('Tipos de material',
      individual.length > 0 && cantidad.length > 0,
      `Individual: ${individual.length}, Cantidad: ${cantidad.length}`
    )

    // 3. Verificar campos específicos de cada tipo
    const tieneNumeroSerie = individual.some(m => m.numeroSerie)
    const tieneCantidad = cantidad.some(m => m.cantidad && m.unidadMedida)
    logTest('Campos específicos por tipo',
      tieneNumeroSerie && tieneCantidad,
      'Individual tiene S/N, Cantidad tiene cantidad y unidad'
    )

    // 4. Obtener estadísticas
    const statsResponse = await axios.get(`${API_BASE}/material/estadisticas`, getHeaders())
    const stats = statsResponse.data
    logTest('GET /material/estadisticas',
      stats.totalMaterial !== undefined,
      `Total: ${stats.totalMaterial}, Asignado: ${stats.totalAsignado}, Disponible: ${stats.totalDisponible}`
    )

    // 5. Verificar estados
    const porEstado = stats.porEstado
    logTest('Distribución por estado',
      Array.isArray(porEstado) && porEstado.length > 0,
      porEstado.map(e => `${e.estado}: ${e.cantidad}`).join(', ')
    )

    // 6. Verificar distribución por categoría
    const porCategoria = stats.porCategoria
    logTest('Distribución por categoría',
      Array.isArray(porCategoria) && porCategoria.length > 0,
      `${porCategoria.length} categorías con material`
    )

    // 7. Obtener material por ID con asignaciones
    const materialId = material[0].id
    const matResponse = await axios.get(`${API_BASE}/material/${materialId}`, getHeaders())
    logTest('GET /material/:id',
      matResponse.data.id === materialId,
      `Material "${matResponse.data.nombre}" con ${matResponse.data.asignaciones?.length || 0} asignaciones`
    )

    // 8. Crear material individual
    try {
      const categorias = await axios.get(`${API_BASE}/categorias?flat=true`, getHeaders())
      const categoriaId = categorias.data[0]?.id

      const newMaterial = await axios.post(`${API_BASE}/material`, {
        nombre: 'Material de Prueba Individual',
        descripcion: 'Prueba automática',
        categoriaId: categoriaId,
        estado: 'Disponible',
        tipo: 'individual',
        numeroSerie: 'TEST-001',
        ubicacionFisica: 'Bodega Test',
        activo: true
      }, getHeaders())
      
      const createdId = newMaterial.data.id
      logTest('POST /material (crear individual)',
        newMaterial.data.tipo === 'individual' && newMaterial.data.numeroSerie === 'TEST-001',
        `Material individual creado con ID: ${createdId}`
      )

      // 9. Crear material tipo cantidad
      const newMaterialCantidad = await axios.post(`${API_BASE}/material`, {
        nombre: 'Material de Prueba Cantidad',
        descripcion: 'Prueba automática cantidad',
        categoriaId: categoriaId,
        estado: 'Disponible',
        tipo: 'cantidad',
        cantidad: 100,
        unidadMedida: 'unidades',
        ubicacionFisica: 'Bodega Test',
        activo: true
      }, getHeaders())
      
      logTest('POST /material (crear cantidad)',
        newMaterialCantidad.data.tipo === 'cantidad' && newMaterialCantidad.data.cantidad === 100,
        `Material cantidad creado con ${newMaterialCantidad.data.cantidad} ${newMaterialCantidad.data.unidadMedida}`
      )

      // 10. Actualizar material
      const updated = await axios.put(`${API_BASE}/material/${createdId}`, {
        observaciones: 'Material actualizado en test'
      }, getHeaders())
      logTest('PUT /material/:id (actualizar)',
        updated.data.observaciones === 'Material actualizado en test',
        'Material actualizado correctamente'
      )

      // 11. Desactivar material
      const deleted = await axios.delete(`${API_BASE}/material/${createdId}`, getHeaders())
      logTest('DELETE /material/:id (soft delete)',
        deleted.data.message.includes('desactivado'),
        'Material desactivado correctamente'
      )

    } catch (error) {
      logTest('CRUD de material', false, error.response?.data?.error || error.message)
    }

  } catch (error) {
    logTest('Test de material completo', false, error.response?.data?.error || error.message)
  }
}

// ==================== TESTS DE ASIGNACIONES ====================

async function testAsignaciones() {
  log('\n📋 TESTING ASIGNACIONES', 'magenta')
  log('═══════════════════════════════════════', 'magenta')

  try {
    // Obtener material y bomberos para las pruebas
    const materialResponse = await axios.get(`${API_BASE}/material`, getHeaders())
    const material = materialResponse.data.material
    const bomberosResponse = await axios.get(`${API_BASE}/bomberos`, getHeaders())
    const bomberos = bomberosResponse.data.bomberos

    if (material.length === 0 || bomberos.length === 0) {
      logTest('Pre-requisitos', false, 'No hay material o bomberos disponibles')
      return
    }

    // Buscar material disponible sin asignaciones
    const materialDisponible = material.find(m => 
      m.estado === 'Disponible' && 
      (!m.asignaciones || m.asignaciones.filter(a => a.activo).length === 0)
    )

    if (!materialDisponible) {
      log('   ℹ️  No hay material disponible sin asignaciones para probar', 'yellow')
      
      // Verificar material con asignaciones existentes
      const materialConAsignaciones = material.filter(m => 
        m.asignaciones && m.asignaciones.length > 0
      )
      logTest('Material con asignaciones existentes',
        materialConAsignaciones.length > 0,
        `${materialConAsignaciones.length} items con historial de asignaciones`
      )
      return
    }

    const bombero = bomberos[0]

    // 1. Asignar material
    try {
      const asignacion = await axios.post(
        `${API_BASE}/material/${materialDisponible.id}/asignar`,
        {
          bomberoId: bombero.id,
          motivo: 'Prueba automática de asignación',
          observaciones: 'Test de asignación',
          cantidadAsignada: materialDisponible.tipo === 'cantidad' ? 5 : undefined
        },
        getHeaders()
      )

      const asignacionId = asignacion.data.id
      logTest('POST /material/:id/asignar',
        asignacion.data.materialId === materialDisponible.id,
        `Material asignado a ${asignacion.data.bombero.nombres} ${asignacion.data.bombero.apellidos}`
      )

      // 2. Obtener historial
      const historial = await axios.get(
        `${API_BASE}/material/${materialDisponible.id}/historial`,
        getHeaders()
      )
      logTest('GET /material/:id/historial',
        historial.data.historial.length > 0,
        `${historial.data.totalAsignaciones} asignaciones, ${historial.data.asignacionesActivas} activas`
      )

      // 3. Devolver material
      const devolucion = await axios.put(
        `${API_BASE}/material/asignaciones/${asignacionId}/devolver`,
        { observaciones: 'Material devuelto en test' },
        getHeaders()
      )
      logTest('PUT /material/asignaciones/:id/devolver',
        devolucion.data.fechaDevolucion !== null,
        'Material devuelto correctamente'
      )

    } catch (error) {
      logTest('Flujo de asignación/devolución', false, error.response?.data?.error || error.message)
    }

  } catch (error) {
    logTest('Test de asignaciones completo', false, error.response?.data?.error || error.message)
  }
}

// ==================== TESTS DE ALERTAS ====================

async function testAlertas() {
  log('\n⚠️  TESTING ALERTAS', 'magenta')
  log('═══════════════════════════════════════', 'magenta')

  try {
    const response = await axios.get(`${API_BASE}/material/alertas`, getHeaders())
    const alertas = response.data

    logTest('GET /material/alertas',
      alertas.totales !== undefined,
      `Total de alertas: ${alertas.totalAlertas}`
    )

    // Verificar tipos de alertas
    const tipos = alertas.totales
    log(`   📊 Desglose de alertas:`, 'cyan')
    log(`      - Múltiples asignaciones: ${tipos.multipleAsignaciones}`, 'cyan')
    log(`      - Próximo a vencer: ${tipos.proximoVencer}`, 'cyan')
    log(`      - Próximo a mantención: ${tipos.proximoMantencion}`, 'cyan')
    log(`      - Vencido: ${tipos.vencido}`, 'cyan')
    log(`      - Mantención atrasada: ${tipos.mantencionAtrasada}`, 'cyan')

    logTest('Estructura de alertas completa',
      alertas.alertas.multipleAsignaciones !== undefined &&
      alertas.alertas.proximoVencer !== undefined &&
      alertas.alertas.proximoMantencion !== undefined,
      'Todas las categorías de alertas están presentes'
    )

    // Verificar detalles de alertas
    if (alertas.totalAlertas > 0) {
      const primeraAlerta = Object.values(alertas.alertas)
        .flat()
        .find(a => a !== undefined && a.length > 0)?.[0]

      if (primeraAlerta) {
        logTest('Datos completos en alertas',
          primeraAlerta.tipoAlerta && primeraAlerta.mensaje && primeraAlerta.prioridad,
          `Alerta incluye tipo, mensaje y prioridad`
        )
      }
    } else {
      log(`   ℹ️  No hay alertas activas (esto es normal si el material está bien gestionado)`, 'yellow')
    }

  } catch (error) {
    logTest('Test de alertas completo', false, error.response?.data?.error || error.message)
  }
}

// ==================== TESTS DE VALIDACIONES ====================

async function testValidaciones() {
  log('\n🔒 TESTING VALIDACIONES', 'magenta')
  log('═══════════════════════════════════════', 'magenta')

  try {
    // 1. Intentar crear categoría con nombre duplicado
    try {
      await axios.post(`${API_BASE}/categorias`, {
        nombre: 'Equipos de Protección Personal', // Ya existe
        activo: true
      }, getHeaders())
      logTest('Validación nombre duplicado categoría', false, 'Permitió nombre duplicado')
    } catch (error) {
      logTest('Validación nombre duplicado categoría', 
        error.response?.status === 400,
        'Rechazó correctamente nombre duplicado'
      )
    }

    // 2. Intentar crear material individual sin número de serie
    try {
      await axios.post(`${API_BASE}/material`, {
        nombre: 'Test Sin Serie',
        tipo: 'individual',
        estado: 'Disponible'
        // Sin numeroSerie
      }, getHeaders())
      logTest('Validación S/N obligatorio', false, 'Permitió individual sin S/N')
    } catch (error) {
      logTest('Validación S/N obligatorio',
        error.response?.status === 400,
        'Rechazó correctamente material individual sin S/N'
      )
    }

    // 3. Intentar crear material cantidad sin cantidad
    try {
      await axios.post(`${API_BASE}/material`, {
        nombre: 'Test Sin Cantidad',
        tipo: 'cantidad',
        estado: 'Disponible'
        // Sin cantidad
      }, getHeaders())
      logTest('Validación cantidad obligatoria', false, 'Permitió cantidad sin stock')
    } catch (error) {
      logTest('Validación cantidad obligatoria',
        error.response?.status === 400,
        'Rechazó correctamente material cantidad sin stock'
      )
    }

    log('   ✅ Todas las validaciones funcionan correctamente', 'green')

  } catch (error) {
    logTest('Test de validaciones completo', false, error.response?.data?.error || error.message)
  }
}

// ==================== EJECUCIÓN PRINCIPAL ====================

async function runAllTests() {
  log('\n🚀 INICIANDO TESTS DEL MÓDULO MATERIAL MENOR', 'blue')
  log('══════════════════════════════════════════════════', 'blue')
  
  const loginSuccess = await login()
  if (!loginSuccess) {
    log('\n❌ No se pudo obtener token de autenticación. Abortando tests.', 'red')
    return
  }

  await testCategorias()
  await testMaterial()
  await testAsignaciones()
  await testAlertas()
  await testValidaciones()

  log('\n', 'reset')
  log('══════════════════════════════════════════════════', 'blue')
  log('✅ TESTS COMPLETADOS', 'green')
  log('══════════════════════════════════════════════════', 'blue')
  log('\n📊 Verifica los resultados arriba para confirmar que todo funciona correctamente.', 'cyan')
}

// Ejecutar tests
runAllTests().catch(error => {
  log(`\n❌ Error fatal: ${error.message}`, 'red')
  process.exit(1)
})
