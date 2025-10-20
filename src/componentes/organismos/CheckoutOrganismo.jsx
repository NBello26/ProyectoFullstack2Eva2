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

  // 🧩 Carga inicial de usuario y carrito
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
      navigate("/");
      return;
    }

    setUsuarioActivo(usuario);
    setCarrito(usuario.carrito || []);

    // precarga de datos del usuario
    setNombre(usuario.nombre || "");
    setCorreo(usuario.correo || "");
    setTelefono(usuario.telefono || "");
  }, [navigate]);

  // 🧮 Total del carrito
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * (producto.cantidadCarrito || 1),
    0
  );

  // 🧾 Genera una boleta con estado (exitosa/fallida)
  const generarBoleta = (estado) => {
    return {
      id: Date.now(),
      fecha: new Date().toLocaleString(),
      estado,
      usuario: { nombre, correo, telefono },
      direccion: { calle, departamento, region, comuna, indicaciones },
      productos: carrito,
      total,
    };
  };

  // ✅ Compra exitosa
  const pagarAhora = () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const boleta = generarBoleta("exitosa");

    // Actualizar usuario con historial y carrito vacío
    const usuarioActualizado = {
      ...usuarioActivo,
      carrito: [],
      historialCompra: [...(usuarioActivo.historialCompra || []), boleta],
    };

    // Guardar usuario activo y en lista de usuarios
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex((u) => u.id === usuarioActivo.id);
    if (index !== -1) usuarios[index] = usuarioActualizado;
    else usuarios.push(usuarioActualizado);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Limpiar carrito visualmente
    setCarrito([]);
    window.dispatchEvent(new Event("storage"));

    // 🔹 Redirigir a página de boleta exitosa
    navigate(`/boleta-exitosa/${boleta.id}`, { state: { boleta } });
  };

  // ❌ Compra fallida (no guarda ni vacía carrito)
  const compraFallida = () => {
    const boleta = generarBoleta("fallida");
    // 🔹 Redirigir a página de boleta fallida
    navigate(`/boleta-fallida/${boleta.id}`, { state: { boleta } });
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

      {/* 👤 Datos del cliente */}
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

      {/* 📦 Dirección */}
      <div className="checkout-direccion">
        <h2>Dirección de Entrega</h2>
        <div className="input-row">
          <label>Calle</label>
          <input
            type="text"
            value={calle}
            onChange={(e) => setCalle(e.target.value)}
            placeholder="Calle"
          />
          <label>Departamento</label>
          <input
            type="text"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            placeholder="Depto / N°"
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
          placeholder="Indicaciones para la entrega"
        />
      </div>

      {/* 🔘 Botones */}
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
