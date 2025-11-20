import React from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/productoCardDetalle.css";

const ProductoCardDetalle = ({ producto }) => {
  const navigate = useNavigate();

  const verDetalles = () => {
    navigate(`/detallesProducto/${producto.id}`); // 🔹 navegar por ID
  };

  return (
    <div className="producto-card-detalle">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Tipo Precio: {producto.tipoPrecio || "normal"}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Cantidad Disponible: {producto.cantidad}</p>
      <button className="btn-detalle" onClick={verDetalles}>
        Ver detalles
      </button>
    </div>
  );
};

export default ProductoCardDetalle;
