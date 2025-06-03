import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Code, 
  Heart,
  Clock,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Instagram
} from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    type: 'general',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: result.message })
        setFormData({
          name: '',
          email: '',
          subject: '',
          type: 'general',
          message: ''
        })
      } else {
        setSubmitStatus({ type: 'error', message: result.message })
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'tonitf@gmail.com',
      href: 'mailto:tonitf@gmail.com',
      description: 'Para consultas generales y proyectos'
    },
    {
      icon: Heart,
      title: 'Reiki',
      value: 'reiki@troitino.dev',
      href: 'mailto:reiki@troitino.dev',
      description: 'Para servicios de Reiki y sanación'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      value: '+34 XXX XXX XXX',
      href: 'tel:+34XXXXXXXXX',
      description: 'Llamadas y WhatsApp'
    },
    {
      icon: MapPin,
      title: 'Ubicación',
      value: 'España',
      href: null,
      description: 'Sesiones presenciales y remotas'
    }
  ]

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
    }
  ]

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Hablemos
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              ¿Tienes un proyecto en mente? ¿Necesitas servicios de Reiki? 
              Me encantaría conocerte y ver cómo puedo ayudarte.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Información de contacto */}
            <div className="lg:col-span-1 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Información de Contacto
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => {
                    const IconComponent = item.icon
                    const content = (
                      <motion.div
                        className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-lg hover-lift"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="text-blue-600" size={20} />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-blue-600 font-medium">{item.value}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                      </motion.div>
                    )

                    return item.href ? (
                      <a key={index} href={item.href}>
                        {content}
                      </a>
                    ) : (
                      <div key={index}>
                        {content}
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Horarios */}
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Horarios de Atención
                  </h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes - Viernes</span>
                    <span className="text-gray-900">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sábados</span>
                    <span className="text-gray-900">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Domingos</span>
                    <span className="text-gray-900">Solo Reiki</span>
                  </div>
                </div>
              </motion.div>

              {/* Redes sociales */}
              <motion.div
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Sígueme en Redes
                </h3>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon
                    return (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 bg-gray-100 rounded-lg text-gray-600 transition-colors duration-300 ${social.color}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Envíame un Mensaje
                </h2>

                {/* Estado del envío */}
                {submitStatus && (
                  <motion.div
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{submitStatus.message}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de consulta
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    >
                      <option value="general">Consulta general</option>
                      <option value="development">Proyecto de desarrollo</option>
                      <option value="reiki">Servicios de Reiki</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="Asunto de tu mensaje"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-vertical"
                      placeholder="Cuéntame sobre tu proyecto o consulta..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-primary text-white hover:shadow-lg hover:scale-105'
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner"></div>
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de servicios rápidos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              ¿Cómo Puedo Ayudarte?
            </h2>
            <p className="text-lg text-gray-600">
              Ofrezco dos áreas principales de servicio para cubrir tus necesidades.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Desarrollo Web
              </h3>
              <p className="text-gray-600 mb-6">
                Aplicaciones web modernas, sitios responsivos, e-commerce, 
                sistemas personalizados y consultoría técnica.
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>• Aplicaciones React y Vue.js</p>
                <p>• Backend con PHP y Node.js</p>
                <p>• Sistemas de gestión</p>
                <p>• Optimización y performance</p>
              </div>
              
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({...formData, type: 'development'})}
              >
                Hablar de mi proyecto
              </motion.button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-8 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-reiki rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={32} />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Servicios de Reiki
              </h3>
              <p className="text-gray-600 mb-6">
                Sesiones de sanación energética, iniciaciones, talleres de meditación 
                y acompañamiento en el crecimiento espiritual.
              </p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                <p>• Sesiones individuales</p>
                <p>• Iniciaciones en Reiki</p>
                <p>• Talleres grupales</p>
                <p>• Sanación a distancia</p>
              </div>
              
              <motion.button
                className="btn-reiki"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData({...formData, type: 'reiki'})}
              >
                Reservar sesión
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
