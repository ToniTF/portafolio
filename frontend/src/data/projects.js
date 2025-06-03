// Datos estáticos de proyectos
export const projectsData = [
  {
    id: 1,
    title: "E-commerce Moderno",
    description: "Plataforma de comercio electrónico completa con React, Node.js y MySQL. Incluye sistema de pagos, gestión de inventario y panel administrativo.",
    image: "/assets/images/projects/ecommerce-project.jpg",
    category: "Web Development",
    technologies: ["React", "Node.js", "MySQL", "Stripe", "Tailwind CSS"],
    github: "https://github.com/tuusuario/ecommerce-project",
    live_url: "https://ecommerce-demo.com",
    featured: true,
    completion_date: "2024-03-15"
  },
  {
    id: 2,
    title: "App Móvil de Fitness",
    description: "Aplicación móvil para seguimiento de ejercicios y nutrición. Desarrollada con React Native y backend en PHP.",
    image: "/assets/images/projects/mobile-app.jpg",
    category: "Mobile Development",
    technologies: ["React Native", "PHP", "MySQL", "Firebase"],
    github: "https://github.com/tuusuario/fitness-app",
    live_url: "https://play.google.com/store/apps/details?id=com.fitness",
    featured: true,
    completion_date: "2024-02-20"
  },
  {
    id: 3,
    title: "Gestor de Tareas",
    description: "Aplicación web para gestión de tareas y proyectos con colaboración en tiempo real. Incluye tableros Kanban y sistema de notificaciones.",
    image: "/assets/images/projects/task-manager.jpg",
    category: "Web Development",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Material-UI"],
    github: "https://github.com/tuusuario/task-manager",
    live_url: "https://task-manager-demo.com",
    featured: false,
    completion_date: "2024-01-10"
  },  {
    id: 4,
    title: "Sitio Web de Bienestar",
    description: "Plataforma web para servicios de bienestar y salud. Incluye sistema de reservas, blog y área de miembros.",
    image: "/assets/images/projects/reiki-website.jpg",
    category: "Web Development",
    technologies: ["React", "Next.js", "Tailwind CSS", "Strapi CMS"],
    github: "https://github.com/tuusuario/wellness-website",
    live_url: "https://wellness-demo.com",
    featured: false,
    completion_date: "2023-12-05"
  },
  {
    id: 5,
    title: "API RESTful",
    description: "API robusta para aplicaciones móviles y web con autenticación JWT, documentación automática y tests unitarios.",
    image: "/assets/images/projects/rest-api.jpg",
    category: "Backend Development",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger"],
    github: "https://github.com/tuusuario/restful-api",
    live_url: "https://api-docs.com",
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
