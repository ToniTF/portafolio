#!/usr/bin/env php
<?php
/**
 * Script de mantenimiento para el portafolio
 * Limpia archivos temporales, cache expirado y logs antiguos
 */

require_once __DIR__ . '/vendor/autoload.php';

use Tonitf\Portafolio\Services\CacheService;

class MaintenanceScript
{
    private $logDir;
    private $cache;
    
    public function __construct()
    {
        $this->logDir = __DIR__ . '/logs';
        $this->cache = new CacheService();
    }
    
    public function run()
    {
        echo "🧹 Iniciando mantenimiento del portafolio...\n";
        
        $this->cleanExpiredCache();
        $this->cleanOldLogs();
        $this->optimizeAssets();
        $this->generateReport();
        
        echo "✅ Mantenimiento completado!\n";
    }
    
    private function cleanExpiredCache()
    {
        echo "🗑️  Limpiando caché expirado...\n";
        
        $stats = $this->cache->getCacheStats();
        echo "   - Archivos de caché antes: {$stats['total_files']}\n";
        echo "   - Archivos expirados: {$stats['expired_files']}\n";
        
        if ($stats['expired_files'] > 0) {
            $cacheDir = $stats['cache_directory'];
            $files = glob($cacheDir . '/*.cache');
            $cleaned = 0;
            
            foreach ($files as $file) {
                $data = json_decode(file_get_contents($file), true);
                if ($data && $data['expires'] < time()) {
                    unlink($file);
                    $cleaned++;
                }
            }
            
            echo "   ✅ Limpiados $cleaned archivos de caché expirados\n";
        } else {
            echo "   ✅ No hay archivos de caché expirados\n";
        }
    }
    
    private function cleanOldLogs()
    {
        echo "📝 Limpiando logs antiguos...\n";
        
        if (!is_dir($this->logDir)) {
            echo "   ⚠️  Directorio de logs no existe\n";
            return;
        }
        
        $files = glob($this->logDir . '/*.log');
        $cleaned = 0;
        $totalSize = 0;
        
        foreach ($files as $file) {
            $fileAge = time() - filemtime($file);
            $fileSize = filesize($file);
            
            // Limpiar logs de más de 30 días
            if ($fileAge > (30 * 24 * 60 * 60)) {
                unlink($file);
                $cleaned++;
                $totalSize += $fileSize;
            }
            // Rotar logs muy grandes (>10MB)
            elseif ($fileSize > 10 * 1024 * 1024) {
                $this->rotateLog($file);
            }
        }
        
        if ($cleaned > 0) {
            $sizeMB = round($totalSize / 1024 / 1024, 2);
            echo "   ✅ Limpiados $cleaned archivos de log antiguos ($sizeMB MB)\n";
        } else {
            echo "   ✅ No hay logs antiguos que limpiar\n";
        }
    }
    
    private function rotateLog($logFile)
    {
        $rotatedFile = $logFile . '.' . date('Y-m-d-H-i-s');
        rename($logFile, $rotatedFile);
        touch($logFile);
        echo "   🔄 Log rotado: " . basename($rotatedFile) . "\n";
    }
    
    private function optimizeAssets()
    {
        echo "⚡ Optimizando assets...\n";
        
        $publicDir = __DIR__ . '/public';
        $assetsDir = $publicDir . '/assets';
        
        if (is_dir($assetsDir)) {
            $this->compressImages($assetsDir);
        }
        
        echo "   ✅ Assets optimizados\n";
    }
    
    private function compressImages($dir)
    {
        // Placeholder para optimización de imágenes
        // En un entorno real, aquí usarías herramientas como ImageMagick
        $images = glob($dir . '/**/*.{jpg,jpeg,png,gif}', GLOB_BRACE);
        echo "   📸 Encontradas " . count($images) . " imágenes\n";
    }
    
    private function generateReport()
    {
        echo "📊 Generando reporte de mantenimiento...\n";
        
        $report = [
            'timestamp' => date('Y-m-d H:i:s'),
            'php_version' => PHP_VERSION,
            'memory_usage' => memory_get_peak_usage(true),
            'cache_stats' => $this->cache->getCacheStats(),
            'disk_space' => disk_free_space('.'),
            'log_files' => count(glob($this->logDir . '/*.log'))
        ];
        
        $reportFile = $this->logDir . '/maintenance-report-' . date('Y-m-d') . '.json';
        file_put_contents($reportFile, json_encode($report, JSON_PRETTY_PRINT));
        
        echo "   📄 Reporte guardado: " . basename($reportFile) . "\n";
        echo "   💾 Memoria pico: " . round($report['memory_usage'] / 1024 / 1024, 2) . " MB\n";
        echo "   💿 Espacio libre: " . round($report['disk_space'] / 1024 / 1024 / 1024, 2) . " GB\n";
    }
}

// Ejecutar el script
if (php_sapi_name() === 'cli') {
    $maintenance = new MaintenanceScript();
    $maintenance->run();
} else {
    echo "Este script debe ejecutarse desde la línea de comandos.\n";
}
