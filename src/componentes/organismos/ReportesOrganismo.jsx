import React, { useEffect, useState } from "react";
import CardReporte from "../moleculas/CardReporte";
import { useNavigate } from "react-router-dom";
import "../../estilos/reportesOrganismo.css";

const ReportesOrganismo = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const listaUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
    const todasBoletas = listaUsuarios.flatMap(u => u.historialCompra || []);

    setUsuarios(listaUsuarios);
    setProductos(listaProductos);
    setBoletas(todasBoletas);
  }, []);

  const totalProductos = productos.reduce((sum, p) => sum + (p.cantidad || 0), 0);

  return (
    <div className="reportesOrganismo-wrapper">
      <div className="reportesOrganismo-container">
        <CardReporte
          titulo={`Compras (${boletas.length})`}
          enlace="/listboletas"
          color="#3498db"
          emoji="🎉"
        />
        <CardReporte
          titulo={`Productos (${totalProductos})`}
          enlace="/listproductos"
          color="#27ae60"
          emoji="🛒"
        />
        <CardReporte
          titulo={`Usuarios (${usuarios.length})`}
          enlace="/listusuarios"
          color="#f1c40f"
          emoji="👥"
        />
      </div>

      <div className="reportesOrganismo-buttons">
        <button
          className="reportesOrganismo-btnVolver"
          onClick={() => navigate("/admin")}
        >
          Volver al Panel
        </button>
      </div>
    </div>
  );
};

export default ReportesOrganismo;
