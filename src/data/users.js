// 👤 /src/data/users.js
// Simulación de usuarios con persistencia en localStorage

const LS_KEY = "usuarios";

const usuariosIniciales = [
  {
    id: 1,
    nombre: "Carlos Gómez",
    correo: "carlos@duoc.cl",
    contraseña: "1234",
    comuna: "Santiago",
    region: "Metropolitana",
    telefono: "+56912345678",
    tipusuario: "cliente", // cambiado
    carrito: [],
    historialCompra: [],
  },
  {
    id: 2,
    nombre: "Admin Tienda",
    correo: "admin@duoc.cl",
    contraseña: "admin",
    comuna: "Santiago",
    region: "Metropolitana",
    telefono: "+56999999999",
    tipusuario: "admin", // cambiado
    carrito: [],
    historialCompra: [],
  },
  {
  id: 3,
  nombre: "María Torres",
  correo: "maria@duoc.cl",
  contraseña: "maria123",
  comuna: "Viña del Mar",
  region: "Valparaíso",
  telefono: "+56987654321",
  tipusuario: "cliente",
  carrito: [],
  historialCompra: [],
},
{
  id: 4,
  nombre: "Pedro López",
  correo: "pedro@duoc.cl",
  contraseña: "pedro456",
  comuna: "Concepción",
  region: "Biobío",
  telefono: "+56911223344",
  tipusuario: "cliente",
  carrito: [],
  historialCompra: [],
},
];

// Inicializar usuarios
export function inicializarUsuarios() {
  if (!localStorage.getItem(LS_KEY)) {
    localStorage.setItem(LS_KEY, JSON.stringify(usuariosIniciales));
  }
}

// CREATE
export function crearUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  const nuevo = { id: Date.now(), ...usuario, carrito: [], historialCompra: [] };
  usuarios.push(nuevo);
  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
  return nuevo;
}

// READ
export function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

export function obtenerUsuarioPorId(id) {
  return obtenerUsuarios().find((u) => u.id === id);
}

export function obtenerUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find((u) => u.correo === correo);
}

// UPDATE
export function actualizarUsuario(id, datos) {
  const usuarios = obtenerUsuarios();
  const index = usuarios.findIndex((u) => u.id === id);
  if (index === -1) return null;
  usuarios[index] = { ...usuarios[index], ...datos };
  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
  return usuarios[index];
}

// DELETE
export function eliminarUsuario(id) {
  const usuarios = obtenerUsuarios().filter((u) => u.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
  return usuarios;
}

// 🛒 CARRITO
export function agregarAlCarrito(idUsuario, producto) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find((u) => u.id === idUsuario);
  if (!usuario) return null;

  const existente = usuario.carrito.find((p) => p.id === producto.id);
  if (existente) {
    existente.cantidad += producto.cantidad;
  } else {
    usuario.carrito.push(producto);
  }

  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
  return usuario.carrito;
}

export function vaciarCarrito(idUsuario) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find((u) => u.id === idUsuario);
  if (!usuario) return null;
  usuario.carrito = [];
  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
}

export function agregarAlHistorial(idUsuario, carrito) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find((u) => u.id === idUsuario);
  if (!usuario) return null;
  usuario.historialCompra.push({
    fecha: new Date().toLocaleString(),
    items: carrito,
  });
  usuario.carrito = [];
  localStorage.setItem(LS_KEY, JSON.stringify(usuarios));
}
