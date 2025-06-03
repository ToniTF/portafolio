#!/bin/bash
# Script de actualización del portafolio para sistemas Unix/Linux
# Ejecuta tareas comunes de mantenimiento y actualización

echo "🔄 Actualizando portafolio de Antonio Troitiño..."

# Actualizar dependencias de PHP
echo "📦 Actualizando dependencias de PHP..."
composer update

# Actualizar dependencias de Node.js
echo "📦 Actualizando dependencias de Node.js..."
npm update

# Limpiar cache si existe
echo "🧹 Limpiando cache..."
if [ -d "storage/cache" ]; then
    rm -rf storage/cache/*
fi

# Compilar assets del frontend
echo "🏗️ Compilando assets del frontend..."
npm run build

# Ejecutar migración de datos
echo "📊 Ejecutando migración de datos..."
php migrate.php

# Verificar y establecer permisos
echo "🔒 Estableciendo permisos..."
chmod -R 755 logs/ 2>/dev/null || true
chmod -R 755 storage/ 2>/dev/null || true

echo "✅ Actualización completada exitosamente!"
echo "🌐 El portafolio está listo en: http://localhost:8000"
