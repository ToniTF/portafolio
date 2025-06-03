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
  Users,
  Brain,
  Target,
  BookOpen,
  Lightbulb
} from 'lucide-react'
import { Card, Button, Badge } from '../components/ui/index.jsx'

const CrecimientoInterior = () => {
  const [loading, setLoading] = useState(false)

  const servicios = [
    {
      name: "Reiki Usui",
      description: "Sanación energética tradicional japonesa para equilibrar cuerpo, mente y espíritu.",
      duration: "60-90 minutos",
      modality: "Presencial/Online",
      frequency: "Semanal/Quincenal",
      includes: "Diagnóstico energético, sesión de sanación, meditación guiada"
    },
    {
      name: "Coaching Personal",
      description: "Acompañamiento en procesos de transformación personal y profesional.",
      duration: "60 minutos",
      modality: "Presencial/Online",
      frequency: "Semanal",
      includes: "Plan personalizado, herramientas prácticas, seguimiento continuo"
    },
    {
      name: "Talleres de Mindfulness",
      description: "Aprende técnicas de atención plena para reducir el estrés y aumentar la consciencia.",
      duration: "2 horas",
      modality: "Grupal/Individual",
      frequency: "Mensual",
      includes: "Manual de ejercicios, audios de meditación, certificado"
    },
    {
      name: "Constelaciones Familiares",
      description: "Técnica terapéutica para sanar patrones familiares y encontrar equilibrio.",
      duration: "3 horas",
      modality: "Grupal",
      frequency: "Mensual",
      includes: "Sesión grupal, trabajo individual, integración"
    }
  ]

  const certificaciones = [
    "Maestro Reiki Usui Nivel III",
    "Coach Certificado ICF",
    "Instructor de Mindfulness MBSR",
    "Facilitador de Constelaciones Familiares",
    "Terapeuta Holístico Certificado",
    "Especialista en Bienestar Corporativo"
  ]

  const beneficios = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Sanación Emocional",
      description: "Libera bloqueos emocionales y encuentra paz interior"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Claridad Mental",
      description: "Mejora tu concentración y toma de decisiones"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Equilibrio Energético",
      description: "Armoniza tus centros energéticos y vitalidad"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Propósito de Vida",
      description: "Descubre tu misión y camino de crecimiento"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
        {/* Partículas flotantes */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30"
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
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity }
                }}
              >
                <Flower className="text-white" size={40} />
              </motion.div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Crecimiento <span className="text-yellow-300">Interior</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Un viaje hacia el bienestar integral que combina técnicas ancestrales 
              con herramientas modernas de desarrollo personal
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="#servicios"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={20} />
                <span>Explorar Servicios</span>
              </motion.a>
              
              <motion.a
                href="#contacto"
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
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

      {/* Filosofía y Enfoque */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Mi <span className="text-purple-600 dark:text-purple-400">Enfoque</span>
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Creo firmemente en la integración del desarrollo tecnológico con el crecimiento espiritual. 
                La tecnología nos conecta con el mundo exterior, mientras que las prácticas de crecimiento 
                interior nos conectan con nuestro mundo interno, creando un equilibrio perfecto para una vida plena.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Mi misión es acompañarte en este viaje de autodescubrimiento, combinando técnicas ancestrales 
                como el Reiki con herramientas modernas de coaching y desarrollo personal.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {beneficios.map((beneficio, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="text-purple-500 dark:text-purple-400">
                      {beneficio.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {beneficio.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {beneficio.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="text-white" size={32} />
                  </div>
                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                    "El crecimiento interior no es un destino, sino un viaje continuo de 
                    autodescubrimiento y transformación."
                  </blockquote>
                  <p className="text-sm text-gray-500 dark:text-gray-400">- Antonio Troitiño</p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Mis <span className="text-purple-600 dark:text-purple-400">Servicios</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ofrezco una gama completa de servicios de crecimiento personal adaptados a tus necesidades específicas.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Heart className="text-white" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {servicio.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {servicio.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} />
                      <span>Duración: {servicio.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} />
                      <span>Modalidad: {servicio.modality}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>Frecuencia: {servicio.frequency}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Incluye:</strong> {servicio.includes}
                    </p>
                  </div>

                  <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Más información
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certificaciones y <span className="text-purple-600 dark:text-purple-400">Formación</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Mi preparación y certificaciones en el campo del crecimiento personal y sanación energética.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificaciones.map((cert, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <Award className="text-purple-500" size={24} />
                </div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {cert}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section id="contacto" className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para tu Transformación?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Comienza tu viaje hacia el equilibrio y el crecimiento personal. 
              Estoy aquí para acompañarte en este proceso de transformación.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.a
                href="mailto:antonio@troitino.dev"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span>Enviar Email</span>
              </motion.a>
              
              <motion.a
                href="tel:+34XXXXXXXXX"
                className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span>Llamar Ahora</span>
              </motion.a>
              
              <motion.a
                href="https://wa.me/34XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2"
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

export default CrecimientoInterior
