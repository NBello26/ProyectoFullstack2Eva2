// LoginForm.jsx
// 🧱 Organismo: formulario de login usando los módulos simulados (users.js y usuarioActivo.js)

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton";
import BotonRegistro from "../atomos/BotonRegistro";
import Titulo from "../atomos/Titulo";

// 🧩 Importamos funciones del “backend simulado”
import { obtenerUsuarios } from "../../data/users";
import { iniciarSesion } from "../../data/usuarioActivo";

const LoginForm = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Obtenemos los usuarios de la “BD simulada”
    const usuarios = obtenerUsuarios();

    // Buscamos coincidencia
    const usuarioEncontrado = usuarios.find(
      (usuario) => usuario.correo === correo && usuario.contraseña === contrasena
    );

    if (usuarioEncontrado) {
      // Guardamos el usuario activo en memoria simulada
      iniciarSesion(usuarioEncontrado);

      // Redirigimos según tipo de usuario
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
    } else {
      alert("Correo o contraseña incorrectos");
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

