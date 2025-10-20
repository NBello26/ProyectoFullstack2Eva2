// 📦 /src/data/products.js
// Base de datos simulada de productos de comida con persistencia en localStorage

const LS_KEY = "productos";

const productosIniciales = [
  {
    id: 1,
    nombre: "Papas en Tarro",
    precio: 1990,
    descripcion: "Crujientes papas fritas sabor original, 150g.",
    cantidad: 25,
    categoria: "Snacks",
    tipoPrecio: "normal", // nuevo campo
  },
  {
    id: 2,
    nombre: "Galletas de Chocolate",
    precio: 1290,
    descripcion: "Galletas rellenas con crema de chocolate, 12 unidades.",
    cantidad: 40,
    categoria: "Golosinas",
    tipoPrecio: "oferta",
  },
  {
    id: 3,
    nombre: "Bebida Cola 1L",
    precio: 1790,
    descripcion: "Bebida gaseosa sabor cola de 1 litro.",
    cantidad: 30,
    categoria: "Bebidas",
    tipoPrecio: "normal",
  },
  {
  id: 4,
  nombre: "Jugo Natural Naranja 1L",
  precio: 1590,
  descripcion: "Jugo natural de naranja sin azúcar añadida, 1 litro.",
  cantidad: 35,
  categoria: "Bebidas",
  tipoPrecio: "normal",
},
{
  id: 5,
  nombre: "Caramelos de Fruta",
  precio: 890,
  descripcion: "Bolsa de caramelos surtidos con sabores frutales.",
  cantidad: 50,
  categoria: "Dulces",
  tipoPrecio: "oferta",
},
{
  id: 6,
  nombre: "Chocolate con Almendras",
  precio: 2390,
  descripcion: "Tableta de chocolate con trozos de almendra tostada, 100g.",
  cantidad: 40,
  categoria: "Golosinas",
  tipoPrecio: "normal",
},
{
  id: 7,
  nombre: "Agua Mineral 1.5L",
  precio: 990,
  descripcion: "Agua mineral natural sin gas de 1.5 litros.",
  cantidad: 60,
  categoria: "Bebidas",
  tipoPrecio: "normal",
},
{
  id: 8,
  nombre: "Mix de Papas y Snacks",
  precio: 2590,
  descripcion: "Bolsa mixta de papas fritas, palitos y ramitas, 250g.",
  cantidad: 30,
  categoria: "Snacks",
  tipoPrecio: "oferta",
},
{
  id: 9,
  nombre: "Gomitas de Osito",
  precio: 1390,
  descripcion: "Gomitas con sabor a frutas variadas, 200g.",
  cantidad: 45,
  categoria: "Dulces",
  tipoPrecio: "normal",
},
{
  id: 10,
  nombre: "Bebida Limón 1.5L",
  precio: 1890,
  descripcion: "Bebida gaseosa sabor limón, botella de 1.5 litros.",
  cantidad: 25,
  categoria: "Bebidas",
  tipoPrecio: "normal",
},


];

// Inicialización si no hay datos
export function inicializarProductos() {
  if (!localStorage.getItem(LS_KEY)) {
    localStorage.setItem(LS_KEY, JSON.stringify(productosIniciales));
  }
}

// CREATE
export function crearProducto(producto) {
  const productos = obtenerProductos();
  const nuevo = { id: Date.now(), tipoPrecio: "normal", ...producto }; // valor por defecto
  productos.push(nuevo);
  localStorage.setItem(LS_KEY, JSON.stringify(productos));
  return nuevo;
}

// READ
export function obtenerProductos() {
  return JSON.parse(localStorage.getItem(LS_KEY)) || [];
}

export function obtenerProductoPorId(id) {
  return obtenerProductos().find((p) => p.id === id);
}

// UPDATE
export function actualizarProducto(id, datosActualizados) {
  const productos = obtenerProductos();
  const index = productos.findIndex((p) => p.id === id);
  if (index === -1) return null;
  productos[index] = { ...productos[index], ...datosActualizados };
  localStorage.setItem(LS_KEY, JSON.stringify(productos));
  return productos[index];
}

// DELETE
export function eliminarProducto(id) {
  const productos = obtenerProductos().filter((p) => p.id !== id);
  localStorage.setItem(LS_KEY, JSON.stringify(productos));
  return productos;
}
