// BlogCard.jsx
// 🧱 Molécula: representa una tarjeta de blog/noticia
// 🔹 Reutiliza átomo Boton para el botón "Ver Caso"
// Recibe título, texto y un callback para el botón

import React from "react";
import Boton from "../atomos/Boton"; // ✅ reutilizamos átomo

const BlogCard = ({ titulo, texto, onClick }) => {
  return (
    <div className="blog-card">
      <div className="blog-info">
        <h2>{titulo}</h2>
        <p>{texto}</p>
        <Boton texto="Ver Caso" onClick={onClick} />
      </div>
      <div className="blog-img">Imagen</div>
    </div>
  );
};

export default BlogCard;
