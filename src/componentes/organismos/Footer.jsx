// Footer.jsx
// 🧱 Organismo: Footer reutilizable en todas las páginas navegables

import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <p>TIENDA DuocUC - Tu destino para compras en línea si eres estudiante de DuocUC Puerto Montt</p>
          <p>Contacto: info@tiendaDuocUC.com | Tel: +569 2345 6789</p>
        </div>
        <div className="copyright">
          <p>&copy; 2025 Tienda DuocUC. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
