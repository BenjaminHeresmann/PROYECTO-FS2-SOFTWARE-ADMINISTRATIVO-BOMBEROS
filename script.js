// Esperar a que la página cargue completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('¡Sistema de Bomberos cargado correctamente! 🚒');
    
    // Función para el botón "Ver Bomberos"
    const botonVerBomberos = document.getElementById('ver-bomberos');
    botonVerBomberos.addEventListener('click', function() {
        // Navegar suavemente a la sección de bomberos
        document.getElementById('bomberos').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
    
    // Función para navegación suave entre secciones
    const enlacesNav = document.querySelectorAll('nav a');
    enlacesNav.forEach(function(enlace) {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los enlaces
            enlacesNav.forEach(function(link) {
                link.classList.remove('active');
            });
            
            // Añadir clase active al enlace clickeado
            this.classList.add('active');
            
            // Navegar a la sección
            const destino = this.getAttribute('href');
            const seccion = document.querySelector(destino);
            
            if (seccion) {
                // Actualizar el URL en la barra de direcciones
                window.history.pushState(null, null, destino);
                
                // Navegar suavemente a la sección
                seccion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Función para el sistema de solicitudes
    const botonContinuarSolicitud = document.getElementById('continuar-solicitud');
    const detallesSection = document.getElementById('detalles-section');
    const tipoSolicitudSelect = document.getElementById('tipo-solicitud');
    
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
    
    // Función para interacción con las tarjetas de bomberos
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
    
    // Función para los enlaces de autenticación
    const iniciarSesion = document.getElementById('iniciar-sesion');
    const registrarUsuario = document.getElementById('registrar-usuario');
    
    iniciarSesion.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad de "Iniciar Sesión"\n\n' +
              'En un sistema real, aquí se abriría un formulario de login.\n' +
              'Para este proyecto estudiantil, solo simulamos la interacción.');
    });
    
    registrarUsuario.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Funcionalidad de "Registrar Usuario"\n\n' +
              'En un sistema real, aquí se abriría un formulario de registro.\n' +
              'Para este proyecto estudiantil, solo simulamos la interacción.');
    });
    
    // Función para mostrar la hora del cuartel (educativa)
    function mostrarHoraCuartel() {
        const ahora = new Date();
        const horaFormateada = ahora.toLocaleTimeString('es-CL', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        
        console.log('🚒 Hora del Cuartel: ' + horaFormateada);
    }
    
    // Mostrar la hora cada 30 segundos
    setInterval(mostrarHoraCuartel, 30000);
    mostrarHoraCuartel(); // Mostrar inmediatamente
    
    // Función para el formulario de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        const newsletterButton = newsletterForm.querySelector('button');
        newsletterButton.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input');
            const email = emailInput.value;
            
            if (email && email.includes('@')) {
                alert('¡Gracias por suscribirte!\n\nEmail: ' + email + '\n\n' +
                      'Recibirás noticias de la 2DA COMPAÑÍA DE BOMBEROS.');
                emailInput.value = '';
            } else {
                alert('Por favor, ingresa un email válido');
            }
        });
    }
});

// Función para cambiar el título de la página (temática bomberos)
function cambiarTituloBomberos() {
    const titulos = [
        '2DA COMPAÑÍA BOMBEROS - Sistema Web',
        '🚒 Bomberos al Servicio de la Comunidad',
        '🔥 Protegiendo Vidas y Propiedades',
        '👨‍🚒 Voluntarios Comprometidos',
        '🚨 Emergencias 24/7'
    ];
    
    const indiceAleatorio = Math.floor(Math.random() * titulos.length);
    document.title = titulos[indiceAleatorio];
}

// Cambiar el título cada 45 segundos
setInterval(cambiarTituloBomberos, 45000);

// Función para validar RUT chileno (básica y educativa)
function validarRUT(rut) {
    // Eliminar puntos y guión
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');
    
    // Verificar que tenga entre 8 y 9 caracteres
    if (rutLimpio.length < 8 || rutLimpio.length > 9) {
        return false;
    }
    
    // Para este proyecto estudiantil, validación básica
    const tieneNumeros = /^\d+[0-9kK]$/.test(rutLimpio);
    return tieneNumeros;
}

// Función para validar email (mejorada)
function validarEmail(email) {
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}

// Función para generar números de emergencia (educativa)
function mostrarNumerosEmergencia() {
    console.log('📞 NÚMEROS DE EMERGENCIA CHILE:');
    console.log('🚒 Bomberos: 132');
    console.log('🚓 Carabineros: 133');
    console.log('🚑 Ambulancia (SAMU): 131');
    console.log('⚠️  Emergencias: 911');
}

// Función para mostrar mensaje de bienvenida bomberil
function mostrarBienvenidaBomberos() {
    const hora = new Date().getHours();
    let saludo;
    
    if (hora < 12) {
        saludo = '¡Buenos días!';
    } else if (hora < 18) {
        saludo = '¡Buenas tardes!';
    } else {
        saludo = '¡Buenas noches!';
    }
    
    console.log(saludo + ' Bienvenido al Sistema Web de la 2DA COMPAÑÍA DE BOMBEROS 🚒');
    
    // Mostrar números de emergencia
    setTimeout(mostrarNumerosEmergencia, 2000);
}

// Mostrar bienvenida al cargar
mostrarBienvenidaBomberos();

// Función educativa: Contar bomberos mostrados
function contarBomberos() {
    const totalBomberos = document.querySelectorAll('.bombero-card').length;
    console.log('👨‍🚒 Total de bomberos mostrados: ' + totalBomberos);
    return totalBomberos;
}

// Ejecutar conteo después de que cargue la página
setTimeout(contarBomberos, 1000);

// Manejar navegación con botones del navegador (atrás/adelante)
window.addEventListener('popstate', function(event) {
    const hash = window.location.hash;
    if (hash) {
        const seccion = document.querySelector(hash);
        if (seccion) {
            // Actualizar enlace activo
            const enlacesNav = document.querySelectorAll('nav a');
            enlacesNav.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === hash) {
                    link.classList.add('active');
                }
            });
            
            // Navegar a la sección
            seccion.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } else {
        // Si no hay hash, ir a inicio
        const inicioLink = document.querySelector('nav a[href="#inicio"]');
        if (inicioLink) {
            inicioLink.classList.add('active');
            document.getElementById('inicio').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Función para establecer la sección activa al cargar la página
function establecerSeccionInicial() {
    const hash = window.location.hash;
    if (hash) {
        const enlace = document.querySelector(`nav a[href="${hash}"]`);
        const seccion = document.querySelector(hash);
        
        if (enlace && seccion) {
            // Remover clase active de todos los enlaces
            document.querySelectorAll('nav a').forEach(function(link) {
                link.classList.remove('active');
            });
            
            // Añadir clase active al enlace correspondiente
            enlace.classList.add('active');
            
            // Navegar a la sección después de un pequeño delay
            setTimeout(function() {
                seccion.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Establecer sección inicial al cargar la página
establecerSeccionInicial();