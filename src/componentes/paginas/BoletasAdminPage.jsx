import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import BoletasAdminOrganismo from "../organismos/BoletasAdminOrganismo";

const BoletasAdminPage = () => {
  return (
    <AdminTemplate>
      <BoletasAdminOrganismo />
    </AdminTemplate>
  );
};

export default BoletasAdminPage;
