import React from "react";

const Boton = ({ texto, onClick, className }) => (
  <button className={className} onClick={onClick}>
    {texto}
  </button>
);

export default Boton;