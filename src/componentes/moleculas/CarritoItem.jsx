// src/componentes/moleculas/CarritoItem.jsx
import React from "react";
import CarritoButton from "../atomos/CarritoButton";

const CarritoItem = ({ producto, index, eliminar }) => {
  const subtotal = producto.precio * (producto.cantidadCarrito || 1);

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>{producto.descripcion}</td>
      <td>${producto.precio.toLocaleString()}</td>
      <td>{producto.cantidadCarrito || 1}</td>
      <td>${subtotal.toLocaleString()}</td>
      <td>
        <CarritoButton
          tipo="danger"
          texto="Eliminar"
          onClick={() => {
            if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
              eliminar(index);
            }
          }}
        />
      </td>
    </tr>
  );
};

export default CarritoItem;
