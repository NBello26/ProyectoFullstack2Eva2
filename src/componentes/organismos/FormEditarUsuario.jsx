import React, { useState, useEffect } from "react";
import Boton from "../atomos/Boton.jsx";
import SelectRegionComuna from "../moleculas/SelectRegionComuna.jsx";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const FormEditarUsuario = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const usuarioId = parseInt(searchParams.get("id"));

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [tipusuario, setTipUsuario] = useState("usuario");

  // 🔥 Obtener usuario desde la API
  useEffect(() => {
    if (!usuarioId) {
      alert("ID de usuario no proporcionado");
      navigate("/listusuarios");
      return;
    }

    const fetchUsuario = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`);
        if (!resp.ok) throw new Error("No se pudo obtener el usuario");

        const usuario = await resp.json();

        setNombre(usuario.nombre);
        setCorreo(usuario.correo);
        setTelefono(usuario.telefono);
        setRegion(usuario.region);
        setComuna(usuario.comuna);
        setTipUsuario(usuario.tipusuario);
      } catch (error) {
        console.error(error);
        alert("Error al cargar usuario");
        navigate("/listusuarios");
      }
    };

    fetchUsuario();
  }, [usuarioId, navigate]);

  // 🔥 Actualizar usuario usando PUT
  const handleSubmit = async (e) => {
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

    try {
      const resp = await fetch(`http://localhost:3000/api/usuarios/${usuarioId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });

      if (!resp.ok) throw new Error("Error al actualizar usuario");

      alert("Usuario actualizado correctamente");
      navigate("/listusuarios");

    } catch (error) {
      console.error(error);
      alert("Error al guardar cambios");
    }
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
          region={region}
          setRegion={setRegion}
          comuna={comuna}
          setComuna={setComuna}
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
