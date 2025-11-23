import React, { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL;
const MainContactos = () => {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/contacto`);
        if (!res.ok) throw new Error("Error al obtener los contactos");
        const data = await res.json();
        setContactos(data);
      } catch (err) {
        console.error(err);
        setContactos([]);
        alert("No se pudieron cargar los contactos. Intenta más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchContactos();
  }, []);

  return (
    <main>
      <div className="acciones">
        <Link to="/admin" className="btn-back">Volver al Panel</Link>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "2em" }}>Cargando contactos...</p>
      ) : contactos.length === 0 ? (
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
            {contactos.map((c) => (
              <tr key={c.id}>
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
