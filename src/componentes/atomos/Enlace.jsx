import React from "react";

const Enlace = ({ href, texto }) => (
  <a href={href} className="enlace">
    {texto}
  </a>
);

export default Enlace;
