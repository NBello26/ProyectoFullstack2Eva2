// 🧱 Organismo: Formulario de registro de usuarios (Administrativo)
// Usa funciones del módulo users.js para mantener consistencia en la estructura de datos

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Boton from "../atomos/Boton.jsx";
import SelectRegionComuna from "../moleculas/SelectRegionComuna.jsx";
import "../../estilos/formRegistroAdmin.css";

const FormRegistroUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [confirmarCorreo, setConfirmarCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [tipusuario, setTipUsuario] = useState("cliente");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (
      !correo.includes("@duoc.cl") &&
      !correo.includes("@profesor.duoc.cl") &&
      !correo.includes("@gmail.com")
    ) {
      alert("El correo debe ser válido (@duoc.cl, @profesor.duoc.cl, @gmail.com)");
      return;
    }

    if (correo !== confirmarCorreo) {
      alert("Los correos no coinciden.");
      return;
    }

    if (contraseña.length < 4 || contraseña.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!region || !comuna) {
      alert("Debe seleccionar región y comuna.");
      return;
    }

    try {
      // 1️⃣ Verificar si el correo ya existe consultando al backend
      const checkResp = await fetch("http://localhost:3000/api/usuarios");
      const listaUsuarios = await checkResp.json();

      const existe = listaUsuarios.some((u) => u.correo === correo);
      if (existe) {
        alert("Ya existe un usuario con ese correo.");
        return;
      }

      // 2️⃣ Crear usuario en backend
      const nuevoUsuario = {
        nombre,
        correo,
        contraseña,
        telefono,
        region,
        comuna,
        tipusuario,
      };

      const response = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) {
        alert("Error al registrar usuario.");
        return;
      }

      alert("Usuario registrado correctamente ✅");

      // 3️⃣ Limpiar formulario
      setNombre("");
      setCorreo("");
      setConfirmarCorreo("");
      setContraseña("");
      setConfirmarContraseña("");
      setTelefono("");
      setRegion("");
      setComuna("");
      setTipUsuario("cliente");

    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="form-container-admin">
      <h2>Registro de Usuario (Admin)</h2>

      <form onSubmit={handleSubmit} className="form-admin">
        <label>Nombre Completo</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          placeholder="Ej: Juan Pérez"
        />

        <div className="input-row">
          <div>
            <label>Correo</label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              placeholder="ejemplo@duoc.cl"
            />
          </div>

          <div>
            <label>Confirmar Correo</label>
            <input
              type="email"
              value={confirmarCorreo}
              onChange={(e) => setConfirmarCorreo(e.target.value)}
              required
              placeholder="ejemplo@duoc.cl"
            />
          </div>
        </div>

        <div className="input-row">
          <div>
            <label>Contraseña</label>
            <input
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
              minLength="4"
              maxLength="10"
            />
          </div>

          <div>
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              required
              minLength="4"
              maxLength="10"
            />
          </div>
        </div>

        <label>Teléfono (opcional)</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+569 1234 5678"
        />

        <SelectRegionComuna
          region={region}
          setRegion={setRegion}
          comuna={comuna}
          setComuna={setComuna}
        />

        <label>Tipo de usuario</label>
        <select
          value={tipusuario}
          onChange={(e) => setTipUsuario(e.target.value)}
          required
        >
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
          <option value="admin">Administrador</option>
        </select>

        <div className="botones-admin">
          <Boton type="submit" texto="Registrar" className="btn-guardar-admin" />
          <Link to="/listusuarios" className="btn-volver-admin">
            Volver
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormRegistroUsuario;
