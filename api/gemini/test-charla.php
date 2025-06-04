<?php
/**
 * Archivo de prueba para la funcionalidad de charla de Gemini
 * Permite testear directamente el servicio de GeminiService con el contexto
 */
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/GeminiService.php';

// Configuración para CORS y JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Capturar cualquier salida para evitar corrupciones en el JSON
ob_start();

try {
    // Obtener el prompt de la consulta GET o usar uno predeterminado
    $prompt = isset($_GET['prompt']) ? $_GET['prompt'] : 'Hola, ¿quién eres?';
    $apiKey = "AIzaSyCxhPo8HnQ4sA_5Jfc4HZmCuyJWx9CWAfk"; // Usar la clave que sabemos que funciona
    
    // Crear instancia del servicio
    $geminiService = new GeminiService($apiKey, "gemini-1.5-flash");
    
    // Generar respuesta
    $response = $geminiService->generateText($prompt);
    
    // Limpiar cualquier salida capturada
    ob_end_clean();
    
    // Devolver respuesta
    echo json_encode([
        'prompt' => $prompt,
        'response' => $response,
        'status' => 'success'
    ]);
    
} catch (Exception $e) {
    // Limpiar cualquier salida capturada
    ob_end_clean();
    
    // Devolver error
    echo json_encode([
        'error' => $e->getMessage(),
        'status' => 'error'
    ]);
}
?>
