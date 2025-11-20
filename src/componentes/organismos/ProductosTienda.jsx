import React, { useEffect, useState } from "react";
import ProductoTienda from "../moleculas/ProductoTienda";
import "../../estilos/tiendaProductos.css";

const ProductosTienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Traer productos desde la BD
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/productos");
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setProductos(data);
      } catch (err) {
        console.error(err);
        setProductos([]);
      }
    };

    fetchProductos();
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
