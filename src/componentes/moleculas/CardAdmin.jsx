import React from 'react';
import { Link } from 'react-router-dom';
import "../../estilos/mainAdmin.css";
const CardAdmin = ({ titulo, enlace, texto }) => (
  <div className="cardAdmin">
    <h2>{titulo}</h2>
    <p>
      <Link to={enlace}>{texto}</Link>
    </p>
  </div>
);

export default CardAdmin;
