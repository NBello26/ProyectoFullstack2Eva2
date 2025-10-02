import React, { useState, useEffect } from "react";
import FormGroup from "../moleculas/FormGroup"; // si este ya envuelve bootstrap, puedes eliminarlo
import Button from "../atomos/Button"; // si este es custom puedes reemplazarlo por bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Regiones y comunas (esto podrías moverlo a un JSON si quieres)
const comunasPorRegion = {
  Lagos: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
  Metropolitana: ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
  Araucanía: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  Biobío: ["Concepción", "Talcahuano", "Chiguayante", "Los Ángeles"],
};

function RegisterForm() {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    confirmarCorreo: "",
    contrasena: "",
    confirmarContrasena: "",
    telefono: "",
    region: "",
    comuna: "",
  });

  const [comunas, setComunas] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (form.region && comunasPorRegion[form.region]) {
      setComunas(comunasPorRegion[form.region]);
    } else {
      setComunas([]);
    }
  }, [form.region]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      nombre,
      correo,
      confirmarCorreo,
      contrasena,
      confirmarContrasena,
      telefono,
      region,
      comuna,
    } = form;

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    if (!dominiosPermitidos.some((dom) => correo.endsWith(dom))) {
      alert(
        "El correo debe ser de los dominios: @duoc.cl, @profesor.duoc.cl, o @gmail.com"
      );
      return;
    }

    if (correo !== confirmarCorreo) {
      alert("Los correos no coinciden.");
      return;
    }

    if (contrasena.length < 4 || contrasena.length > 10) {
      alert("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const nuevoUsuario = {
      nombre,
      correo,
      contrasena,
      telefono,
      region,
      comuna,
      tipusuario: "usuario",
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Datos guardados correctamente");

    setForm({
      nombre: "",
      correo: "",
      confirmarCorreo: "",
      contrasena: "",
      confirmarContrasena: "",
      telefono: "",
      region: "",
      comuna: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container p-4 shadow rounded bg-light">
      <h2 className="text-center mb-4">Registro de usuario</h2>

      {/* Nombre */}
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre Completo
        </label>
        <input
          type="text"
          id="nombre"
          className="form-control"
          value={form.nombre}
          onChange={handleChange}
          required
        />
      </div>

      {/* Correo */}
      <div className="mb-3">
        <label htmlFor="correo" className="form-label">
          Correo
        </label>
        <input
          type="email"
          id="correo"
          className="form-control"
          value={form.correo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirmar Correo */}
      <div className="mb-3">
        <label htmlFor="confirmarCorreo" className="form-label">
          Confirmar Correo
        </label>
        <input
          type="email"
          id="confirmarCorreo"
          className="form-control"
          value={form.confirmarCorreo}
          onChange={handleChange}
          required
        />
      </div>

      {/* Contraseña */}
      <div className="mb-3">
        <label htmlFor="contrasena" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          id="contrasena"
          className="form-control"
          value={form.contrasena}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirmar Contraseña */}
      <div className="mb-3">
        <label htmlFor="confirmarContrasena" className="form-label">
          Confirmar Contraseña
        </label>
        <input
          type="password"
          id="confirmarContrasena"
          className="form-control"
          value={form.confirmarContrasena}
          onChange={handleChange}
          required
        />
      </div>

      {/* Teléfono */}
      <div className="mb-3">
        <label htmlFor="telefono" className="form-label">
          Teléfono (opcional)
        </label>
        <input
          type="tel"
          id="telefono"
          className="form-control"
          value={form.telefono}
          onChange={handleChange}
        />
      </div>

      {/* Región */}
      <div className="mb-3">
        <label htmlFor="region" className="form-label">
          Selecciona la región
        </label>
        <select
          id="region"
          className="form-select"
          value={form.region}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione región</option>
          {Object.keys(comunasPorRegion).map((region) => (
            <option key={region} value={region}>
              Región de {region}
            </option>
          ))}
        </select>
      </div>

      {/* Comuna */}
      <div className="mb-3">
        <label htmlFor="comuna" className="form-label">
          Selecciona la comuna
        </label>
        <select
          id="comuna"
          className="form-select"
          value={form.comuna}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione comuna</option>
          {comunas.map((comuna) => (
            <option key={comuna} value={comuna}>
              {comuna}
            </option>
          ))}
        </select>
      </div>

      {/* Botón */}
      <div className="text-center">
        <button type="submit" className="btn btn-primary w-100">
          Registrar
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
