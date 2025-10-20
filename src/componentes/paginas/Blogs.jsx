// Blogs.jsx
// 🌟 Página de Blogs
// Renderiza el organismo BlogsOrganismo dentro del MainTemplate
// 🔒 Solo accesible si el usuario está logeado
// Reutiliza HeaderLogged y Footer desde MainTemplate

import React from "react";
import MainTemplate from "../plantillas/MainTemplate";
import BlogsOrganismo from "../organismos/BlogsOrganismo";

const Blogs = () => {
// Mientras se verifica el login
  return (
    <MainTemplate>
      <BlogsOrganismo />
    </MainTemplate>
  );
};

export default Blogs;
