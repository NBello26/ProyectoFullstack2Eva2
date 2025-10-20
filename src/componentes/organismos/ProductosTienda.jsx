import React, { useEffect, useState } from "react";
import ProductoTienda from "../moleculas/ProductoTienda";
import "../../estilos/tiendaProductos.css"; // ✅ nuevo CSS

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosLS = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosLS);
  }, []);

  if (productos.length === 0) {
    return <div className="tienda-vacio">No hay productos registrados.</div>;
  }

  return (
    <section className="tienda-grid">
      {productos.map((producto) => (
        <ProductoTienda key={producto.id} producto={producto} />
      ))}
    </section>
  );
};

export default ProductosTienda;
