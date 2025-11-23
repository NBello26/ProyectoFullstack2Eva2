import React from "react"; 
import { useNavigate } from "react-router-dom";
import "../../estilos/headerLogged.css";
import "../../estilos/header.css";
import { ContadorCarrito } from "../atomos/ContadorCarrito";
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;
const HeaderLogged = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  if (usuarioActivo && usuarioActivo.carrito && usuarioActivo.carrito.length > 0) {
    try {
      for (const item of usuarioActivo.carrito) {
        // Obtener el producto actual desde la BD
        const resProducto = await fetch(`${API_URL}/api/productos/${item.id}`);
        if (!resProducto.ok) throw new Error("Producto no encontrado");
        const productoActual = await resProducto.json();

        // Devolver al stock solo la cantidad que estaba en el carrito
        await fetch(`${API_URL}/api/productos/${item.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...productoActual,
            cantidad: productoActual.cantidad + item.cantidadCarrito,
          }),
        });
      }
    } catch (err) {
      console.error("Error al devolver stock:", err);
      alert("No se pudo actualizar el stock correctamente.");
    }
  }

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
              <li><Link to="/paginaPrincipal">Home</Link></li>
              <li><Link to="/tienda">Productos</Link></li>
              <li><Link to="/ofertas">Ofertas</Link></li>
              <li><Link to="/categoria">Categoría</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/perfilUsuario">Perfil</Link></li>
            </ul>
          </nav>
        </div>
        <div className="header-logged-right">
          <Link to="/carrito" className="cart-logged">
            <span className="cart-emoji">🛒</span>
            <span className="cart-count">(<ContadorCarrito />)</span>
          </Link>
          <button className="logout-btn-logged" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderLogged;
