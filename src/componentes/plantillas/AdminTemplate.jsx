import React from "react";
import Titulo from "../atomos/Titulo";
import { useNavigate } from "react-router-dom";
import "../../estilos/headerAdmin.css";

const AdminTemplate = ({ children }) => {
  const navigate = useNavigate();

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
