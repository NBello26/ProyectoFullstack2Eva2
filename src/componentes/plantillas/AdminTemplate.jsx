import React, { useEffect } from "react";
import Titulo from "../atomos/Titulo";
import { useNavigate } from "react-router-dom";
import "../../estilos/headerAdmin.css";

const AdminTemplate = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
      if (!usuarioActivo || usuarioActivo.tipusuario !== "admin") {
        // Redirige a página principal si no es admin
        navigate("/paginaPrincipal");
      }
    } catch (error) {
      console.error("Error verificando usuario activo:", error);
      navigate("/paginaPrincipal");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/"); // redirige al login
  };

  return (
    <>
      <header className="admin-header">
        <Titulo texto="Panel de Administración" />
        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      {children}
    </>
  );
};

export default AdminTemplate;
