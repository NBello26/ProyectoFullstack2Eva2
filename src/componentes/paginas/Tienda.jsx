import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import ProductosTienda from "../organismos/ProductosTienda";
import useUsuarioLogeado from "../funciones/useUsuarioLogeado";

const Tienda = () => {
  const usuario = useUsuarioLogeado();

  if (!usuario) return null; // Mientras se verifica el login

  return (
    <MainTemplate>
      <h1 className="titulo">Productos Disponibles</h1>
      <ProductosTienda />
    </MainTemplate>
  );
};

export default Tienda;
