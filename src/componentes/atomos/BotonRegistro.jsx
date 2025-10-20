import React from "react";

const BotonRegistro = ({ texto, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {texto}
  </button>
);

export default BotonRegistro;