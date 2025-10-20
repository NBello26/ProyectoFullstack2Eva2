// 🧱 Molecula: BotonDetallesProducto.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton.jsx";

const BotonDetallesProducto = ({ producto }) => {
  const navigate = useNavigate();
  const nombreEncode = encodeURIComponent(producto.nombre);

  const verDetalles = () => {
    navigate(`/detallesProducto/${nombreEncode}`);
  };

  return <Boton texto="Ver detalles" onClick={verDetalles} className="btn-detalles" />;
};

export default BotonDetallesProducto;
