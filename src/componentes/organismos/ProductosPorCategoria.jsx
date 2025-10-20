import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../../data/products";
import ProductoCardDetalle from "../moleculas/ProductoCardDetalle.jsx"; // usamos la misma card
import "../../estilos/paginasProductos.css";

const ProductosPorCategoria = () => {
  const [categoria, setCategoria] = useState("Snacks");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const todos = obtenerProductos();
    const filtrados = todos.filter(p => p.categoria === categoria);
    setProductos(filtrados);
  }, [categoria]);

  return (
    <div className="organismo-categoria">
      <h2>Buscar por Categoría</h2>
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="Snacks">Snacks</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Golosinas">Golosinas</option>
        <option value="Dulces">Dulces</option>
      </select>

      <div className="productos-grid-categoria">
        {productos.map(p => (
          <ProductoCardDetalle key={p.id} producto={p} />
        ))}
      </div>
    </div>
  );
};

export default ProductosPorCategoria;
