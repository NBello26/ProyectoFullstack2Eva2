/*
  Página: ListProductos
  Utiliza AdminTemplate como plantilla
  Renderiza MainProductos dentro de la plantilla
*/

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import MainProductos from "../organismos/MainProductos.jsx";
import "../../estilos/usuario.css";

const ListProductos = () => (
  <AdminTemplate>
    <MainProductos />
  </AdminTemplate>
);

export default ListProductos;
