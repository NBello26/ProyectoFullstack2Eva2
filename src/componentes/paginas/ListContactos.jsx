/*
  Página: ListContactos
  - Renderiza MainContactos dentro de AdminTemplate
  - AdminTemplate ya tiene header común del admin
  - MainContactos maneja la tabla de contactos y mensaje vacío
  - Reutiliza usuario.css para estilos
*/

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import MainContactos from "../organismos/MainContactos.jsx";
import "../../estilos/usuario.css";

const ListContactos = () => (
  <AdminTemplate>
    <MainContactos />
  </AdminTemplate>
);

export default ListContactos;
