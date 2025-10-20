import React, { useState, useEffect } from "react";
import Boton from "../atomos/Boton.jsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { obtenerProductoPorId, actualizarProducto } from "../../data/products";

const FormEditarProducto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productoId = parseInt(searchParams.get("id"));

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("Snacks");
  const [tipoPrecio, setTipoPrecio] = useState("normal"); // nuevo

  useEffect(() => {
    if (!productoId) {
      alert("ID de producto no proporcionado");
      navigate("/listproductos");
      return;
    }

    const producto = obtenerProductoPorId(productoId);
    if (!producto) {
      alert("Producto no encontrado");
      navigate("/listproductos");
      return;
    }

    setNombre(producto.nombre || "");
    setPrecio(producto.precio || "");
    setDescripcion(producto.descripcion || "");
    setCantidad(producto.cantidad || "");
    setCategoria(producto.categoria || "Snacks");
    setTipoPrecio(producto.tipoPrecio || "normal"); // inicializamos
  }, [productoId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const precioNum = parseFloat(precio);
    const cantidadNum = parseInt(cantidad);

    if (nombre.trim() === "") {
      alert("El nombre es obligatorio");
      return;
    }
    if (isNaN(precioNum) || precioNum < 0) {
      alert("Por favor, ingrese un precio válido");
      return;
    }
    if (isNaN(cantidadNum) || cantidadNum < 0) {
      alert("Por favor, ingrese una cantidad válida");
      return;
    }
    if (descripcion.trim() === "") {
      alert("La descripción es obligatoria");
      return;
    }

    const productoActualizado = {
      nombre,
      precio: precioNum,
      descripcion,
      cantidad: cantidadNum,
      categoria,
      tipoPrecio, // guardamos el tipo de precio
    };

    actualizarProducto(productoId, productoActualizado);

    alert("Producto actualizado correctamente");
    navigate("/listproductos");
  };

  return (
    <div className="form-container">
      <h2>Editar Producto (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Precio:</label>
        <input type="number" min="0" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

        <label>Tipo Precio:</label>
        <select value={tipoPrecio} onChange={(e) => setTipoPrecio(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="oferta">Oferta</option>
        </select>

        <label>Descripción:</label>
        <textarea rows="4" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required></textarea>

        <label>Cantidad:</label>
        <input type="number" min="0" value={cantidad} onChange={(e) => setCantidad(e.target.value)} required />

        <label>Categoría:</label>
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="Snacks">Snacks</option>
          <option value="Bebidas">Bebidas</option>
          <option value="Golosinas">Golosinas</option>
          <option value="Dulces">Dulces</option>
        </select>

        <div className="botones">
          <Boton type="submit" texto="Guardar Cambios" className="btn-guardar" />
          <Link to="/listproductos" className="btn-cancelar">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default FormEditarProducto;
