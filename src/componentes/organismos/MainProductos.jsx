/*
  Organismo: MainProductos
  Contiene:
    - TablaProductos (molécula)
    - Botones de acción (átomos: Boton, Link)
  Se utiliza dentro de AdminTemplate para mantener la plantilla del admin
*/

import React, { useEffect, useState } from "react";
import TablaProductos from "../moleculas/TablaProductos.jsx";
import "../../estilos/mainProductosPage.css";

const MainProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
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
