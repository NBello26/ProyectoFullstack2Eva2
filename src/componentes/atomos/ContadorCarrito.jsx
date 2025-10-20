import React, { useEffect, useState } from "react";

export const ContadorCarrito = () => {
  const [cantidad, setCantidad] = useState(0);

  const actualizarContadorCarrito = () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || !usuario.carrito) {
      setCantidad(0);
      return;
    }

    const totalItems = usuario.carrito.reduce(
      (total, producto) => total + (producto.cantidadCarrito || 1),
      0
    );

    setCantidad(totalItems);
  };

  useEffect(() => {
    actualizarContadorCarrito();

    // Escuchar cambios en localStorage desde otras pestañas o ventanas
    const handleStorageChange = () => actualizarContadorCarrito();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return <span id="contador-carrito">{cantidad}</span>;
};
