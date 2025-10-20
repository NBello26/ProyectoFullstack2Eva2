// TemplateHeaderSimple.jsx
// 🧠 Este template define un encabezado simple usado en las páginas de autenticación (Login y Registro).
// Se usa antes de que el usuario haya iniciado sesión.
// Es un "template" porque define una estructura base reutilizable entre vistas similares.

import React from "react";

const TemplateHeaderSimple = () => {
  return (
    <header className="header-simple">
      <div className="container header-content">
        <div className="site-site-name-simple">TIENDA DuocUC</div>
      </div>
    </header>
  );
};

export default TemplateHeaderSimple;
