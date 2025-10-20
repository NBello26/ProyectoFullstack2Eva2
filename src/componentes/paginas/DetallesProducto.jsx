// Página DetallesProducto
// Esta página se encarga de renderizar los detalles de un producto específico
// Solo accesible si el usuario está logueado
import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import DetallesProductoOrganismo from "../organismos/DetallesProductoOrganismo";
import "../../estilos/detalles.css";

const DetallesProducto = () => {
  return (
    <MainTemplate>
      <DetallesProductoOrganismo />
    </MainTemplate>
  );
};

export default DetallesProducto;
