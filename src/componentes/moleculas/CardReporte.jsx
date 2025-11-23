import React from "react";
import { Link } from "react-router-dom";
import "../../estilos/cardReporte.css"; // CSS único

const CardReporte = ({ titulo, subtitulo, subtituloClass, enlace, color, emoji }) => (
  <div className="cardReporte">
    <h2 style={{ color }}>{emoji} {titulo}</h2>
    {subtitulo && <p className={`cardReporte-subtitulo ${subtituloClass || ''}`}>{subtitulo}</p>}
    <p>
      <Link to={enlace} className="cardReporte-link">Ver detalles</Link>
    </p>
  </div>
);


export default CardReporte;