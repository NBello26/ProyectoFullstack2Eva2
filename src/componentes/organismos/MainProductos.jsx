import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaProductos from "../moleculas/TablaProductos.jsx";
import "../../estilos/mainProductosPage.css";

const API_URL = process.env.REACT_APP_API_URL;

const MainProductos = () => {
  const [productos, setProductos] = useState([]);

  // 🔹 Cargar productos del API
  const fetchProductos = async () => {
    try {
      const resp = await fetch(`${API_URL}/api/productos`);
      if (!resp.ok) throw new Error("Error al obtener productos");

      const data = await resp.json();
      setProductos(data); // 🔹 Guardar en state
    } catch (error) {
      console.error("Error cargando productos:", error);
      alert("No se pudieron cargar los productos desde el servidor.");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  // 🔹 Función que elimina un producto del state local
  const eliminarDeTabla = (idProducto) => {
    setProductos((prev) => prev.filter((p) => p.id !== idProducto));
  };

  return (
    <main className="mainProductosOrganismo-container">
      <div className="mainProductosOrganismo-acciones">
        <Link to="/registroProducto" className="mainProductosOrganismo-btnNuevo">
          + Nuevo producto
        </Link>

        <Link to="/listproductoscriticos" className="mainProductosOrganismo-btnCriticos">
          Productos Críticos
        </Link>

        <Link to="/admin" className="btn-back">
          Volver al Panel
        </Link>
      </div>

      {/* 🔹 Pasamos la función al componente TablaProductos */}
      <TablaProductos productos={productos} onEliminar={eliminarDeTabla} />
    </main>
  );
};

export default MainProductos;
