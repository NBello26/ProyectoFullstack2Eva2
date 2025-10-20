import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../../estilos/headerLogged.css";
import "../../estilos/header.css";
import { ContadorCarrito } from "../atomos/ContadorCarrito";

const HeaderLogged = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    navigate("/");
  };

  return (
    <header className="header-logged">
      <div className="header-logged-container">
        <div className="header-logged-left">
          <div className="site-name-logged">TIENDA DuocUC</div>
          <nav>
            <ul className="nav-list-logged">
              <li><a href="/paginaPrincipal">Home</a></li>
              <li><a href="/tienda">Productos</a></li>
              <li><a href="/ofertas">Ofertas</a></li>
              <li><a href="/categoria">Categoría</a></li>
              <li><a href="/nosotros">Nosotros</a></li>
              <li><a href="/blogs">Blogs</a></li>
              <li><a href="/contacto">Contacto</a></li>
            </ul>
          </nav>
        </div>
        <div className="header-logged-right">
          <a href="/carrito" className="cart-logged">
            <span className="cart-emoji">🛒</span>
            <span className="cart-count">(<ContadorCarrito />)</span>
          </a>
          <button className="logout-btn-logged" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogged;
