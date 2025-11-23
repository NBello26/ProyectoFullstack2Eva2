import React, { useEffect, useState } from "react";
import ProductoCardDetalle from "../moleculas/ProductoCardDetalle.jsx"; // card compartida
import "../../estilos/paginasProductos.css";
const API_URL = process.env.REACT_APP_API_URL;
const ProductosPorCategoria = () => {
  const [categoria, setCategoria] = useState("Snacks");
  const [productos, setProductos] = useState([]);
  const [todosProductos, setTodosProductos] = useState([]);

  // Traer todos los productos desde la BD al cargar la página
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API_URL}/api/productos`);
        if (!res.ok) throw new Error("Error al obtener productos");
        const data = await res.json();
        setTodosProductos(data);
      } catch (err) {
        console.error(err);
        setTodosProductos([]);
      }
    };
    fetchProductos();
  }, []);

  // Filtrar productos por categoría cada vez que cambie
  useEffect(() => {
    const filtrados = todosProductos.filter(p => p.categoria === categoria);
    setProductos(filtrados);
  }, [categoria, todosProductos]);

  return (
    <div className="organismo-categoria">
      <h2>Buscar por Categoría</h2>
      <select value={categoria} onChange={e => setCategoria(e.target.value)}>
        <option value="Snacks">Snacks</option>
        <option value="Bebidas">Bebidas</option>
        <option value="Golosinas">Golosinas</option>
        <option value="Dulces">Dulces</option>
      </select>

      {productos.length === 0 ? (
        <p className="tienda-vacio">No hay productos en la categoría "{categoria}".</p>
      ) : (
        <div className="productos-grid-categoria">
          {productos.map(p => (
            <ProductoCardDetalle key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosPorCategoria;
