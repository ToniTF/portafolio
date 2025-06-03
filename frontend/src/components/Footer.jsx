import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Instagram, Mail, Heart, Code } from 'lucide-react'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/tonitf',
      color: 'hover:text-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/antonio-troitino',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/antonio.reiki',
      color: 'hover:text-pink-600'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:antonio@troitino.dev',
      color: 'hover:text-green-600'
    }
  ]

  const quickLinks = [
    { name: 'Acerca de', path: '/about' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Reiki', path: '/reiki' },
    { name: 'Contacto', path: '/contact' }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo y descripción */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <motion.div
                className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-white font-bold text-lg">AT</span>
              </motion.div>
              <span className="font-display text-xl font-semibold">
                Antonio Troitiño
              </span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Desarrollador Full Stack apasionado por crear soluciones digitales innovadoras. 
              Maestro de Reiki dedicado al crecimiento espiritual y el bienestar.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-blue-400">
                <Code size={16} />
                <span className="text-sm">Desarrollo</span>
              </div>
              <div className="flex items-center space-x-1 text-amber-400">
                <Heart size={16} />
                <span className="text-sm">Reiki</span>
              </div>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sígueme</h3>
            <div className="flex flex-col space-y-3">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 text-gray-400 transition-colors duration-300 ${social.color}`}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IconComponent size={18} />
                    <span>{social.name}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Antonio Troitiño. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart size={16} className="text-red-500" />
              </motion.div>
              <span className="text-gray-400 text-sm">y tecnología</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
