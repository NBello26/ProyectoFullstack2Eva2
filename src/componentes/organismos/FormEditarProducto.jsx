import React, { useState, useEffect } from "react";
import Boton from "../atomos/Boton.jsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const FormEditarProducto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const productoId = parseInt(searchParams.get("id"));

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("Snacks");
  const [tipoPrecio, setTipoPrecio] = useState("normal");

  useEffect(() => {
    if (!productoId) {
      alert("ID de producto no proporcionado");
      navigate("/listproductos");
      return;
    }

    const fetchProducto = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/productos/${productoId}`);
        if (!resp.ok) throw new Error("No se pudo obtener el producto");

        const data = await resp.json();

        setNombre(data.nombre || "");
        setPrecio(data.precio || "");
        setDescripcion(data.descripcion || "");
        setCantidad(data.cantidad || "");
        setCategoria(data.categoria || "Snacks");
        setTipoPrecio(data.tipoPrecio || "normal");

      } catch (error) {
        console.error("Error cargando producto:", error);
        alert("Error al cargar el producto.");
        navigate("/listproductos");
      }
    };

    fetchProducto();
  }, [productoId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const precioNum = parseFloat(precio);
    const cantidadNum = parseInt(cantidad);

    if (!nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }
    if (isNaN(precioNum) || precioNum < 0) {
      alert("Ingrese un precio válido");
      return;
    }
    if (isNaN(cantidadNum) || cantidadNum < 0) {
      alert("Ingrese una cantidad válida");
      return;
    }
    if (!descripcion.trim()) {
      alert("La descripción es obligatoria");
      return;
    }

    const productoActualizado = {
      nombre,
      precio: precioNum,
      descripcion,
      cantidad: cantidadNum,
      categoria,
      tipoPrecio,
    };

    try {
      const resp = await fetch(`${API_URL}/api/productos/${productoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });

      if (!resp.ok) throw new Error("No se pudo actualizar el producto");

      alert("Producto actualizado correctamente");
      navigate("/listproductos");

    } catch (error) {
      console.error("Error al actualizar:", error);
      alert("Error al actualizar el producto");
    }
  };

  return (
    <div className="form-container">
      <h2>Editar Producto (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          required 
        />

        <label>Precio:</label>
        <input 
          type="number" 
          min="0" 
          value={precio} 
          onChange={(e) => setPrecio(e.target.value)} 
          required 
        />

        <label>Tipo Precio:</label>
        <select value={tipoPrecio} onChange={(e) => setTipoPrecio(e.target.value)}>
          <option value="normal">Normal</option>
          <option value="oferta">Oferta</option>
        </select>

        <label>Descripción:</label>
        <textarea 
          rows="4" 
          value={descripcion} 
          onChange={(e) => setDescripcion(e.target.value)} 
          required
        ></textarea>

        <label>Cantidad:</label>
        <input 
          type="number" 
          min="0" 
          value={cantidad} 
          onChange={(e) => setCantidad(e.target.value)} 
          required 
        />

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
