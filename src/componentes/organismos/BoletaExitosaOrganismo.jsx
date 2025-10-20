// 🧠 Organismo: BoletaExitosaOrganismo
// Muestra la boleta de compra exitosa con opción de descargar PDF

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../estilos/boletaPage.css";

const BoletaExitosaOrganismo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [boleta, setBoleta] = useState(null);

  useEffect(() => {
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActivo) {
      navigate("/");
      return;
    }

    const historial = usuarioActivo.historialCompra || [];
    const encontrada =
      historial.find((b) => b.id.toString() === id) || location.state?.boleta;

    if (!encontrada) {
      alert("No se encontró la boleta");
      navigate("/");
      return;
    }

    setBoleta(encontrada);
  }, [id, location.state, navigate]);

  const generarPDF = () => {
    if (!boleta) return;

    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text(`Boleta N°: ${boleta.id}`, 14, 20);
    doc.text(`Fecha: ${boleta.fecha}`, 14, 28);
    doc.text(`Cliente: ${boleta.usuario.nombre}`, 14, 36);
    doc.text(`Correo: ${boleta.usuario.correo}`, 14, 44);
    doc.text(`Teléfono: ${boleta.usuario.telefono}`, 14, 52);

    doc.text(
      `Dirección: ${boleta.direccion.calle} ${
        boleta.direccion.departamento || ""
      }, ${boleta.direccion.comuna}, ${boleta.direccion.region}`,
      14,
      60
    );
    if (boleta.direccion.indicaciones) {
      doc.text(`Indicaciones: ${boleta.direccion.indicaciones}`, 14, 68);
    }

    autoTable(doc, {
      startY: 78,
      head: [["Producto", "Precio", "Cantidad", "Subtotal"]],
      body: boleta.productos.map((p) => [
        p.nombre,
        `$${p.precio.toLocaleString()}`,
        p.cantidadCarrito,
        `$${(p.precio * p.cantidadCarrito).toLocaleString()}`,
      ]),
    });

    doc.text(
      `Total: $${boleta.total.toLocaleString()}`,
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`Boleta_${boleta.id}.pdf`);
  };

  if (!boleta) {
    return (
      <div className="boleta-container">
        <h2>Cargando boleta...</h2>
      </div>
    );
  }

  return (
    <div className="boleta-container">
      <h1>✅ Compra Exitosa</h1>
      <p className="boleta-numero">Pago N° {boleta.id}</p>
      <p className="boleta-fecha">Fecha: {boleta.fecha}</p>

      <h2>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> {boleta.usuario.nombre}</p>
      <p><strong>Correo:</strong> {boleta.usuario.correo}</p>
      <p><strong>Teléfono:</strong> {boleta.usuario.telefono}</p>

      <h2>Dirección de Entrega</h2>
      <p><strong>Calle:</strong> {boleta.direccion.calle}</p>
      {boleta.direccion.departamento && <p><strong>Depto/N°:</strong> {boleta.direccion.departamento}</p>}
      <p><strong>Comuna:</strong> {boleta.direccion.comuna}</p>
      <p><strong>Región:</strong> {boleta.direccion.region}</p>
      {boleta.direccion.indicaciones && (
        <p><strong>Indicaciones: </strong><em>{boleta.direccion.indicaciones}</em></p>
      )}

      <h2>Productos</h2>
      <table className="boleta-tabla">
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

      <h3>Total: ${boleta.total.toLocaleString()}</h3>

      <p className="boleta-msg-exitosa">
        🎉 Se ha realizado la compra correctamente. ¡Gracias por tu compra!
      </p>

      <div className="boleta-buttons">
        <button onClick={() => navigate("/paginaPrincipal")}>Volver al inicio</button>
        <button onClick={generarPDF}>Descargar PDF</button>
      </div>
    </div>
  );
};

export default BoletaExitosaOrganismo;
