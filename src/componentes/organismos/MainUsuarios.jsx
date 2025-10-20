import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Link para navegación simple
import TablaUsuarios from "../moleculas/TablaUsuarios.jsx";

const MainUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(data);
  }, []);

  // Función para redirigir a la edición del usuario
  const handleEditar = (index) => {
    // Igual que RegistroUserAdmin, se mantiene simple
    window.location.href = `/editarUsuario?index=${index}`;
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
