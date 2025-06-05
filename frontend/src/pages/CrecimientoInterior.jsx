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
            </div>            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-yellow-300">Mindfulness</span>
            </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-4xl mx-auto">
              Un viaje hacia el bienestar integral que combina técnicas de atención plena 
              con herramientas modernas de desarrollo personal y crecimiento espiritual
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
                Creo firmemente en la integración del desarrollo tecnológico con las prácticas de mindfulness. 
                La tecnología nos conecta con el mundo exterior, mientras que la atención plena nos conecta 
                con nuestro mundo interno, creando un equilibrio perfecto para una vida plena.
              </p>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                Mi misión es acompañarte en este viaje de autodescubrimiento, combinando técnicas de mindfulness 
                con herramientas modernas de coaching y desarrollo personal.
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
                  </div>                  <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                    "El mindfulness no es un destino, sino un viaje continuo de 
                    autodescubrimiento y presencia consciente."
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
            </h2>            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Ofrezco una gama completa de servicios de mindfulness y desarrollo personal adaptados a tus necesidades específicas.
            </p>
          </motion.div>

          {/* Tarjetas de Servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicios.map((servicio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                      <Sparkles className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {servicio.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {servicio.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span><strong>Duración:</strong> {servicio.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span><strong>Modalidad:</strong> {servicio.modality}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span><strong>Frecuencia:</strong> {servicio.frequency}</span>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Incluye:</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {servicio.includes}
                    </p>
                  </div>
                  
                  <Button className="mt-6 w-full" variant="secondary" as="a" href="#contacto">
                    Reservar Sesión
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
              <span className="text-purple-600 dark:text-purple-400">Certificaciones</span> y Formación
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Mi compromiso con la excelencia y el desarrollo profesional continuo.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificaciones.map((certificacion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-l-4 border-purple-500 dark:border-purple-400">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                      <Award className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {certificacion}
                    </h3>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
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
              <span className="text-purple-600 dark:text-purple-400">Testimonios</span> y Experiencias
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Descubre cómo las prácticas de mindfulness han transformado la vida de mis clientes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonio 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-none">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="#facc15" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                  "Las sesiones de Reiki con Antonio han sido transformadoras. He experimentado una profunda 
                  sensación de paz y claridad mental que me ha ayudado a enfrentar desafíos personales."
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white">María G.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Profesional de marketing</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Testimonio 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-none">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="#facc15" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                  "El coaching con Antonio me ha permitido descubrir mi verdadero potencial. Sus técnicas de 
                  mindfulness integradas en el proceso de coaching son simplemente poderosas."
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Juan P.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Emprendedor</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Testimonio 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 border-none">
                <div className="flex justify-center mb-6">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="#facc15" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                  "Participar en los talleres de mindfulness ha sido una de las mejores decisiones que he tomado. 
                  La guía de Antonio y las técnicas aprendidas han cambiado mi perspectiva de la vida."
                </p>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Laura R.</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Diseñadora gráfica</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contacto y Reservas */}
      <section id="contacto" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Reserva tu <span className="text-purple-600 dark:text-purple-400">Sesión</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Contáctame para programar una consulta inicial gratuita o reservar una sesión.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Ubicación</h4>
                      <p className="text-gray-600 dark:text-gray-400">Sesiones online y presenciales en Madrid</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                      <p className="text-purple-600 dark:text-purple-400">
                        <a href="mailto:contacto@antoniotroitino.com">contacto@antoniotroitino.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-purple-600 dark:text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Teléfono</h4>
                      <p className="text-purple-600 dark:text-purple-400">
                        <a href="tel:+34600000000">+34 600 000 000</a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Horario de Atención</h4>
                  <div className="space-y-2 text-gray-600 dark:text-gray-400">
                    <p>Lunes a Viernes: 10:00 - 20:00</p>
                    <p>Sábados: 10:00 - 14:00</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="p-6 h-full">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Reserva una Sesión
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Completa el siguiente formulario para reservar tu sesión. Me pondré en contacto contigo 
                  para confirmar la cita y proporcionarte más detalles.
                </p>
                
                {/* Formulario de Reserva */}
                <form action="#" method="POST" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        required
                        className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 focus:outline-none"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 focus:outline-none"
                        placeholder="Tu email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Mensaje
                    </label>
                    <textarea
                      name="mensaje"
                      id="mensaje"
                      rows="4"
                      required
                      className="mt-1 block w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-600 dark:focus:ring-purple-400 focus:outline-none"
                      placeholder="Escribe tu mensaje o consulta"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center justify-end">
                    <Button type="submit" className="w-full sm:w-auto" variant="primary">
                      Reservar Sesión
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CrecimientoInterior
