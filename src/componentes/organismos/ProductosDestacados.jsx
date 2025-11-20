// ProductosDestacados.jsx
// 🧱 Organismo: muestra los productos destacados de la tienda
// Obtiene los productos desde la BD mediante la API backend

import React, { useEffect, useState } from "react";
import ProductCard from "../moleculas/ProductCard";
import "../../estilos/pagPrincipal.css";

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/productos");

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setProductos(data.slice(0, 4)); // Solo los primeros 4
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  if (cargando) {
    return <p className="loading">Cargando productos...</p>;
  }

  return (
    <section className="featured-products" id="products">
      <div className="container">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid" id="products-container">
          {error ? (
            <div className="no-products">
              <p>{error}</p>
            </div>
          ) : productos.length === 0 ? (
            <div className="no-products">
              <p>No hay productos disponibles.</p>
            </div>
          ) : (
            productos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductosDestacados;
