import React, { createContext, useContext, useState, useEffect } from 'react'

const ApiContext = createContext()

export const useApi = () => {
  const context = useContext(ApiContext)
  if (!context) {
    throw new Error('useApi debe usarse dentro de un ApiProvider')
  }
  return context
}

export const ApiProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_BASE = '/api'

  const request = async (endpoint, options = {}) => {
    setLoading(true)
    setError(null)

    try {
      const url = `${API_BASE}${endpoint}`
      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      }

      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Métodos específicos para diferentes endpoints
  const getPortfolio = () => request('/portfolio')
  const getProjects = () => request('/projects')
  const getProject = (id) => request(`/projects/${id}`)
  const sendContact = (data) => request('/contact', {
    method: 'POST',
    body: JSON.stringify(data)
  })

  // Admin endpoints
  const getSystemHealth = () => request('/health')
  const getAdminStats = (token) => request('/admin/stats', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const getCacheStats = (token) => request('/admin/cache', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  const clearCache = (token) => request('/admin/cache', {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })

  const value = {
    loading,
    error,
    request,
    getPortfolio,
    getProjects,
    getProject,
    sendContact,
    getSystemHealth,
    getAdminStats,
    getCacheStats,
    clearCache,
    setError
  }

  return (
    <ApiContext.Provider value={value}>
      {children}
    </ApiContext.Provider>
  )
}
