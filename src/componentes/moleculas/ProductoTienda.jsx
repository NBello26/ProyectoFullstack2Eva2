import React from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/tiendaProductos.css";

const ProductoTienda = ({ producto }) => {
  const { id, nombre, precio, cantidad, imagen } = producto;
  const navigate = useNavigate();

  const verDetalles = () => {
    navigate(`/detallesProducto/${id}`); // 🔹 Usar ID para ir a detalles
  };

  return (
    <div className="tienda-card">
      <div className="tienda-card-img">
        {imagen ? <img src={imagen} alt={nombre} /> : "Imagen del Producto"}
      </div>
      <div className="tienda-card-info">
        <h3 className="tienda-card-title">{nombre}</h3>
        <p className="tienda-card-price">${precio}</p>
        <p className="tienda-card-stock">Disponible: {cantidad} unidades</p>
        <button className="tienda-card-btn" onClick={verDetalles}>
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductoTienda;
