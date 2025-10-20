import React from "react";
import { Link } from "react-router-dom";
import "../../estilos/cardReporte.css"; // CSS único

const CardReporte = ({ titulo, enlace, color, emoji }) => (
  <div className="cardReporte">
    <h2 style={{ color }}>{emoji} {titulo}</h2>
    <p>
      <Link to={enlace} className="cardReporte-link">Ver detalles</Link>
    </p>
  </div>
);

export default CardReporte;
