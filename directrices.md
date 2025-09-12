# 📋 DIRECTRICES DEL PROYECTO - FRONTEND ESTUDIANTIL

## 🎯 **NIVEL Y ALCANCE DEL PROYECTO**

### 🟢 **NIVEL: ESTUDIANTIL BÁSICO**
- **Target**: Estudiante que está empezando a aprender frontend
- **Conocimientos**: Sin experiencia previa en desarrollo web avanzado
- **Objetivo**: Aprender funda### 🎯 **PREGUNTA GUÍA ANTES DE CADA CAMBIO:**
- "¿Un estudiante principiante puede entender esto?"
- "¿Estoy usando solo HTML, CSS y JavaScript vanilla?"
- "¿La estructura es lógica y modular?"
- "¿Estoy separando lo que debe estar separado?"
- "¿Estoy juntando lo que debe estar junto?"
- "¿Eliminé todo el código residual de modificaciones anteriores?"
- "¿La nueva sección tiene su URL independiente con '/'?"
- "¿Agregué la ruta al objeto RUTAS del sistema de navegación?"sólidos paso a paso

### 🛠️ **TECNOLOGÍAS PERMITIDAS - SOLO BÁSICAS**
```
✅ PERMITIDO:
- HTML5 (semántico, básico)
- CSS3 (vanilla, sin frameworks)
- JavaScript (vanilla, sin librerías)
- Imágenes básicas (jpg, png, webp)
- Iconos simples

❌ PROHIBIDO / NO USAR:
- React, Angular, Vue
- TypeScript
- Node.js / npm packages
- Sass, Less, Stylus
- Bootstrap, Tailwind, Foundation
- jQuery, Lodash, cualquier librería JS
- Bundlers (Webpack, Vite, Parcel)
- Frameworks CSS
- Herramientas de build complejas
```

---

## 🏗️ **ARQUITECTURA Y ESTRUCTURA MODULAR**

### 📐 **PRINCIPIO 1: MODULARIDAD LÓGICA**
```
✅ CORRECTO:
- Cada archivo tiene una responsabilidad específica
- HTML: Solo estructura semántica
- CSS: Solo estilos, organizados por secciones lógicas
- JS: Solo funcionalidad, separada por propósito

❌ INCORRECTO:
- Mezclar estilos inline con CSS externo
- JavaScript embebido en HTML
- CSS y JS en el mismo archivo
```

### 🔄 **PRINCIPIO 2: ARQUITECTURA LINEAL Y ORDENADA**
```
✅ ESTRUCTURA CORRECTA:
Proyecto/
├── index.html          # Página principal
├── styles.css          # Todos los estilos
├── script.js           # Toda la funcionalidad JS
├── README.md           # Documentación
├── directrices.md      # Este archivo
└── assets/             # Recursos (si es necesario)
    ├── images/
    └── icons/

❌ ESTRUCTURA INCORRECTA:
- Archivos desperdigados sin lógica
- Nombres confusos o genéricos
- Carpetas innecesariamente profundas
```

### 🚫 **PRINCIPIO 3: NO ENREDOS DE CÓDIGO**
```
✅ CÓDIGO LIMPIO:
- Funciones con un solo propósito
- Variables con nombres descriptivos
- Comentarios explicativos para estudiantes
- Indentación consistente
- Separación clara de responsabilidades

❌ CÓDIGO ENREDADO:
- Funciones que hacen múltiples cosas
- Variables con nombres crípticos (a, x, data1)
- Código sin comentarios educativos
- Lógica mezclada sin separación
```

### ⚖️ **PRINCIPIO 4: SEPARAR LO QUE DEBE ESTAR SEPARADO**
```
✅ SEPARAR:
- Validación de formularios ≠ Animaciones CSS
- Navegación ≠ Efectos visuales
- Estilos de header ≠ Estilos de footer (en secciones CSS)
- Event listeners ≠ Funciones utilitarias

✅ JUNTAR LO QUE DEBE ESTAR JUNTO:
- Todos los estilos de botones en una sección CSS
- Todas las funciones de formulario juntas en JS
- Elementos relacionados del DOM cerca en HTML
```

### 🌐 **PRINCIPIO 5: NAVEGACIÓN CON URLs INDEPENDIENTES**
```
✅ OBLIGATORIO PARA TODAS LAS SECCIONES:
- Cada sección debe tener su URL única con "/"
- Sistema de routing moderno implementado
- URLs legibles y descriptivas
- Navegación independiente entre secciones

✅ PATRÓN DE URLs REQUERIDO:
- Inicio: / 
- Secciones: /nombre-seccion
- Ejemplos: /bomberos, /oficiales, /solicitud, /citaciones
- NO usar: #hash, ?query, URLs complejas

✅ IMPLEMENTACIÓN TÉCNICA:
- Clase Router centralizada en JavaScript vanilla
- History API para botones atrás/adelante del navegador
- Actualización automática de URL al cambiar sección
- Enlaces internos con href="/ruta"

✅ BENEFICIOS EDUCATIVOS:
- URLs compartibles y marcables
- Navegación profesional moderna
- Experiencia de usuario mejorada
- Preparación para desarrollo real

❌ PROHIBIDO:
- Navegación solo con JavaScript sin URL
- URLs que no cambien al navegar
- Sistema de hash (#) como única navegación
- Enlaces que no reflejen la sección actual
```

---

## 📝 **ESTÁNDARES DE CÓDIGO ESTUDIANTIL**

### 🔤 **NOMENCLATURA**
```css
/* CSS - Nombres descriptivos y en español cuando sea educativo */
.boton-principal { }
.seccion-servicios { }
.formulario-contacto { }
```

```javascript
// JavaScript - Funciones explicativas
function validarFormulario() { }
function mostrarMensajeBienvenida() { }
function cambiarColorBoton() { }
```

```html
<!-- HTML - IDs y clases claras -->
<section id="acerca-de">
<form id="formulario-contacto">
<button class="boton-enviar">
```

### 📚 **COMENTARIOS EDUCATIVOS**
```javascript
// ✅ COMENTARIOS EDUCATIVOS
// Esta función valida que todos los campos estén completos
function validarFormulario() {
    // Obtener el valor del campo nombre
    const nombre = document.getElementById('nombre').value;
    
    // Verificar si el campo está vacío
    if (nombre === '') {
        alert('El campo nombre es obligatorio');
        return false;
    }
}

// ❌ COMENTARIOS INÚTILES
// Esta función hace cosas
function hacer() { }
```

### 🎨 **ORGANIZACIÓN CSS**
```css
/* ✅ ORGANIZACIÓN CORRECTA */

/* 1. RESET Y CONFIGURACIÓN GLOBAL */
* { margin: 0; padding: 0; }
body { font-family: Arial, sans-serif; }

/* 2. HEADER Y NAVEGACIÓN */
header { }
nav { }

/* 3. CONTENIDO PRINCIPAL */
main { }
.hero { }

/* 4. SECCIONES ESPECÍFICAS */
.acerca-de { }
.servicios { }

/* 5. FORMULARIOS */
form { }
input { }

/* 6. FOOTER */
footer { }

/* 7. RESPONSIVE */
@media (max-width: 768px) { }

/* 8. ANIMACIONES Y EFECTOS */
@keyframes fadeIn { }
```

---

## 🎓 **ENFOQUE EDUCATIVO**

### 📖 **CADA LÍNEA DEBE SER COMPRENSIBLE**
- Código que un estudiante pueda leer y entender
- Progresión lógica de conceptos simples a complejos
- Ejemplos prácticos y aplicables
- Sin abstracciones innecesarias

### 🔍 **TRANSPARENCIA TOTAL**
- No usar "magia" o código que parezca mágico
- Explicar el "por qué" de cada decisión
- Mostrar alternativas simples
- Evitar patrones avanzados sin explicación

### 🛠️ **HERRAMIENTAS DE APRENDIZAJE**
```
✅ USAR:
- console.log() para debugging educativo
- alert() para feedback inmediato
- Nombres de variables descriptivos
- Funciones pequeñas y específicas

❌ EVITAR:
- Debugging tools complejos
- Patrones de diseño avanzados
- Optimizaciones prematuras
- Abstracciones innecesarias
```

---

## ⚠️ **RECORDATORIOS CRÍTICOS**

### 🚨 **NUNCA OLVIDAR:**
1. **NIVEL ESTUDIANTIL**: Siempre pensar como un principiante
2. **SOLO VANILLA**: HTML, CSS, JS - nada más
3. **MODULARIDAD**: Separar responsabilidades claramente
4. **EDUCATIVO**: Código que enseñe, no que confunda
5. **SIMPLICIDAD**: Lo simple que funciona > lo complejo que impresiona
6. **URLs INDEPENDIENTES**: Toda sección nueva debe tener su ruta única

### 🧹 **REGLA DE ORO: CÓDIGO LIMPIO EN CADA MODIFICACIÓN**
```
✅ OBLIGATORIO EN TODA MODIFICACIÓN:
- Eliminar código residual sin uso
- No dejar código comentado antiguo
- Actualizar referencias rotas o cambios de nombres
- Limpiar imports/links innecesarios
- Remover estilos CSS huérfanos
- Eliminar variables JS no utilizadas
- Actualizar comentarios obsoletos

🚫 NUNCA PERMITIR:
- Código muerto que "por si acaso"
- Funciones deprecadas sin eliminar
- Estilos CSS de secciones eliminadas
- Variables o selectores sin uso
- Comentarios desactualizados que confundan
```

### � **EJEMPLO PRÁCTICO: AÑADIR NUEVA SECCIÓN CON URL INDEPENDIENTE**
```html
<!-- 1. HTML: Añadir enlace en navegación -->
<li><a href="/nueva-seccion" class="nav-link" data-section="nueva">🆕 Nueva Sección</a></li>

<!-- 2. HTML: Crear sección en el body -->
<section id="nueva">
    <h2>Nueva Sección</h2>
    <p>Contenido de la nueva sección...</p>
</section>
```

```javascript
// 3. JavaScript: Añadir ruta al objeto RUTAS
const RUTAS = {
    '/': 'inicio',
    '/bomberos': 'bomberos',
    '/oficiales': 'oficiales', 
    '/solicitud': 'solicitud',
    '/citaciones': 'citaciones',
    '/nueva-seccion': 'nueva'  // ← Nueva ruta añadida
};
```

```css
/* 4. CSS: Estilos específicos si es necesario */
#nueva {
    /* Estilos para la nueva sección */
}
```

### �🎯 **PREGUNTA GUÍA ANTES DE CADA CAMBIO:**
- "¿Un estudiante principiante puede entender esto?"
- "¿Estoy usando solo HTML, CSS y JavaScript vanilla?"
- "¿La estructura es lógica y modular?"
- "¿Estoy separando lo que debe estar separado?"
- "¿Estoy juntando lo que debe estar junto?"
- "¿Eliminé todo el código residual de modificaciones anteriores?"

---

## 📅 **CONTROL DE VERSIÓN**
- **Creado**: Septiembre 11, 2025
- **Última actualización**: Septiembre 11, 2025 - Añadida directriz de URLs independientes
- **Vigencia**: PERMANENTE para este proyecto
- **Revisar**: Antes de cada modificación importante

---

**🎓 MANTRA DEL PROYECTO:** 
*"Simplicidad educativa, arquitectura modular, código que enseña"*