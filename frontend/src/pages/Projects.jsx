import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react'
import { projectsData, getCategories } from '../data/projects'

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState('grid')

  // Obtener categorías disponibles
  const categories = getCategories()

  // Inicializar con todos los proyectos
  useEffect(() => {
    setFilteredProjects(projectsData)
  }, [])
  useEffect(() => {
    let filtered = projectsData

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => 
        project.category.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    setFilteredProjects(filtered)  }, [searchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="loading-spinner"></div>
      </div>
    )  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="py-20 bg-gradient-primary dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Mis Proyectos
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Una colección de proyectos que reflejan mi pasión por el desarrollo 
              y mi compromiso con la excelencia técnica.
            </p>
          </motion.div>
        </div>
      </section>      {/* Filtros y búsqueda */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Búsqueda */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filtros de categoría */}
            <div className="flex items-center space-x-4">
              <Filter size={20} className="text-gray-600 dark:text-gray-400" />
              <select                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Vista */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No se encontraron proyectos con los filtros actuales.</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
                : 'space-y-6'
            }>
              {filteredProjects.map((project, index) => (                <motion.div
                  key={project.id}
                  className={`project-card bg-white dark:bg-gray-800 ${viewMode === 'list' ? 'flex' : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {viewMode === 'grid' ? (
                    // Vista de grid
                    <>
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute top-4 right-4">
                          {project.featured && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Destacado
                            </span>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-70 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 hover:translate-y-0 hover:opacity-100 transition-all duration-300">
                          <div className="flex space-x-2">
                            {project.github && (                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                              >
                                <Github size={16} />
                              </a>
                            )}
                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                              >
                                <ExternalLink size={16} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6">                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Tag size={14} className="mr-1" />
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {new Date(project.completion_date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="skill-tag">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="skill-tag">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                          <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                          <span>Ver detalles</span>
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </>
                  ) : (
                    // Vista de lista
                    <>
                      <div className="w-full md:w-1/3 h-48 md:h-auto">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 p-6">
                        <div className="flex items-center justify-between mb-2">                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Tag size={14} className="mr-1" />
                              {project.category}
                            </span>                            <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(project.completion_date).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          {project.featured && (
                            <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Destacado
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="skill-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Link
                            to={`/projects/${project.id}`}
                            className="btn-primary"
                          >
                            Ver detalles
                          </Link>
                          
                          {project.github && (
                            <a                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                            >
                              <Github size={16} />
                              <span>GitHub</span>
                            </a>
                          )}
                          
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
                            >
                              <ExternalLink size={16} />
                              <span>Ver sitio</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Botón para GitHub */}      <motion.div
        className="text-center mt-12 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <a
          href="https://github.com/ToniTF?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors duration-300"
        >
          Ver Repositorios en GitHub
          <Github className="ml-2 h-5 w-5" />
        </a>
      </motion.div>
    </div>
  )
}

export default Projects
