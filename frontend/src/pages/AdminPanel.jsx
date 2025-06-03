import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Activity, 
  Database, 
  Clock, 
  Users, 
  Mail, 
  Server,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { Card, Button, Input, LoadingSpinner, Badge } from '../components/ui'
import { useApi } from '../contexts/ApiContext'

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('admin_token'))
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [stats, setStats] = useState(null)
  const [health, setHealth] = useState(null)
  const [cacheStats, setCacheStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { request } = useApi()

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true)
      fetchDashboardData()
    }
  }, [token])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await request('/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })

      if (response.token) {
        setToken(response.token)
        localStorage.setItem('admin_token', response.token)
        setIsAuthenticated(true)
        setSuccess('Autenticación exitosa')
        await fetchDashboardData()
      }
    } catch (err) {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setStats(null)
    setHealth(null)
    setCacheStats(null)
  }

  const fetchDashboardData = async () => {
    if (!token) return

    try {
      setLoading(true)
      
      // Fetch system health
      const healthData = await request('/health')
      setHealth(healthData)

      // Fetch admin stats
      const statsData = await request('/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setStats(statsData)

      // Fetch cache stats
      const cacheData = await request('/admin/cache', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setCacheStats(cacheData)

    } catch (err) {
      setError('Error cargando datos del panel')
    } finally {
      setLoading(false)
    }
  }

  const clearCache = async () => {
    if (!token) return

    try {
      setLoading(true)
      await request('/admin/cache', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      setSuccess('Cache limpiado exitosamente')
      await fetchDashboardData()
    } catch (err) {
      setError('Error limpiando cache')
    } finally {
      setLoading(false)
    }
  }

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusBadge = (status) => {
    const variants = {
      healthy: 'success',
      warning: 'warning',
      error: 'danger'
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Activity className="h-5 w-5 text-gray-500" />
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Panel de Administración
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Accede al panel de control del sistema
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                label="Usuario"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                required
                placeholder="Ingresa tu usuario"
              />

              <div className="relative">
                <Input
                  label="Contraseña"
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  required
                  placeholder="Ingresa tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {success && (
                <div className="text-green-600 dark:text-green-400 text-sm text-center">
                  {success}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={!credentials.username || !credentials.password}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Iniciar Sesión
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Panel de Administración
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Monitor y gestiona el estado del sistema
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={fetchDashboardData}
              variant="secondary"
              loading={loading}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
            <Button onClick={handleLogout} variant="danger">
              Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {/* System Health */}
        {health && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  {getStatusIcon(health.status)}
                  <span className="ml-2">Estado del Sistema</span>
                </h2>
                {getStatusBadge(health.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.uptime}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tiempo Activo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatBytes(health.memory_usage)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Uso de Memoria</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.php_version}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Versión PHP</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats && Object.entries(stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/_/g, ' ')}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cache Management */}
        {cacheStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Gestión de Cache
                </h2>
                <Button
                  onClick={clearCache}
                  variant="danger"
                  loading={loading}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpiar Cache
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cacheStats.total_entries || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Entradas Totales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatBytes(cacheStats.total_size || 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tamaño Total</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cacheStats.hit_rate || 0}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Tasa de Aciertos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {cacheStats.active_keys || 0}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Claves Activas</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <XCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {success}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel
