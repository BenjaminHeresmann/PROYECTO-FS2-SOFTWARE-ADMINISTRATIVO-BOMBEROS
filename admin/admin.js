// ========================================
// SISTEMA ADMINISTRATIVO - NIVEL ESTUDIANTIL
// Panel de control completo para administradores
// ========================================

// 🔐 VERIFICACIÓN DE ACCESO ADMINISTRATIVO
let usuarioActual = null;
let modoEdicion = false;
let itemEditando = null;

// 📋 CONFIGURACIÓN DE RUTAS ADMINISTRATIVAS
const RUTAS_ADMIN = {
    '/admin': 'dashboard',
    '/admin/bomberos': 'admin-bomberos',
    '/admin/oficiales': 'admin-oficiales', 
    '/admin/citaciones': 'admin-citaciones',
    '/admin/usuarios': 'admin-usuarios',
    '/admin/permisos': 'admin-permisos'
};

// 🛠️ ROUTER ADMINISTRATIVO
class AdminRouter {
    constructor() {
        this.rutaActual = '';
        this.inicializar();
    }
    
    inicializar() {
        this.configurarEventos();
        this.cargarRutaInicial();
    }
    
    configurarEventos() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/admin"]')) {
                e.preventDefault();
                this.navegarA(e.target.getAttribute('href'));
            }
        });
        
        window.addEventListener('popstate', () => {
            this.cargarRutaActual();
        });
    }
    
    navegarA(ruta) {
        if (ruta !== this.rutaActual) {
            window.history.pushState(null, null, ruta);
            this.cargarRutaActual();
        }
    }
    
    cargarRutaActual() {
        const ruta = window.location.pathname;
        const seccionId = RUTAS_ADMIN[ruta] || 'dashboard';
        
        this.rutaActual = ruta;
        this.mostrarSeccionAdmin(seccionId);
        this.actualizarNavegacionAdmin(ruta);
    }
    
    mostrarSeccionAdmin(seccionId) {
        // Ocultar todas las secciones
        const secciones = document.querySelectorAll('.admin-section');
        secciones.forEach(seccion => seccion.style.display = 'none');
        
        // Mostrar la sección seleccionada
        const seccion = document.getElementById(seccionId);
        if (seccion) {
            seccion.style.display = 'block';
            
            // Cargar datos específicos de la sección
            this.cargarDatosSeccion(seccionId);
        }
    }
    
    cargarDatosSeccion(seccionId) {
        switch(seccionId) {
            case 'dashboard':
                actualizarEstadisticas();
                break;
            case 'admin-bomberos':
                cargarListaBomberos();
                break;
            case 'admin-oficiales':
                cargarListaOficiales();
                break;
            case 'admin-citaciones':
                cargarListaCitaciones();
                break;
            case 'admin-usuarios':
                cargarListaUsuarios();
                break;
            case 'admin-permisos':
                cargarUsuariosParaPermisos();
                break;
        }
    }
    
    actualizarNavegacionAdmin(rutaActiva) {
        const enlaces = document.querySelectorAll('.nav-link');
        enlaces.forEach(enlace => {
            const href = enlace.getAttribute('href');
            enlace.classList.toggle('active', href === rutaActiva);
        });
    }
    
    cargarRutaInicial() {
        this.cargarRutaActual();
    }
}

// ========================================
// INICIALIZACIÓN DEL PANEL ADMINISTRATIVO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('👑 Panel Administrativo iniciado');
    
    // Verificar acceso administrativo
    if (!verificarAccesoAdmin()) {
        console.log('❌ Acceso denegado - Redirigiendo al login');
        window.location.href = '../auth/login.html';
        return;
    }
    
    // Inicializar datos base si no existen
    inicializarDatosBase();
    
    // Configurar sistema
    configurarSistemaAdmin();
    
    // Inicializar router
    const router = new AdminRouter();
    
    console.log('✅ Panel administrativo listo');
});

// 🔐 FUNCIÓN: Verificar acceso administrativo
function verificarAccesoAdmin() {
    const sesion = localStorage.getItem('bomberosAuth');
    const usuario = localStorage.getItem('bomberosUser');
    
    if (sesion === 'true' && usuario) {
        const datosUsuario = JSON.parse(usuario);
        usuarioActual = datosUsuario;
        
        // Verificar que sea administrador
        if (datosUsuario.tipo === 'administrador') {
            mostrarInfoAdmin(datosUsuario);
            return true;
        }
    }
    
    return false;
}

// 👤 FUNCIÓN: Mostrar información del administrador
function mostrarInfoAdmin(usuario) {
    const adminInfo = document.getElementById('adminInfo');
    if (adminInfo) {
        adminInfo.textContent = `👑 ${usuario.nombre}`;
    }
}

// ⚙️ FUNCIÓN: Configurar sistema administrativo
function configurarSistemaAdmin() {
    // Configurar botón de logout
    const logoutBtn = document.getElementById('adminLogoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            cerrarSesionAdmin();
        });
    }
    
    // Configurar formularios
    configurarFormularios();
}

// 🚪 FUNCIÓN: Cerrar sesión del administrador
function cerrarSesionAdmin() {
    localStorage.removeItem('bomberosAuth');
    localStorage.removeItem('bomberosUser');
    console.log('🚪 Sesión administrativa cerrada');
    window.location.href = '../auth/login.html';
}

// ========================================
// GESTIÓN DE DATOS BASE
// ========================================

// 🗄️ FUNCIÓN: Inicializar datos simulados de base
function inicializarDatosBase() {
    // NOTA: Para refrescar los datos y añadir nuevos bomberos,
    // abrir la consola del navegador y ejecutar: localStorage.clear(); location.reload();
    
    // Datos base para bomberos
    if (!localStorage.getItem('bomberosData')) {
        const bomberosBase = [
            { id: 1, nombre: 'Juan Pérez', rango: 'Bombero', especialidad: 'Rescate', estado: 'Activo' },
            { id: 2, nombre: 'María González', rango: 'Cabo', especialidad: 'Emergencias médicas', estado: 'Activo' },
            { id: 3, nombre: 'Carlos Rodríguez', rango: 'Sargento', especialidad: 'Incendios', estado: 'Activo' },
            { id: 4, nombre: 'Ana López', rango: 'Bombero', especialidad: 'Rescate acuático', estado: 'Activo' },
            { id: 5, nombre: 'Pedro Martínez', rango: 'Cabo', especialidad: 'Materiales peligrosos', estado: 'Licencia' },
            { id: 6, nombre: 'Laura Sánchez', rango: 'Bombero', especialidad: 'Rescate urbano', estado: 'Activo' },
            { id: 7, nombre: 'Diego Torres', rango: 'Sargento', especialidad: 'Comandante de unidad', estado: 'Activo' },
            { id: 8, nombre: 'Patricia Ramírez', rango: 'Bombero', especialidad: 'Primeros auxilios', estado: 'Activo' },
            { id: 9, nombre: 'Pedro Sánchez', rango: 'Bombero', especialidad: 'Rescate general', estado: 'Activo', email: 'bombero@bomberos.cl' }
        ];
        localStorage.setItem('bomberosData', JSON.stringify(bomberosBase));
    }
    
    // Datos base para oficiales
    if (!localStorage.getItem('oficialesData')) {
        const oficialesBase = [
            { id: 1, nombre: 'Roberto Silva', cargo: 'Director', responsabilidad: 'Máxima autoridad administrativa' },
            { id: 2, nombre: 'Carmen Morales', cargo: 'Secretario', responsabilidad: 'Gestión documental y actas' },
            { id: 3, nombre: 'Eduardo Vargas', cargo: 'Tesorero', responsabilidad: 'Administración financiera' },
            { id: 4, nombre: 'Isabel Herrera', cargo: 'Capitán', responsabilidad: 'Comando operativo superior' },
            { id: 5, nombre: 'Francisco Díaz', cargo: 'Teniente Primero', responsabilidad: 'Segundo al mando operativo' },
            { id: 6, nombre: 'Monica Castro', cargo: 'Teniente Segundo', responsabilidad: 'Apoyo comando operativo' },
            { id: 7, nombre: 'Andrés Flores', cargo: 'Teniente Tercero', responsabilidad: 'Supervisión operativa' },
            { id: 8, nombre: 'Rosa Mendoza', cargo: 'Ayudante', responsabilidad: 'Soporte administrativo' }
        ];
        localStorage.setItem('oficialesData', JSON.stringify(oficialesBase));
    }
    
    // Datos base para citaciones
    if (!localStorage.getItem('citacionesData')) {
        const citacionesBase = [
            { 
                id: 1, 
                titulo: 'Reunión mensual ordinaria',
                fecha: '2025-09-20',
                hora: '19:00',
                lugar: 'Cuartel Segunda Compañía',
                motivo: 'Revisión de actividades del mes y planificación de eventos futuros'
            },
            { 
                id: 2, 
                titulo: 'Entrenamiento de rescate',
                fecha: '2025-09-25',
                hora: '10:00',
                lugar: 'Campo de entrenamiento',
                motivo: 'Práctica de técnicas de rescate en altura y espacios confinados'
            }
        ];
        localStorage.setItem('citacionesData', JSON.stringify(citacionesBase));
    }
    
    console.log('🗄️ Datos base inicializados correctamente');
}

// ========================================
// FUNCIONES DE NAVEGACIÓN Y UTILIDADES
// ========================================

// 🧭 FUNCIÓN: Navegar a una sección específica
function navegarA(ruta) {
    window.history.pushState(null, null, ruta);
    const evento = new PopStateEvent('popstate');
    window.dispatchEvent(evento);
}

// 📊 FUNCIÓN: Actualizar estadísticas del dashboard
function actualizarEstadisticas() {
    const bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    const oficiales = JSON.parse(localStorage.getItem('oficialesData')) || [];
    const citaciones = JSON.parse(localStorage.getItem('citacionesData')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuariosData')) || [];
    
    document.getElementById('totalBomberos').textContent = bomberos.length;
    document.getElementById('totalOficiales').textContent = oficiales.length;
    document.getElementById('totalCitaciones').textContent = citaciones.length;
    document.getElementById('totalUsuarios').textContent = usuarios.length + 5; // +5 usuarios base
}

// 📋 FUNCIÓN: Mostrar formulario
function mostrarFormulario(tipo) {
    const formularios = {
        'nuevo-bombero': 'form-bombero',
        'nueva-citacion': 'form-citacion',
        'nuevo-oficial': 'form-oficial',
        'nuevo-usuario': 'form-usuario'
    };
    
    const formId = formularios[tipo];
    const form = document.getElementById(formId);
    
    if (form) {
        form.style.display = 'block';
        form.scrollIntoView({ behavior: 'smooth' });
        
        // Limpiar formulario si es nuevo
        if (!modoEdicion) {
            form.querySelector('form').reset();
        }
        
        // Si es formulario de citación, cargar lista de bomberos
        if (tipo === 'nueva-citacion') {
            cargarBomberosParaCitacion();
        }
    }
}

// ❌ FUNCIÓN: Ocultar formulario
function ocultarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.style.display = 'none';
        modoEdicion = false;
        itemEditando = null;
    }
}

// ========================================
// GESTIÓN DE BOMBEROS
// ========================================

// 🚒 FUNCIÓN: Cargar lista de bomberos
function cargarListaBomberos() {
    const bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    const tbody = document.getElementById('listaBomberos');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    bomberos.forEach((bombero, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${bombero.nombre}</td>
            <td>${bombero.rango}</td>
            <td><span class="badge badge-${bombero.estado.toLowerCase()}">${bombero.estado}</span></td>
            <td>
                <button class="btn-small btn-edit" onclick="editarBombero(${bombero.id})">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="eliminarBombero(${bombero.id})">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// ✏️ FUNCIÓN: Editar bombero
function editarBombero(id) {
    const bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    const bombero = bomberos.find(b => b.id === id);
    
    if (bombero) {
        document.getElementById('nombre-bombero').value = bombero.nombre;
        document.getElementById('rango-bombero').value = bombero.rango;
        document.getElementById('especialidad-bombero').value = bombero.especialidad;
        document.getElementById('estado-bombero').value = bombero.estado;
        
        document.getElementById('titulo-form-bombero').textContent = '✏️ Editar Bombero';
        
        modoEdicion = true;
        itemEditando = id;
        mostrarFormulario('nuevo-bombero');
    }
}

// 🗑️ FUNCIÓN: Eliminar bombero
function eliminarBombero(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este bombero?')) {
        let bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
        bomberos = bomberos.filter(b => b.id !== id);
        localStorage.setItem('bomberosData', JSON.stringify(bomberos));
        cargarListaBomberos();
        actualizarEstadisticas();
        console.log('🗑️ Bombero eliminado');
    }
}

// ========================================
// GESTIÓN DE OFICIALES
// ========================================

// 👨‍💼 FUNCIÓN: Cargar lista de oficiales
function cargarListaOficiales() {
    const oficiales = JSON.parse(localStorage.getItem('oficialesData')) || [];
    const tbody = document.getElementById('listaOficiales');
    
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    oficiales.forEach((oficial, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${oficial.nombre}</td>
            <td>${oficial.cargo}</td>
            <td>${oficial.responsabilidad}</td>
            <td>
                <button class="btn-small btn-edit" onclick="editarOficial(${oficial.id})">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="eliminarOficial(${oficial.id})">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// ✏️ FUNCIÓN: Editar oficial
function editarOficial(id) {
    const oficiales = JSON.parse(localStorage.getItem('oficialesData')) || [];
    const oficial = oficiales.find(o => o.id === id);
    
    if (oficial) {
        document.getElementById('nombre-oficial').value = oficial.nombre;
        document.getElementById('cargo-oficial').value = oficial.cargo;
        document.getElementById('responsabilidad-oficial').value = oficial.responsabilidad;
        
        document.getElementById('titulo-form-oficial').textContent = '✏️ Editar Oficial';
        
        modoEdicion = true;
        itemEditando = id;
        mostrarFormulario('nuevo-oficial');
    }
}

// 🗑️ FUNCIÓN: Eliminar oficial
function eliminarOficial(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este oficial?')) {
        let oficiales = JSON.parse(localStorage.getItem('oficialesData')) || [];
        oficiales = oficiales.filter(o => o.id !== id);
        localStorage.setItem('oficialesData', JSON.stringify(oficiales));
        cargarListaOficiales();
        actualizarEstadisticas();
        console.log('🗑️ Oficial eliminado');
    }
}

// ========================================
// GESTIÓN DE CITACIONES
// ========================================

// 📅 FUNCIÓN: Cargar lista de citaciones
function cargarListaCitaciones() {
    const citaciones = JSON.parse(localStorage.getItem('citacionesData')) || [];
    const container = document.getElementById('listaCitacionesAdmin');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    citaciones.forEach(citacion => {
        const div = document.createElement('div');
        div.className = 'citacion-admin-item';
        
        // Generar lista de bomberos citados
        let bomberosHtml = '';
        if (citacion.bomberosCitados && citacion.bomberosCitados.length > 0) {
            bomberosHtml = `
                <div class="bomberos-citados">
                    <strong>👥 Bomberos Citados:</strong>
                    <div class="bomberos-list">
                        ${citacion.bomberosCitados.map(bombero => {
                            const emailInfo = bombero.email ? ` title="📧 ${bombero.email}"` : '';
                            return `<span class="bombero-tag"${emailInfo}>${bombero.nombre} (${bombero.rango})</span>`;
                        }).join('')}
                    </div>
                    <small class="bomberos-count">${citacion.bomberosCitados.length} bombero(s) citado(s)</small>
                </div>
            `;
        } else {
            bomberosHtml = '<div class="bomberos-citados"><span class="no-bomberos">⚠️ Sin bomberos asignados</span></div>';
        }
        
        div.innerHTML = `
            <h4>${citacion.titulo}</h4>
            <p><strong>📅 Fecha:</strong> ${formatearFecha(citacion.fecha)}</p>
            <p><strong>🕐 Hora:</strong> ${citacion.hora}</p>
            <p><strong>📍 Lugar:</strong> ${citacion.lugar}</p>
            <p><strong>📝 Motivo:</strong> ${citacion.motivo}</p>
            ${bomberosHtml}
            <div class="citacion-actions">
                <button class="btn-small btn-edit" onclick="editarCitacion(${citacion.id})">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="eliminarCitacion(${citacion.id})">🗑️ Eliminar</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// ✏️ FUNCIÓN: Editar citación
function editarCitacion(id) {
    const citaciones = JSON.parse(localStorage.getItem('citacionesData')) || [];
    const citacion = citaciones.find(c => c.id === id);
    
    if (citacion) {
        document.getElementById('titulo-citacion').value = citacion.titulo;
        document.getElementById('fecha-citacion').value = citacion.fecha;
        document.getElementById('hora-citacion').value = citacion.hora;
        document.getElementById('lugar-citacion').value = citacion.lugar;
        document.getElementById('motivo-citacion').value = citacion.motivo;
        
        document.getElementById('titulo-form-citacion').textContent = '✏️ Editar Citación';
        
        modoEdicion = true;
        itemEditando = id;
        mostrarFormulario('nueva-citacion');
        
        // Esperar a que se cargue la lista de bomberos y luego marcar los seleccionados
        setTimeout(() => {
            if (citacion.bomberosCitados) {
                citacion.bomberosCitados.forEach(bombero => {
                    const checkbox = document.getElementById(`bombero-${bombero.id}`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }
        }, 100);
    }
}

// 🗑️ FUNCIÓN: Eliminar citación
function eliminarCitacion(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta citación?')) {
        let citaciones = JSON.parse(localStorage.getItem('citacionesData')) || [];
        citaciones = citaciones.filter(c => c.id !== id);
        localStorage.setItem('citacionesData', JSON.stringify(citaciones));
        cargarListaCitaciones();
        actualizarEstadisticas();
        console.log('🗑️ Citación eliminada');
    }
}

// 👥 FUNCIÓN: Cargar bomberos para citación
function cargarBomberosParaCitacion() {
    const bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    const container = document.getElementById('lista-bomberos-citacion');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (bomberos.length === 0) {
        container.innerHTML = '<p class="no-bomberos">No hay bomberos registrados en el sistema.</p>';
        return;
    }
    
    bomberos.forEach(bombero => {
        const div = document.createElement('div');
        div.className = 'bombero-checkbox-item';
        
        // Construir información adicional del bombero
        let infoAdicional = `
            <span class="bombero-rango">${bombero.rango}</span>
            <span class="bombero-especialidad">${bombero.especialidad}</span>
        `;
        
        // Añadir email si está disponible
        if (bombero.email) {
            infoAdicional += `<span class="bombero-email">📧 ${bombero.email}</span>`;
        }
        
        div.innerHTML = `
            <label class="checkbox-label">
                <input type="checkbox" 
                       name="bomberos-seleccionados" 
                       value="${bombero.id}" 
                       id="bombero-${bombero.id}">
                <span class="checkmark"></span>
                <div class="bombero-info">
                    <strong>${bombero.nombre}</strong>
                    ${infoAdicional}
                </div>
            </label>
        `;
        container.appendChild(div);
    });
}

// ✅❌ FUNCIÓN: Seleccionar/Deseleccionar todos los bomberos
function seleccionarTodosBomberos(seleccionar) {
    const checkboxes = document.querySelectorAll('input[name="bomberos-seleccionados"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = seleccionar;
    });
}

// 🔄 FUNCIÓN: Actualizar datos base (para desarrollo)
function actualizarDatosBase() {
    // Eliminar solo los datos base para regenerarlos
    localStorage.removeItem('bomberosData');
    localStorage.removeItem('oficialesData');
    localStorage.removeItem('citacionesData');
    
    // Reinicializar
    inicializarDatosBase();
    
    // Recargar las listas actuales
    if (typeof cargarListaBomberos === 'function') cargarListaBomberos();
    if (typeof cargarListaOficiales === 'function') cargarListaOficiales();
    if (typeof cargarListaCitaciones === 'function') cargarListaCitaciones();
    if (typeof actualizarEstadisticas === 'function') actualizarEstadisticas();
    
    console.log('✅ Datos base actualizados correctamente');
    alert('✅ Datos base actualizados. Pedro Sánchez ha sido añadido al sistema.');
}

// Función disponible globalmente para facilidad de uso en consola
window.actualizarDatosBase = actualizarDatosBase;

// ========================================
// GESTIÓN DE USUARIOS
// ========================================

// 👥 FUNCIÓN: Cargar lista de usuarios
function cargarListaUsuarios() {
    // Aquí se cargarían los usuarios del sistema
    // Por simplicidad, mostraremos los usuarios base
    const tbody = document.getElementById('listaUsuarios');
    if (!tbody) return;
    
    // Usuarios simulados (normalmente vendría de una base de datos)
    const usuarios = [
        { email: 'comandante@bomberos.cl', nombre: 'Carlos Rodríguez', rol: 'Comandante', permisos: 'bomberos,citaciones,solicitudes' },
        { email: 'capitan@bomberos.cl', nombre: 'María González', rol: 'Capitán', permisos: 'bomberos,citaciones' },
        { email: 'teniente@bomberos.cl', nombre: 'Luis Martínez', rol: 'Teniente', permisos: 'bomberos' },
        { email: 'sargento@bomberos.cl', nombre: 'Ana López', rol: 'Sargento', permisos: 'bomberos' },
        { email: 'bombero@bomberos.cl', nombre: 'Pedro Sánchez', rol: 'Bombero', permisos: 'bomberos' }
    ];
    
    tbody.innerHTML = '';
    
    usuarios.forEach(usuario => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${usuario.email}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.rol}</td>
            <td><span class="permisos-badge">${usuario.permisos}</span></td>
            <td>
                <button class="btn-small btn-edit" onclick="editarUsuario('${usuario.email}')">✏️ Editar</button>
                <button class="btn-small btn-delete" onclick="eliminarUsuario('${usuario.email}')">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// ========================================
// GESTIÓN DE PERMISOS
// ========================================

// 🔑 FUNCIÓN: Cargar usuarios para gestión de permisos
function cargarUsuariosParaPermisos() {
    const select = document.getElementById('usuario-permisos');
    if (!select) return;
    
    select.innerHTML = '<option value="">-- Seleccionar usuario --</option>';
    
    const usuarios = [
        { email: 'comandante@bomberos.cl', nombre: 'Carlos Rodríguez' },
        { email: 'capitan@bomberos.cl', nombre: 'María González' },
        { email: 'teniente@bomberos.cl', nombre: 'Luis Martínez' },
        { email: 'sargento@bomberos.cl', nombre: 'Ana López' },
        { email: 'bombero@bomberos.cl', nombre: 'Pedro Sánchez' }
    ];
    
    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.email;
        option.textContent = `${usuario.nombre} (${usuario.email})`;
        select.appendChild(option);
    });
}

// 🔍 FUNCIÓN: Cargar permisos de usuario seleccionado
function cargarPermisosUsuario() {
    const select = document.getElementById('usuario-permisos');
    const panel = document.getElementById('panel-permisos');
    const nombreSpan = document.getElementById('nombre-usuario-permisos');
    
    if (select.value) {
        // Mostrar panel
        panel.style.display = 'block';
        nombreSpan.textContent = select.options[select.selectedIndex].text;
        
        // Aquí normalmente cargarías los permisos actuales del usuario
        // Por simplicidad, los dejamos sin marcar
        const checkboxes = document.querySelectorAll('.permiso-checkbox');
        checkboxes.forEach(cb => cb.checked = false);
        
    } else {
        panel.style.display = 'none';
    }
}

// 💾 FUNCIÓN: Guardar permisos
function guardarPermisos() {
    const usuario = document.getElementById('usuario-permisos').value;
    const checkboxes = document.querySelectorAll('.permiso-checkbox:checked');
    const permisos = Array.from(checkboxes).map(cb => cb.value);
    
    console.log(`💾 Guardando permisos para ${usuario}:`, permisos);
    alert(`Permisos actualizados para ${usuario}:\n${permisos.join(', ')}`);
    
    // Aquí normalmente guardarías en la base de datos
}

// ❌ FUNCIÓN: Cancelar permisos
function cancelarPermisos() {
    document.getElementById('usuario-permisos').value = '';
    document.getElementById('panel-permisos').style.display = 'none';
}

// ========================================
// CONFIGURACIÓN DE FORMULARIOS
// ========================================

// 📝 FUNCIÓN: Configurar todos los formularios
function configurarFormularios() {
    // Formulario de bomberos
    const formBombero = document.getElementById('formulario-bombero');
    if (formBombero) {
        formBombero.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarBombero();
        });
    }
    
    // Formulario de oficiales
    const formOficial = document.getElementById('formulario-oficial');
    if (formOficial) {
        formOficial.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarOficial();
        });
    }
    
    // Formulario de citaciones
    const formCitacion = document.getElementById('formulario-citacion');
    if (formCitacion) {
        formCitacion.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarCitacion();
        });
    }
    
    // Formulario de usuarios
    const formUsuario = document.getElementById('formulario-usuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();
            guardarUsuario();
        });
    }
}

// 💾 FUNCIÓN: Guardar bombero
function guardarBombero() {
    const nombre = document.getElementById('nombre-bombero').value;
    const rango = document.getElementById('rango-bombero').value;
    const especialidad = document.getElementById('especialidad-bombero').value;
    const estado = document.getElementById('estado-bombero').value;
    
    let bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    
    if (modoEdicion) {
        // Editar existente
        const index = bomberos.findIndex(b => b.id === itemEditando);
        if (index !== -1) {
            bomberos[index] = { id: itemEditando, nombre, rango, especialidad, estado };
        }
    } else {
        // Crear nuevo
        const nuevoId = Math.max(...bomberos.map(b => b.id), 0) + 1;
        bomberos.push({ id: nuevoId, nombre, rango, especialidad, estado });
    }
    
    localStorage.setItem('bomberosData', JSON.stringify(bomberos));
    cargarListaBomberos();
    actualizarEstadisticas();
    ocultarFormulario('form-bombero');
    
    console.log(modoEdicion ? '✏️ Bombero actualizado' : '➕ Nuevo bombero creado');
}

// 💾 FUNCIÓN: Guardar oficial
function guardarOficial() {
    const nombre = document.getElementById('nombre-oficial').value;
    const cargo = document.getElementById('cargo-oficial').value;
    const responsabilidad = document.getElementById('responsabilidad-oficial').value;
    
    let oficiales = JSON.parse(localStorage.getItem('oficialesData')) || [];
    
    if (modoEdicion) {
        const index = oficiales.findIndex(o => o.id === itemEditando);
        if (index !== -1) {
            oficiales[index] = { id: itemEditando, nombre, cargo, responsabilidad };
        }
    } else {
        const nuevoId = Math.max(...oficiales.map(o => o.id), 0) + 1;
        oficiales.push({ id: nuevoId, nombre, cargo, responsabilidad });
    }
    
    localStorage.setItem('oficialesData', JSON.stringify(oficiales));
    cargarListaOficiales();
    actualizarEstadisticas();
    ocultarFormulario('form-oficial');
    
    console.log(modoEdicion ? '✏️ Oficial actualizado' : '➕ Nuevo oficial creado');
}

// 💾 FUNCIÓN: Guardar citación
function guardarCitacion() {
    const titulo = document.getElementById('titulo-citacion').value;
    const fecha = document.getElementById('fecha-citacion').value;
    const hora = document.getElementById('hora-citacion').value;
    const lugar = document.getElementById('lugar-citacion').value;
    const motivo = document.getElementById('motivo-citacion').value;
    
    // Obtener bomberos seleccionados
    const bomberosSeleccionados = [];
    const checkboxes = document.querySelectorAll('input[name="bomberos-seleccionados"]:checked');
    const bomberos = JSON.parse(localStorage.getItem('bomberosData')) || [];
    
    checkboxes.forEach(checkbox => {
        const bomberoId = parseInt(checkbox.value);
        const bombero = bomberos.find(b => b.id === bomberoId);
        if (bombero) {
            const bomberoData = {
                id: bombero.id,
                nombre: bombero.nombre,
                rango: bombero.rango,
                especialidad: bombero.especialidad
            };
            
            // Añadir email si está disponible
            if (bombero.email) {
                bomberoData.email = bombero.email;
            }
            
            bomberosSeleccionados.push(bomberoData);
        }
    });
    
    // Validar que se haya seleccionado al menos un bombero
    if (bomberosSeleccionados.length === 0) {
        alert('⚠️ Debe seleccionar al menos un bombero para la citación.');
        return;
    }
    
    let citaciones = JSON.parse(localStorage.getItem('citacionesData')) || [];
    
    if (modoEdicion) {
        const index = citaciones.findIndex(c => c.id === itemEditando);
        if (index !== -1) {
            citaciones[index] = { 
                id: itemEditando, 
                titulo, 
                fecha, 
                hora, 
                lugar, 
                motivo, 
                bomberosCitados: bomberosSeleccionados,
                fechaCreacion: citaciones[index].fechaCreacion || new Date().toISOString()
            };
        }
    } else {
        const nuevoId = Math.max(...citaciones.map(c => c.id), 0) + 1;
        citaciones.push({ 
            id: nuevoId, 
            titulo, 
            fecha, 
            hora, 
            lugar, 
            motivo, 
            bomberosCitados: bomberosSeleccionados,
            fechaCreacion: new Date().toISOString()
        });
    }
    
    localStorage.setItem('citacionesData', JSON.stringify(citaciones));
    cargarListaCitaciones();
    actualizarEstadisticas();
    ocultarFormulario('form-citacion');
    
    console.log(modoEdicion ? '✏️ Citación actualizada' : '➕ Nueva citación creada');
    console.log(`👥 Bomberos citados: ${bomberosSeleccionados.length}`);
}

// 💾 FUNCIÓN: Guardar usuario
function guardarUsuario() {
    const email = document.getElementById('email-usuario').value;
    const password = document.getElementById('password-usuario').value;
    const nombre = document.getElementById('nombre-usuario').value;
    const rol = document.getElementById('rol-usuario').value;
    
    console.log('➕ Nuevo usuario creado:', { email, nombre, rol });
    alert(`Usuario creado exitosamente:\n${nombre} (${email})\nRol: ${rol}`);
    
    ocultarFormulario('form-usuario');
    // Aquí normalmente se guardaría en la base de datos de usuarios
}

// ========================================
// FUNCIONES AUXILIARES
// ========================================

// 📅 FUNCIÓN: Formatear fecha para mostrar
function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
}

// 🧹 FUNCIÓN: Limpiar formulario
function limpiarFormulario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
        modoEdicion = false;
        itemEditando = null;
    }
}

console.log('📋 Sistema administrativo configurado y listo');