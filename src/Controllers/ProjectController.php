<?php

namespace Tonitf\Portafolio\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class ProjectController
{
    public function getAllProjects(Request $request, Response $response): Response
    {
        $data = [            [
                'id' => 1,
                'title' => 'E-commerce Moderno',
                'description' => 'Plataforma de comercio electrónico desarrollada con React y Node.js, con pasarela de pagos integrada y panel de administración completo.',
                'image' => '/assets/images/projects/ecommerce-project.jpg',
                'technologies' => ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
                'github' => 'https://github.com/tonitf/ecommerce-modern',
                'live_url' => 'https://ecommerce-demo.troitino.dev',
                'featured' => true,
                'category' => 'Web Application',
                'completion_date' => '2024-03-15'
            ],
            [
                'id' => 2,
                'title' => 'Dashboard Analítico',
                'description' => 'Panel de control con visualizaciones de datos en tiempo real para el análisis de métricas empresariales.',
                'image' => '/assets/images/projects/dashboard.jpg',
                'technologies' => ['Vue.js', 'D3.js', 'PHP', 'PostgreSQL'],
                'github' => 'https://github.com/tonitf/analytics-dashboard',
                'live_url' => 'https://dashboard-demo.troitino.dev',
                'featured' => true,
                'category' => 'Data Visualization',
                'completion_date' => '2024-01-20'
            ],
            [
                'id' => 3,
                'title' => 'App Móvil de Reiki',
                'description' => 'Aplicación móvil para sesiones de Reiki guiadas, meditaciones y seguimiento del progreso espiritual.',
                'image' => '/assets/images/projects/mobile-app.jpg',
                'technologies' => ['React Native', 'Firebase', 'Redux'],
                'github' => 'https://github.com/tonitf/reiki-mobile-app',
                'live_url' => null,
                'featured' => true,
                'category' => 'Mobile App',
                'completion_date' => '2023-11-10'
            ],
            [
                'id' => 4,
                'title' => 'Sistema de Gestión CRM',
                'description' => 'Sistema completo de gestión de clientes con automatización de procesos y generación de reportes.',
                'image' => '/assets/images/projects/rest-api.jpg',
                'technologies' => ['Laravel', 'MySQL', 'Bootstrap', 'jQuery'],
                'github' => 'https://github.com/tonitf/crm-system',
                'live_url' => 'https://crm-demo.troitino.dev',
                'featured' => false,
                'category' => 'Business Application',
                'completion_date' => '2023-08-05'
            ],
            [
                'id' => 5,
                'title' => 'Portfolio Personal',
                'description' => 'Este mismo portafolio que estás viendo, desarrollado con React y PHP, diseñado para mostrar la perfecta combinación entre tecnología y espiritualidad.',
                'image' => '/assets/images/projects/reiki-website.jpg',
                'technologies' => ['React', 'PHP', 'Slim Framework', 'CSS3'],
                'github' => 'https://github.com/tonitf/portafolio',
                'live_url' => 'https://troitino.dev',
                'featured' => true,
                'category' => 'Portfolio',
                'completion_date' => '2024-06-03'
            ]
        ];
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getProject(Request $request, Response $response, array $args): Response
    {
        $projectId = (int) $args['id'];
        
        // En una implementación real, esto vendría de una base de datos
        $projects = [
            1 => [
                'id' => 1,
                'title' => 'E-commerce Moderno',
                'description' => 'Plataforma de comercio electrónico desarrollada con React y Node.js, con pasarela de pagos integrada y panel de administración completo.',
                'long_description' => 'Esta plataforma de e-commerce fue diseñada desde cero con las últimas tecnologías web. Incluye un sistema completo de gestión de productos, carrito de compras, procesamiento de pagos con Stripe, sistema de usuarios con autenticación JWT, panel de administración con métricas en tiempo real, y está desplegada en AWS con auto-escalado.',
                'image' => '/assets/images/projects/ecommerce.jpg',
                'gallery' => [
                    '/assets/images/projects/ecommerce-1.jpg',
                    '/assets/images/projects/ecommerce-2.jpg',
                    '/assets/images/projects/ecommerce-3.jpg'
                ],
                'technologies' => ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'JWT', 'Express.js'],
                'github' => 'https://github.com/tonitf/ecommerce-modern',
                'live_url' => 'https://ecommerce-demo.troitino.dev',
                'featured' => true,
                'category' => 'Web Application',
                'completion_date' => '2024-03-15',
                'challenges' => [
                    'Integración completa con pasarela de pagos',
                    'Optimización de rendimiento para gran volumen de productos',
                    'Implementación de búsqueda avanzada con filtros'
                ],
                'features' => [
                    'Carrito de compras en tiempo real',
                    'Panel de administración completo',
                    'Sistema de reviews y calificaciones',
                    'Notificaciones push',
                    'Responsive design'
                ]
            ]
            // Otros proyectos...
        ];
        
        if (!isset($projects[$projectId])) {
            $response->getBody()->write(json_encode(['error' => 'Proyecto no encontrado']));
            return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
        }
        
        $response->getBody()->write(json_encode($projects[$projectId]));
        return $response->withHeader('Content-Type', 'application/json');
    }
}
