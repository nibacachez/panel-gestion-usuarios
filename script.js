// ========================================
// DECLARACIÓN DE DATOS GLOBALES
// ========================================

// Array de usuarios con estructura inicial
let usuarios = [
    { nombre: "Juan Pérez", edad: 30, rol: "Administrador", activo: true },
    { nombre: "María García", edad: 28, rol: "Usuario", activo: true },
    { nombre: "Carlos López", edad: 35, rol: "Administrador", activo: false },
    { nombre: "Ana Martínez", edad: 26, rol: "Usuario", activo: true }
];

// Variable para almacenar el filtro actual
let filtroActual = "Todos";

// ========================================
// FUNCIÓN: VALIDAR FORMULARIO
// ========================================

/**
 * Valida que los campos del formulario sean correctos
 * - Nombre: no vacío
 * - Edad: número mayor a 0
 * - Rol: seleccionado
 * @returns {boolean} true si la validación es exitosa, false en caso contrario
 */
function validarFormulario() {
    // Obtener referencias a los elementos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const rol = document.getElementById("rol").value;

    // Limpiar mensajes de error previos
    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorEdad").textContent = "";
    document.getElementById("errorRol").textContent = "";

    let esValido = true;

    // Validar nombre
    if (nombre === "") {
        document.getElementById("errorNombre").textContent = "El nombre es requerido";
        esValido = false;
    }

    // Validar edad
    if (isNaN(edad) || edad <= 0) {
        document.getElementById("errorEdad").textContent = "La edad debe ser mayor a 0";
        esValido = false;
    }

    // Validar rol
    if (rol === "") {
        document.getElementById("errorRol").textContent = "Debe seleccionar un rol";
        esValido = false;
    }

    return esValido;
}

// ========================================
// FUNCIÓN: AGREGAR USUARIO
// ========================================

/**
 * Captura los datos del formulario, valida y agrega un nuevo usuario al arreglo
 * Después actualiza la visualización de la tabla
 */
function agregarUsuario() {
    // Validar el formulario antes de proceder
    if (!validarFormulario()) {
        console.log("❌ Validación fallida");
        return;
    }

    // Capturar datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const rol = document.getElementById("rol").value;

    // Crear objeto de usuario
    const nuevoUsuario = {
        nombre: nombre,
        edad: edad,
        rol: rol,
        activo: true // Los nuevos usuarios comienzan activos
    };

    // Agregar el usuario al arreglo
    usuarios.push(nuevoUsuario);
    console.log("✅ Usuario agregado:", nuevoUsuario);

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
// FUNCIÓN: MOSTRAR USUARIOS
// ========================================

/**
 * Genera dinámicamente la tabla de usuarios en el DOM
 * Itera sobre el arreglo de usuarios y crea filas para cada uno
 * Aplica el filtro actual
 */
function mostrarUsuarios() {
    const bodyTabla = document.getElementById("bodyTabla");
    const mensajeVacio = document.getElementById("mensajeVacio");
    const contador = document.getElementById("contador");

    // Limpiar la tabla
    bodyTabla.innerHTML = "";

    // Obtener usuarios filtrados
    let usuariosFiltrados = filtrarPorRol(usuarios, filtroActual);

    // Actualizar contador
    contador.textContent = `Total: ${usuariosFiltrados.length}`;

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
        badgeRol.className = `rol ${usuario.rol.toLowerCase()}`;
        badgeRol.textContent = usuario.rol;
        celdaRol.appendChild(badgeRol);

        const celdaEstado = document.createElement("td");
        const badgeEstado = document.createElement("span");
        badgeEstado.className = `estado ${usuario.activo ? "activo" : "inactivo"}`;
        badgeEstado.textContent = usuario.activo ? "✓ Activo" : "✗ Inactivo";
        celdaEstado.appendChild(badgeEstado);

        // Crear celda de acciones
        const celdaAcciones = document.createElement("td");
        celdaAcciones.className = "celda-acciones";

        // Botón para cambiar estado
        const btnEstado = document.createElement("button");
        btnEstado.className = `btn ${usuario.activo ? "btn-advertencia" : "btn-exito"}`;
        btnEstado.textContent = usuario.activo ? "🔒 Desactivar" : "🔓 Activar";
        btnEstado.onclick = () => cambiarEstado(indice);
        celdaAcciones.appendChild(btnEstado);

        // Botón para eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn btn-error";
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
// FUNCIÓN: CAMBIAR ESTADO
// ========================================

/**
 * Alterna el estado de un usuario (Activo/Inactivo)
 * @param {number} indice - Índice del usuario en el arreglo
 */
function cambiarEstado(indice) {
    // Obtener el índice real en el arreglo original
    let usuariosFiltrados = filtrarPorRol(usuarios, filtroActual);
    const usuarioActual = usuariosFiltrados[indice];

    // Encontrar el índice en el arreglo original
    const indiceOriginal = usuarios.findIndex(u => u === usuarioActual);

    // Cambiar el estado
    usuarios[indiceOriginal].activo = !usuarios[indiceOriginal].activo;

    // Log para verificar
    const nuevoEstado = usuarios[indiceOriginal].activo ? "Activo" : "Inactivo";
    console.log(`🔄 Estado de ${usuarios[indiceOriginal].nombre} cambiado a: ${nuevoEstado}`);

    // Actualizar la visualización
    mostrarUsuarios();
}

// ========================================
// FUNCIÓN: ELIMINAR USUARIO
// ========================================

/**
 * Elimina un usuario del arreglo
 * @param {number} indice - Índice del usuario en la tabla filtrada
 */
function eliminarUsuario(indice) {
    // Obtener usuarios filtrados
    let usuariosFiltrados = filtrarPorRol(usuarios, filtroActual);
    const usuarioAEliminar = usuariosFiltrados[indice];

    // Confirmar eliminación
    if (confirm(`¿Está seguro de que desea eliminar a ${usuarioAEliminar.nombre}?`)) {
        // Encontrar y eliminar del arreglo original
        const indiceOriginal = usuarios.findIndex(u => u === usuarioAEliminar);
        const usuarioEliminado = usuarios.splice(indiceOriginal, 1)[0];

        console.log("🗑️ Usuario eliminado:", usuarioEliminado);

        // Actualizar la visualización
        mostrarUsuarios();
    }
}

// ========================================
// FUNCIÓN: FILTRAR POR ROL (AUXILIAR)
// ========================================

/**
 * Filtra el arreglo de usuarios por rol
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
// FUNCIÓN: FILTRAR USUARIOS
// ========================================

/**
 * Actualiza el filtro actual basado en la selección del usuario
 * y refresca la visualización de la tabla
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
// INICIALIZACIÓN DEL DOCUMENTO
// ========================================

/**
 * Se ejecuta cuando el DOM está completamente cargado
 * Inicializa la aplicación mostrando los usuarios existentes
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Aplicación cargada correctamente");
    console.log("📊 Usuarios iniciales:", usuarios);

    // Mostrar usuarios al cargar la página
    mostrarUsuarios();

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
});
