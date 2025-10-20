// useUsuarioLogeado.js
// Para verificar usuario logeado
// Retorna el usuario si está logeado, o redirige a login si no

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useUsuarioLogeado = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuarioActual) {
      navigate("/"); // Redirige al login
    } else {
      setUsuario(usuarioActual);
    }
  }, [navigate]);

  return usuario;
};

export default useUsuarioLogeado;
