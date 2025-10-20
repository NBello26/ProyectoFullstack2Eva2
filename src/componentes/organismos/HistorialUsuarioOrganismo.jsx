import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../estilos/historialUsuarioPage.css";

const HistorialUsuarioOrganismo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find((u) => u.id.toString() === id);
    if (!usuarioEncontrado) {
      alert("Usuario no encontrado");
      navigate("/listusuarios");
      return;
    }
    setUsuario(usuarioEncontrado);
  }, [id, navigate]);

  if (!usuario) return <p>Cargando historial...</p>;

  const historial = usuario.historialCompra || [];

  return (
    <div className="historial-container">
      <h1>Historial de Compras de {usuario.nombre}</h1>

      {historial.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <table className="tabla-historial">
          <thead>
            <tr>
              <th>Boleta N°</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((boleta) => (
              <tr key={boleta.id}>
                <td>{boleta.id}</td>
                <td>{boleta.fecha}</td>
                <td>${boleta.total.toLocaleString()}</td>
                <td>{boleta.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="historial-btn-container">
        <button
          className="historial-btn-volver"
          onClick={() => navigate("/listusuarios")}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default HistorialUsuarioOrganismo;
