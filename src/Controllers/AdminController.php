<?php

namespace Tonitf\Portafolio\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tonitf\Portafolio\Services\CacheService;

class AdminController
{
    private $cache;
    
    public function __construct()
    {
        $this->cache = new CacheService();
    }
    
    public function getDashboard(Request $request, Response $response): Response
    {
        // Verificar autenticación básica (en producción usar JWT o similar)
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$this->isAuthenticated($authHeader)) {
            $response->getBody()->write(json_encode(['error' => 'No autorizado']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }
        
        $data = [
            'system_info' => $this->getSystemInfo(),
            'cache_stats' => $this->cache->getCacheStats(),
            'log_stats' => $this->getLogStats(),
            'api_stats' => $this->getApiStats(),
            'recent_contacts' => $this->getRecentContacts()
        ];
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function clearCache(Request $request, Response $response): Response
    {
        $authHeader = $request->getHeaderLine('Authorization');
        if (!$this->isAuthenticated($authHeader)) {
            $response->getBody()->write(json_encode(['error' => 'No autorizado']));
            return $response->withStatus(401)->withHeader('Content-Type', 'application/json');
        }
        
        $success = $this->cache->clear();
        
        $response->getBody()->write(json_encode([
            'success' => $success,
            'message' => $success ? 'Caché limpiado exitosamente' : 'Error al limpiar caché'
        ]));
        
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    public function getSystemStatus(Request $request, Response $response): Response
    {
        $data = [
            'status' => 'online',
            'timestamp' => date('Y-m-d H:i:s'),
            'uptime' => $this->getUptime(),
            'version' => '1.0.0',
            'environment' => $_ENV['APP_ENV'] ?? 'production'
        ];
        
        $response->getBody()->write(json_encode($data));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    private function isAuthenticated(string $authHeader): bool
    {
        // Autenticación básica simple (mejorar en producción)
        $adminToken = $_ENV['ADMIN_TOKEN'] ?? 'admin123';
        
        if (strpos($authHeader, 'Bearer ') === 0) {
            $token = substr($authHeader, 7);
            return $token === $adminToken;
        }
        
        return false;
    }
    
    private function getSystemInfo(): array
    {
        return [
            'php_version' => PHP_VERSION,
            'memory_usage' => [
                'current' => memory_get_usage(true),
                'peak' => memory_get_peak_usage(true),
                'limit' => ini_get('memory_limit')
            ],
            'disk_space' => [
                'free' => disk_free_space('.'),
                'total' => disk_total_space('.')
            ],
            'server_time' => date('Y-m-d H:i:s'),
            'timezone' => date_default_timezone_get()
        ];
    }
    
    private function getLogStats(): array
    {
        $logDir = __DIR__ . '/../../logs';
        $files = glob($logDir . '/*.log');
        
        $stats = [
            'total_files' => count($files),
            'total_size' => 0,
            'files' => []
        ];
        
        foreach ($files as $file) {
            $size = filesize($file);
            $stats['total_size'] += $size;
            $stats['files'][] = [
                'name' => basename($file),
                'size' => $size,
                'modified' => date('Y-m-d H:i:s', filemtime($file))
            ];
        }
        
        return $stats;
    }
    
    private function getApiStats(): array
    {
        // Análisis básico de logs de API
        $logFile = __DIR__ . '/../../logs/api.log';
        
        if (!file_exists($logFile)) {
            return ['requests_today' => 0, 'errors_today' => 0];
        }
        
        $today = date('Y-m-d');
        $content = file_get_contents($logFile);
        $lines = explode("\n", $content);
        
        $requestsToday = 0;
        $errorsToday = 0;
        
        foreach ($lines as $line) {
            if (strpos($line, $today) !== false) {
                if (strpos($line, 'Request completed') !== false) {
                    $requestsToday++;
                }
                if (strpos($line, 'Request failed') !== false) {
                    $errorsToday++;
                }
            }
        }
        
        return [
            'requests_today' => $requestsToday,
            'errors_today' => $errorsToday,
            'error_rate' => $requestsToday > 0 ? round(($errorsToday / $requestsToday) * 100, 2) : 0
        ];
    }
    
    private function getRecentContacts(): array
    {
        $logFile = __DIR__ . '/../../logs/contact.log';
        
        if (!file_exists($logFile)) {
            return [];
        }
        
        $content = file_get_contents($logFile);
        $entries = explode('---', $content);
        
        $contacts = [];
        $count = 0;
        
        // Obtener los últimos 5 contactos
        for ($i = count($entries) - 1; $i >= 0 && $count < 5; $i--) {
            $entry = trim($entries[$i]);
            if (!empty($entry)) {
                // Extraer información básica del log
                preg_match('/\[(.*?)\] (.*?) - Mensaje de (.*?) \((.*?)\)/', $entry, $matches);
                
                if (count($matches) >= 5) {
                    $contacts[] = [
                        'timestamp' => $matches[1],
                        'status' => $matches[2],
                        'name' => $matches[3],
                        'email' => $matches[4]
                    ];
                    $count++;
                }
            }
        }
        
        return $contacts;
    }
    
    private function getUptime(): string
    {
        // Simulación simple de uptime
        $startFile = __DIR__ . '/../../storage/app_start.txt';
        
        if (!file_exists($startFile)) {
            file_put_contents($startFile, time());
        }
        
        $startTime = (int) file_get_contents($startFile);
        $uptime = time() - $startTime;
        
        $days = floor($uptime / 86400);
        $hours = floor(($uptime % 86400) / 3600);
        $minutes = floor(($uptime % 3600) / 60);
        
        return "{$days}d {$hours}h {$minutes}m";
    }
}
