import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton.jsx";

const TablaProductos = ({ productos }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Tipo Precio</th>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>{producto.tipoPrecio}</td>
            <td>{producto.descripcion}</td>
            <td>{producto.cantidad}</td>
            <td>{producto.categoria}</td>
            <td>
              <Boton
                texto="Editar"
                className="btn-editar"
                onClick={() => navigate(`/editarProducto?id=${producto.id}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
