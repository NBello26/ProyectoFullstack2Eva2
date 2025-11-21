import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/boletasAdminPage.css";

const BoletasAdminOrganismo = () => {
  const [boletas, setBoletas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarBoletas = async () => {
      try {
        // 🔹 Traer todas las ventas desde la BD
        const res = await fetch("http://localhost:3000/api/ventas");
        if (!res.ok) throw new Error("No se pudieron obtener las boletas");
        const ventas = await res.json();
        setBoletas(ventas);
        setCargando(false);
      } catch (err) {
        console.error(err);
        alert("Error cargando las boletas");
        setCargando(false);
      }
    };

    cargarBoletas();
  }, []);

  if (cargando) return <p className="boletasAdminOrganismo-mensaje">Cargando boletas...</p>;
  if (boletas.length === 0) return <p className="boletasAdminOrganismo-mensaje">No hay boletas registradas.</p>;

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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map((boleta) => (
              <tr key={boleta.id_venta}>
                <td>{boleta.id_venta}</td>
                <td>{boleta.nombre_cliente}</td>
                <td>{new Date(boleta.createdAt).toLocaleString()}</td>
                <td>${boleta.total.toLocaleString()}</td>
                <td>
                  <button
                    className="boletasAdminOrganismo-btnVer"
                    onClick={() => navigate(`/detalleBoleta/${boleta.id_venta}`)}
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
