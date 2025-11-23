// 🧱 Organismo: ListarProductosCriticosOrganismo
// Muestra los productos con stock menor a 5 en una tabla simple
import React, { useEffect, useState } from "react";
import "../../estilos/listarProductosCriticosPage.css";
const API_URL = process.env.REACT_APP_API_URL;
const ListarProductosCriticosOrganismo = () => {
  const [productosCriticos, setProductosCriticos] = useState([]);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/api/productos`);

        if (!respuesta.ok) {
          console.error("Error al obtener productos");
          return;
        }

        const productos = await respuesta.json();

        // Filtrar productos con stock crítico
        const criticos = productos.filter(p => p.cantidad < 5);

        setProductosCriticos(criticos);

      } catch (error) {
        console.error("Error conectando al servidor:", error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <div className="listarCriticosOrganismo-container">
      <h1 className="listarCriticosOrganismo-titulo">Productos Críticos</h1>

      {productosCriticos.length === 0 ? (
        <p className="listarCriticosOrganismo-mensaje">
          No hay productos con stock crítico.
        </p>
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
                <td className="listarCriticosOrganismo-stockBajo">
                  {prod.cantidad}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        className="listarCriticosOrganismo-btnVolver"
        onClick={() => navigate("/listproductos")}
      >
        Volver
      </button>
    </div>
  );
};

export default ListarProductosCriticosOrganismo;
