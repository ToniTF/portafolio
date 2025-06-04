<?php
/**
 * Punto de entrada para la API de Gemini
 */

require_once __DIR__ . '/config.php';

// Obtener la ruta solicitada
$requestUri = $_SERVER['REQUEST_URI'];
$basePath = '/api/gemini/';

// Eliminar la ruta base y los parámetros de consulta
$path = parse_url($requestUri, PHP_URL_PATH);
$path = str_replace($basePath, '', $path);

// Redirigir según la ruta
switch ($path) {
    case '':
    case 'index':
        // Información sobre la API
        header('Content-Type: application/json');
        echo json_encode([
            'success' => true,
            'message' => 'API de Google Gemini',
            'endpoints' => [
                'POST /api/gemini/chat' => 'Interactuar con el modelo de chat',
                'GET /api/gemini/models' => 'Listar modelos disponibles'
            ]
        ]);
        break;
    
    case 'chat':
        // Endpoint de chat
        require_once __DIR__ . '/gemini/chat.php';
        break;
    
    case 'models':
        // Endpoint para listar modelos
        header('Content-Type: application/json');
        try {
            require_once __DIR__ . '/gemini/GeminiService.php';
            $geminiService = new GeminiService();
            $models = $geminiService->listAvailableModels();
            
            echo json_encode([
                'success' => true,
                'models' => $models
            ]);
        } catch (Exception $e) {
            echo json_encode([
                'success' => false,
                'error' => 'Error al obtener modelos: ' . $e->getMessage()
            ]);
        }
        break;
    
    default:
        // Endpoint no encontrado
        header('Content-Type: application/json');
        http_response_code(404);
        echo json_encode([
            'success' => false,
            'error' => 'Endpoint no encontrado'
        ]);
        break;
}
?>
