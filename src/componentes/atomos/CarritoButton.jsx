// src/componentes/atomos/CarritoButton.jsx
// 🔹 Átomo: Botón
// Componente reutilizable para botones de acción en el carrito
// Recibe tipo (success, danger, vaciar), texto y onClick
import React from "react";

const CarritoButton = ({ tipo, texto, onClick }) => {
  const clases = {
    success: "carrito-btn carrito-btn-success",
    danger: "carrito-btn carrito-btn-danger",
    vaciar: "carrito-btn carrito-vaciar",
  };
  return (
    <button className={clases[tipo] || "carrito-btn"} onClick={onClick}>
      {texto}
    </button>
  );
};

export default CarritoButton;
