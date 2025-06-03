#!/usr/bin/env php
<?php
/**
 * Script de migración de datos para el portafolio
 * Útil para importar datos desde archivos JSON o CSV
 */

require_once __DIR__ . '/vendor/autoload.php';

// Cargar variables de entorno
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

class DataMigrator
{
    public function run()
    {
        echo "🚀 Iniciando migración de datos...\n";
        
        // Ejemplo: crear estructura de directorios necesaria
        $this->createDirectories();
        
        // Ejemplo: validar configuración
        $this->validateConfig();
        
        echo "✅ Migración completada exitosamente!\n";
    }
    
    private function createDirectories()
    {
        $directories = [
            __DIR__ . '/logs',
            __DIR__ . '/assets/images/projects',
            __DIR__ . '/storage/uploads',
            __DIR__ . '/storage/cache'
        ];
        
        foreach ($directories as $dir) {
            if (!is_dir($dir)) {
                mkdir($dir, 0755, true);
                echo "📁 Directorio creado: $dir\n";
            }
        }
    }
    
    private function validateConfig()
    {
        $required = ['APP_NAME', 'APP_ENV', 'APP_URL'];
        $missing = [];
        
        foreach ($required as $var) {
            if (empty($_ENV[$var])) {
                $missing[] = $var;
            }
        }
        
        if (!empty($missing)) {
            echo "⚠️  Variables de entorno faltantes: " . implode(', ', $missing) . "\n";
        } else {
            echo "✅ Configuración validada correctamente\n";
        }
    }
}

// Ejecutar migración
$migrator = new DataMigrator();
$migrator->run();
