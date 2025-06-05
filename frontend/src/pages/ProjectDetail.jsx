import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Github, 
  ExternalLink, 
  Calendar, 
  Tag, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react'
import { getProjectById } from '../data/projects'

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const project = getProjectById(id)
    if (project) {
      setProject(project)
    } else {
      setError('Proyecto no encontrado')
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (error || !project) {
    return (      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {error || 'Proyecto no encontrado'}
          </h2>
          <Link to="/projects" className="btn-primary">
            Volver a proyectos
          </Link>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              to="/projects" 
              className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
            >
              <ArrowLeft size={20} />
              <span>Volver a proyectos</span>
            </Link>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Tag size={14} className="mr-1" />
                    {project.category}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {new Date(project.completion_date).toLocaleDateString('es-ES')}
                  </span>
                  {project.featured && (
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destacado
                    </span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6 max-w-3xl">
                  {project.long_description || project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="skill-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-3 mt-6 lg:mt-0 lg:ml-8">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Github size={20} />
                    <span>Ver en GitHub</span>
                  </a>
                )}
                
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <ExternalLink size={20} />
                    <span>Ver proyecto</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Imagen principal */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-96 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Columna principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Galería de imágenes */}
              {project.gallery && project.gallery.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Galería del Proyecto
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        className="rounded-lg overflow-hidden shadow-lg hover-lift"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={image}
                          alt={`${project.title} - Vista ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Características */}
              {project.features && project.features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Características Principales
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30">
                    <ul className="space-y-3">
                      {project.features.map((feature, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Desafíos */}
              {project.challenges && project.challenges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Desafíos Técnicos
                  </h2>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30">
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <Lightbulb className="text-amber-500 mt-0.5 flex-shrink-0" size={20} />
                          <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Información del proyecto */}              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Información del Proyecto
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Categoría</span>
                    <p className="text-gray-900 dark:text-gray-300">{project.category}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha de Finalización</span>
                    <p className="text-gray-900 dark:text-gray-300">
                      {new Date(project.completion_date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                    <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tecnologías</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Enlaces */}              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg dark:shadow-gray-900/30"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Enlaces
                </h3>
                
                <div className="space-y-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <Github size={18} />
                      <span>Repositorio en GitHub</span>
                    </a>
                  )}
                    {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink size={18} />
                      <span>Ver proyecto en vivo</span>
                    </a>
                  )}
                </div>
              </motion.div>

              {/* CTA */}              <motion.div
                className="bg-gradient-primary dark:bg-gradient-to-r dark:from-blue-900 dark:to-purple-900 rounded-xl p-6 text-white text-center"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-2">
                  ¿Te gusta este proyecto?
                </h3>
                <p className="text-blue-100 mb-4">
                  Hablemos sobre cómo puedo ayudarte con tu próximo proyecto.
                </p>
                <Link to="/contact" className="btn-secondary">
                  Contactar
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProjectDetail
