// 🧱 Página: DetalleBoletaAdminPage
// Renderiza DetalleBoletaAdminOrganismo dentro de AdminTemplate
import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import DetalleBoletaAdminOrganismo from "../organismos/DetalleBoletaAdminOrganismo";

const DetalleBoletaAdminPage = () => {
  return (
    <AdminTemplate>
      <DetalleBoletaAdminOrganismo />
    </AdminTemplate>
  );
};

export default DetalleBoletaAdminPage;
