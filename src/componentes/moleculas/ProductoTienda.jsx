import React from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/tiendaProductos.css"; // ✅ nuevo CSS unificado y único

const ProductoTienda = ({ producto }) => {
  const { nombre, precio, cantidad } = producto;
  const nombreEncode = encodeURIComponent(nombre);
  const navigate = useNavigate();

  const verDetalles = () => {
    navigate(`/detallesProducto/${nombreEncode}`);
  };

  return (
    <div className="tienda-card">
      <div className="tienda-card-img">Imagen del Producto</div>
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
