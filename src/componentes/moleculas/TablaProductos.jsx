import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton.jsx";

const API_URL = process.env.REACT_APP_API_URL;

const TablaProductos = ({ productos, onEliminar }) => {
  const navigate = useNavigate();

  const eliminarProducto = async (id, nombre) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres eliminar el producto "${nombre}"?`
    );
    if (!confirmar) return;

    try {
      const response = await fetch(`${API_URL}/api/productos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("❌ Error al eliminar el producto");
        return;
      }

      alert(`✔ Producto "${nombre}" eliminado correctamente`);

      // 🔹 Actualizar el state en el padre
      if (onEliminar) onEliminar(id);

    } catch (error) {
      console.error("Error eliminando producto:", error);
      alert("Error de conexión con el servidor");
    }
  };

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

            <td style={{ display: "flex", gap: "10px" }}>
              <Boton
                texto="Editar"
                className="btn-editar"
                onClick={() => navigate(`/editarProducto?id=${producto.id}`)}
              />

              {/* Botón Eliminar nativo */}
              <button
                className="btn-eliminar"
                onClick={() => eliminarProducto(producto.id, producto.nombre)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProductos;
