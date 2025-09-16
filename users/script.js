// ========================================
// SISTEMA DE ROUTING CON "/" - NIVEL ESTUDIANTIL
// Arquitectura limpia y modular
// ========================================

// � SISTEMA DE AUTENTICACIÓN
let sistemaAutenticado = false;

// 👥 BASE DE DATOS DE USUARIOS (Simulada)
const USUARIOS_BOMBEROS = {
    'comandante@bomberos.cl': { 
        password: 'admin123', 
        nombre: 'Carlos Rodríguez',
        rol: 'Comandante' 
    },
    'capitan@bomberos.cl': { 
        password: 'cap456', 
        nombre: 'María González',
        rol: 'Capitán' 
    },
    'teniente@bomberos.cl': { 
        password: 'ten789', 
        nombre: 'Luis Martínez',
        rol: 'Teniente' 
    },
    'sargento@bomberos.cl': { 
        password: 'sar012', 
        nombre: 'Ana López',
        rol: 'Sargento' 
    },
    'bombero@bomberos.cl': { 
        password: 'bomb345', 
        nombre: 'Pedro Sánchez',
        rol: 'Bombero' 
    }
};

// �📋 CONFIGURACIÓN DE RUTAS
const RUTAS = {
    '/': 'inicio',
    '/bomberos': 'bomberos', 
    '/oficiales': 'oficiales',
    '/solicitud': 'solicitud',
    '/citaciones': 'citaciones'
};

// 🛠️ CLASE ROUTER - Arquitectura ordenada
class SimpleRouter {
    constructor() {
        this.rutaActual = '';
        this.inicializar();
    }
    
    // Inicializar el router
    inicializar() {
        this.configurarEventos();
        this.cargarRutaInicial();
    }
    
    // Configurar eventos de navegación
    configurarEventos() {
        // Enlaces de navegación
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="/"]')) {
                e.preventDefault();
                this.navegarA(e.target.getAttribute('href'));
            }
        });
        
        // Botones del navegador (atrás/adelante)
        window.addEventListener('popstate', () => {
            this.cargarRutaActual();
        });
    }
    
    // Navegar a una ruta específica
    navegarA(ruta) {
        if (ruta !== this.rutaActual) {
            window.history.pushState(null, null, ruta);
            this.cargarRutaActual();
        }
    }
    
    // Cargar la ruta actual
    cargarRutaActual() {
        const ruta = window.location.pathname;
        const seccionId = RUTAS[ruta] || 'inicio';
        
        this.rutaActual = ruta;
        this.mostrarSeccion(seccionId);
        this.actualizarNavegacion(ruta);
    }
    
    // Mostrar sección específica
    mostrarSeccion(seccionId) {
        const seccion = document.getElementById(seccionId);
        if (seccion) {
            seccion.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Actualizar enlaces de navegación activos
    actualizarNavegacion(rutaActiva) {
        const enlaces = document.querySelectorAll('.nav-link');
        enlaces.forEach(enlace => {
            const href = enlace.getAttribute('href');
            enlace.classList.toggle('active', href === rutaActiva);
        });
    }
    
    // Cargar ruta inicial
    cargarRutaInicial() {
        this.cargarRutaActual();
    }
}

// ========================================
// INICIALIZAR APLICACIÓN - SISTEMA DE USUARIOS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚒 Sistema de Bomberos para Usuarios cargado correctamente!');
    
    // Verificar que el usuario esté autenticado
    if (!verificarAccesoUsuario()) {
        console.log('❌ Acceso denegado - Redirigiendo al login');
        window.location.href = '../auth/login.html';
        return;
    }
    
    // Mostrar información del usuario
    mostrarInfoUsuario();
    
    // Configurar botón de logout
    configurarLogout();
    
    // Asegurar que el contenido esté visible
    mostrarContenidoPrincipal();
    
    // Inicializar router para usuarios
    const router = new SimpleRouter();
    
    // ========================================
    // SISTEMA DE SOLICITUDES
    // ========================================
    
    const botonContinuarSolicitud = document.getElementById('continuar-solicitud');
    const detallesSection = document.getElementById('detalles-section');
    const tipoSolicitudSelect = document.getElementById('tipo-solicitud');
    
    if (botonContinuarSolicitud) {
        botonContinuarSolicitud.addEventListener('click', function() {
            const tipoSeleccionado = tipoSolicitudSelect.value;
            const nombreSolicitante = document.getElementById('nombre-solicitante').value;
            const rutSolicitante = document.getElementById('rut-solicitante').value;
            
            // Validación básica
            if (!tipoSeleccionado || !nombreSolicitante || !rutSolicitante) {
                alert('Por favor, completa todos los campos antes de continuar');
                return;
            }
            
            // Mostrar sección de detalles
            detallesSection.style.display = 'block';
            detallesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Actualizar información en la sección de detalles
            const infoDetalles = document.querySelector('.info-detalles');
            infoDetalles.innerHTML = `
                <strong>Solicitud iniciada:</strong><br>
                Tipo: ${getTipoSolicitudTexto(tipoSeleccionado)}<br>
                Solicitante: ${nombreSolicitante}<br>
                RUT: ${rutSolicitante}<br><br>
                <em>Los campos específicos para este tipo de solicitud se cargarán aquí.</em>
            `;
        });
    }
    
    // ========================================
    // INTERACCIONES CON BOMBEROS
    // ========================================
    
    const bomberCards = document.querySelectorAll('.bombero-card');
    bomberCards.forEach(function(card, index) {
        card.addEventListener('click', function() {
            const nombreBombero = this.querySelector('h3').textContent;
            alert('Información de ' + nombreBombero + '\n\n' +
                  '• Estado: Activo\n' +
                  '• Compañía: 2DA COMPAÑÍA\n' +
                  '• Años de servicio: ' + (Math.floor(Math.random() * 15) + 1) + '\n' +
                  '• Especialidad: Rescate y emergencias\n\n' +
                  '(Esta es información simulada para el proyecto estudiantil)');
        });
        
        // Efecto hover mejorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ========================================
    // FUNCIONES EDUCATIVAS
    // ========================================
    
    // Función educativa: Contar bomberos mostrados
    function contarBomberos() {
        const totalBomberos = document.querySelectorAll('.bombero-card').length;
        console.log('👨‍🚒 Total de bomberos mostrados: ' + totalBomberos);
        return totalBomberos;
    }
    
    // Función educativa: Mostrar bienvenida
    function mostrarBienvenidaBomberos() {
        const horas = new Date().getHours();
        let saludo;
        
        if (horas < 12) {
            saludo = '🌅 Buenos días!';
        } else if (horas < 18) {
            saludo = '☀️ Buenas tardes!';
        } else {
            saludo = '🌙 Buenas noches!';
        }
        
        console.log(saludo + ' Bienvenido al Sistema Web de la 2DA COMPAÑÍA DE BOMBEROS 🚒');
        
        // Mostrar números de emergencia después de 2 segundos
        setTimeout(function() {
            console.log('📞 Números de emergencia:\n• Bomberos: 132\n• Carabineros: 133\n• Ambulancia: 131');
        }, 2000);
    }
    
    // Ejecutar funciones educativas
    setTimeout(contarBomberos, 1000);
    mostrarBienvenidaBomberos();
});

// ========================================
// FUNCIONES AUXILIARES
// ========================================

// Función auxiliar para obtener texto del tipo de solicitud
function getTipoSolicitudTexto(valor) {
    const tipos = {
        'ingreso': 'Solicitud de Ingreso',
        'permiso': 'Solicitud de Permiso',
        'licencia': 'Solicitud de Licencia',
        'traslado': 'Solicitud de Traslado',
        'capacitacion': 'Solicitud de Capacitación',
        'equipamiento': 'Solicitud de Equipamiento',
        'otra': 'Otra Solicitud'
    };
    return tipos[valor] || valor;
}

// ========================================
// SISTEMA DE AUTENTICACIÓN PARA USUARIOS
// ========================================

// 🔍 FUNCIÓN: Verificar acceso de usuario (no administrador)
function verificarAccesoUsuario() {
    const sesion = localStorage.getItem('bomberosAuth');
    const usuario = localStorage.getItem('bomberosUser');
    
    console.log('🔍 Verificando acceso usuario:', { sesion, usuario });
    
    if (sesion === 'true' && usuario) {
        const datosUsuario = JSON.parse(usuario);
        console.log('👤 Datos usuario:', datosUsuario);
        
        // Verificar que NO sea administrador (los admin van a admin.html)
        if (datosUsuario.tipo !== 'administrador') {
            console.log('✅ Acceso concedido - Usuario normal');
            sistemaAutenticado = true;
            return true;
        } else {
            console.log('❌ Usuario es administrador - debe ir a admin.html');
        }
    } else {
        console.log('❌ No hay sesión válida');
    }
    
    return false;
}

// 🎨 FUNCIÓN: Mostrar el contenido principal
function mostrarContenidoPrincipal() {
    const main = document.querySelector('main');
    if (main) {
        main.style.display = 'block';
        main.style.visibility = 'visible';
        console.log('✅ Contenido principal mostrado');
    }
    
    // También asegurar que las secciones estén configuradas
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none'; // Ocultar todas por defecto
    });
    
    // Mostrar la sección dashboard por defecto
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        dashboard.style.display = 'block';
        console.log('✅ Dashboard mostrado por defecto');
    }
}

// 👤 FUNCIÓN: Mostrar información del usuario actual
function mostrarInfoUsuario() {
    const usuario = localStorage.getItem('bomberosUser');
    if (usuario) {
        const datosUsuario = JSON.parse(usuario);
        const userInfo = document.getElementById('userInfo');
        if (userInfo) {
            userInfo.textContent = `👋 ${datosUsuario.nombre} (${datosUsuario.rol})`;
        }
    }
}

// ⚙️ FUNCIÓN: Configurar botón de logout
function configurarLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            cerrarSesionUsuario();
        });
    }
}

// 🚪 FUNCIÓN: Cerrar sesión y volver al login
function cerrarSesionUsuario() {
    localStorage.removeItem('bomberosAuth');
    localStorage.removeItem('bomberosUser');
    console.log('� Sesión de usuario cerrada');
    window.location.href = '../auth/login.html';
}

// ========================================
// RESTO DE FUNCIONES DEL SISTEMA DE USUARIOS
// (Las funciones de login ahora están en login.js)
// ========================================