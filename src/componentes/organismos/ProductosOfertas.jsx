import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../../data/products";
import ProductoCardDetalle from "../moleculas/ProductoCardDetalle.jsx"; // usamos la card compartida
import "../../estilos/paginasProductos.css";

const ProductosOfertas = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const todos = obtenerProductos();
    const ofertas = todos.filter(p => p.tipoPrecio === "oferta");
    setProductos(ofertas);
  }, []);

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
