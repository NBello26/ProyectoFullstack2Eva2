import React from "react";
import { createRoot } from "react-dom/client";
import ContactoForm from "@organismos/ContactoForm";

describe("📩 Validaciones de nombre", () => {
  let container;
  let root;
  const alerta1 = "El nombre es requerido y debe tener máximo 100 caracteres.";
  const alerta4 = alerta1; // nombre muy largo

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);
    localStorage.clear();
    window._lastAlert = "";
    window.alert = (msg) => { window._lastAlert = msg; };
  });

  afterEach(() => {
    if (root) root.unmount();
    if (container) document.body.removeChild(container);
    container = null;
    root = null;
    localStorage.clear();
    window._lastAlert = "";
  });

  const submitForm = ({ nombre, correo, comentario }) => {
    const nombreInput = container.querySelector("#nombre");
    const correoInput = container.querySelector("#correo");
    const comentarioInput = container.querySelector("#comentario");
    const form = container.querySelector("form");

    nombreInput.value = nombre;
    correoInput.value = correo;
    comentarioInput.value = comentario;

    nombreInput.dispatchEvent(new Event("input", { bubbles: true }));
    correoInput.dispatchEvent(new Event("input", { bubbles: true }));
    comentarioInput.dispatchEvent(new Event("input", { bubbles: true }));

    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  };

  it("❌ No permite enviar formulario con nombre vacío", (done) => {
    root.render(<ContactoForm />);
    setTimeout(() => {
      submitForm({ nombre: "", correo: "juan@duoc.cl", comentario: "Sin nombre" });

      setTimeout(() => {
        const contactos = JSON.parse(localStorage.getItem("contactos") || "[]");
        expect(contactos.length).toBe(0);
        expect(window._lastAlert).toBe(alerta1);
        done();
      }, 100);
    }, 300);
  });

  it("❌ No permite enviar nombre mayor a 100 caracteres", (done) => {
    root.render(<ContactoForm />);
    setTimeout(() => {
      const nombreLargo = "a".repeat(101);
      submitForm({ nombre: nombreLargo, correo: "juan@duoc.cl", comentario: "Nombre muy largo" });

      setTimeout(() => {
        const contactos = JSON.parse(localStorage.getItem("contactos") || "[]");
        expect(contactos.length).toBe(0);
        expect(window._lastAlert).toBe(alerta4);
        done();
      }, 100);
    }, 300);
  });
});
