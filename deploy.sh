#!/bin/bash

# Script de build y despliegue para el portafolio
# Ejecutar desde el directorio raíz del proyecto

echo "🚀 Iniciando proceso de build y despliegue..."

# Instalar dependencias si es necesario
if [ ! -d "vendor" ]; then
    echo "📦 Instalando dependencias de PHP..."
    composer install --no-dev --optimize-autoloader
fi

if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias de Node.js..."
    npm install
fi

# Construir el frontend
echo "🔨 Construyendo el frontend..."
cd frontend
npm run build

# Copiar archivos al directorio público
echo "📁 Copiando archivos al directorio público..."
cd ..
cp -r frontend/dist/* public/

# Actualizar referencias en app.html
echo "🔧 Actualizando referencias de archivos..."
# Aquí podrías agregar sed commands para actualizar automáticamente las rutas

echo "✅ Build y despliegue completado!"
echo "🌐 El sitio está disponible en: http://localhost:8000"

# Opcional: iniciar el servidor
read -p "¿Quieres iniciar el servidor de desarrollo? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Iniciando servidor..."
    php -S localhost:8000 -t public
fi
