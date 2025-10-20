// ProductosDestacados.jsx
// 🧱 Organismo: muestra los productos destacados de la tienda
// Usa la molécula ProductCard para renderizar cada producto

import React, { useEffect, useState } from "react";
import ProductCard from "../moleculas/ProductCard";
import "../../estilos/pagPrincipal.css";

const ProductosDestacados = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const productosLS = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(productosLS.slice(0, 4)); // solo primeros 4 productos
  }, []);

  return (
    <section className="featured-products" id="products">
      <div className="container">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="products-grid" id="products-container">
          {productos.length === 0 ? (
            <div className="no-products">
              <p>
                No hay productos disponibles. Agrega algunos productos desde el
                formulario de administración.
              </p>
            </div>
          ) : (
            productos.map((producto) => (
              <ProductCard key={producto.nombre} producto={producto} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductosDestacados;
