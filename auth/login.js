// ========================================
// SISTEMA DE LOGIN - NIVEL ESTUDIANTIL
// Punto de entrada principal del sistema
// ========================================

// 🔐 BASE DE DATOS DE USUARIOS COMPLETA
const USUARIOS_SISTEMA = {
    // 👑 ADMINISTRADOR OMNIPOTENTE
    'admin': { 
        password: '1234', 
        nombre: 'Administrador del Sistema',
        rol: 'admin',
        tipo: 'administrador',
        permisos: ['all'] // Todos los permisos
    },
    
    // 👥 USUARIOS BOMBEROS
    'comandante@bomberos.cl': { 
        password: 'admin123', 
        nombre: 'Carlos Rodríguez',
        rol: 'Comandante',
        tipo: 'usuario',
        permisos: ['bomberos', 'citaciones', 'solicitudes'] 
    },
    'capitan@bomberos.cl': { 
        password: 'cap456', 
        nombre: 'María González',
        rol: 'Capitán',
        tipo: 'usuario',
        permisos: ['bomberos', 'citaciones']
    },
    'teniente@bomberos.cl': { 
        password: 'ten789', 
        nombre: 'Luis Martínez',
        rol: 'Teniente',
        tipo: 'usuario',
        permisos: ['bomberos']
    },
    'sargento@bomberos.cl': { 
        password: 'sar012', 
        nombre: 'Ana López',
        rol: 'Sargento',
        tipo: 'usuario',
        permisos: ['bomberos']
    },
    'bombero@bomberos.cl': { 
        password: 'bomb345', 
        nombre: 'Pedro Sánchez',
        rol: 'Bombero',
        tipo: 'usuario',
        permisos: ['bomberos']
    }
};

// ========================================
// INICIALIZAR SISTEMA DE LOGIN
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚒 Sistema de Login iniciado correctamente!');
    
    // Configurar el formulario de login
    configurarFormularioLogin();
    
    // Limpiar cualquier sesión previa
    limpiarSesionAnterior();
});

// 🔐 FUNCIÓN: Configurar el formulario de login
function configurarFormularioLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Validar credenciales
            if (validarCredenciales(usuario, password)) {
                const datosUsuario = USUARIOS_SISTEMA[usuario];
                
                // Guardar sesión
                guardarSesion(usuario, datosUsuario);
                
                // Redirigir según el tipo de usuario
                redirigirSegunTipo(datosUsuario);
                
            } else {
                mostrarErrorLogin('❌ Credenciales incorrectas. Verifique su usuario y contraseña.');
            }
        });
    }
}

// ✅ FUNCIÓN: Validar credenciales de usuario
function validarCredenciales(usuario, password) {
    const datosUsuario = USUARIOS_SISTEMA[usuario];
    return datosUsuario && datosUsuario.password === password;
}

// 💾 FUNCIÓN: Guardar sesión del usuario
function guardarSesion(usuario, datosUsuario) {
    localStorage.setItem('bomberosAuth', 'true');
    localStorage.setItem('bomberosUser', JSON.stringify({
        usuario: usuario,
        email: usuario, // Agregar email para facilitar comparaciones
        nombre: datosUsuario.nombre,
        rol: datosUsuario.rol,
        tipo: datosUsuario.tipo,
        permisos: datosUsuario.permisos
    }));
    
    console.log('🔑 Sesión guardada para:', datosUsuario.nombre);
}

// 🚦 FUNCIÓN: Redirigir según el tipo de usuario
function redirigirSegunTipo(datosUsuario) {
    if (datosUsuario.tipo === 'administrador') {
        // Redirigir al panel de administrador
        console.log('👑 Redirigiendo al panel de administrador...');
        window.location.href = '../admin/admin.html';
    } else {
        // Redirigir al sistema normal de usuarios
        console.log('👨‍🚒 Redirigiendo al sistema de usuarios...');
        window.location.href = '../users/index.html';
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

// 🧹 FUNCIÓN: Limpiar sesión anterior
function limpiarSesionAnterior() {
    localStorage.removeItem('bomberosAuth');
    localStorage.removeItem('bomberosUser');
    console.log('🧹 Sesión anterior limpiada');
}

// ========================================
// FUNCIONES EDUCATIVAS DE DEMOSTRACIÓN
// ========================================

// 📚 FUNCIÓN: Mostrar información sobre el sistema
function mostrarInfoSistema() {
    console.log('🚒 SISTEMA DE BOMBEROS v1.0');
    console.log('📋 Tipos de usuario disponibles:');
    console.log('   - Administrador: Acceso completo al panel admin');
    console.log('   - Usuarios: Acceso al sistema de bomberos');
    console.log('🔑 Credenciales de prueba disponibles en la interfaz');
}

// Mostrar información del sistema después de 2 segundos
setTimeout(mostrarInfoSistema, 2000);