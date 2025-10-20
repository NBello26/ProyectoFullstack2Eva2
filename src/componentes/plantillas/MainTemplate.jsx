// MainTemplate.jsx
// 🌟 Template general para todas las páginas navegables tras login
// Se reutiliza HeaderLogged y Footer, y encapsula la estructura general de página

import React from "react";
import HeaderLogged from "../organismos/HeaderLogged";
import Footer from "../organismos/Footer";

const MainTemplate = ({ children }) => {
  return (
    <>
      <HeaderLogged />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainTemplate;
