// Login.jsx
// 🧩 Página completa del login (usa TemplateHeaderSimple + LoginForm)
// Representa la vista mostrada antes de iniciar sesión.

import React from "react";
import TemplateHeaderSimple from "../plantillas/TemplateHeaderSimple";
import LoginForm from "../organismos/LoginForm";
import "../../estilos/formulario.css";

const Login = () => {
  return (
    <>
      <TemplateHeaderSimple />
      <main className="contenedor-login">
        <LoginForm />
      </main>
    </>
  );
};

export default Login;
