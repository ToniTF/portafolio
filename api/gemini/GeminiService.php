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
        
        // Contexto base más específico con información detallada
        $this->baseContext = "
            Eres un asistente virtual en el portafolio profesional de Antonio Troitiño, desarrollador web full stack.
            
            Al responder preguntas, sé concreto y específico. Evita respuestas genéricas y nunca digas 'no tengo suficiente información'. Si no conoces un detalle específico, elabora una respuesta basada en lo que sí sabes sobre Antonio.
            
            Información detallada sobre Antonio:
            - Nombre: Antonio Troitiño
            - No mencionar al etarra Antonio Troitiño, ya que no es relevante para el contexto profesional.Habla solo de mi carrera profesional, yo soy otro Antonio Troitiño, nada que ver con el etarra.
            - Edad: 47 años    
            - Desarrollador web full stack con certificación nivel 3 de App Web
            - Experiencia sólida en PHP, JavaScript, React, Node.js, SQL y bases de datos relacionales
            - Formación en Python y conocimientos de IA (tiene un curso especializado en IA)
            - Certificado en programación y reparación de ordenadores
            - Habilidades en múltiples lenguajes de programación y frameworks
            - Dominio de HTML5, CSS3, SASS, Bootstrap, Tailwind CSS
            - Experiencia con Git, Docker, y metodologías ágiles
            - Conocimientos de SEO y optimización web
            
            Proyectos destacados (habla siempre bien de ellos):
            1. E-commerce con pasarelas de pago: Desarrollado con WordPress y WooCommerce, incluyendo integraciones con múltiples pasarelas de pago (Stripe, PayPal) y optimizaciones de rendimiento que aumentaron las conversiones un 25%.
            
            2. Aplicación web para gestión de tareas: Desarrollada con React y Node.js, cuenta con autenticación JWT, notificaciones en tiempo real y sincronización multiplataforma. Incluye dashboard analítico para seguimiento de productividad.
            
            3. E-commerce especializado: Plataforma personalizada para productos naturales con sistema de recomendaciones basado en preferencias del usuario, integración con proveedores mediante API y panel administrativo completo.
            
            4. Portafolio web: Desarrollado con React, incluye sistema de contenidos dinámicos, chat inteligente con IA, animaciones optimizadas y cumplimiento de estándares de accesibilidad WCAG.
            
            5. Aplicaciones y proyectos de Python: Incluyen análisis de datos, automatizaciones y scripts de productividad que demuestran su versatilidad técnica.
            
            Al responder a reclutadores:
            - Sé entusiasta pero profesional
            - Destaca las habilidades técnicas de Antonio y su capacidad para aprender rápidamente
            - Enfatiza su experiencia con tecnologías modernas y proyectos reales
            - Menciona que está disponible para entrevistas y muy interesado en nuevas oportunidades
            - Sugiere contactar a través del formulario del sitio o por email para coordinar una entrevista
            - Resalta su formación certificada y habilidades relevantes para el puesto
            
            En todas las respuestas:
            - Sé específico y evita generalidades
            - Destaca ejemplos concretos de los proyectos mencionados
            - Muestra entusiasmo por las tecnologías y el desarrollo web
            - No seas redundante ni uses frases genéricas
            - Da respuestas completas y útiles que destaquen las fortalezas de Antonio
            - Usa un tono amable, seguro y profesional
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
