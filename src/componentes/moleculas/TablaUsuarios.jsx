import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton.jsx";

const TablaUsuarios = ({ usuarios }) => {
  const navigate = useNavigate();

  return (
    <table className="tabla-usuarios">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Región</th>
          <th>Comuna</th>
          <th>Tipo de Usuario</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((usuario) => (
          <tr key={usuario.id}>
            <td>{usuario.nombre}</td>
            <td>{usuario.correo}</td>
            <td>{usuario.telefono}</td>
            <td>{usuario.region}</td>
            <td>{usuario.comuna}</td>
            <td>{usuario.tipusuario}</td>
            <td>
              <Boton
                texto="Editar"
                className="btn-editar"
                onClick={() => navigate(`/editarUsuario?id=${usuario.id}`)}
              />
              {" "}
              <Boton
                texto="Historial"
                className="btn-historial"
                onClick={() => navigate(`/historialUsuario/${usuario.id}`)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaUsuarios;
