import React from 'react'
import { motion } from 'framer-motion'
import {
  Code,
  Heart,
  Star,
  Download,
  MapPin,
  Calendar,
  Award,
  Lightbulb,
  Users,
  Briefcase
} from 'lucide-react'
import { Card, Button, Badge } from '../components/ui/index.jsx'

const About = () => {
  const skills = [
    { name: 'JavaScript', level: 95, color: 'bg-yellow-500' },
    { name: 'React', level: 90, color: 'bg-blue-500' },
    { name: 'PHP', level: 88, color: 'bg-purple-500' },
    { name: 'Node.js', level: 85, color: 'bg-green-500' },
    { name: 'Python', level: 82, color: 'bg-blue-600' },
    { name: 'MySQL', level: 88, color: 'bg-orange-500' },
    { name: 'Git', level: 92, color: 'bg-red-500' },
    { name: 'Java', level: 78, color: 'bg-blue-500' },
    { name: 'Wordpress', level: 85, color: 'bg-green-500' },
    { name: 'Prestashop', level: 65, color: 'bg-purple-500' }
  ]

  const experiences = [
    {
      title: 'Desarrollador Full Stack Senior',
      company: 'Tech Solutions',
      period: '2022 - Presente',
      description: 'Desarrollo de aplicaciones web complejas usando React, Node.js y PHP. Liderazgo de equipo y arquitectura de sistemas.',
      technologies: ['React', 'Node.js', 'PHP', 'MySQL', 'AWS']
    },
    {
      title: 'Desarrollador Frontend',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Creación de interfaces de usuario modernas y responsivas. Optimización de rendimiento y experiencia de usuario.',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Sass']
    },
    {
      title: 'Desarrollador Junior',
      company: 'StartUp Inc',
      period: '2018 - 2020',
      description: 'Desarrollo de aplicaciones web y móviles. Aprendizaje de mejores prácticas y metodologías ágiles.',
      technologies: ['JavaScript', 'PHP', 'MySQL', 'Bootstrap']
    }
  ]

  const achievements = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Certificación AWS Solutions Architect',
      description: 'Arquitectura en la nube y mejores prácticas'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: '+50 Proyectos Completados',
      description: 'Aplicaciones web y móviles exitosas'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Liderazgo de Equipos',
      description: 'Gestión de equipos de desarrollo'
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: 'Innovación Tecnológica',
      description: 'Implementación de nuevas tecnologías'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Sobre <span className="text-blue-600 dark:text-blue-400">Mí</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Desarrollador Junior apasionado por crear soluciones innovadoras que combinan
            tecnología de vanguardia con experiencias de usuario excepcionales.
          </p>
        </motion.div>

        {/* Personal Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div>
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                  <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Mi Historia
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Apasionado por la tecnología y el desarrollo web, mi interés por la programación comenzó desde joven, experimentando con BASIC y explorando MS-DOS a nivel usuario
                </p>
                <p>
                  He completado formación certificada en desarrollo de aplicaciones web así como certificación Python a través de la beca Open Academy del Santander e Inteligencia Artificial con Google AI. Mi trayectoria profesional incluye roles de liderazgo en sectores como astilleros y grandes superficies, donde he desarrollado habilidades de gestión, resolución de problemas y trabajo en equipo.
                </p>
                <p>Cuento con un título en programación, configuración y reparación de ordenadores, lo que refuerza mi conocimiento técnico y mi capacidad para resolver problemas tecnológicos con eficacia.</p>
                <p>
                  Ahora, aplico esa experiencia a la creación de soluciones digitales eficientes, enfocadas en calidad, escalabilidad y buenas prácticas.
                </p>
              </div>

              <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500 dark:text-gray-400">S
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  España
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  20 años trabajando
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                  <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Valores y Filosofía
                </h2>
              </div>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Creo firmemente en el poder de la tecnología para mejorar vidas y
                  crear experiencias significativas.
                </p>
                <p>
                  Mi enfoque combina el desarrollo con el bienestar
                  personal, entiendo que el desarrollo personal es tan importante
                  como el profesional.
                </p>
                <p>
                  La colaboración, el aprendizaje continuo y la empatía son pilares
                  fundamentales en mi forma de trabajar y relacionarme.
                </p>
                <p>La innovación tecnológica no solo transforma industrias, sino que también impulsa un cambio positivo en la manera en que las personas interactúan con el mundo. Por eso, me apasiona desarrollar soluciones que no solo sean eficientes y escalables, sino que también generen impacto real, fomentando la creatividad, la accesibilidad y el equilibrio entre productividad y bienestar.

                </p>
                <p>Busco aportar valor a cada proyecto con una visión centrada en la innovación y el crecimiento impulsando soluciones que no solo resuelvan problemas, sino que también generen experiencias positivas.</p>           </div>

              {/* <Button className="mt-8 w-full" variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Descargar CV
              </Button> */}
            </Card>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <Card className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Habilidades Técnicas Asistidas por IA
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${skill.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>        {/* Experience Section - Temporalmente comentado
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Experiencia Profesional
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <Card className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-blue-600 dark:text-blue-400">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {exp.company}
                      </div>
                    </div>
                    <Badge variant="secondary" className="mt-2 md:mt-0">
                      {exp.period}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}        {/* Achievements Section - Temporalmente comentado
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Logros y Reconocimientos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
        */}
      </div>
    </div>
  )
}

export default About
