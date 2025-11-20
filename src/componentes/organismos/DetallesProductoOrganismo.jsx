import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetallesProductoOrganismo = () => {
  const { id } = useParams(); // ID del producto desde la ruta
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    // Obtener usuario activo desde localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/");
      return;
    }
    setUsuario(usuarioActivo);

    // Obtener producto desde la BD por ID
    const fetchProducto = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/productos/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProducto(data);
      } catch (err) {
        console.error(err);
        setProducto(null);
      }
    };

    fetchProducto();
  }, [id, navigate]);

  const agregarAlCarrito = async () => {
    if (!producto || !usuario) return;

    if (producto.cantidad <= 0) {
      alert("No hay stock disponible para este producto");
      return;
    }

    // Actualizar carrito del usuario activo
    const carrito = usuario.carrito ? [...usuario.carrito] : [];
    const prodExistente = carrito.find((p) => p.id === producto.id);
    if (prodExistente) {
      prodExistente.cantidadCarrito = (prodExistente.cantidadCarrito || 1) + 1;
    } else {
      carrito.push({ ...producto, cantidadCarrito: 1 });
    }
    const usuarioActivoActualizado = { ...usuario, carrito };
    setUsuario(usuarioActivoActualizado);
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActivoActualizado));

    // Actualizar stock en la BD
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...producto, cantidad: producto.cantidad - 1 }),
      });

      if (!res.ok) throw new Error("Error al actualizar stock");

      setProducto({ ...producto, cantidad: producto.cantidad - 1 });
      alert(`"${producto.nombre}" se ha añadido al carrito`);
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el stock del producto");
    }

    // Forzar actualización del contador de carrito
    window.dispatchEvent(new Event("storage"));
  };

  if (!producto)
    return (
      <div className="not-found">
        <h2>Producto no encontrado</h2>
        <p>El producto con ID "{id}" no existe.</p>
      </div>
    );

  return (
    <div className="product-details">
      <div className="product-image">
        {producto.imagen ? <img src={producto.imagen} alt={producto.nombre} /> : "Imagen del Producto"}
      </div>
      <div className="product-info">
        <h1 className="product-title">{producto.nombre}</h1>
        <p className="product-price">${producto.precio}</p>
        <p className="product-quantity">Disponible: {producto.cantidad} unidades</p>
        <div className="product-description">
          <h3>Descripción</h3>
          <p>{producto.descripcion}</p>
        </div>
        <div className="action-buttons">
          {producto.cantidad <= 0 && (
            <p style={{ color: "red", marginBottom: "10px" }}>
              No hay stock disponible para este producto
            </p>
          )}
          <button
  className="BotonDetalles"
  onClick={agregarAlCarrito}
>
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
