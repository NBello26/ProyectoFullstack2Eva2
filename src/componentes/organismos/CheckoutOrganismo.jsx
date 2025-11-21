import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SelectRegionComunaCheckout from "../moleculas/SelectRegionComuna";
import "../../estilos/checkoutPage.css";

const CheckoutOrganismo = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [calle, setCalle] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [indicaciones, setIndicaciones] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
      navigate("/");
      return;
    }

    setUsuarioActivo(usuario);
    setCarrito(usuario.carrito || []);

    setNombre(usuario.nombre || "");
    setCorreo(usuario.correo || "");
    setTelefono(usuario.telefono || "");
  }, [navigate]);

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * (producto.cantidadCarrito || 1),
    0
  );

  const pagarAhora = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    try {
      //  Crear venta en backend
      const ventaBody = {
        id_cliente: usuarioActivo.id,
        total,
        nombre_cliente: nombre,
        correo,
        telefono,
        calle,
        departamento,
        region,
        comuna,
        indicaciones,
      };

      const ventaRes = await fetch("http://localhost:3000/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ventaBody),
      });

      const ventaCreada = await ventaRes.json();
      const idVenta = ventaCreada.id_venta;

      //  Crear detalle_venta por cada producto
      for (const item of carrito) {
        const detalleBody = {
          id_venta: idVenta,
          id_producto: item.id,
          cantidad: item.cantidadCarrito,
          total_producto: item.precio * item.cantidadCarrito,
        };

        await fetch("http://localhost:3000/api/detalle-venta", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(detalleBody),
        });
      }

      //  Vaciar carrito local
      const usuarioActualizado = { ...usuarioActivo, carrito: [] };
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const index = usuarios.findIndex((u) => u.id === usuarioActivo.id);
      if (index !== -1) usuarios[index] = usuarioActualizado;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      setCarrito([]);
      window.dispatchEvent(new Event("storage"));

      //  Redirigir a boleta exitosa
      navigate(`/boleta-exitosa/${idVenta}`, {
        state: {
          idVenta,
          total,
          productos: carrito,
          cliente: ventaBody,
        },
      });
    } catch (error) {
      console.error("Error al procesar compra:", error);
      alert("Error al procesar el pago.");
    }
  };

  const compraFallida = () => {
    navigate("/boleta-fallida");
  };

  return (
    <div className="checkout-container">
      <h1>Resumen de Compra</h1>

      {/* 🛒 Carrito */}
      <div className="checkout-carrito">
        <h2>Productos</h2>

        {carrito.length === 0 ? (
          <p>No hay productos en tu carrito.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((p, i) => (
                <tr key={i}>
                  <td>{p.nombre}</td>
                  <td>${p.precio.toLocaleString()}</td>
                  <td>{p.cantidadCarrito}</td>
                  <td>${(p.precio * p.cantidadCarrito).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="checkout-total">Total: ${total.toLocaleString()}</div>
      </div>

      {/* Cliente */}
      <div className="checkout-cliente">
        <h2>Datos del Cliente</h2>
        <div className="input-row">
          <label>Nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

          <label>Correo</label>
          <input value={correo} onChange={(e) => setCorreo(e.target.value)} />

          <label>Teléfono</label>
          <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
      </div>

      {/* Dirección */}
      <div className="checkout-direccion">
        <h2>Dirección de Entrega</h2>
        <div className="input-row">
          <label>Calle</label>
          <input
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
          />

          <label>Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
          />
        </div>

        <SelectRegionComunaCheckout
          region={region}
          setRegion={setRegion}
          comuna={comuna}
          setComuna={setComuna}
        />

        <label>Indicaciones</label>
        <textarea
          value={indicaciones}
          onChange={(e) => setIndicaciones(e.target.value)}
        />
      </div>

      {/* Botones */}
      <div className="checkout-buttons">
        <button
          className="checkout-btn volver-btn"
          onClick={() => navigate("/carrito")}
        >
          Volver al Carrito
        </button>

        <button className="checkout-btn pagar-btn" onClick={pagarAhora}>
          Pagar Ahora
        </button>

        <button className="checkout-btn cancelar-btn" onClick={compraFallida}>
          Compra Fallida
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrganismo;
