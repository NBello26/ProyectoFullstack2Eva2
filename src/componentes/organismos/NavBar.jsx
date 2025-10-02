import React, { useEffect, useState } from 'react';

function Navbar() {
  const [usuarioLogeado, setUsuarioLogeado] = useState(null);
  const [contadorCarrito, setContadorCarrito] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogeado'));
    setUsuarioLogeado(user);

    const actualizarContador = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      const total = carrito.reduce((acc, prod) => acc + (prod.cantidadCarrito || 1), 0);
      setContadorCarrito(total);
    };

    actualizarContador();

    window.addEventListener('storage', actualizarContador);
    return () => window.removeEventListener('storage', actualizarContador);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogeado');
    setUsuarioLogeado(null);
    window.location.reload(); // recarga para reflejar cambios
  };

  return (
    <header>
      <div className="container header-content">
        <div className="site-name">TIENDA DuocUC</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tienda">Productos</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/blogs">Blogs</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </nav>
        <div className="header-right">
          {usuarioLogeado ? (
            <>
              <a href="/carrito" className="cart">
                Cart (<span>{contadorCarrito}</span>)
              </a>
              <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
            </>
          ) : (
            <div className="user-auth">
              <a href="/login">Login</a> | <a href="/registro">Register</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
