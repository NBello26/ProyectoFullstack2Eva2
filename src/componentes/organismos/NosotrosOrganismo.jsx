// NosotrosOrganismo.jsx
// 🧱 Organismo: muestra la sección de empresa y desarrolladores
// 🔒 Solo visible si el usuario está logeado

import CardDesarrollador from "../moleculas/CardDesarrollador";
import "../../estilos/nosotros.css";
import useUsuarioLogeado from "../funciones/useUsuarioLogeado";

const NosotrosOrganismo = () => {
    const usuario = useUsuarioLogeado();

  if (!usuario) return null; // Mientras se verifica el login
  return (
    <main>
      {/* Sección Empresa */}
      <section className="empresa">
        <h2>Tienda DuocUC</h2>
        <p>
          Somos una empresa dedicada a ofrecer una alternativa ONLINE para realizar compras de manera más eficiente y rápida.
          Esto con el fin de acortar las filas en la sede de DuocUC Puerto Montt y facilitar la experiencia de compra a los estudiantes.
        </p>
      </section>

      {/* Sección Desarrolladores */}
      <section className="desarrolladores">
        <h2>Los Desarrolladores</h2>
        <div className="cards">
          <CardDesarrollador
            nombre="Nicolás Bello"
            rol="Frontend Developer"
            infoExtra="Apasionado por el diseño y la experiencia de usuario."
          />
          <CardDesarrollador
            nombre="Nicolás Bello"
            rol="Fullstack Developer"
            infoExtra="Combina lo mejor del frontend y backend."
          />
        </div>
      </section>
    </main>
  );
};

export default NosotrosOrganismo;
