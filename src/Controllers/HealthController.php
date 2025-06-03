<?php

namespace Tonitf\Portafolio\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Tonitf\Portafolio\Services\CacheService;
use Exception;

class HealthController
{
    public function checkHealth(Request $request, Response $response): Response
    {
        $health = [
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => '1.0.0',
            'environment' => $_ENV['APP_ENV'] ?? 'unknown',
            'services' => [
                'php' => [
                    'status' => 'up',
                    'version' => PHP_VERSION
                ],                'disk_space' => $this->checkDiskSpace(),
                'logs' => $this->checkLogs(),
                'email' => $this->checkEmailConfig(),
                'cache' => $this->checkCache()
            ],
            'performance' => [
                'memory_usage' => round(memory_get_usage(true) / 1024 / 1024, 2) . ' MB',
                'memory_peak' => round(memory_get_peak_usage(true) / 1024 / 1024, 2) . ' MB'
            ]
        ];
        
        $response->getBody()->write(json_encode($health, JSON_PRETTY_PRINT));
        return $response->withHeader('Content-Type', 'application/json');
    }
    
    private function checkDiskSpace(): array
    {
        $bytes = disk_free_space('.');
        $gb = round($bytes / 1024 / 1024 / 1024, 2);
        
        return [
            'status' => $gb > 1 ? 'ok' : 'warning',
            'free_space_gb' => $gb
        ];
    }
    
    private function checkLogs(): array
    {
        $logDir = __DIR__ . '/../../logs';
        
        return [
            'status' => is_writable($logDir) ? 'ok' : 'error',
            'writable' => is_writable($logDir),
            'directory_exists' => is_dir($logDir)
        ];
    }
    
    private function checkEmailConfig(): array
    {
        $hasUsername = !empty($_ENV['SMTP_USERNAME']);
        $hasPassword = !empty($_ENV['SMTP_PASSWORD']);
        
        return [
            'status' => ($hasUsername && $hasPassword) ? 'configured' : 'not_configured',
            'smtp_configured' => $hasUsername && $hasPassword
        ];
    }
    
    private function checkCache(): array
    {
        try {
            $cache = new CacheService();
            $stats = $cache->getCacheStats();
            
            return [
                'status' => 'ok',
                'stats' => $stats
            ];
        } catch (Exception $e) {
            return [
                'status' => 'error',
                'error' => $e->getMessage()
            ];
        }
    }
}
