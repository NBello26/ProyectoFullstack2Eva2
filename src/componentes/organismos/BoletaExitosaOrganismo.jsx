import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../../estilos/boletaPage.css";

const BoletaExitosaOrganismo = () => {
  const { id } = useParams(); // id_venta
  const navigate = useNavigate();

  const [venta, setVenta] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [productosMap, setProductosMap] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 🔹 Traer venta
        const ventaRes = await fetch(`http://localhost:3000/api/ventas/${id}`);
        if (!ventaRes.ok) throw new Error("No se pudo obtener la venta");
        const ventaBD = await ventaRes.json();

        // 🔹 Traer detalles de la venta
        const detRes = await fetch(`http://localhost:3000/api/detalle-venta/venta/${id}`);
        if (!detRes.ok) throw new Error("No se pudo obtener los detalles de la venta");
        const detallesBD = await detRes.json();

        // 🔹 Traer productos
        const prodRes = await fetch("http://localhost:3000/api/productos");
        if (!prodRes.ok) throw new Error("No se pudo obtener los productos");
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
        navigate("/paginaPrincipal");
      }
    };

    cargarDatos();
  }, [id, navigate]);

  if (cargando) return <h2 className="boleta-container">Cargando boleta...</h2>;
  if (!venta) return <h2 className="boleta-container">No existe la venta</h2>;

  const generarPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Boleta N°: ${venta.id_venta}`, 14, 20);
    doc.text(`Cliente: ${venta.nombre_cliente}`, 14, 28);
    doc.text(`Correo: ${venta.correo}`, 14, 36);
    doc.text(`Teléfono: ${venta.telefono}`, 14, 44);
    doc.text(
      `Dirección: ${venta.calle} ${venta.departamento || ""}, ${venta.comuna}, ${venta.region}`,
      14,
      52
    );
    if (venta.indicaciones) doc.text(`Indicaciones: ${venta.indicaciones}`, 14, 60);

    autoTable(doc, {
      startY: 70,
      head: [["Producto", "Precio", "Cantidad", "Subtotal"]],
      body: detalles.map(det => {
        const prod = productosMap[det.id_producto];
        const precio = prod?.precio || 0;
        const subtotal = precio * det.cantidad;
        return [
          prod?.nombre || "Producto desconocido",
          `$${precio.toLocaleString()}`,
          det.cantidad,
          `$${subtotal.toLocaleString()}`
        ];
      })
    });

    doc.text(`Total: $${venta.total.toLocaleString()}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save(`Boleta_${venta.id_venta}.pdf`);
  };

  return (
    <div className="boleta-container">
      <h1>✅ Compra Exitosa</h1>
      <p className="boleta-numero">Boleta N° {venta.id_venta}</p>

      <h2>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> {venta.nombre_cliente}</p>
      <p><strong>Correo:</strong> {venta.correo}</p>
      <p><strong>Teléfono:</strong> {venta.telefono}</p>

      <h2>Dirección de Entrega</h2>
      <p><strong>Calle:</strong> {venta.calle}</p>
      {venta.departamento && <p><strong>Depto/N°:</strong> {venta.departamento}</p>}
      <p><strong>Comuna:</strong> {venta.comuna}</p>
      <p><strong>Región:</strong> {venta.region}</p>
      {venta.indicaciones && <p><strong>Indicaciones:</strong> {venta.indicaciones}</p>}

      <h2>Productos Comprados</h2>
      <table className="boleta-tabla">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cant.</th>
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

      <h3>Total: ${venta.total.toLocaleString()}</h3>

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
