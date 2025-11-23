// LoginForm.jsx
// 🧱 Organismo: formulario de login usando los módulos simulados (users.js y usuarioActivo.js)

// LoginForm.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton";
import BotonRegistro from "../atomos/BotonRegistro";
import Titulo from "../atomos/Titulo";

// ✔ mantenemos usuarioActivo para carrito y sesión
import { iniciarSesion } from "../../data/usuarioActivo";
const API_URL = process.env.REACT_APP_API_URL;
const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Obtener usuarios desde tu backend real
      const respuesta = await fetch(`${API_URL}/api/usuarios`);

      if (!respuesta.ok) {
        alert("Error al conectar con el servidor.");
        return;
      }

      const usuarios = await respuesta.json();

      // Buscar usuario por correo + contraseña
      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.correo === correo &&
          usuario.contraseña === contrasena
      );

      if (!usuarioEncontrado) {
        alert("Correo o contraseña incorrectos");
        return;
      }

      // Guardar usuario activo en localStorage
      iniciarSesion(usuarioEncontrado);

      // Redirigir según tipo de usuario
      switch (usuarioEncontrado.tipusuario) {
        case "cliente":
          navigate("/paginaPrincipal");
          break;
        case "vendedor":
          navigate("/pagvendedor");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          alert("Tipo de usuario desconocido");
      }

    } catch (error) {
      console.error("Error en login:", error);
      alert("Error en la conexión al servidor.");
    }
  };

  return (
    <form className="formulario" onSubmit={handleLogin}>
      <Titulo texto="Inicio de sesión" />

      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        id="correo"
        placeholder="ejemplo@duoc.cl"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        required
      />

      <label htmlFor="contrasena">Contraseña</label>
      <input
        type="password"
        id="contrasena"
        placeholder="Ingresa tu contraseña"
        value={contrasena}
        onChange={(e) => setContrasena(e.target.value)}
        required
      />

      <div className="botones-login">
        <Boton texto="Iniciar sesión" className="boton-primario" />
        <BotonRegistro
          texto="Ir a registro"
          className="boton-secundario"
          onClick={() => navigate("/registro")}
        />
      </div>
    </form>
  );
};

export default LoginForm;
