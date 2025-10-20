/*
  Organismo: MainContactos
  - Se encarga de mostrar la tabla de contactos
  - Reutiliza estilos de usuario.css
  - No necesita nuevos átomos/moléculas porque solo se muestra info
  - Maneja localStorage para obtener contactos
*/

import React, { useEffect, useState } from "react";

const MainContactos = () => {
  const [contactos, setContactos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("contactos")) || [];
    setContactos(data);
  }, []);

  return (
    <main>
      <div className="acciones">
        <a href="/admin" className="btn-back">Volver al Panel</a>
      </div>

      {contactos.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "2em" }}>
          No hay contactos guardados.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c, i) => (
              <tr key={i}>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>{c.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
};

export default MainContactos;
