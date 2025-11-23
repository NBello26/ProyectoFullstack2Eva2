import React, { useEffect, useState } from "react";
import TablaProductos from "../moleculas/TablaProductos.jsx";
import "../../estilos/mainProductosPage.css";
const API_URL = process.env.REACT_APP_API_URL;
const MainProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/productos`);
        if (!resp.ok) throw new Error("Error al obtener productos");

        const data = await resp.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
        alert("No se pudieron cargar los productos desde el servidor.");
      }
    };

    fetchProductos();
  }, []);

  return (
    <main className="mainProductosOrganismo-container">
      <div className="mainProductosOrganismo-acciones">
        <a href="/registroProducto" className="mainProductosOrganismo-btnNuevo">
          + Nuevo producto
        </a>
        <a href="/listproductoscriticos" className="mainProductosOrganismo-btnCriticos">
          Productos Críticos
        </a>
        <a href="/admin" className="mainProductosOrganismo-btnVolver">
          Volver al Panel
        </a>
      </div>

      <TablaProductos productos={productos} />
    </main>
  );
};

export default MainProductos;
