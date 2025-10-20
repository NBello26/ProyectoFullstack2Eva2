/*
  Página: RegistroProducto
  - Utiliza AdminTemplate como plantilla
  - Renderiza FormRegistroProducto (organismo)
*/

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import FormRegistroProducto from "../organismos/FormRegistroProducto.jsx";
import "../../estilos/regAdmin.css"; // reutilizamos el CSS original

const RegistroProducto = () => (
  <AdminTemplate>
    <div className="registro-wrapper">
        <FormRegistroProducto />
    </div>
  </AdminTemplate>
);

export default RegistroProducto;
