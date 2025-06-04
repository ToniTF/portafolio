<?php
/**
 * Servicio para comunicarse con la API de Google Gemini
 */

require_once __DIR__ . '/../config.php';

class GeminiService {
    private $apiKey;
    private $model;
    
    public function __construct($apiKey = null, $model = null) {
        $this->apiKey = $apiKey ?: GEMINI_API_KEY;
        $this->model = $model ?: GEMINI_MODEL;
    }
    
    /**
     * Genera texto usando la API de Gemini
     * 
     * @param string $prompt El texto de entrada para generar una respuesta
     * @param array $options Opciones adicionales para la generación
     * @return string La respuesta generada
     */
    public function generateText($prompt, $options = []) {
        // URL completa de la API
        $url = GEMINI_API_URL . $this->model . ":generateContent?key=" . $this->apiKey;
        
        // Configuración predeterminada
        $defaultOptions = [
            'temperature' => 0.7,
            'maxOutputTokens' => 800,
            'topP' => 0.8,
            'topK' => 40
        ];
        
        // Combinar opciones predeterminadas con las proporcionadas
        $options = array_merge($defaultOptions, $options);
        
        // Construir la solicitud
        $data = [
            'contents' => [
                [
                    'parts' => [
                        [
                            'text' => $prompt
                        ]
                    ]
                ]
            ],
            'generationConfig' => [
                'temperature' => $options['temperature'],
                'maxOutputTokens' => $options['maxOutputTokens'],
                'topP' => $options['topP'],
                'topK' => $options['topK']
            ]
        ];
        
        // Configurar cURL
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        // Ejecutar la solicitud
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        // Verificar errores
        if (curl_errno($ch)) {
            throw new Exception('Error al conectar con la API de Gemini: ' . curl_error($ch));
        }
        
        curl_close($ch);
        
        // Procesar la respuesta
        if ($httpCode !== 200) {
            $errorData = json_decode($response, true);
            $errorMessage = isset($errorData['error']['message']) 
                ? $errorData['error']['message'] 
                : 'Error desconocido de la API';
            
            throw new Exception('Error de la API de Gemini (HTTP ' . $httpCode . '): ' . $errorMessage);
        }
        
        $responseData = json_decode($response, true);
        
        // Extraer el texto generado
        if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
            return $responseData['candidates'][0]['content']['parts'][0]['text'];
        } else {
            throw new Exception('Formato de respuesta inesperado de la API de Gemini');
        }
    }
    
    /**
     * Lista los modelos disponibles en la API de Gemini
     * 
     * @return array Lista de modelos disponibles
     */
    public function listAvailableModels() {
        $url = "https://generativelanguage.googleapis.com/v1beta/models?key=" . $this->apiKey;
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json'
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        
        if (curl_errno($ch)) {
            throw new Exception('Error al conectar con la API de Gemini: ' . curl_error($ch));
        }
        
        curl_close($ch);
        
        if ($httpCode !== 200) {
            return false;
        }
        
        $responseData = json_decode($response, true);
        
        return isset($responseData['models']) ? $responseData['models'] : [];
    }
}
?>
