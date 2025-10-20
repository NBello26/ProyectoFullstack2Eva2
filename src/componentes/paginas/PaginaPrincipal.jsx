// PagPrincipal.jsx
// 🌟 Página inicial después de iniciar sesión
// 🔒 Solo accesible si el usuario está logeado
// 🧱 Renderiza el organismo ProductosDestacados dentro del MainTemplate

import React, { useEffect, useState } from "react";
import MainTemplate from "../plantillas/MainTemplate";
import ProductosDestacados from "../organismos/ProductosDestacados";
import "../../estilos/pagPrincipal.css";

const PagPrincipal = () => {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (!usuarioActual) {
            window.location.href = "/";
        } else {
            setUsuario(usuarioActual);
        }
    }, []);

    if (!usuario) return null;

    return (
        <MainTemplate>
            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h1>TIENDA DuocUC</h1>
                    <p>
                        Nuestra tienda ofrece los mejores productos. Descubre nuestras increíbles ofertas
                        y lleva tu experiencia estudiantil al siguiente nivel, acortando tiempos de espera
                        y solo retirando tu producto.
                    </p>
                    <a href="/tienda" className="btn">
                        Ver Productos
                    </a>
                </div>
            </section>

            {/* Organismo: Productos Destacados */}
            <ProductosDestacados />
        </MainTemplate>
    );
};

export default PagPrincipal;
