import React, { useState, useEffect } from "react";
import Boton from "../atomos/Boton.jsx";
import SelectRegionComuna from "../moleculas/SelectRegionComuna.jsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { obtenerUsuarioPorId, actualizarUsuario } from "../../data/users";

const FormEditarUsuario = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const usuarioId = parseInt(searchParams.get("id")); // obtenemos id desde la tabla

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [tipusuario, setTipUsuario] = useState("usuario");

  useEffect(() => {
    if (!usuarioId) {
      alert("ID de usuario no proporcionado");
      navigate("/listusuarios");
      return;
    }

    const usuario = obtenerUsuarioPorId(usuarioId);
    if (!usuario) {
      alert("Usuario no encontrado");
      navigate("/listusuarios");
      return;
    }

    setNombre(usuario.nombre || "");
    setCorreo(usuario.correo || "");
    setTelefono(usuario.telefono || "");
    setRegion(usuario.region || "");
    setComuna(usuario.comuna || "");
    setTipUsuario(usuario.tipusuario || "usuario");
  }, [usuarioId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!region || !comuna) {
      alert("Por favor, seleccione una región y una comuna");
      return;
    }

    const usuarioActualizado = {
      nombre,
      correo,
      telefono,
      region,
      comuna,
      tipusuario,
    };

    // Guardamos usando la función de la BD simulada
    actualizarUsuario(usuarioId, usuarioActualizado);

    alert("Usuario actualizado correctamente");
    navigate("/listusuarios");
  };

  return (
    <div className="form-container">
      <h2>Editar Usuario (admin)</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

        <label>Teléfono:</label>
        <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

        <SelectRegionComuna
          region={region} setRegion={setRegion}
          comuna={comuna} setComuna={setComuna}
        />

        <label>Tipo de Usuario:</label>
        <select value={tipusuario} onChange={(e) => setTipUsuario(e.target.value)} required>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="admin">Admin</option>
        </select>

        <div className="botones">
          <Boton type="submit" texto="Guardar Cambios" className="btn-guardar" />
          <Link to="/listusuarios" className="btn-cancelar">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default FormEditarUsuario;
