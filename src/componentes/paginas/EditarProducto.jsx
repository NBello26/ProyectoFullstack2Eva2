/*
  Página: EditarProducto
  - Renderiza FormEditarProducto dentro de AdminTemplate
  - AdminTemplate ya tiene el header general del admin
  - FormEditarProducto importa sus propios estilos (usuario.css)
*/

import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import FormEditarProducto from "../organismos/FormEditarProducto.jsx";
import "../../estilos/usuario.css"; // estilos solo para productos

const EditarProducto = () => (
  <AdminTemplate>
    <div className="registro-wrapper">
        <FormEditarProducto />
    </div>
  </AdminTemplate>
);

export default EditarProducto;
