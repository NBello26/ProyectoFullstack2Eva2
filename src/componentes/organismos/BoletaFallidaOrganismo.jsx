import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../estilos/boletaPage.css";

const BoletaFallidaOrganismo = () => {
  const navigate = useNavigate();
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
      alert("No hay usuario logeado");
      navigate("/paginaPrincipal");
      return;
    }
    setUsuarioActivo(usuario);
    setProductos(usuario.carrito || []);
  }, [navigate]);

  if (!usuarioActivo) {
    return <h2 className="boleta-container">Cargando datos del usuario...</h2>;
  }

  const direccion = {
    calle: usuarioActivo.calle || "No disponible",
    departamento: usuarioActivo.departamento || "No disponible",
    comuna: usuarioActivo.comuna || "No disponible",
    region: usuarioActivo.region || "No disponible",
  };

  const total = productos.reduce(
    (acc, p) => acc + p.precio * (p.cantidadCarrito || 1),
    0
  );

  return (
    <div className="boleta-container">
      <h1>❌ Compra Fallida</h1>
      <p>⚠️ No se ha podido realizar el pago. Intenta nuevamente más tarde.</p>

      <h2>Datos del Cliente</h2>
      <p><strong>Nombre:</strong> {usuarioActivo.nombre}</p>
      <p><strong>Correo:</strong> {usuarioActivo.correo}</p>
      <p><strong>Teléfono:</strong> {usuarioActivo.telefono}</p>

      <h2>Dirección de Entrega</h2>
      <p><strong>Calle:</strong> {direccion.calle}</p>
      <p><strong>Departamento:</strong> {direccion.departamento}</p>
      <p><strong>Comuna:</strong> {direccion.comuna}</p>
      <p><strong>Región:</strong> {direccion.region}</p>

      <h2>Productos en Carrito</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr key={i}>
                <td>{p.nombre}</td>
                <td>{p.cantidadCarrito || 1}</td>
                <td>${p.precio.toLocaleString()}</td>
                <td>${(p.precio * (p.cantidadCarrito || 1)).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3>Total: ${total.toLocaleString()}</h3>

      <div className="botones-boleta">
        <button onClick={() => navigate("/carrito")}>Volver al carrito</button>
        <button onClick={() => navigate("/paginaPrincipal")}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default BoletaFallidaOrganismo;
