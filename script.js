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
// INICIALIZAR APLICACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚒 Sistema de Bomberos con Login cargado correctamente!');
    
    // Verificar estado de autenticación al cargar
    verificarEstadoInicial();
    
    // Configurar sistema de login
    configurarLogin();
    
    // Inicializar router solo si está autenticado
    let router;
    if (sistemaAutenticado) {
        router = new SimpleRouter();
    }
    
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
// SISTEMA DE AUTENTICACIÓN - FUNCIONES
// ========================================

// 🔍 FUNCIÓN: Verificar estado inicial al cargar página
function verificarEstadoInicial() {
    // Comprobar si hay sesión guardada
    const sesionGuardada = localStorage.getItem('bomberosAuth');
    const usuarioGuardado = localStorage.getItem('bomberosUser');
    
    if (sesionGuardada === 'true' && usuarioGuardado) {
        sistemaAutenticado = true;
        mostrarSistemaPrincipal();
        mostrarInfoUsuario(JSON.parse(usuarioGuardado));
    } else {
        sistemaAutenticado = false;
        mostrarPaginaLogin();
    }
}

// 🔐 FUNCIÓN: Configurar formulario de login
function configurarLogin() {
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Evento del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (validarCredenciales(email, password)) {
                const usuario = USUARIOS_BOMBEROS[email];
                
                // Guardar sesión
                localStorage.setItem('bomberosAuth', 'true');
                localStorage.setItem('bomberosUser', JSON.stringify({
                    email: email,
                    nombre: usuario.nombre,
                    rol: usuario.rol
                }));
                
                // Actualizar estado
                sistemaAutenticado = true;
                
                // Mostrar sistema principal
                mostrarSistemaPrincipal();
                mostrarInfoUsuario(usuario);
                
                // Inicializar router
                const router = new SimpleRouter();
                
                console.log('🚒 ¡Login exitoso! Usuario:', usuario.nombre);
                
            } else {
                mostrarErrorLogin('❌ Credenciales incorrectas. Verifique su email y contraseña.');
            }
        });
    }
    
    // Evento del botón cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            cerrarSesion();
        });
    }
}

// ✅ FUNCIÓN: Validar credenciales de usuario
function validarCredenciales(email, password) {
    const usuario = USUARIOS_BOMBEROS[email];
    return usuario && usuario.password === password;
}

// 📱 FUNCIÓN: Mostrar página de login
function mostrarPaginaLogin() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainHeader').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
}

// 🏠 FUNCIÓN: Mostrar sistema principal
function mostrarSistemaPrincipal() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainHeader').style.display = 'block';
    document.getElementById('mainContent').style.display = 'block';
}

// 👤 FUNCIÓN: Mostrar información del usuario
function mostrarInfoUsuario(usuario) {
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
        userInfo.textContent = `👋 ${usuario.nombre} (${usuario.rol})`;
    }
}

// ❌ FUNCIÓN: Mostrar error de login
function mostrarErrorLogin(mensaje) {
    const errorDiv = document.getElementById('loginError');
    if (errorDiv) {
        errorDiv.textContent = mensaje;
        errorDiv.style.display = 'block';
        
        // Ocultar después de 4 segundos
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 4000);
    }
}

// 🚪 FUNCIÓN: Cerrar sesión
function cerrarSesion() {
    // Limpiar almacenamiento
    localStorage.removeItem('bomberosAuth');
    localStorage.removeItem('bomberosUser');
    
    // Actualizar estado
    sistemaAutenticado = false;
    
    // Mostrar login
    mostrarPaginaLogin();
    
    // Limpiar formulario
    document.getElementById('loginForm').reset();
    
    console.log('🚪 Sesión cerrada correctamente');
}