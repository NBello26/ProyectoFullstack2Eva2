import React, { useEffect, useState } from "react";
import CardReporte from "../moleculas/CardReporte";
import { useNavigate } from "react-router-dom";
import "../../estilos/reportesOrganismo.css";

const API_URL = process.env.REACT_APP_API_URL;

const ReportesOrganismo = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [boletas, setBoletas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 🔹 Traer usuarios
        const resUsuarios = await fetch(`${API_URL}/api/usuarios`);
        if (!resUsuarios.ok) throw new Error("No se pudieron obtener los usuarios");
        const usuariosBD = await resUsuarios.json();

        // 🔹 Traer productos
        const resProductos = await fetch(`${API_URL}/api/productos`);
        if (!resProductos.ok) throw new Error("No se pudieron obtener los productos");
        const productosBD = await resProductos.json();

        // 🔹 Traer ventas/boletas
        const resBoletas = await fetch(`${API_URL}/api/ventas`);
        if (!resBoletas.ok) throw new Error("No se pudieron obtener las boletas");
        const boletasBD = await resBoletas.json();

        setUsuarios(usuariosBD);
        setProductos(productosBD);
        setBoletas(boletasBD);
        setCargando(false);
      } catch (err) {
        console.error(err);
        alert("Error cargando los reportes");
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  if (cargando) return <p className="reportesOrganismo-wrapper">Cargando reportes...</p>;

  // Total de productos (sumando la cantidad de stock si existe, sino 0)
  const totalProductos = productos.reduce((sum, p) => sum + (p.cantidad || 0), 0);

  // Total recaudado sumando el total de cada boleta
  const totalRecaudado = boletas.reduce((sum, b) => sum + (b.total || 0), 0);

  return (
    <div className="reportesOrganismo-wrapper">
      <div className="reportesOrganismo-container">
        <CardReporte
          titulo={`Compras (${boletas.length})`}
          subtitulo={`Recaudado: $${totalRecaudado.toLocaleString()}`}
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
