// Contacto.jsx
// 🌟 Página de contacto
// 🔒 Solo accesible si el usuario está logeado
// 🧱 Renderiza el organismo ContactoForm dentro de MainTemplate

import MainTemplate from "../plantillas/MainTemplate";
import ContactoForm from "../organismos/ContactoForm";
import useUsuarioLogeado from "../funciones/useUsuarioLogeado";

const Contacto = () => {
    const usuario = useUsuarioLogeado();
    if (!usuario) return null; // Mientras se verifica el login

  return (
    <MainTemplate>
      <ContactoForm />
    </MainTemplate>
  );
};

export default Contacto;
