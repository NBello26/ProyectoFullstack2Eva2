import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../estilos/historialUsuarioPage.css";

const HistorialUsuarioOrganismo = () => {
  const { id } = useParams(); // id del usuario
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        // 🔹 Traer todas las ventas del usuario
        const res = await fetch(`http://localhost:3000/api/ventas`);
        if (!res.ok) throw new Error("No se pudieron obtener las ventas");
        const todasVentas = await res.json();

        // Filtrar por usuario
        const ventasUsuario = todasVentas.filter(v => v.id_cliente.toString() === id);

        setVentas(ventasUsuario);
        setCargando(false);
      } catch (err) {
        console.error(err);
        alert("Error cargando historial");
        navigate("/listusuarios");
      }
    };

    cargarHistorial();
  }, [id, navigate]);

  if (cargando) return <p>Cargando historial...</p>;

  return (
    <div className="historial-container">
      <h1>Historial de Compras del Usuario</h1>

      {ventas.length === 0 ? (
        <p>No hay compras registradas.</p>
      ) : (
        <table className="tabla-historial">
          <thead>
            <tr>
              <th>Boleta N°</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta) => (
              <tr key={venta.id_venta}>
                <td>{venta.id_venta}</td>
                <td>{new Date(venta.createdAt).toLocaleString()}</td>
                <td>${venta.total.toLocaleString()}</td>
                <td>
                  <button
                    className="historial-btn-ver"
                    onClick={() =>
                      navigate(`/detalleBoleta/${venta.id_venta}`)
                    }
                  >
                    Ver Boleta
                  </button>
                </td>
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
