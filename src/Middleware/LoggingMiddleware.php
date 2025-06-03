<?php

namespace Tonitf\Portafolio\Middleware;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class LoggingMiddleware
{
    private $logger;
    
    public function __construct()
    {
        $this->logger = new Logger('api');
        
        // Crear directorio de logs si no existe
        $logDir = __DIR__ . '/../../logs';
        if (!is_dir($logDir)) {
            mkdir($logDir, 0755, true);
        }
        
        $this->logger->pushHandler(new StreamHandler($logDir . '/api.log', Logger::INFO));
    }
    
    public function __invoke(Request $request, RequestHandler $handler): Response
    {
        $start = microtime(true);
        $method = $request->getMethod();
        $uri = $request->getUri()->getPath();
        $ip = $this->getClientIp($request);
        
        // Log de la request
        $this->logger->info('Request started', [
            'method' => $method,
            'uri' => $uri,
            'ip' => $ip,
            'user_agent' => $request->getHeaderLine('User-Agent')
        ]);
        
        // Procesar la request
        $response = $handler->handle($request);
        
        // Calcular tiempo de respuesta
        $duration = round((microtime(true) - $start) * 1000, 2);
        $statusCode = $response->getStatusCode();
        
        // Log de la response
        $this->logger->info('Request completed', [
            'method' => $method,
            'uri' => $uri,
            'ip' => $ip,
            'status_code' => $statusCode,
            'duration_ms' => $duration
        ]);
        
        // Log de errores si el status code es >= 400
        if ($statusCode >= 400) {
            $this->logger->warning('Request failed', [
                'method' => $method,
                'uri' => $uri,
                'ip' => $ip,
                'status_code' => $statusCode,
                'duration_ms' => $duration
            ]);
        }
        
        return $response;
    }
    
    private function getClientIp(Request $request): string
    {
        $headers = [
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_REAL_IP',
            'HTTP_CLIENT_IP',
            'REMOTE_ADDR'
        ];
        
        foreach ($headers as $header) {
            $ip = $request->getHeaderLine($header);
            if (!empty($ip)) {
                return $ip;
            }
        }
        
        return 'unknown';
    }
}
