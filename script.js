// ========================================
// SISTEMA DE ROUTING CON "/" - NIVEL ESTUDIANTIL
// Arquitectura limpia y modular
// ========================================

// 📋 CONFIGURACIÓN DE RUTAS
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
    console.log('🚒 Sistema de Bomberos con Routing "/" cargado correctamente!');
    
    // Inicializar router
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