import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const FormRegistroProducto = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("Snacks");
  const [tipoPrecio, setTipoPrecio] = useState("normal");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 Validaciones
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

    // 🔹 Crear objeto a enviar al backend
    const nuevoProducto = {
      nombre,
      precio: precioNum,
      descripcion,
      cantidad: cantidadNum,
      categoria,
      tipoPrecio,
    };

    try {
      const respuesta = await fetch(`${API_URL}/api/productos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) {
        const error = await respuesta.json();
        alert(`Error: ${error.message || "No se pudo registrar el producto"}`);
        return;
      }

      alert("Producto registrado correctamente");

      // 🔹 Limpiar formulario
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setCantidad("");
      setCategoria("Snacks");
      setTipoPrecio("normal");

    } catch (error) {
      alert("Error al conectar con el servidor");
      console.error(error);
    }
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
            step="1"
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
