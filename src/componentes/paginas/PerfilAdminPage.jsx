// 📄 Página: PerfilAdminPage
// Renderiza el organismo con el AdminTemplate

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import PerfilAdminOrganismo from "../organismos/PerfilAdminOrganismo";

const PerfilAdminPage = () => {
  return (
    <AdminTemplate>
      <PerfilAdminOrganismo />
    </AdminTemplate>
  );
};

export default PerfilAdminPage;
