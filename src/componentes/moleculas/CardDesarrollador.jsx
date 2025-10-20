// CardDesarrollador.jsx
// 🧪 Molécula: representa la tarjeta de un desarrollador con nombre, rol, botón y texto extra
// Se reutiliza en el organismo Nosotros

import React, { useState } from "react";

const CardDesarrollador = ({ nombre, rol, infoExtra }) => {
  const [visible, setVisible] = useState(false);

  const toggleInfo = () => setVisible(!visible);

  return (
    <div className="card">
      <h3>{nombre}</h3>
      <p>{rol}</p>
      <button onClick={toggleInfo}>Ver más</button>
      {visible && <p className="extra">{infoExtra}</p>}
    </div>
  );
};

export default CardDesarrollador;
