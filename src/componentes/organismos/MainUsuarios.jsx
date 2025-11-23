import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TablaUsuarios from "../moleculas/TablaUsuarios.jsx";
const API_URL = process.env.REACT_APP_API_URL;
const MainUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/usuarios`);
        if (!resp.ok) throw new Error("Error al obtener usuarios");

        const data = await resp.json();
        setUsuarios(data); // Guardar en estado lo que viene del backend
      } catch (error) {
        console.error("Error cargando usuarios:", error);
        alert("No se pudieron cargar los usuarios desde el servidor.");
      }
    };

    fetchUsuarios();
  }, []);

  // 👉 Mantengo la misma lógica que usabas
  const handleEditar = (id) => {
    window.location.href = `/editarUsuario?id=${id}`;
  };

  return (
    <main>
      {/* Botones de acción */}
      <div className="acciones">
        <Link to="/registroUserAdmin" className="boton-nuevo">
          + Nuevo usuario
        </Link>
        <Link to="/admin" className="btn-back">
          Volver al Panel
        </Link>
      </div>

      {/* Tabla de usuarios */}
      <TablaUsuarios usuarios={usuarios} onEditar={handleEditar} />
    </main>
  );
};

export default MainUsuarios;
