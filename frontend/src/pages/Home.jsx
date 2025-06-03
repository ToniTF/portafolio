import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Code, 
  Heart, 
  Download, 
  ExternalLink, 
  Github, 
  Linkedin,
  ChevronDown,
  Sparkles,
  Zap,
  ArrowRight,
  Mail,
  MapPin,
  Calendar
} from 'lucide-react'
import { getFeaturedProjects } from '../data/projects'
import { Card, Button, Badge } from '../components/ui/index.jsx'

const Home = () => {
  const { scrollY } = useScroll()
  
  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])

  // Obtener proyectos destacados de los datos estáticos
  const featuredProjects = getFeaturedProjects().slice(0, 3)

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 dark:bg-blue-300 rounded-full opacity-30"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Profile Image */}
            <motion.div
              className="relative mx-auto mb-8"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl relative">
                <img
                  src="/assets/images/antonio-profile.jpg"
                  alt="Antonio Troitiño"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
                {/* Floating badges */}
              <motion.div
                className="absolute -top-2 -right-2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Code size={16} className="inline mr-1" />
                Dev
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -left-2 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Code size={16} className="inline mr-1" />
                PHP
              </motion.div>
              
              <motion.div
                className="absolute -top-2 -left-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                animate={{ rotate: [0, 3, 0, -3, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              >
                <Code size={16} className="inline mr-1" />
                Python
              </motion.div>
              
              <motion.div
                className="absolute -bottom-2 -right-2 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                animate={{ rotate: [0, -3, 0, 3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: 1.5 }}
              >
                <Code size={16} className="inline mr-1" />
                React
              </motion.div>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Antonio
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  Troitiño
                </motion.span>
              </h1>
              
              <motion.div
                className="flex flex-wrap items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-4 py-2 text-lg">
                  <Code size={18} className="mr-2" />
                  Developer
                </Badge>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Diseñando{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
              soluciones digitales 
              </span>{' '}
              que combinan tecnología moderna con un enfoque estratégico y consciente, logrando innovación con claridad y propósito.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >              {/* <Button
                as={Link}
                to="/projects"
                size="lg"
                className="group"
              >
                <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                Ver Proyectos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button> */}
              
              {/* <Button
                as="a"
                href="/assets/cv/antonio-troitino-cv.pdf"
                download
                variant="secondary"
                size="lg"
                className="group"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Descargar CV
              </Button> */}
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center space-x-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <a
                href="https://github.com/tonitf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://linkedin.com/in/antonio-troitino"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:contacto@antoniotroitino.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </motion.div>

            {/* Scroll indicator */}
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={32} />
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* About Section Preview */}
      <section id="about" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Sobre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mí</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Desarrollador apasionado por aprender a crear experiencias digitales excepcionales
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Fusionando Tecnología y Conocimiento Interior
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Me especializo en crear aplicaciones modernas usando las últimas tecnologías. Mi enfoque combina tecnología con una visión consciente, aplico herramientas modernas con un enfoque reflexivo y estratégico, logrando soluciones que equilibran innovación y claridad.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {['React', 'Node.js', 'PHP', 'Python', 'TypeScript', 'MongoDB'].map((skill) => (
                  <Badge key={skill} variant="primary" className="px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
              <Button as={Link} to="/about" variant="outline">
                Conocer más sobre mí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/images/antonio-profile.jpg"
                  alt="Antonio trabajando"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Disponible para proyectos
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Proyectos <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Destacados</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Una selección de mis trabajos más recientes que demuestran mi experiencia 
              en desarrollo web y aplicaciones modernas.
            </p>          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group cursor-pointer h-full" hover>
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image || '/assets/images/projects/placeholder.jpg'}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex space-x-2">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <Github size={16} />
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies && project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Link
                        to={`/projects/${project.id}`}
                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium group"
                      >
                        <span>Ver detalles</span>
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>                  </Card>
                </motion.div>
              ))}
            </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button as={Link} to="/projects" size="lg">
              Ver Todos los Proyectos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para tu próximo proyecto?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Combino tecnología avanzada con intuición espiritual para crear 
              soluciones que realmente conectan con las personas.
            </p>            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button as={Link} to="/contact" variant="secondary" size="lg">
                <Mail className="mr-2 h-5 w-5" />
                Trabajemos Juntos
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
