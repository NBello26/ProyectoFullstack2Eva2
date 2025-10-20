// src/componentes/paginas/CarritoPage.jsx
// 🔹 Página: Carrito
// Ahora usa MainTemplates que incluye HeaderLogged y Footer
// Solo se renderiza el organismo del carrito
import React from "react";
import MainTemplates from "../plantillas/MainTemplate";
import CarritoOrganismo from "../organismos/CarritoOrganismo";
import "../../estilos/carrito.css";

const CarritoPage = () => {
  return (
    <MainTemplates>
      <CarritoOrganismo />
    </MainTemplates>
  );
};

export default CarritoPage;
