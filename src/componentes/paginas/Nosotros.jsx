// Nosotros.jsx
// 🌟 Página Nosotros completa
// 🧱 Renderiza el organismo NosotrosOrganismo dentro del MainTemplate
// 🔒 Solo accesible si el usuario está logeado

import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import NosotrosOrganismo from "../organismos/NosotrosOrganismo";

const Nosotros = () => {

  return (
    <MainTemplate>
      <NosotrosOrganismo />
    </MainTemplate>
  );
};

export default Nosotros;
