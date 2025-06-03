import { useState, useEffect } from 'react'
import { useApi } from '../contexts/ApiContext'

export const usePortfolio = () => {
  const [data, setData] = useState(null)
  const { getPortfolio, loading, error } = useApi()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPortfolio()
        setData(result)
      } catch (err) {
        console.error('Error fetching portfolio:', err)
      }
    }

    fetchData()
  }, [getPortfolio])

  return { data, loading, error }
}

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const { getProjects, loading, error } = useApi()

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await getProjects()
        setProjects(result)
      } catch (err) {
        console.error('Error fetching projects:', err)
      }
    }

    fetchProjects()
  }, [getProjects])

  const refetch = async () => {
    try {
      const result = await getProjects()
      setProjects(result)
    } catch (err) {
      console.error('Error refetching projects:', err)
    }
  }

  return { projects, loading, error, refetch }
}

export const useProject = (id) => {
  const [project, setProject] = useState(null)
  const { getProject, loading, error } = useApi()

  useEffect(() => {
    if (!id) return

    const fetchProject = async () => {
      try {
        const result = await getProject(id)
        setProject(result)
      } catch (err) {
        console.error('Error fetching project:', err)
      }
    }

    fetchProject()
  }, [id, getProject])

  return { project, loading, error }
}

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const { sendContact } = useApi()

  const submitForm = async (formData) => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      await sendContact(formData)
      setSubmitSuccess(true)
      return true
    } catch (err) {
      setSubmitError(err.message)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  return {
    submitForm,
    isSubmitting,
    submitError,
    submitSuccess,
    resetForm
  }
}

export const useSystemHealth = () => {
  const [health, setHealth] = useState(null)
  const { getSystemHealth, loading, error } = useApi()

  const checkHealth = async () => {
    try {
      const result = await getSystemHealth()
      setHealth(result)
      return result
    } catch (err) {
      console.error('Error checking system health:', err)
      return null
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return { health, loading, error, checkHealth }
}
