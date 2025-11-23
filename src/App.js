import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './componentes/paginas/AdminPage.jsx';
import ListUsuarios from './componentes/paginas/ListUsuarios.jsx';
import RegistroUserAdmin from './componentes/paginas/RegistroUserAdmin.jsx';
import EditarUsuario from './componentes/paginas/EditarUsuario.jsx';
import ListProductos from './componentes/paginas/ListProductos.jsx';
import RegistroProducto from './componentes/paginas/RegistroProducto.jsx';
import EditarProducto from './componentes/paginas/EditarProducto.jsx';
import ListContactos from './componentes/paginas/ListContactos.jsx';
import Registro from './componentes/paginas/Registro.jsx';
import Login from './componentes/paginas/Login.jsx';
import PagPrincipal from './componentes/paginas/PaginaPrincipal.jsx';
import Tienda from './componentes/paginas/Tienda.jsx';
import Nosotros from './componentes/paginas/Nosotros.jsx';
import Blogs from './componentes/paginas/Blogs.jsx';
import Contacto from './componentes/paginas/Contacto.jsx';
import DetallesProducto from './componentes/paginas/DetallesProducto.jsx';
import CarritoPage from './componentes/paginas/CarritoPage.jsx';
import PagOfertas from './componentes/paginas/PagOfertas.jsx';
import PagCategoria from './componentes/paginas/PagCategoria.jsx';
import CheckoutPage from './componentes/paginas/CheckoutPage.jsx';
import BoletaExitosaPage from './componentes/paginas/BoletaExitosaPage.jsx';
import BoletaFallidaPage from './componentes/paginas/BoletaFallidaPage.jsx';
import HistorialUsuarioPage from './componentes/paginas/HistorialUsuarioPage.jsx';
import BoletasAdminPage from './componentes/paginas/BoletasAdminPage.jsx';
import DetalleBoletaAdminPage from './componentes/paginas/DetalleBoletaAdminPage.jsx';
import PerfilAdminPage from './componentes/paginas/PerfilAdminPage.jsx';
import ListarProductosCriticosPage from './componentes/paginas/ListarProductosCriticosPage.jsx';
import ReportesPage from './componentes/paginas/ReportesPage.jsx';
import PerfilUsuario from "./componentes/paginas/PerfilUsuarioPage.jsx";
// 🧩 Importamos los inicializadores de “BD simulada”
import { inicializarProductos } from './data/products';
import { inicializarUsuarios } from './data/users';

// 🔹 Ejecutamos las inicializaciones (solo si no existen datos en localStorage)
inicializarProductos();
inicializarUsuarios();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/listusuarios" element={<ListUsuarios />} />
        <Route path="/registroUserAdmin" element={<RegistroUserAdmin />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/listproductos" element={<ListProductos />} />
        <Route path="/registroProducto" element={<RegistroProducto />} />
        <Route path="/editarProducto" element={<EditarProducto />} />
        <Route path="/listcontactos" element={<ListContactos />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Login />} />
        <Route path="/paginaPrincipal" element={<PagPrincipal />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/detallesProducto/:id" element={<DetallesProducto />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/ofertas" element={<PagOfertas />} />
        <Route path="/categoria" element={<PagCategoria />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/boleta-exitosa/:id" element={<BoletaExitosaPage />} />
        <Route path="/boleta-fallida" element={<BoletaFallidaPage />} />
        <Route path="/historialUsuario/:id" element={<HistorialUsuarioPage />} />
        <Route path="/listboletas" element={<BoletasAdminPage />} />
        <Route path="/detalleBoleta/:id" element={<DetalleBoletaAdminPage />} />
        <Route path="/perfilAdmin" element={<PerfilAdminPage />} />
        <Route path="/listproductoscriticos" element={<ListarProductosCriticosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/perfilUsuario" element={<PerfilUsuario />} />
      </Routes>
    </Router>
  );
}

export default App;
