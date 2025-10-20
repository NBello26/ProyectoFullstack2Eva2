// Registro.jsx
// 🧩 Página de registro que usa el TemplateHeaderSimple y el formulario RegistroForm.

import React from "react";
import TemplateHeaderSimple from "../plantillas/TemplateHeaderSimple";
import RegistroForm from "../organismos/RegistroForm";
import "../../estilos/registro.css";

const Registro = () => {
  return (
    <>
      <TemplateHeaderSimple />
      <main>
        <RegistroForm />
      </main>
    </>
  );
};

export default Registro;
