import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate";
import MainAdmin from "../organismos/MainAdmin";
import "../../estilos/admin.css";

const AdminPage = () => (
  <AdminTemplate>
    <MainAdmin />
  </AdminTemplate>
);

export default AdminPage;
