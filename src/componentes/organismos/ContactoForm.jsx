// ContactoForm.jsx
// 🧱 Molécula: formulario de contacto
// 🔹 Reutiliza átomo Boton para el botón de envío
// 🔹 Maneja validaciones y guardado en localStorage

import React, { useState } from "react";
import Boton from "../atomos/Boton"; // ✅ reutilizamos átomo
import "../../estilos/contacto.css";

const ContactoForm = () => {
    
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!nombre || nombre.length > 100) {
      alert("El nombre es requerido y debe tener máximo 100 caracteres.");
      return;
    }
    if (correo.length > 100) {
      alert("El correo no debe superar los 100 caracteres.");
      return;
    }
    if (
      !correo.endsWith("@duoc.cl") &&
      !correo.endsWith("@profesor.duoc.cl") &&
      !correo.endsWith("@gmail.com")
    ) {
      alert("El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }
    if (!comentario || comentario.length > 500) {
      alert("El comentario es requerido y debe tener máximo 500 caracteres.");
      return;
    }

    const contacto = { nombre, correo, comentario };

    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    alert("Mensaje enviado correctamente ✅");

    // Resetear formulario
    setNombre("");
    setCorreo("");
    setComentario("");
  };

  return (
    <section className="form-container">
      <h2>Formulario de Contactos</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre completo</label>
        <input
          type="text"
          id="nombre"
          placeholder="Ingresa tu nombre"
          maxLength={100}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          id="correo"
          placeholder="ejemplo@duoc.cl"
          maxLength={100}
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <label htmlFor="comentario">Comentario</label>
        <textarea
          id="comentario"
          placeholder="Escribe tu mensaje..."
          maxLength={500}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />

        <Boton texto="Enviar Mensaje" type="submit" />
      </form>
    </section>
  );
};

export default ContactoForm;
