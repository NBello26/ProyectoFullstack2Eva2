import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearProducto, obtenerProductos } from "../../data/products";

const FormRegistroProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("Snacks");
  const [tipoPrecio, setTipoPrecio] = useState("normal");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (nombre.trim() === "") {
      alert("El nombre del producto es obligatorio.");
      return;
    }

    const precioNum = parseInt(precio);
    if (isNaN(precioNum) || precioNum < 0) {
      alert("El precio debe ser un número entero válido mayor o igual a 0.");
      return;
    }

    if (descripcion.trim() === "") {
      alert("La descripción es obligatoria.");
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (isNaN(cantidadNum) || cantidadNum < 0) {
      alert("La cantidad debe ser un número válido mayor o igual a 0.");
      return;
    }

    // Calcular el ID siguiente
    const productos = obtenerProductos();
    const nextId = productos.length > 0
      ? Math.max(...productos.map((p) => p.id)) + 1
      : 1;

    // Crear objeto producto
    const producto = {
      id: nextId,
      nombre,
      precio: precioNum, // 🔹 siempre entero
      descripcion,
      cantidad: cantidadNum,
      categoria,
      tipoPrecio,
    };

    // Guardar producto
    crearProducto(producto);

    alert("Producto registrado correctamente");

    // Limpiar formulario
    setNombre("");
    setPrecio("");
    setDescripcion("");
    setCantidad("");
    setCategoria("Snacks");
    setTipoPrecio("normal");
  };

  return (
    <div className="form-container">
      <h2>Registro de Producto (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <div className="single">
          <label>Nombre del Producto</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="single">
          <label>Precio</label>
          <input
            type="number"
            min="0"
            step="1" // 🔹 Solo números enteros
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="single">
          <label>Tipo Precio</label>
          <select
            value={tipoPrecio}
            onChange={(e) => setTipoPrecio(e.target.value)}
          >
            <option value="normal">Normal</option>
            <option value="oferta">Oferta</option>
          </select>
        </div>

        <div className="single">
          <label>Descripción</label>
          <textarea
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="single">
          <label>Cantidad</label>
          <input
            type="number"
            min="0"
            step="1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>

        <div className="single">
          <label>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Snacks">Snacks</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Golosinas">Golosinas</option>
            <option value="Dulces">Dulces</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Registrar Producto
        </button>
        <button
          type="button"
          className="btn-back"
          onClick={() => navigate("/listproductos")}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default FormRegistroProducto;
