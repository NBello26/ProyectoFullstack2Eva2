// 📄 Página: ListarProductosCriticosPage
// Renderiza el organismo dentro del AdminTemplate

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import ListarProductosCriticosOrganismo from "../organismos/ListarProductosCriticosOrganismo";

const ListarProductosCriticosPage = () => {
  return (
    <AdminTemplate>
      <ListarProductosCriticosOrganismo />
    </AdminTemplate>
  );
};

export default ListarProductosCriticosPage;
