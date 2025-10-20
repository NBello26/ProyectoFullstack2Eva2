// 🧱 Organismo: BoletasAdminOrganismo
// Muestra todas las boletas de todos los usuarios en una tabla compacta

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/boletasAdminPage.css";

const BoletasAdminOrganismo = () => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(listaUsuarios);
  }, []);

  // Obtener todas las boletas de todos los usuarios
  const todasBoletas = usuarios.flatMap(usuario =>
    (usuario.historialCompra || []).map(boleta => ({
      ...boleta,
      nombreUsuario: usuario.nombre
    }))
  );

  if (todasBoletas.length === 0) {
    return <p className="boletasAdminOrganismo-mensaje">No hay boletas registradas.</p>;
  }

  return (
    <div className="boletasAdminOrganismo-wrapper">
      <div className="boletasAdminOrganismo-container">
        <h1 className="boletasAdminOrganismo-titulo">Boletas de todos los usuarios</h1>
        <table className="boletasAdminOrganismo-tabla">
          <thead>
            <tr>
              <th>Boleta N°</th>
              <th>Usuario</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {todasBoletas.map(boleta => (
              <tr key={boleta.id}>
                <td>{boleta.id}</td>
                <td>{boleta.nombreUsuario}</td>
                <td>{boleta.fecha}</td>
                <td>${boleta.total.toLocaleString()}</td>
                <td>{boleta.estado}</td>
                <td>
                  <button
                    className="boletasAdminOrganismo-btnVer"
                    onClick={() => navigate(`/detalleBoleta/${boleta.id}`, { state: { boleta } })}
                  >
                    Ver Boleta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Botón volver */}
        <button
          className="boletasAdminOrganismo-btnVolver"
          onClick={() => navigate("/admin")}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default BoletasAdminOrganismo;
