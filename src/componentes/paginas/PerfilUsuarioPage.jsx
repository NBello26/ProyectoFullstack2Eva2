import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import PerfilUsuario from "../organismos/PerfilUsuario";

const PerfilUsuarioPage = () => {
// Mientras se verifica el login
  return (
    <MainTemplate>
      <PerfilUsuario />
    </MainTemplate>
  );
};

export default PerfilUsuarioPage;
