import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- importamos useNavigate
import CarritoItem from "../moleculas/CarritoItem";
import CarritoButton from "../atomos/CarritoButton";
import "../../estilos/carrito.css";

const CarritoOrganismo = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const navigate = useNavigate(); // <-- inicializamos navigate

  const cargarCarrito = () => {
    const activo = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!activo) {
      window.location.href = "/";
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

  const actualizarProductos = (productosActualizados) => {
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
  };

  const eliminarDelCarrito = (index) => {
    if (!usuarioActivo) return;

    const nuevoCarrito = [...carrito];
    const productoEliminado = nuevoCarrito.splice(index, 1)[0];

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const prodIndex = productos.findIndex(p => p.id === productoEliminado.id);
    if (prodIndex !== -1) {
      productos[prodIndex].cantidad += productoEliminado.cantidadCarrito || 1;
      actualizarProductos(productos);
    }

    const usuarioActualizado = { ...usuarioActivo, carrito: nuevoCarrito };
    setCarrito(nuevoCarrito);
    guardarUsuario(usuarioActualizado);

    window.dispatchEvent(new Event("storage"));
  };

  const vaciarCarrito = () => {
    if (!usuarioActivo) return;
    if (!window.confirm("¿Seguro que deseas vaciar todo el carrito?")) return;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    carrito.forEach(item => {
      const prodIndex = productos.findIndex(p => p.id === item.id);
      if (prodIndex !== -1) {
        productos[prodIndex].cantidad += item.cantidadCarrito || 1;
      }
    });
    actualizarProductos(productos);

    const usuarioActualizado = { ...usuarioActivo, carrito: [] };
    setCarrito([]);
    guardarUsuario(usuarioActualizado);

    window.dispatchEvent(new Event("storage"));
  };

  const finalizarCompra = () => {
    if (!usuarioActivo) return;

    // Redirigir a CheckoutPage
    navigate("/checkout"); // <-- aquí redirige
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
