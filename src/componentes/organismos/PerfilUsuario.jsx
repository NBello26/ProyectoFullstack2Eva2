import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/perfilAdminPage.css";


const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      alert("No hay usuario logeado");
      navigate("/");
      return;
    }
    setUsuario(usuarioActivo);
  }, [navigate]);

  if (!usuario) return <p className="perfilAdminOrganismo-mensaje">Cargando datos del usuario...</p>;

  return (
    <>
      <div className="perfilAdminOrganismo-container">
        <h1 className="perfilAdminOrganismo-titulo">Perfil de {usuario.nombre}</h1>

        <div className="perfilAdminOrganismo-datos">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p><strong>Teléfono:</strong> {usuario.telefono}</p>
          <p><strong>Región:</strong> {usuario.region}</p>
          <p><strong>Comuna:</strong> {usuario.comuna}</p>
          <p><strong>Tipo de usuario:</strong> {usuario.tipusuario}</p>
        </div>
      </div>
    </>
  );
};

export default PerfilUsuario;
