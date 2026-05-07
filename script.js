// ========================================
// COMENTARIO REFLEXIVO SOBRE USO DE IA
// ========================================
// Pedí a la IA que validara mi código y sugiriera mejoras.
// Aplicamos cambios en:
// - Validaciones robustas con expresiones regulares
// - Funciones auxiliares para cálculos (activos, inactivos, etc.)
// - Ordenamiento automático de datos
// - Mejor estructura y mantenibilidad
// 
// Ventajas: 
//   • Mayor confianza en la integridad de los datos
//   • Experiencia del usuario mejorada con mensajes claros
//   • Código más modular y reutilizable
// 
// Riesgos: 
//   • Validaciones muy estrictas pueden frustrar al usuario
//   • Solución: Mostrar mensajes de ayuda claros
//
// ========================================

// ========================================
// DECLARACIÓN DE DATOS GLOBALES
// ========================================

// Sugerencia de IA aplicada: Cambio de nombre de variable para mayor claridad
// Array de usuarios con estructura inicial mejorada
let usuariosRegistrados = [
    { nombre: "Juan Pérez", edad: 30, rol: "Administrador", activo: true },
    { nombre: "María García", edad: 28, rol: "Usuario", activo: true },
    { nombre: "Carlos López", edad: 35, rol: "Administrador", activo: false },
    { nombre: "Ana Martínez", edad: 26, rol: "Usuario", activo: true }
];

// Sugerencia de IA aplicada: Variable para almacenar filtro actual
let filtroActual = "Todos";

// ========================================
// FUNCIONES AUXILIARES DE VALIDACIÓN (Mejora propuesta por IA)
// ========================================

/**
 * Valida que una cadena contenga solo letras y espacios
 * @param {string} texto - Texto a validar
 * @returns {boolean} true si contiene solo letras y espacios
 */
function esTextoValido(texto) {
    // Sugerencia de IA: Usar expresión regular para validar solo letras
    const expresionRegular = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,50}$/;
    return expresionRegular.test(texto.trim());
}

/**
 * Valida que la edad esté en el rango permitido (18-65)
 * @param {number} edad - Edad a validar
 * @returns {boolean} true si la edad está en el rango válido
 */
function esEdadValida(edad) {
    // Sugerencia de IA: Validación de rango específico
    return !isNaN(edad) && edad >= 18 && edad <= 65;
}

/**
 * Limpia un campo de entrada si contiene datos inválidos
 * @param {string} idCampo - ID del campo a limpiar
 */
function limpiarCampoInvalido(idCampo) {
    const campo = document.getElementById(idCampo);
    // Sugerencia de IA: Limpiar automáticamente para mejor UX
    if (campo && campo.classList.contains("error-activo")) {
        campo.value = "";
    }
}

// ========================================
// FUNCIÓN: VALIDAR FORMULARIO (MEJORADA)
// ========================================

/**
 * Valida que los campos del formulario sean correctos
 * - Nombre: solo letras, 2-50 caracteres
 * - Edad: número entre 18-65
 * - Rol: seleccionado
 * @returns {boolean} true si la validación es exitosa, false en caso contrario
 */
function validarFormulario() {
    // Mejora propuesta por IA: Obtener referencias a elementos con selectores más específicos
    const campoNombre = document.getElementById("nombre");
    const campoEdad = document.getElementById("edad");
    const campoRol = document.getElementById("rol");

    // Limpiar mensajes de error previos
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorEdad").textContent = "";
    document.getElementById("errorRol").textContent = "";

    // Remover clases de error
    campoNombre.classList.remove("error-activo");
    campoEdad.classList.remove("error-activo");
    campoRol.classList.remove("error-activo");

    let esValido = true;
    const nombre = campoNombre.value.trim();
    const edad = parseInt(campoEdad.value);
    const rol = campoRol.value;

    // Validar nombre (solo letras)
    if (!esTextoValido(nombre)) {
        document.getElementById("errorNombre").textContent = "Por favor ingresa dato válido (solo letras, 2-50 caracteres)";
        campoNombre.classList.add("error-activo");
        esValido = false;
    }

    // Validar edad (18-65)
    if (!esEdadValida(edad)) {
        document.getElementById("errorEdad").textContent = "Por favor ingresa dato válido (edad: 18-65 años)";
        campoEdad.classList.add("error-activo");
        esValido = false;
    }

    // Validar rol
    if (rol === "") {
        document.getElementById("errorRol").textContent = "Por favor ingresa dato válido (selecciona un rol)";
        campoRol.classList.add("error-activo");
        esValido = false;
    }

    return esValido;

// ========================================
// FUNCIÓN: AGREGAR USUARIO (MEJORADA)
// ========================================

/**
 * Captura los datos del formulario, valida y agrega un nuevo usuario al arreglo
 * Después actualiza la visualización de la tabla
 * Mejora propuesta por IA: Mejor manejo de errores y UX
 */
function agregarUsuario() {
    // Validar el formulario antes de proceder
    if (!validarFormulario()) {
        console.log("❌ Validación fallida - Datos inválidos ingresados");
        return;
    }

    // Capturar datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const rol = document.getElementById("rol").value;

    // Mejora propuesta por IA: Crear objeto con propiedades clara
    const nuevoUsuario = {
        nombre: nombre,
        edad: edad,
        rol: rol,
        activo: true // Los nuevos usuarios comienzan activos
    };

    // Agregar el usuario al arreglo
    usuariosRegistrados.push(nuevoUsuario);
    console.log("✅ Usuario agregado correctamente:", nuevoUsuario);

    // Limpiar el formulario
    document.getElementById("formulario").reset();
    document.getElementById("nombre").focus();

    // Actualizar la visualización
    mostrarUsuarios();

    // Resetear el filtro a "Todos"
    document.getElementById("filtro").value = "Todos";
    filtroActual = "Todos";
}

// ========================================
// FUNCIONES AUXILIARES DE CÁLCULO (Mejora propuesta por IA)
// ========================================

/**
 * Calcula las estadísticas de usuarios
 * @returns {object} Objeto con los conteos de usuarios activos, inactivos, etc.
 */
function calcularEstadisticas() {
    const totalActivos = usuariosRegistrados.filter(u => u.activo).length;
    const totalInactivos = usuariosRegistrados.filter(u => !u.activo).length;
    const totalAdministradores = usuariosRegistrados.filter(u => u.rol === "Administrador").length;
    const totalUsuarios = usuariosRegistrados.filter(u => u.rol === "Usuario").length;

    return {
        activos: totalActivos,
        inactivos: totalInactivos,
        administradores: totalAdministradores,
        usuarios: totalUsuarios
    };
}

/**
 * Actualiza las tarjetas de estadísticas en la pantalla
 * Mejora propuesta por IA: Separar la lógica de cálculo de la presentación
 */
function actualizarEstadisticas() {
    const stats = calcularEstadisticas();
    document.getElementById("totalActivos").textContent = stats.activos;
    document.getElementById("totalInactivos").textContent = stats.inactivos;
    document.getElementById("totalAdmins").textContent = stats.administradores;
    document.getElementById("totalUsers").textContent = stats.usuarios;
}

/**
 * Ordena el arreglo de usuarios por edad de forma ascendente
 * Mejora propuesta por IA: Uso de arrow functions para código más limpio
 * @returns {array} Arreglo de usuarios ordenados por edad
 */
function ordenarPorEdad(usuariosArr) {
    return [...usuariosArr].sort((a, b) => a.edad - b.edad);
}

// ========================================
// FUNCIÓN: MOSTRAR USUARIOS (MEJORADA)
// ========================================

/**
 * Genera dinámicamente la tabla de usuarios en el DOM
 * Ordena por edad ascendente (mejora de IA)
 * Itera sobre el arreglo de usuarios y crea filas para cada uno
 * Aplica el filtro actual
 */
function mostrarUsuarios() {
    const bodyTabla = document.getElementById("bodyTabla");
    const mensajeVacio = document.getElementById("mensajeVacio");
    const contador = document.getElementById("contador");

    // Limpiar la tabla
    bodyTabla.innerHTML = "";

    // Mejora propuesta por IA: Obtener usuarios filtrados y ordenados por edad
    let usuariosFiltrados = filtrarPorRol(usuariosRegistrados, filtroActual);
    usuariosFiltrados = ordenarPorEdad(usuariosFiltrados);

    // Actualizar contador
    contador.textContent = `Total: ${usuariosFiltrados.length}`;

    // Actualizar estadísticas
    actualizarEstadisticas();

    // Verificar si hay usuarios
    if (usuariosFiltrados.length === 0) {
        mensajeVacio.classList.add("visible");
        return;
    } else {
        mensajeVacio.classList.remove("visible");
    }

    // Iterar sobre los usuarios y crear filas dinámicamente
    usuariosFiltrados.forEach((usuario, indice) => {
        // Crear fila
        const fila = document.createElement("tr");

        // Crear celdas
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = usuario.nombre;

        const celdaEdad = document.createElement("td");
        celdaEdad.textContent = usuario.edad;

        const celdaRol = document.createElement("td");
        const badgeRol = document.createElement("span");
        // Mejora propuesta por IA: Usar clases Bootstrap para badges
        badgeRol.className = `badge ${usuario.rol === "Administrador" ? "bg-primary" : "bg-secondary"}`;
        badgeRol.textContent = usuario.rol;
        celdaRol.appendChild(badgeRol);

        const celdaEstado = document.createElement("td");
        const badgeEstado = document.createElement("span");
        // Mejora propuesta por IA: Usar clases Bootstrap mejoradas
        badgeEstado.className = `badge ${usuario.activo ? "bg-success" : "bg-danger"}`;
        badgeEstado.textContent = usuario.activo ? "✓ Activo" : "✗ Inactivo";
        celdaEstado.appendChild(badgeEstado);

        // Crear celda de acciones
        const celdaAcciones = document.createElement("td");
        celdaAcciones.className = "celda-acciones";

        // Botón para cambiar estado
        const btnEstado = document.createElement("button");
        btnEstado.className = `btn btn-sm ${usuario.activo ? "btn-warning" : "btn-success"}`;
        btnEstado.textContent = usuario.activo ? "🔒 Desactivar" : "🔓 Activar";
        btnEstado.onclick = () => cambiarEstado(indice);
        celdaAcciones.appendChild(btnEstado);

        // Botón para eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-sm btn-danger";
        btnEliminar.textContent = "🗑️ Eliminar";
        btnEliminar.onclick = () => eliminarUsuario(indice);
        celdaAcciones.appendChild(btnEliminar);

        // Agregar celdas a la fila
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaEdad);
        fila.appendChild(celdaRol);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaAcciones);

        // Agregar fila a la tabla
        bodyTabla.appendChild(fila);
    });
}

// ========================================
// FUNCIÓN: CAMBIAR ESTADO (MEJORADA)
// ========================================

/**
 * Alterna el estado de un usuario (Activo/Inactivo)
 * @param {number} indice - Índice del usuario en la tabla actual
 */
function cambiarEstado(indice) {
    // Obtener usuarios filtrados y ordenados
    let usuariosFiltrados = filtrarPorRol(usuariosRegistrados, filtroActual);
    usuariosFiltrados = ordenarPorEdad(usuariosFiltrados);
    const usuarioActual = usuariosFiltrados[indice];

    // Encontrar el índice en el arreglo original
    const indiceOriginal = usuariosRegistrados.findIndex(u => u === usuarioActual);

    // Cambiar el estado
    usuariosRegistrados[indiceOriginal].activo = !usuariosRegistrados[indiceOriginal].activo;

    // Log para verificar
    const nuevoEstado = usuariosRegistrados[indiceOriginal].activo ? "Activo" : "Inactivo";
    console.log(`🔄 Estado de ${usuariosRegistrados[indiceOriginal].nombre} cambiado a: ${nuevoEstado}`);

    // Actualizar la visualización
    mostrarUsuarios();
}

// ========================================
// FUNCIÓN: ELIMINAR USUARIO (MEJORADA)
// ========================================

/**
 * Elimina un usuario del arreglo con confirmación
 * @param {number} indice - Índice del usuario en la tabla actual
 */
function eliminarUsuario(indice) {
    // Obtener usuarios filtrados y ordenados
    let usuariosFiltrados = filtrarPorRol(usuariosRegistrados, filtroActual);
    usuariosFiltrados = ordenarPorEdad(usuariosFiltrados);
    const usuarioAEliminar = usuariosFiltrados[indice];

    // Confirmar eliminación
    if (confirm(`¿Está seguro de que desea eliminar a ${usuarioAEliminar.nombre}?`)) {
        // Encontrar y eliminar del arreglo original
        const indiceOriginal = usuariosRegistrados.findIndex(u => u === usuarioAEliminar);
        const usuarioEliminado = usuariosRegistrados.splice(indiceOriginal, 1)[0];

        console.log("🗑️ Usuario eliminado:", usuarioEliminado);

        // Actualizar la visualización
        mostrarUsuarios();
    }
}

// ========================================
// FUNCIÓN: FILTRAR POR ROL (AUXILIAR - MEJORADA)
// ========================================

/**
 * Filtra el arreglo de usuarios por rol
 * Mejora propuesta por IA: Usar método filter() más legible
 * @param {array} usuariosArr - Arreglo de usuarios a filtrar
 * @param {string} rol - Rol por el cual filtrar ('Todos', 'Administrador', 'Usuario')
 * @returns {array} Arreglo filtrado de usuarios
 */
function filtrarPorRol(usuariosArr, rol) {
    if (rol === "Todos") {
        return usuariosArr;
    }
    return usuariosArr.filter(usuario => usuario.rol === rol);
}

// ========================================
// FUNCIÓN: FILTRAR USUARIOS (MEJORADA)
// ========================================

/**
 * Actualiza el filtro actual basado en la selección del usuario
 * y refresca la visualización de la tabla
 * Mejora propuesta por IA: Agregar validación del selector
 */
function filtrarUsuarios() {
    // Obtener el valor del selector de filtro
    const selectorFiltro = document.getElementById("filtro");
    filtroActual = selectorFiltro.value;

    console.log(`🔎 Filtrando por: ${filtroActual}`);

    // Actualizar la visualización con el nuevo filtro
    mostrarUsuarios();
}

// ========================================
// INICIALIZACIÓN DEL DOCUMENTO (MEJORADA)
// ========================================

/**
 * Se ejecuta cuando el DOM está completamente cargado
 * Inicializa la aplicación mostrando los usuarios existentes
 * Mejora propuesta por IA: Agregar event listeners para mejorar navegación
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Aplicación cargada correctamente");
    console.log("📊 Usuarios iniciales:", usuariosRegistrados);

    // Mostrar usuarios al cargar la página
    mostrarUsuarios();

    // Mejora propuesta por IA: Navegación mejorada con Tab
    // Permitir agregar usuario presionando Enter en el campo de nombre
    document.getElementById("nombre").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("edad").focus();
        }
    });

    // Permitir agregar usuario presionando Enter en el campo de edad
    document.getElementById("edad").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("rol").focus();
        }
    });

    // Permitir agregar usuario presionando Enter en el campo de rol
    document.getElementById("rol").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            agregarUsuario();
        }
    });

    // Mejora propuesta por IA: Validación en tiempo real del nombre
    document.getElementById("nombre").addEventListener("input", (e) => {
        const campo = e.target;
        const valor = campo.value.trim();

        // Si hay contenido, validar
        if (valor !== "" && !esTextoValido(valor)) {
            campo.classList.add("error-activo");
            document.getElementById("errorNombre").textContent = "Por favor ingresa dato válido (solo letras)";
        } else {
            campo.classList.remove("error-activo");
            document.getElementById("errorNombre").textContent = "";
        }
    });

    // Mejora propuesta por IA: Validación en tiempo real de la edad
    document.getElementById("edad").addEventListener("input", (e) => {
        const campo = e.target;
        const valor = parseInt(campo.value);

        // Si hay contenido, validar
        if (campo.value !== "" && !esEdadValida(valor)) {
            campo.classList.add("error-activo");
            document.getElementById("errorEdad").textContent = "Por favor ingresa dato válido (18-65 años)";
        } else {
            campo.classList.remove("error-activo");
            document.getElementById("errorEdad").textContent = "";
        }
    });
});
