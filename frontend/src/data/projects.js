// Datos estáticos de proyectos
export const projectsData = [
  {
    id: 1,
    title: "DevFlow",
    description: "Una plataforma integral para gestionar tus proyectos de desarrollo. Colabora con otros desarrolladores, asigna tareas, comparte archivos y comunícate en tiempo real. Diseñado por desarrolladores, para desarrolladores.",
    image: "/assets/images/projects/ecommerce-project.png",
    category: "Web Development",
    technologies: ["React", "Node.js", "NoSQL",],
    github: "https://github.com/ToniTF/devflow.git",
    live_url: "https://devflow-6f814.web.app/",
    featured: true,
    completion_date: "2024-03-15"
  },
  {
    id: 2,
    title: "Blog World",
    description: "Un espacio para compartir ideas, conocimientos y experiencias.",
    image: "/assets/images/projects/mobile-app.png",
    category: "Web Development",
    technologies: ["Python", "Flask", "MySQL", "Pythonanywhere"],
    github: "https://github.com/ToniTF/pagina.git",
    live_url: "https://tonitf.pythonanywhere.com/",
    featured: true,
    completion_date: "2024-02-20"
  },
  {
    id: 3,
    title: "Blog Informal",
    description: "Disfruta compartiendo tus ideas de manera informal. Un blog personal para escribir sobre tus pasiones, hobbies y reflexiones diarias.",
    image: "/assets/images/projects/task-manager.png",
    category: "Web Development",
    technologies: ["React", "Node.js", "API", "Render",],
    github: "https://github.com/ToniTF/clientcd.git",
    live_url: "https://tonitf.github.io/clientcd/",
    featured: false,
    completion_date: "2024-01-10"
  },  {
    id: 4,
    title: "Conversor Universal",
    description: "Aplicacion para convertir practicamente cualquier archivo en otros formatos, incluyendo imágenes, documentos y audio.",
    image: "/assets/images/projects/reiki-website.png",
    category: "Web Development",
    technologies: ["React", "Next.js", "Node.js",],
    github: "https://github.com/ToniTF/dataview.git",
    live_url: "",
    featured: false,
    completion_date: "2023-12-05"
  },
  {
    id: 5,
    title: "Intercambio de Libros",
    description: "Una plataforma para intercambiar libros con otros usuarios. Publica tus libros disponibles y encuentra nuevos títulos para leer.",
    image: "/assets/images/projects/rest-api.png",
    category: "Backend Development",
    technologies: ["Python", "Django", "Mysql",],
    github: "https://github.com/ToniTF/clubdeintercambio.git",
    live_url: "",
    featured: true,
    completion_date: "2023-11-18"
  },
   {
    id: 6,
    title: "API",
    description: "Una API RESTful para gestionar usuarios y posts. Permite crear, leer, actualizar y eliminar usuarios y posts.",
    category: "Backend Development",
    image: "/assets/images/projects/api.png",
    technologies: ["Node", "Postgres", "React",],
    github: "https://github.com/ToniTF/api-clientcd.git",
    live_url: "",
    featured: true,
    completion_date: "2023-11-18"
  }
]

// Función para obtener proyectos destacados
export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured)
}

// Función para obtener un proyecto por ID
export const getProjectById = (id) => {
  return projectsData.find(project => project.id === parseInt(id))
}

// Función para obtener todas las categorías únicas
export const getCategories = () => {
  const categories = [...new Set(projectsData.map(project => project.category))]
  return ['all', ...categories]
}
