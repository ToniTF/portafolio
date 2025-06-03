<?php

namespace Tonitf\Portafolio\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tonitf\Portafolio\Services\CacheService;

class PortfolioController
{
    private $cache;
    
    public function __construct()
    {
        $this->cache = new CacheService(1800); // 30 minutos de cache
    }

    public function getAbout(Request $request, Response $response): Response
    {
        $data = $this->cache->remember('portfolio.about', function() {
            return [
                'name' => 'Antonio Troitiño',
                'title' => 'Desarrollador Full Stack & Maestro de Reiki',
                'description' => 'Soy un desarrollador apasionado con años de experiencia creando soluciones digitales innovadoras. Combino la tecnología moderna con la sabiduría ancestral del Reiki para crear un equilibrio único entre el desarrollo profesional y el crecimiento espiritual.',
                'location' => 'España',
                'email' => 'antonio@troitino.dev',
                'phone' => '+34 XXX XXX XXX',
                'photo' => '/assets/images/antonio-profile.jpg',
                'social' => [
                    'github' => 'https://github.com/tonitf',
                    'linkedin' => 'https://linkedin.com/in/antonio-troitino',
                    'instagram' => 'https://instagram.com/antonio.reiki'
                ]
            ];
        });
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getExperience(Request $request, Response $response): Response
    {
        $data = $this->cache->remember('portfolio.experience', function() {
            return [
                [
                    'position' => 'Desarrollador Full Stack Senior',
                    'company' => 'Tech Innovation SL',
                    'period' => '2022 - Presente',
                    'description' => 'Desarrollo de aplicaciones web modernas con React, Node.js y PHP. Liderazgo de equipos de desarrollo y arquitectura de sistemas escalables.',
                    'technologies' => ['React', 'Node.js', 'PHP', 'PostgreSQL', 'AWS']
                ],
                [
                    'position' => 'Desarrollador Frontend',
                    'company' => 'Digital Solutions',
                    'period' => '2020 - 2022',
                    'description' => 'Creación de interfaces de usuario responsivas y experiencias digitales excepcionales.',
                    'technologies' => ['JavaScript', 'React', 'Vue.js', 'CSS3', 'HTML5']
                ],
                [
                    'position' => 'Desarrollador Web',
                    'company' => 'Freelance',
                    'period' => '2018 - 2020',
                    'description' => 'Desarrollo de sitios web y aplicaciones personalizadas para diversos clientes.',
                    'technologies' => ['PHP', 'WordPress', 'MySQL', 'jQuery']
                ]
            ];
        });
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getEducation(Request $request, Response $response): Response
    {
        $data = $this->cache->remember('portfolio.education', function() {
            return [
                [
                    'degree' => 'Ingeniería en Informática',
                    'institution' => 'Universidad Técnica',
                    'period' => '2014 - 2018',
                    'description' => 'Especialización en desarrollo de software y sistemas web.'
                ],
                [
                    'degree' => 'Maestro de Reiki Usui',
                    'institution' => 'Centro de Estudios Energéticos',
                    'period' => '2019',
                    'description' => 'Certificación completa en Reiki tradicional Usui, incluyendo todos los niveles y símbolos sagrados.'
                ],
                [
                    'degree' => 'Certificación AWS Solutions Architect',
                    'institution' => 'Amazon Web Services',
                    'period' => '2021',
                    'description' => 'Certificación profesional en arquitectura de soluciones en la nube.'
                ]
            ];
        });
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getSkills(Request $request, Response $response): Response
    {
        $data = $this->cache->remember('portfolio.skills', function() {
            return [
                'technical' => [
                    'frontend' => ['React', 'Vue.js', 'JavaScript ES6+', 'TypeScript', 'HTML5', 'CSS3', 'SASS'],
                    'backend' => ['PHP', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'MongoDB'],
                    'tools' => ['Git', 'Docker', 'AWS', 'Linux', 'VSCode', 'Webpack'],
                    'frameworks' => ['Laravel', 'Symfony', 'Express.js', 'Next.js']
                ],
                'spiritual' => [
                    'reiki' => 'Maestro certificado en Reiki Usui',
                    'meditation' => 'Práctica diaria de meditación y mindfulness',
                    'energy_healing' => 'Sanación energética y equilibrio de chakras',
                    'spiritual_coaching' => 'Guía espiritual y crecimiento personal'
                ],
                'soft_skills' => [
                    'Liderazgo de equipos',
                    'Comunicación efectiva',
                    'Resolución de problemas',
                    'Pensamiento creativo',
                    'Adaptabilidad',
                    'Empatía y intuición'
                ]
            ];
        });
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getReikiInfo(Request $request, Response $response): Response
    {
        $data = $this->cache->remember('portfolio.reiki_info', function() {
            return [
                'title' => 'Maestro de Reiki Usui',
                'description' => 'El Reiki es una técnica de sanación energética que promueve la relajación, reduce el estrés y facilita la curación natural. Como Maestro de Reiki, ofrezco sesiones de sanación y enseñanza para aquellos que buscan equilibrio y bienestar.',
                'services' => [
                    [
                        'name' => 'Sesiones de Reiki',
                        'description' => 'Sesiones individuales de sanación energética para equilibrar y armonizar tu energía vital.',
                        'duration' => '60 minutos',
                        'modality' => 'Presencial y a distancia'
                    ],
                    [
                        'name' => 'Iniciaciones Reiki',
                        'description' => 'Enseñanza y iniciación en los diferentes niveles de Reiki Usui.',
                        'levels' => ['Nivel I', 'Nivel II', 'Nivel III/Maestría'],
                        'includes' => 'Manual, certificado y seguimiento'
                    ],
                    [
                        'name' => 'Talleres de Meditación',
                        'description' => 'Talleres grupales de meditación y desarrollo espiritual.',
                        'frequency' => 'Semanales',
                        'format' => 'Presencial y online'
                    ]
                ],
                'philosophy' => 'Creo en la integración del desarrollo tecnológico con el crecimiento espiritual. La tecnología nos conecta con el mundo exterior, mientras que el Reiki nos conecta con nuestro mundo interior, creando un equilibrio perfecto para una vida plena.',
                'certifications' => [
                    'Maestro de Reiki Usui',
                    'Especialización en Reiki a distancia',
                    'Formación en Cristaloterapia',
                    'Instructor de Meditación Mindfulness'
                ]
            ];
        });
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
