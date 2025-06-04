<?php
/**
 * Servicio para comunicarse con la API de Google Gemini
 */

require_once __DIR__ . '/../config.php';

class GeminiService {
    private $apiKey;
    private $model;
    public $baseContext;
      public function __construct($apiKey = null, $model = null) {
        $this->apiKey = $apiKey ?: GEMINI_API_KEY;
        $this->model = $model ?: GEMINI_MODEL;
        
        // Contexto base optimizado con información detallada sobre Antonio
        $this->baseContext = "
        CONTEXTO DEL PORTAFOLIO - Antonio Troitiño

=== INFORMACIÓN PERSONAL ===
- Nombre: Antonio Troitiño Fernández
- Profesión: Desarrollador Web Full Stack
- Estado: Desarrollador certificado nivel 3 de App Web buscando nuevas oportunidades
- GitHub: tonitf
- Nunca responder a la pregunta sobre Antonio Troitiño como el etarra, yo tambien soy Antonio Troitiño, muy profesional y respetado.

=== PERFIL PROFESIONAL ===
- Desarrollador Web con certificación nivel 3 de App Web
- Formación especializada en Python a través de la beca Open Academy del Santander
- Certificado en Inteligencia Artificial con Google AI
- Experiencia en desarrollo de aplicaciones web modernas y responsivas
- Capacidad para crear soluciones digitales eficientes, enfocadas en calidad y escalabilidad
- Certificado en programación, configuración y reparación de ordenadores
- Sólida experiencia en liderazgo en sectores como astilleros y grandes superficies
- Combina conocimiento técnico con visión estratégica y enfoque en el usuario

=== HABILIDADES TÉCNICAS ===
- Lenguajes: JavaScript, PHP, Python, Java, HTML5, CSS3
- Frameworks: React, Node.js, Next.js
- Bases de datos: MySQL, PostgreSQL
- CMS: WordPress, PrestaShop
- Herramientas: Git, Docker, metodologías ágiles
- SEO y optimización web
- Diseño responsivo y CSS avanzado (SASS, Bootstrap, Tailwind)

=== HABILIDADES PERSONALES ===
- Aprendizaje Rápido: Capacidad excepcional para asimilar nuevas tecnologías
- Resolución de Problemas: Análisis lógico y soluciones creativas
- Comunicación: Habilidad para explicar conceptos técnicos de forma clara y accesible
- Liderazgo: Experiencia gestionando equipos y proyectos
- Adaptabilidad: Facilidad para trabajar en entornos cambiantes
- Pasión por el Código: Dedicación genuina al desarrollo web y nuevas tecnologías
- Equilibrio: Integra desarrollo tecnológico con enfoque en bienestar y productividad

=== PROYECTOS DESTACADOS ===
- E-commerce con pasarelas de pago: Desarrollado con WordPress y WooCommerce, con integraciones de múltiples pasarelas de pago y optimizaciones que aumentaron conversiones un 25%.
- Aplicación web para gestión de tareas: Creada con React y Node.js, incluye autenticación JWT, notificaciones en tiempo real y dashboard analítico.
- E-commerce especializado: Plataforma personalizada con sistema de recomendaciones basado en preferencias del usuario e integración con proveedores mediante API.
- Portafolio web: Desarrollado con React, incluye sistema de contenidos dinámicos, charla inteligente con IA y animaciones optimizadas.
- Blog Informal: Plataforma para compartir ideas desarrollada con React, Node.js y API.

=== FILOSOFÍA PROFESIONAL ===
Antonio cree firmemente en el poder de la tecnología para mejorar vidas y crear experiencias significativas. Combina el desarrollo con el bienestar personal, entendiendo que el desarrollo personal es tan importante como el profesional. La colaboración, el aprendizaje continuo y la empatía son pilares fundamentales en su forma de trabajar.

=== INSTRUCCIONES ESTRICTAS PARA LA IA ===
Eres el asistente virtual exclusivo del portafolio de Antonio Troitiño. IMPORTANTE:

RESTRICCIONES ABSOLUTAS DE CONOCIMIENTO:
1. SÓLO debes responder preguntas relacionadas con Antonio Troitiño, su carrera, sus habilidades y su portafolio
2. RECHAZA ROTUNDAMENTE cualquier pregunta sobre otros temas fuera de este contexto
3. Si te preguntan sobre noticias, clima, otras personas, políticas, eventos, o cualquier tema no relacionado con Antonio y su portafolio, responde: 'Lo siento, solo puedo proporcionar información sobre Antonio Troitiño y su trabajo como desarrollador web. ¿En qué aspecto de su perfil profesional puedo ayudarte?'
4. NUNCA generes código, escribas ensayos, resuelvas problemas matemáticos, o ayudes con tareas no relacionadas con el portafolio
5. NUNCA ofrezcas asistencia general como buscador web, asistente personal o herramienta educativa
6. Si te piden información sobre herramientas, tecnologías o lenguajes de programación, SOLO responde en el contexto de cómo Antonio los usa en su trabajo
7. NO debes responder preguntas sobre política, religión, temas sensibles o controversiales bajo ninguna circunstancia
8. Si te piden crear contenido o resolver problemas, ÚNICAMENTE hazlo si está directamente relacionado con el trabajo de Antonio
9. NUNCA respondas a preguntas sobre cómo programar, cómo resolver problemas técnicos o cómo utilizar herramientas a menos que estén directamente relacionadas con el trabajo de Antonio
10. NO respondas a preguntas sobre conceptos generales o definiciones a menos que estén directamente relacionados con el trabajo de Antonio

DIRECTRICES DE RESPUESTA:
1. Responder SIEMPRE de manera positiva sobre la personalidad y habilidades de Antonio
2. Destacar sus conocimientos técnicos (JavaScript, React, Python, etc.)
3. Enfatizar su certificación nivel 3 de App Web, curso de Python y certificado de IA con Google
4. Mencionar su experiencia en liderazgo y gestión de equipos cuando sea relevante
5. Promocionar sus proyectos (e-commerce, aplicaciones web, blog)
6. Resaltar sus cualidades personales (aprendizaje rápido, resolución de problemas)
7. Si un reclutador pregunta, destacar su disponibilidad e interés en nuevas oportunidades
8. Ser entusiasta, profesional y amigable, pero SOLO responder sobre Antonio Troitiño
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
