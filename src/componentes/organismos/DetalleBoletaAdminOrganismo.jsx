import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../estilos/detalleBoletaAdminOrganismo.css";

const DetalleBoletaAdminOrganismo = () => {
  const { id } = useParams(); // id_venta
  const navigate = useNavigate();
  const [venta, setVenta] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [productosMap, setProductosMap] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarBoleta = async () => {
      try {
        // 🔹 Traer venta
        const ventaRes = await fetch(`http://localhost:3000/api/ventas/${id}`);
        if (!ventaRes.ok) throw new Error("No se pudo obtener la venta");
        const ventaBD = await ventaRes.json();

        // 🔹 Traer detalles de la venta
        const detRes = await fetch(`http://localhost:3000/api/detalle-venta/venta/${id}`);
        if (!detRes.ok) throw new Error("No se pudieron obtener los detalles");
        const detallesBD = await detRes.json();

        // 🔹 Traer todos los productos
        const prodRes = await fetch("http://localhost:3000/api/productos");
        if (!prodRes.ok) throw new Error("No se pudieron obtener los productos");
        const productosBD = await prodRes.json();

        // 🔹 Mapear productos por id
        const mapa = {};
        productosBD.forEach(p => (mapa[p.id] = p));

        setVenta(ventaBD);
        setDetalles(detallesBD);
        setProductosMap(mapa);
        setCargando(false);
      } catch (err) {
        console.error(err);
        alert("Error cargando la boleta");
        navigate("/listusuarios");
      }
    };

    cargarBoleta();
  }, [id, navigate]);

  if (cargando) return <p className="detalleBoletaAdminOrganismo-mensaje">Cargando boleta...</p>;
  if (!venta) return <p className="detalleBoletaAdminOrganismo-mensaje">Boleta no encontrada</p>;

  return (
    <div className="detalleBoletaAdminOrganismo-container">
      <h1 className="detalleBoletaAdminOrganismo-titulo">Boleta N° {venta.id_venta}</h1>
      <p><strong>Nombre Cliente:</strong> {venta.nombre_cliente}</p>
      <p><strong>Correo:</strong> {venta.correo}</p>
      <p><strong>Teléfono:</strong> {venta.telefono}</p>
      <p><strong>Fecha:</strong> {new Date(venta.createdAt).toLocaleString()}</p>

      <h2>Dirección de Entrega</h2>
      <p><strong>Calle:</strong> {venta.calle}</p>
      <p><strong>Depto/N°:</strong> {venta.departamento || "-"}</p>
      <p><strong>Comuna/Región:</strong> {venta.comuna}, {venta.region}</p>
      {venta.indicaciones && <p><strong>Indicaciones:</strong> {venta.indicaciones}</p>}

      <h2>Productos</h2>
      {detalles.length > 0 ? (
        <table className="detalleBoletaAdminOrganismo-tabla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {detalles.map((det, i) => {
              const prod = productosMap[det.id_producto];
              const precio = prod?.precio || 0;
              const subtotal = precio * det.cantidad;
              return (
                <tr key={i}>
                  <td>{prod?.nombre || "Producto desconocido"}</td>
                  <td>${precio.toLocaleString()}</td>
                  <td>{det.cantidad}</td>
                  <td>${subtotal.toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No hay productos en esta boleta.</p>
      )}

      <h3>Total: ${venta.total.toLocaleString()}</h3>

      <button
        className="detalleBoletaAdminOrganismo-btnVolver"
        onClick={() => navigate("/historialUsuario/" + venta.id_cliente)}
      >
        Volver
      </button>
    </div>
  );
};

export default DetalleBoletaAdminOrganismo;
