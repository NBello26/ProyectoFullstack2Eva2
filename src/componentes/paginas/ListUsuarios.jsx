import React from "react";
import MainUsuarios from "../organismos/MainUsuarios.jsx";
import AdminTemplate from "../plantillas/AdminTemplate.jsx"; // ya creado en pagadmin
import "../../estilos/usuario.css";

const ListUsuarios = () => (
  <AdminTemplate>
    <MainUsuarios />
  </AdminTemplate>
);

export default ListUsuarios;
