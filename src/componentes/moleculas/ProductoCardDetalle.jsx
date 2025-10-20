import React from "react";
import BotonDetallesProducto from "./BotonDetallesProducto.jsx"; // molécula existente para "Ver detalles"
import "../../estilos/productoCardDetalle.css";

const ProductoCardDetalle = ({ producto }) => {
  return (
    <div className="producto-card-detalle">
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <p>Tipo Precio: {producto.tipoPrecio || "normal"}</p>
      <p>Categoría: {producto.categoria}</p>
      <p>Cantidad Disponible: {producto.cantidad}</p>
      <BotonDetallesProducto producto={producto} />
    </div>
  );
};

export default ProductoCardDetalle;
