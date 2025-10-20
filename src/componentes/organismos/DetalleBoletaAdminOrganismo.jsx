// 🧱 Organismo: DetalleBoletaAdminOrganismo
// Muestra los detalles de una boleta específica (solo lectura)
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "../../estilos/detalleBoletaAdminOrganismo.css";

const DetalleBoletaAdminOrganismo = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Buscar la boleta por id en todos los usuarios
    const todasBoletas = usuarios.flatMap(usuario =>
      (usuario.historialCompra || []).map(b => ({ ...b, nombreUsuario: usuario.nombre }))
    );

    const encontrada = todasBoletas.find(b => b.id.toString() === id) || location.state?.boleta;
    if (!encontrada) {
      alert("Boleta no encontrada");
      navigate("/listboletas");
      return;
    }

    setBoleta(encontrada);
  }, [id, location.state, navigate]);

  if (!boleta) return <p className="detalleBoletaAdminOrganismo-mensaje">Cargando boleta...</p>;

  return (
    <div className="detalleBoletaAdminOrganismo-container">
      <h1 className="detalleBoletaAdminOrganismo-titulo">Boleta N° {boleta.id}</h1>
      <p><strong>Usuario:</strong> {boleta.nombreUsuario}</p>
      <p><strong>Fecha:</strong> {boleta.fecha}</p>
      <p><strong>Estado:</strong> {boleta.estado}</p>

      <h2>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> {boleta.usuario?.nombre || "-"}</p>
      <p><strong>Correo:</strong> {boleta.usuario?.correo || "-"}</p>
      <p><strong>Teléfono:</strong> {boleta.usuario?.telefono || "-"}</p>

      <h2>Dirección de Entrega</h2>
      <p><strong>Calle:</strong> {boleta.direccion?.calle || "-"}</p>
      <p><strong>Depto/N°:</strong> {boleta.direccion?.departamento || "-"}</p>
      <p><strong>Comuna/Región:</strong> {boleta.direccion?.comuna || "-"}, {boleta.direccion?.region || "-"}</p>
      {boleta.direccion?.indicaciones && <p><strong>Indicaciones: </strong><em>{boleta.direccion.indicaciones}</em></p>}

      <h2>Productos</h2>
      {boleta.productos?.length > 0 ? (
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
            {boleta.productos.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>{p.cantidadCarrito}</td>
                <td>${(p.precio * p.cantidadCarrito).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay productos en esta boleta.</p>
      )}

      <h3>Total: ${boleta.total.toLocaleString()}</h3>

      <button
        className="detalleBoletaAdminOrganismo-btnVolver"
        onClick={() => navigate("/listboletas")}
      >
        Volver
      </button>
    </div>
  );
};

export default DetalleBoletaAdminOrganismo;
