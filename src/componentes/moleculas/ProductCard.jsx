// 🔹 Molécula: tarjeta de producto reutilizable
// Incluye imagen, nombre, precio, cantidad y botón de detalles

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/pagPrincipal.css";

const ProductCard = ({ producto }) => {
  const navigate = useNavigate();

  const verDetalles = () => {
    const nombreEncode = encodeURIComponent(producto.nombre);
    navigate(`/detallesProducto/${nombreEncode}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">Imagen del Producto</div>
      <div className="product-info">
        <h3 className="product-title">{producto.nombre}</h3>
        <p className="product-price">${producto.precio}</p>
        <p className="product-quantity">
          Disponible: {producto.cantidad} unidades
        </p>
        {/* Botón que usa navigate */}
        <button className="BotonDetalles" onClick={verDetalles}>
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
