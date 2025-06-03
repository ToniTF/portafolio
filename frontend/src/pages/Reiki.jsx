import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Sparkles, 
  Clock, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Award,
  Star,
  Flower,
  Zap,
  Users
} from 'lucide-react'

const Reiki = () => {
  const [reikiData, setReikiData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReikiData = async () => {
      try {
        const response = await fetch('/api/reiki')
        const data = await response.json()
        setReikiData(data)
      } catch (error) {
        console.error('Error fetching reiki data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReikiData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-reiki opacity-90"></div>
        
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full opacity-30"
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                opacity: [0.3, 0.8, 0.3]
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-8">
              <motion.div
                className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Flower className="text-white" size={40} />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              {reikiData?.title || 'Maestro de Reiki Usui'}
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-4xl mx-auto">
              {reikiData?.description || 
              'Sanación energética para el equilibrio del cuerpo, mente y espíritu'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="#servicios"
                className="btn-secondary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={20} />
                <span>Ver Servicios</span>
              </motion.a>
              
              <motion.a
                href="#contacto"
                className="btn-primary bg-white text-orange-600 hover:bg-gray-100 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Calendar size={20} />
                <span>Reservar Sesión</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ¿Qué es el Reiki? */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
                ¿Qué es el <span className="text-gradient-reiki">Reiki</span>?
              </h2>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                El Reiki es una técnica japonesa de sanación energética que promueve la relajación, 
                reduce el estrés y activa los procesos naturales de curación del cuerpo. 
                A través de la imposición de manos, se canaliza la energía universal para 
                equilibrar los centros energéticos del cuerpo.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Heart className="text-red-500" size={20} />
                  <span className="text-gray-700">Sanación natural</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="text-yellow-500" size={20} />
                  <span className="text-gray-700">Equilibrio energético</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Sparkles className="text-blue-500" size={20} />
                  <span className="text-gray-700">Relajación profunda</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Flower className="text-purple-500" size={20} />
                  <span className="text-gray-700">Crecimiento espiritual</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/assets/images/reiki-hands.jpg"
                alt="Sesión de Reiki"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-reiki rounded-full flex items-center justify-center shadow-lg animate-float">
                <Sparkles className="text-white" size={32} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Mis <span className="text-gradient-reiki">Servicios</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ofrezco una gama completa de servicios de Reiki adaptados a tus necesidades específicas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reikiData?.services?.map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover-lift"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="text-red-500" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  {service.duration && (
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>Duración: {service.duration}</span>
                    </div>
                  )}
                  
                  {service.modality && (
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>Modalidad: {service.modality}</span>
                    </div>
                  )}
                  
                  {service.frequency && (
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Frecuencia: {service.frequency}</span>
                    </div>
                  )}

                  {service.levels && (
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-2">Niveles disponibles:</p>
                      <div className="flex flex-wrap gap-1">
                        {service.levels.map((level) => (
                          <span key={level} className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.includes && (
                    <p className="text-gray-600 mt-2">
                      <strong>Incluye:</strong> {service.includes}
                    </p>
                  )}
                </div>

                <motion.button
                  className="w-full mt-6 bg-gradient-reiki text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Más información
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mi filosofía */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
              Mi <span className="text-gradient-reiki">Filosofía</span>
            </h2>
            
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
              <blockquote className="text-lg md:text-xl text-gray-700 italic leading-relaxed">
                "{reikiData?.philosophy || 
                'Creo en la integración del desarrollo tecnológico con el crecimiento espiritual. La tecnología nos conecta con el mundo exterior, mientras que el Reiki nos conecta con nuestro mundo interior, creando un equilibrio perfecto para una vida plena.'}"
              </blockquote>
              <div className="flex items-center justify-center mt-6">
                <div className="w-16 h-16 bg-gradient-reiki rounded-full flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Certificaciones y <span className="text-gradient-reiki">Formación</span>
            </h2>
            <p className="text-lg text-gray-600">
              Mi preparación y certificaciones en el campo de la sanación energética.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reikiData?.certifications?.map((cert, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover-lift flex items-center space-x-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <Award className="text-orange-500" size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {cert}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-20 bg-gradient-reiki">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              ¿Listo para tu Transformación?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
              Comienza tu viaje hacia el equilibrio y la sanación. 
              Estoy aquí para acompañarte en este proceso de crecimiento espiritual.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="tel:+34XXXXXXXXX"
                className="btn-secondary flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span>Llamar Ahora</span>
              </motion.a>
              
              <motion.a
                href="mailto:reiki@troitino.dev"
                className="btn-primary bg-white text-orange-600 hover:bg-gray-100 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span>Enviar Email</span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/34XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-reiki bg-green-500 hover:bg-green-600 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Users size={20} />
                <span>WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Reiki
