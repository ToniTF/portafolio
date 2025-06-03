# Script de build y despliegue para el portafolio (PowerShell)
# Ejecutar desde el directorio raíz del proyecto

Write-Host "🚀 Iniciando proceso de build y despliegue..." -ForegroundColor Green

# Instalar dependencias si es necesario
if (-not (Test-Path "vendor")) {
    Write-Host "📦 Instalando dependencias de PHP..." -ForegroundColor Yellow
    composer install --no-dev --optimize-autoloader
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias de Node.js..." -ForegroundColor Yellow
    npm install
}

# Construir el frontend
Write-Host "🔨 Construyendo el frontend..." -ForegroundColor Blue
Set-Location frontend
npm run build

# Volver al directorio raíz
Set-Location ..

# Copiar archivos al directorio público
Write-Host "📁 Copiando archivos al directorio público..." -ForegroundColor Blue
Copy-Item "frontend\dist\*" "public\" -Recurse -Force

Write-Host "✅ Build y despliegue completado!" -ForegroundColor Green
Write-Host "🌐 El sitio está disponible en: http://localhost:8000" -ForegroundColor Cyan

# Opcional: iniciar el servidor
$response = Read-Host "¿Quieres iniciar el servidor de desarrollo? (y/N)"
if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "🚀 Iniciando servidor..." -ForegroundColor Green
    php -S localhost:8000 -t public
}
