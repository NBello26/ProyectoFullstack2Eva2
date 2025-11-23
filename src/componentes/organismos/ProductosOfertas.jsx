import React, { useEffect, useState } from "react";
import ProductoCardDetalle from "../moleculas/ProductoCardDetalle.jsx"; // card compartida
import "../../estilos/paginasProductos.css";
const API_URL = process.env.REACT_APP_API_URL;
const ProductosOfertas = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        const ofertas = data.filter(p => p.tipoPrecio === "oferta");
        setProductos(ofertas);
      } catch (err) {
        console.error(err);
        setProductos([]);
      }
    };

    fetchProductos();
  }, []);

  if (productos.length === 0) {
    return <div className="tienda-vacio">No hay productos en oferta.</div>;
  }

  return (
    <div className="organismo-ofertas">
      <h2>Productos en Oferta</h2>
      <div className="productos-grid-ofertas">
        {productos.map(p => (
          <ProductoCardDetalle key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductosOfertas;
