<?php
/**
 * Endpoint para interactuar con la API de Gemini
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/GeminiService.php';

// Definir la respuesta como JSON
header('Content-Type: application/json');

// Verificar el método de la solicitud
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el cuerpo de la solicitud como JSON
    $input = json_decode(file_get_contents('php://input'), true);
    $prompt = isset($input['prompt']) ? $input['prompt'] : '';
    
    // Validar que se haya proporcionado un prompt
    if (empty($prompt)) {
        echo json_encode([
            'success' => false,
            'error' => 'El prompt no puede estar vacío'
        ]);
        exit;
    }
    
    try {
        // Crear instancia del servicio de Gemini
        $geminiService = new GeminiService();
        
        // Generar respuesta
        $response = $geminiService->generateText($prompt);
        
        // Devolver respuesta exitosa
        echo json_encode([
            'success' => true,
            'response' => $response
        ]);
    } catch (Exception $e) {
        // Manejar errores
        echo json_encode([
            'success' => false,
            'error' => 'Error al procesar la petición: ' . $e->getMessage()
        ]);
    }
} else {
    // Método no permitido
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Método no permitido'
    ]);
}
?>
