// BlogsOrganismo.jsx
// 🧱 Organismo: contiene toda la lógica de la página de blogs
// 🔒 Solo accesible si el usuario está logeado
// Reutiliza la molécula BlogCard

import BlogCard from "../moleculas/BlogCard";
import "../../estilos/blogs.css"; // ✅ Importamos CSS
import useUsuarioLogeado from "../funciones/useUsuarioLogeado";

const BlogsOrganismo = () => {
    const usuario = useUsuarioLogeado();

  if (!usuario) return null; 
  const blogs = [
    {
      titulo: "El Completo en Nuestra Tienda",
      texto: "¿Sabías que el completo es una de las comidas rápidas más populares entre nuestros estudiantes? En la Tienda DuocUC Puerto Montt, servimos en promedio 250 completos cada semana."
    },
    {
      titulo: "El Secreto detrás de Nuestro Café de Especialidad",
      texto: "En la Tienda DuocUC Puerto Montt, nuestro café no es cualquier café. Es una selección especial de granos cultivados en las laderas de los volcanes de la Región de Los Lagos, tostados localmente para garantizar frescura y sabor."
    }
  ];

  const handleVerCaso = (titulo) => {
    alert(`Aquí se mostraría el caso completo de: ${titulo}`);
  };

  return (
    <main>
      <h1>Noticias Importantes</h1>
      <p>Datos curiosos y novedades de nuestra tienda</p>

      <section className="blog-container">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.titulo}
            titulo={blog.titulo}
            texto={blog.texto}
            onClick={() => handleVerCaso(blog.titulo)}
          />
        ))}
      </section>
    </main>
  );
};

export default BlogsOrganismo;
