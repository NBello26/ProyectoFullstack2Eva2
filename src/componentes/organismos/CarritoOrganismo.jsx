import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarritoItem from "../moleculas/CarritoItem";
import CarritoButton from "../atomos/CarritoButton";
import "../../estilos/carrito.css";
const API_URL = process.env.REACT_APP_API_URL;
const CarritoOrganismo = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const navigate = useNavigate();

  const cargarCarrito = () => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo) {
      navigate("/");
      return;
    }
    setUsuarioActivo(activo);
    setCarrito(activo.carrito || []);
  };

  useEffect(() => {
    cargarCarrito();
  }, []);

  const guardarUsuario = (usuarioActualizado) => {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActualizado));
    setUsuarioActivo(usuarioActualizado);

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const index = usuarios.findIndex(u => u.id === usuarioActualizado.id);
    if (index !== -1) {
      usuarios[index] = usuarioActualizado;
    } else {
      usuarios.push(usuarioActualizado);
    }
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  const devolverStock = async (producto, cantidad) => {
    try {
      // Obtener el producto actual desde la BD
      const res = await fetch(`${API_URL}/api/productos/${producto.id}`);
      if (!res.ok) throw new Error("Producto no encontrado");
      const productoBD = await res.json();

      // Actualizar stock sumando la cantidad devuelta
      await fetch(`${API_URL}/api/productos/${producto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...productoBD, cantidad: productoBD.cantidad + cantidad }),
      });
    } catch (err) {
      console.error("Error al devolver stock:", err);
      alert("No se pudo actualizar el stock del producto.");
    }
  };

  const eliminarDelCarrito = async (index) => {
    if (!usuarioActivo) return;

    const nuevoCarrito = [...carrito];
    const productoEliminado = nuevoCarrito.splice(index, 1)[0];

    // Devolver la cantidad correspondiente al stock en la BD
    await devolverStock(productoEliminado, productoEliminado.cantidadCarrito || 1);

    const usuarioActualizado = { ...usuarioActivo, carrito: nuevoCarrito };
    setCarrito(nuevoCarrito);
    guardarUsuario(usuarioActualizado);

    window.dispatchEvent(new Event("storage"));
  };

  const vaciarCarrito = async () => {
    if (!usuarioActivo) return;
    if (!window.confirm("¿Seguro que deseas vaciar todo el carrito?")) return;

    // Devolver stock de todos los productos del carrito
    for (const item of carrito) {
      await devolverStock(item, item.cantidadCarrito || 1);
    }

    const usuarioActualizado = { ...usuarioActivo, carrito: [] };
    setCarrito([]);
    guardarUsuario(usuarioActualizado);

    window.dispatchEvent(new Event("storage"));
  };

  const finalizarCompra = () => {
    if (!usuarioActivo) return;
    navigate("/checkout");
  };

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * (producto.cantidadCarrito || 1),
    0
  );

  return (
    <div className="carrito-container">
      <h1>Tu Carrito de Compras</h1>

      {carrito.length === 0 ? (
        <div className="carrito-mensaje-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>No hay productos en tu carrito de compras.</p>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto, index) => (
                <CarritoItem
                  key={index}
                  producto={producto}
                  index={index}
                  eliminar={eliminarDelCarrito}
                />
              ))}
            </tbody>
          </table>

          <div className="carrito-total">Total: ${total.toLocaleString()}</div>

          <CarritoButton tipo="success" texto="Finalizar Compra" onClick={finalizarCompra} />
          <CarritoButton tipo="vaciar" texto="Vaciar Carrito" onClick={vaciarCarrito} />
        </div>
      )}
    </div>
  );
};

export default CarritoOrganismo;
