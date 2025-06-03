import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Download, 
  MapPin, 
  Mail, 
  Phone,
  Calendar,
  Award,
  Code,
  Heart,
  BookOpen,
  Star
} from 'lucide-react'

const About = () => {
  const [aboutData, setAboutData] = useState(null)
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [skills, setSkills] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutResponse, experienceResponse, educationResponse, skillsResponse] = await Promise.all([
          fetch('/api/about'),
          fetch('/api/experience'),
          fetch('/api/education'),
          fetch('/api/skills')
        ])
        
        const aboutData = await aboutResponse.json()
        const experienceData = await experienceResponse.json()
        const educationData = await educationResponse.json()
        const skillsData = await skillsResponse.json()
        
        setAboutData(aboutData)
        setExperience(experienceData)
        setEducation(educationData)
        setSkills(skillsData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Acerca de Mí
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Conoce mi historia, experiencia y la pasión que impulsa mi trabajo 
              en el desarrollo y la sanación energética.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Información personal */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={aboutData?.photo || '/assets/images/antonio-profile.jpg'}
                  alt={aboutData?.name}
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-reiki rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="text-white" size={32} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                {aboutData?.name || 'Antonio Troitiño'}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {aboutData?.description || 
                'Desarrollador Full Stack con una perspectiva única que combina la innovación tecnológica con la sabiduría espiritual del Reiki.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <MapPin className="text-blue-500" size={20} />
                  <span>{aboutData?.location || 'España'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="text-blue-500" size={20} />
                  <span>{aboutData?.email || 'antonio@troitino.dev'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="text-blue-500" size={20} />
                  <span>{aboutData?.phone || '+34 XXX XXX XXX'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Code className="text-blue-500" size={20} />
                  <span>Desarrollador Full Stack</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <a
                  href="/assets/cv/antonio-troitino-cv.pdf"
                  download
                  className="btn-primary flex items-center space-x-2"
                >
                  <Download size={20} />
                  <span>Descargar CV</span>
                </a>
                <a
                  href="mailto:antonio@troitino.dev"
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Mail size={20} />
                  <span>Contactar</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experiencia */}
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
              Experiencia <span className="text-gradient">Profesional</span>
            </h2>
            <p className="text-lg text-gray-600">
              Mi trayectoria en el desarrollo de software y soluciones digitales.
            </p>
          </motion.div>

          <div className="relative">
            {/* Línea temporal */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-300"></div>

            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } mb-8`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-lg hover-lift">
                    <div className="flex items-center space-x-2 mb-3">
                      <Award className="text-blue-500" size={20} />
                      <span className="text-sm font-medium text-blue-600">
                        {exp.period}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 mb-4">
                      {exp.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="skill-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Punto en la línea temporal */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educación */}
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
              Formación <span className="text-gradient">Académica</span>
            </h2>
            <p className="text-lg text-gray-600">
              Mi preparación académica y certificaciones profesionales.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover-lift"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <BookOpen className="text-blue-500" size={24} />
                  <span className="text-sm font-medium text-blue-600">
                    {edu.period}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {edu.degree}
                </h3>
                <p className="text-blue-600 font-medium mb-3">
                  {edu.institution}
                </p>
                <p className="text-gray-600">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades */}
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
              Mis <span className="text-gradient">Habilidades</span>
            </h2>
            <p className="text-lg text-gray-600">
              Un equilibrio único entre competencias técnicas y espirituales.
            </p>
          </motion.div>

          {skills && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Habilidades técnicas */}
              <motion.div
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Code className="text-blue-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Habilidades Técnicas
                  </h3>
                </div>

                <div className="space-y-4">
                  {Object.entries(skills.technical).map(([category, techs]) => (
                    <div key={category}>
                      <h4 className="font-medium text-gray-800 mb-2 capitalize">
                        {category.replace('_', ' ')}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <span key={tech} className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Habilidades espirituales */}
              <motion.div
                className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Heart className="text-amber-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Habilidades Espirituales
                  </h3>
                </div>

                <div className="space-y-3">
                  {Object.entries(skills.spiritual).map(([key, value]) => (
                    <div key={key} className="flex items-start space-x-2">
                      <Star className="text-amber-500 mt-1 flex-shrink-0" size={16} />
                      <div>
                        <p className="font-medium text-gray-800 capitalize">
                          {key.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Habilidades blandas */}
              <motion.div
                className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Award className="text-green-600" size={24} />
                  <h3 className="text-xl font-semibold text-gray-900">
                    Habilidades Blandas
                  </h3>
                </div>

                <div className="space-y-2">
                  {skills.soft_skills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Star className="text-green-500" size={16} />
                      <span className="text-gray-800">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default About
