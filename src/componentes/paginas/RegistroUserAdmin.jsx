import React from "react";
import AdminTemplate from "../plantillas/AdminTemplate.jsx";
import FormRegistroUsuario from "../organismos/FormRegistroUsuario.jsx";
import "../../estilos/usuario.css";

const RegistroUserAdmin = () => (
  <AdminTemplate>
    <div className="registro-wrapper">
        <FormRegistroUsuario />
    </div>
  </AdminTemplate>
);

export default RegistroUserAdmin;