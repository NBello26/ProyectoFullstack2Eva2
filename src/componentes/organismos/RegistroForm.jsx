// 🧱 Organismo: Registro de Usuario actualizado
// Usa funciones del módulo users.js para crear usuarios con estructura correcta

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Boton from "../atomos/Boton";
import SelectRegionComuna from "../moleculas/SelectRegionComuna";
import { crearUsuario, obtenerUsuarioPorCorreo } from "../../data/users";
import "../../estilos/registro.css";

const RegistroForm = () => {
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value.trim();
    const correo = e.target.correo.value.trim();
    const confirmarCorreo = e.target.confirmarCorreo.value.trim();
    const contraseña = e.target.contrasena.value.trim();
    const confirmarContrasena = e.target.confirmarContrasena.value.trim();
    const telefono = e.target.telefono.value.trim();

    // 🔍 Validaciones
    if (
      !correo.includes("@duoc.cl") &&
      !correo.includes("@profesor.duoc.cl") &&
      !correo.includes("@gmail.com")
    ) {
      alert("El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com");
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

    if (contraseña !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!region || !comuna) {
      alert("Debe seleccionar una región y una comuna.");
      return;
    }

    // 🧠 Verificar si ya existe el correo
    const existe = obtenerUsuarioPorCorreo(correo);
    if (existe) {
      alert("Ya existe un usuario registrado con ese correo.");
      return;
    }

    // ✅ Crear usuario usando función centralizada
    const nuevoUsuario = {
      nombre,
      correo,
      contraseña,
      telefono,
      region,
      comuna,
      tipusuario: "cliente", // estándar
    };

    crearUsuario(nuevoUsuario);

    alert("Usuario registrado correctamente ✅");
    e.target.reset();
    setRegion("");
    setComuna("");
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
