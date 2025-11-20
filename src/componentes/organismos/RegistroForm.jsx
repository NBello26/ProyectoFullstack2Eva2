// 🧱 Organismo: Registro de Usuario actualizado
// Usa funciones del módulo users.js para crear usuarios con estructura correcta

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton";
import SelectRegionComuna from "../moleculas/SelectRegionComuna";
import "../../estilos/registro.css";

const RegistroForm = () => {
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const nombre = e.target.nombre.value.trim();
  const correo = e.target.correo.value.trim();
  const confirmarCorreo = e.target.confirmarCorreo.value.trim();
  const contraseña = e.target.contrasena.value.trim();
  const confirmarContrasena = e.target.confirmarContrasena.value.trim();
  const telefono = e.target.telefono.value.trim();

  // 🔍 Validaciones locales
  if (
    !correo.includes("@duoc.cl") &&
    !correo.includes("@profesor.duoc.cl") &&
    !correo.includes("@gmail.com")
  ) {
    alert("El correo debe ser válido");
    return;
  }

  if (correo !== confirmarCorreo) return alert("Los correos no coinciden.");

  if (contraseña.length < 4 || contraseña.length > 10)
    return alert("La contraseña debe tener entre 4 y 10 caracteres.");

  if (contraseña !== confirmarContrasena)
    return alert("Las contraseñas no coinciden.");

  if (!region || !comuna)
    return alert("Debe seleccionar región y comuna.");

  try {
    // 1️⃣ Verificar si ya existe el correo consultando la lista de usuarios
    const checkResp = await fetch("http://localhost:3000/api/usuarios");
    const listaUsuarios = await checkResp.json();

    const existe = listaUsuarios.some(u => u.correo === correo);

    if (existe) {
      alert("Ya existe un usuario con ese correo.");
      return;
    }

    // 2️⃣ Crear usuario en el backend
    const nuevoUsuario = {
      nombre,
      correo,
      contraseña,
      telefono,
      region,
      comuna,
      tipusuario: "cliente",
    };

    const response = await fetch("http://localhost:3000/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoUsuario),
    });

    if (!response.ok) {
      alert("Error al registrar usuario");
      return;
    }

    alert("Usuario registrado correctamente");
    e.target.reset();
    setRegion("");
    setComuna("");
  } catch (error) {
    console.error(error);
    alert("Error de conexión con el servidor");
  }
};


  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <label>Nombre Completo</label>
        <input type="text" name="nombre" required placeholder="Ingresa tu nombre" />

        {/* 📧 Correo y Confirmar Correo */}
        <div className="input-row">
          <div>
            <label>Correo</label>
            <input type="email" name="correo" required placeholder="ejemplo@duoc.cl" />
          </div>
          <div>
            <label>Confirmar Correo</label>
            <input type="email" name="confirmarCorreo" required placeholder="ejemplo@duoc.cl" />
          </div>
        </div>

        {/* 🔐 Contraseña y Confirmación */}
        <div className="input-row">
          <div>
            <label>Contraseña</label>
            <input type="password" name="contrasena" required placeholder="Ingresa tu contraseña" />
          </div>
          <div>
            <label>Confirmar Contraseña</label>
            <input type="password" name="confirmarContrasena" required placeholder="Confirma tu contraseña" />
          </div>
        </div>

        <label>Teléfono (opcional)</label>
        <input type="tel" name="telefono" placeholder="+569 1234 5678" />

        {/* 🌎 Región y Comuna */}
        <div className="input-row">
          <SelectRegionComuna
            region={region}
            setRegion={setRegion}
            comuna={comuna}
            setComuna={setComuna}
          />
        </div>

        {/* 🔘 Botones lado a lado */}
        <div className="btn-row">
          <Boton texto="Registrarse" className="btn-registrar" />
          <Boton
            texto="Iniciar Sesión"
            className="btn-login"
            onClick={() => navigate("/")}
          />
        </div>
      </form>
    </div>
  );
};

export default RegistroForm;
