import React from "react";
import Navbar from "../organismos/NavBar";
import RegisterForm from "../organismos/RegisterForm";
import "bootstrap/dist/css/bootstrap.min.css";

function RegistroPlanilla() {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <RegisterForm />
      </main>
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-1">
            TIENDA DuocUC - Tu destino para compras en línea si eres estudiante
            de DuocUC Puerto Montt
          </p>
          <p className="mb-1">Contacto: info@tiendaDuocUC.com | Tel: +569 2345 6789</p>
          <p className="mt-3 mb-0">
            &copy; 2025 Tienda DuocUC. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </>
  );
}

export default RegistroPlanilla;
