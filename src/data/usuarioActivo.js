// 🔐 /src/data/usuarioActivo.js
// Manejo del usuario actualmente logeado usando localStorage

const LS_KEY = "usuarioActivo";

// LOGIN
export function iniciarSesion(usuario) {
  localStorage.setItem(LS_KEY, JSON.stringify(usuario));
  return usuario;
}

// OBTENER USUARIO ACTIVO
export function obtenerUsuarioActivo() {
  return JSON.parse(localStorage.getItem(LS_KEY));
}

// ACTUALIZAR USUARIO ACTIVO (por ejemplo si se modifica su carrito)
export function actualizarUsuarioActivo(datosActualizados) {
  const usuario = obtenerUsuarioActivo();
  if (!usuario) return null;
  const actualizado = { ...usuario, ...datosActualizados };
  localStorage.setItem(LS_KEY, JSON.stringify(actualizado));
  return actualizado;
}

// LOGOUT
export function cerrarSesion() {
  localStorage.removeItem(LS_KEY);
}