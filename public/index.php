<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tonitf\Portafolio\Controllers\PortfolioController;
use Tonitf\Portafolio\Controllers\ProjectController;
use Tonitf\Portafolio\Controllers\ContactController;
use Tonitf\Portafolio\Controllers\HealthController;
use Tonitf\Portafolio\Controllers\AdminController;
use Tonitf\Portafolio\Middleware\LoggingMiddleware;

require __DIR__ . '/../vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$app = AppFactory::create();

// Middleware para CORS
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Middleware de logging
$app->add(new LoggingMiddleware());

// Middleware para servir archivos estáticos
$app->addErrorMiddleware(true, true, true);

// Rutas API
$app->group('/api', function ($group) {
    // Salud de la aplicación
    $group->get('/health', [HealthController::class, 'checkHealth']);
    
    // Información personal y CV
    $group->get('/about', [PortfolioController::class, 'getAbout']);
    $group->get('/experience', [PortfolioController::class, 'getExperience']);
    $group->get('/education', [PortfolioController::class, 'getEducation']);
    $group->get('/skills', [PortfolioController::class, 'getSkills']);
    $group->get('/reiki', [PortfolioController::class, 'getReikiInfo']);
    
    // Proyectos
    $group->get('/projects', [ProjectController::class, 'getAllProjects']);
    $group->get('/projects/{id}', [ProjectController::class, 'getProject']);
      // Contacto
    $group->post('/contact', [ContactController::class, 'sendMessage']);
    
    // Admin (protegido)
    $group->get('/admin/dashboard', [AdminController::class, 'getDashboard']);
    $group->post('/admin/cache/clear', [AdminController::class, 'clearCache']);
    $group->get('/admin/status', [AdminController::class, 'getSystemStatus']);
});

// Ruta principal para servir React App
$app->get('/{routes:.+}', function (Request $request, Response $response) {
    $response->getBody()->write(file_get_contents(__DIR__ . '/app.html'));
    return $response->withHeader('Content-Type', 'text/html');
});

$app->get('/', function (Request $request, Response $response) {
    $response->getBody()->write(file_get_contents(__DIR__ . '/app.html'));
    return $response->withHeader('Content-Type', 'text/html');
});

$app->run();
