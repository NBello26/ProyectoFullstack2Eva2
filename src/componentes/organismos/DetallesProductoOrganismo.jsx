// 🔹 Organismo: Detalles de Producto con carrito persistente
// Guarda carrito en usuario activo y en la base de datos de usuarios

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallesProductoOrganismo = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener usuario activo (sesión)
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/");
      return;
    }
    setUsuario(usuarioActivo);

    // Buscar producto
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productoEncontrado = productos.find(
      (p) => p.nombre === decodeURIComponent(nombre)
    );

    setProducto(productoEncontrado || null);
  }, [nombre, navigate]);

  const agregarAlCarrito = () => {
    if (!producto || !usuario) return;

    if (producto.cantidad <= 0) {
      alert("No hay stock disponible para este producto");
      return;
    }

    // 1️⃣ Actualizar carrito del usuario activo
    const carrito = usuario.carrito ? [...usuario.carrito] : [];
    const prodExistente = carrito.find((p) => p.id === producto.id);
    if (prodExistente) {
      prodExistente.cantidadCarrito = (prodExistente.cantidadCarrito || 1) + 1;
    } else {
      carrito.push({ ...producto, cantidadCarrito: 1 });
    }
    const usuarioActivoActualizado = { ...usuario, carrito };

    // 2️⃣ Actualizar stock del producto
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const productosActualizados = productos.map((p) =>
      p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
    );
    const productoActualizado = productosActualizados.find(p => p.id === producto.id);

    // 3️⃣ Guardar cambios en localStorage
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivoActualizado));

    // 4️⃣ Actualizar usuario persistente en "usuarios"
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuariosActualizados = usuarios.map((u) =>
      u.id === usuario.id ? { ...u, carrito: usuarioActivoActualizado.carrito } : u
    );
    localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

    // 5️⃣ Actualizar estado local para refrescar UI
    setProducto(productoActualizado);
    setUsuario(usuarioActivoActualizado);

    // 🔹 Forzar actualización del ContadorCarrito
    window.dispatchEvent(new Event("storage"));

    alert(`"${producto.nombre}" se ha añadido al carrito`);
  };

  if (!producto)
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto "{decodeURIComponent(nombre)}" no existe.</p>
      </div>
    );

  return (
    <div className="product-details">
      <div className="product-image">Imagen del Producto</div>
      <div className="product-info">
        <h1 className="product-title">{producto.nombre}</h1>
        <p className="product-price">${producto.precio}</p>
        <div className="product-meta">
          <p className="product-quantity">Disponible: {producto.cantidad} unidades</p>
        </div>
        <div className="product-description">
          <h3>Descripción</h3>
          <p>{producto.descripcion}</p>
        </div>
        <div className="action-buttons">
          <button className="BotonDetalles" onClick={agregarAlCarrito}>
            Añadir al Carrito
          </button>
          <button
            className="BotonDetalles"
            onClick={() => {
              agregarAlCarrito();
              navigate("/carrito");
            }}
          >
            Comprar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProductoOrganismo;
