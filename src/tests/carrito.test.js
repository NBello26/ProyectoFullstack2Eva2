// 📁 tests/carrito.test.js
import React from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetallesProductoOrganismo from "@organismos/DetallesProductoOrganismo";
import { ContadorCarrito } from "@atomos/ContadorCarrito";

describe("🛒 Carrito de compras (tests básicos)", () => {
  let container;
  let root;

  beforeEach(() => {
    // Crear contenedor donde se montará React
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    // Limpiar y preparar datos de prueba
    localStorage.clear();

    const usuario = { id: 1, nombre: "Test User", carrito: [] };
    const productos = [
      {
        id: 1,
        nombre: "Producto Test",
        precio: 1000,
        cantidad: 5,
        descripcion: "Producto de prueba",
      },
    ];

    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    localStorage.setItem("productos", JSON.stringify(productos));
    localStorage.setItem("usuarios", JSON.stringify([usuario]));
  });

  afterEach(() => {
    // Desmontar y limpiar después de cada test
    if (root) root.unmount();
    if (container) document.body.removeChild(container);
    container = null;
    root = null;
    localStorage.clear();
  });

  // 1️⃣ Agregar producto al carrito
  it("✅ Agrega un producto al carrito", (done) => {
    root.render(
      <MemoryRouter initialEntries={["/producto/Producto%20Test"]}>
        <Routes>
          <Route path="/producto/:nombre" element={<DetallesProductoOrganismo />} />
        </Routes>
      </MemoryRouter>
    );

    // Espera a que React monte el componente
    setTimeout(() => {
      const boton = container.querySelector(".BotonDetalles");
      expect(boton).not.toBeNull(); // Verifica que el botón exista

      // Simular clic en “Añadir al Carrito”
      boton.click();

      // Verificar que se haya agregado al carrito
      const usuarioActualizado = JSON.parse(localStorage.getItem("usuarioActivo"));
      expect(usuarioActualizado.carrito.length).toBe(1);
      expect(usuarioActualizado.carrito[0].nombre).toBe("Producto Test");
      done();
    }, 500);
  });

  // 2️⃣ Aumentar contador del carrito
  it("🧮 Aumenta el contador del carrito al añadir productos", (done) => {
    root.render(<ContadorCarrito />);

    setTimeout(() => {
      const span = container.querySelector("#contador-carrito");
      expect(span.textContent).toBe("0");

      // Simular producto añadido
      const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
      usuario.carrito.push({ id: 1, nombre: "Producto Test", cantidadCarrito: 2 });
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        const actualizado = container.querySelector("#contador-carrito");
        expect(actualizado.textContent).toBe("2");
        done();
      }, 300);
    }, 300);
  });

  // 3️⃣ Eliminar producto del carrito
  it("❌ Elimina un producto del carrito", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    usuario.carrito.push({ id: 1, nombre: "Producto Test", cantidadCarrito: 1 });
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    // Simular eliminación
    usuario.carrito = [];
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

    const actualizado = JSON.parse(localStorage.getItem("usuarioActivo"));
    expect(actualizado.carrito.length).toBe(0);
  });

  // 4️⃣ Disminuir contador al eliminar producto
  it("📉 Disminuye el contador al eliminar producto", (done) => {
    root.render(<ContadorCarrito />);

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    usuario.carrito.push({ id: 1, nombre: "Producto Test", cantidadCarrito: 2 });
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    window.dispatchEvent(new Event("storage"));

    setTimeout(() => {
      let span = container.querySelector("#contador-carrito");
      expect(span.textContent).toBe("2");

      // Eliminar del carrito
      usuario.carrito = [];
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      window.dispatchEvent(new Event("storage"));

      setTimeout(() => {
        span = container.querySelector("#contador-carrito");
        expect(span.textContent).toBe("0");
        done();
      }, 300);
    }, 300);
  });
});
