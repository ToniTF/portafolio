<?php
// api/gemini/test-direct.php
header('Content-Type: application/json');

// Configuración de API key
$apiKey = "AIzaSyCxhPo8HnQ4sA_5Jfc4HZmCuyJWx9CWAfk";

// Función para probar diferentes modelos
function testModel($modelName, $apiKey) {
    $url = "https://generativelanguage.googleapis.com/v1beta/models/{$modelName}:generateContent?key=" . $apiKey;

    $data = [
        'contents' => [
            [
                'parts' => [
                    [
                        'text' => "Hola, dime un chiste corto"
                    ]
                ]
            ]
        ]
    ];

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

    $response = curl_exec($ch);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    return [
        'model' => $modelName,
        'status' => $statusCode,
        'error' => $error,
        'response' => json_decode($response, true)
    ];
}

// Lista de modelos disponibles para probar
$models = [
    'gemini-pro',            // Modelo estándar, más liviano
    'gemini-pro-vision',     // Modelo para procesar imágenes y texto
    'gemini-1.0-pro',        // Versión anterior
    'gemini-1.0-pro-vision', // Versión anterior con visión
    'gemini-1.5-flash',      // Versión más rápida pero menos precisa
    'gemini-1.5-pro-latest'  // Última versión de 1.5
];

$results = [];

// Probar cada modelo
foreach ($models as $model) {
    $results[] = testModel($model, $apiKey);
}

echo json_encode([
    'results' => $results,
    'timestamp' => date('Y-m-d H:i:s')
]);
?>