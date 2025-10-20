import React from "react";
import CardAdmin from "../moleculas/CardAdmin";

const MainAdmin = () => (
  <main className="mainAdminContainer">
    <CardAdmin className="mainAdminCard" titulo="Usuario" enlace="/listusuarios" texto="Ir a Usuario" />
    <CardAdmin className="mainAdminCard" titulo="Productos" enlace="/listproductos" texto="Ir a Producto" />
    <CardAdmin className="mainAdminCard" titulo="Contactos" enlace="/listcontactos" texto="Ir a Contactos" />
    <CardAdmin className="mainAdminCard" titulo="Boletas" enlace="/listboletas" texto="Ir a Boletas" />
    <CardAdmin className="mainAdminCard" titulo="Perfil" enlace="/perfilAdmin" texto="Ver Perfil" />
    <CardAdmin className="mainAdminCard" titulo="Reportes" enlace="/reportes" texto="Ir a Reportes" />
  </main>
);

export default MainAdmin;
