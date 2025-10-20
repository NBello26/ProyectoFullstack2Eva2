// Atomo: BotonDetalles
// Se usa en DetallesProductoOrganismo para acciones de producto
// Propiedades:
// - texto: texto del botón
// - tipo: "primary", "secondary", "outline"
// - onClick: función al hacer click
import React from "react"; // Estilos de botones

export const BotonDetalles = ({ texto, tipo, onClick }) => {
  let clase = "btn ";
  if (tipo === "primary") clase += "btn-primary";
  else if (tipo === "secondary") clase += "btn-secondary";
  else clase += "btn-outline";

  return (
    <button className={clase} onClick={onClick}>
      {texto}
    </button>
  );
};
