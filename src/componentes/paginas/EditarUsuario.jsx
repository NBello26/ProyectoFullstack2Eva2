import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import FormEditarUsuario from "../organismos/FormEditarUsuario.jsx";
import "../../estilos/usuario.css";

const EditarUsuario = () => (
  <AdminTemplate>
    <div className="registro-wrapper">
      <FormEditarUsuario />
    </div>
  </AdminTemplate>
);

export default EditarUsuario;
