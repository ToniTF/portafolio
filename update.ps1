# Script de actualización del portafolio
# Ejecuta tareas comunes de mantenimiento y actualización

Write-Host "🔄 Actualizando portafolio de Antonio Troitiño..." -ForegroundColor Cyan

# Actualizar dependencias de PHP
Write-Host "📦 Actualizando dependencias de PHP..." -ForegroundColor Yellow
composer update

# Actualizar dependencias de Node.js
Write-Host "📦 Actualizando dependencias de Node.js..." -ForegroundColor Yellow
npm update

# Limpiar cache si existe
Write-Host "🧹 Limpiando cache..." -ForegroundColor Yellow
if (Test-Path "storage/cache") {
    Remove-Item -Path "storage/cache/*" -Force -Recurse -ErrorAction SilentlyContinue
}

# Compilar assets del frontend
Write-Host "🏗️ Compilando assets del frontend..." -ForegroundColor Yellow
npm run build

# Ejecutar migración de datos
Write-Host "📊 Ejecutando migración de datos..." -ForegroundColor Yellow
php migrate.php

# Verificar permisos
Write-Host "🔒 Verificando permisos..." -ForegroundColor Yellow
if (Test-Path "logs") {
    # En Windows, los permisos se manejan diferente
    Write-Host "📁 Directorio de logs existe: logs/" -ForegroundColor Green
}

Write-Host "✅ Actualización completada exitosamente!" -ForegroundColor Green
Write-Host "🌐 El portafolio está listo en: http://localhost:8000" -ForegroundColor Cyan
