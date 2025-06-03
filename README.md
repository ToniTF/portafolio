# 🌟 Portafolio Profesional - Antonio Troitiño

> **Desarrollador Full Stack & Maestro de Reiki**  
> Un portafolio web moderno que combina tecnología avanzada con sabiduría espiritual

[![PHP Version](https://img.shields.io/badge/PHP-8.4+-777BB4?style=flat-square&logo=php&logoColor=white)](https://php.net)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## ✨ Características Principales

### 🎨 Frontend Moderno
- **React 18** con hooks modernos y componentes funcionales
- **Framer Motion** para animaciones fluidas y profesionales
- **Tailwind CSS** con diseño responsivo y elegante
- **React Router** para navegación SPA sin recarga
- **Vite** como build tool ultra-rápido

### 🔧 Backend Robusto
- **PHP 8.4** con características modernas del lenguaje
- **Slim Framework 4** para APIs RESTful eficientes
- **Sistema de logging** con Monolog
- **Cache inteligente** para optimización de rendimiento
- **Middleware personalizado** para CORS y autenticación

### 📧 Funcionalidades Avanzadas
- **Sistema de contacto** con validación y emails HTML
- **Panel de administración** protegido con métricas en tiempo real
- **Cache automático** con TTL configurable
- **Logs centralizados** para monitoreo y debugging
- **Tests automatizados** con PHPUnit

### 🧘 Secciones Especializadas
- **Portafolio de Proyectos** con filtros y búsqueda avanzada
- **Información de Reiki** con servicios y testimonios
- **CV Interactivo** con experiencia y habilidades
- **Formulario de Contacto** con tipos de consulta específicos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI moderna
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animaciones y transiciones
- **Lucide React** - Iconografía moderna
- **React Router** - Navegación SPA

### Backend
- **PHP 8.0+** - Lenguaje del servidor
- **Slim Framework 4** - Microframework para APIs
- **Composer** - Gestión de dependencias PHP
- **Monolog** - Sistema de logs
- **PHPDotEnv** - Gestión de variables de entorno

## 🚀 Instalación y Configuración

### Prerequisitos
- PHP 8.0 o superior
- Composer
- Node.js 16+ y npm
- Servidor web o usar el servidor integrado de PHP

### Pasos de Instalación

1. **Instalar dependencias PHP**
   ```bash
   composer install
   ```

2. **Instalar dependencias Node.js**
   ```bash
   npm install
   ```

3. **Construir el frontend**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

4. **Copiar archivos al directorio público**
   ```powershell
   # Windows PowerShell:
   Copy-Item "frontend\dist\*" "public\" -Recurse -Force
   ```

5. **Iniciar el servidor de desarrollo**
   ```bash
   php -S localhost:8000 -t public
   ```

## 🌐 API Endpoints

- `GET /api/about` - Información personal
- `GET /api/experience` - Experiencia laboral
- `GET /api/projects` - Lista de proyectos
- `GET /api/reiki` - Información sobre Reiki
- `POST /api/contact` - Enviar mensaje

## 📁 Estructura del Proyecto

```
portafolio/
├── public/                 # Archivos públicos y punto de entrada
├── src/                   # Código fuente PHP
├── frontend/              # Aplicación React
├── assets/               # Recursos (imágenes, etc.)
└── docs/                 # Documentación
```

## 👨‍💻 Autor

**Antonio Troitiño**
- Desarrollador Full Stack
- Maestro de Reiki
- Email: antonio@troitino.dev

## 📄 Licencia

MIT License
