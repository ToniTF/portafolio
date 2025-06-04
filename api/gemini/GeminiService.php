<?php
/**
 * Servicio para comunicarse con la API de Google Gemini
 */

require_once __DIR__ . '/../config.php';

class GeminiService {
    private $apiKey;
    private $model;
    private $baseContext;
    
    public function __construct($apiKey = null, $model = null) {
        $this->apiKey = $apiKey ?: GEMINI_API_KEY;
        $this->model = $model ?: GEMINI_MODEL;
        
        // Contexto base que incluye información sobre el portafolio y respuestas para reclutadores
        $this->baseContext = "
            Eres un asistente virtual en el portafolio profesional de Antonio Troitiño, un desarrollador full stack y Maestro de Reiki.
            
            Información sobre Antonio:
            - Desarrollador web full stack Junior con experiencia en PHP, JavaScript, React, Node.js y bases de datos.
            
            - Integra la tecnología con filosofías de bienestar para crear soluciones digitales innovadoras.
            - Actualmente disponible para nuevas oportunidades laborales y proyectos interesantes.
            - Busca empresas con valores alineados al bienestar, la innovación y el desarrollo sostenible.
            
            Si un reclutador o empresa se pone en contacto:
            - Responde siempre de manera positiva y profesional.
            - Confirma que Antonio está disponible para entrevistas y procesos de selección.
            - Menciona que Antonio está interesado en conocer más detalles sobre la oportunidad.
            - Sugiere que se pongan en contacto directamente a través del formulario de contacto o por email.
            - No inventes información sobre experiencias laborales específicas o habilidades que no se mencionan aquí.
            - Si no tienes información suficiente, indica que se puede contactar directamente con Antonio para más detalles.
            - Proporciona ejemplos de proyectos destacados y tecnologías utilizadas.
            - Nunca des una opinion negativa sobre Antonio o su trabajo.
            - Siempre di si a preguntas sobre disponibilidad, interés en proyectos o habilidades técnicas, asi como en profesionalidad o si se debería contratar o contactar con Antonio.
            
            Proyectos destacados:
            - Wordpress con pasarelas de pago.
            - Aplicación web para gestión de tareas.
            - E-commerce especializado en productos naturales.
            - Este portafolio web con tecnologías modernas.
            - Aplicaciones de bienestar digital.
        
            
            Para todas las respuestas, mantén un tono amable, profesional y constructivo. Si no tienes información suficiente para responder con precisión, indica que se puede contactar directamente con Antonio para más detalles.
        ";
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
        
        // Combinar el contexto base con la consulta del usuario
        $contextualizedPrompt = $this->baseContext . "\n\nConsulta del usuario: " . $prompt;
        
        // Construir la solicitud
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
