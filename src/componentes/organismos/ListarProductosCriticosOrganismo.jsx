// 🧱 Organismo: ListarProductosCriticosOrganismo
// Muestra los productos con stock menor a 5 en una tabla simple

import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../../data/products"; // función ya existente
import "../../estilos/listarProductosCriticosPage.css";

const ListarProductosCriticosOrganismo = () => {
  const [productosCriticos, setProductosCriticos] = useState([]);

  useEffect(() => {
    const todosProductos = obtenerProductos();
    const filtrados = todosProductos.filter(p => p.cantidad < 5);
    setProductosCriticos(filtrados);
  }, []);

  return (
    <div className="listarCriticosOrganismo-container">
      <h1 className="listarCriticosOrganismo-titulo">Productos Críticos</h1>

      {productosCriticos.length === 0 ? (
        <p className="listarCriticosOrganismo-mensaje">No hay productos con stock crítico.</p>
      ) : (
        <table className="listarCriticosOrganismo-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productosCriticos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.categoria}</td>
                <td>${prod.precio.toLocaleString()}</td>
                <td className="listarCriticosOrganismo-stockBajo">{prod.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="listarCriticosOrganismo-btnVolver"
        onClick={() => (window.location.href = "/listproductos")}
      >
        Volver
      </button>
    </div>
  );
};

export default ListarProductosCriticosOrganismo;
