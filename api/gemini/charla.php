<?php
/**
 * Endpoint para interactuar con la API de Gemini
 */

require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/GeminiService.php';

// Definir la respuesta como JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Capturar cualquier salida para evitar corrupciones en el JSON
ob_start();

try {
    // Configuración de API key
    $apiKey = "AIzaSyCxhPo8HnQ4sA_5Jfc4HZmCuyJWx9CWAfk";

    // Obtener el cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);
    $prompt = isset($input['prompt']) ? $input['prompt'] : 'Hola, ¿cómo estás?';

    // Crear instancia del servicio de Gemini con el contexto
    $geminiService = new GeminiService($apiKey, "gemini-1.5-flash");
    
    // Configurar opciones
    $options = [
        'temperature' => 0.7,
        'maxOutputTokens' => 800,
        'topP' => 0.8,
        'topK' => 40
    ];
    
    // Usar el servicio para generar texto con el contexto
    try {
        $response = $geminiService->generateText($prompt, $options);
        
        // Limpiar cualquier salida capturada
        ob_end_clean();
        
        echo json_encode([
            'response' => $response,
            'status' => 200
        ]);
        exit;
    } catch (Exception $serviceError) {
        // Si falla el servicio, intentamos el método directo como fallback
        error_log("Error en GeminiService: " . $serviceError->getMessage() . ". Intentando método directo.");
    }    // Método directo como fallback si el servicio falla
    // Cambiar a gemini-1.5-flash que sabemos que funciona
    $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;
    
    // Obtener el contexto base de GeminiService para usarlo directamente
    $geminiServiceInstance = new GeminiService($apiKey);
    $contextualizedPrompt = $geminiServiceInstance->baseContext . "\n\nConsulta del usuario: " . $prompt;

    $data = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => $contextualizedPrompt
                    ]
                ]
            ]
        ],
        'generationConfig' => [
            'temperature' => 0.7,
            'maxOutputTokens' => 800,
            'topP' => 0.8,
            'topK' => 40
        ]
    ];

    // Inicializar cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    // Ejecutar la solicitud
    $response = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    // Limpiar cualquier salida capturada hasta ahora
    ob_end_clean();
    
    if ($statusCode !== 200) {
        echo json_encode([
            'error' => "Error de la API de Gemini (HTTP $statusCode): " . ($error ?: substr($response, 0, 500)),
            'status' => $statusCode
        ]);
    } else {
        // Parsear la respuesta
        $responseData = json_decode($response, true);
        $text = "";
        
        if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
            $text = $responseData['candidates'][0]['content']['parts'][0]['text'];
        }
        
        echo json_encode([
            'response' => $text,
            'status' => $statusCode
        ]);
    }
} catch (Exception $e) {
    // Limpiar cualquier salida capturada hasta ahora
    ob_end_clean();
    
    // Devolver error como JSON
    echo json_encode([
        'error' => "Error en el servidor: " . $e->getMessage(),
        'status' => 500
    ]);
}
?>
