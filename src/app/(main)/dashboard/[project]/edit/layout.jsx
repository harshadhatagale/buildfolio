'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React, { useEffect, useState, useCallback } from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setProject, setSections, setTheme, setThemeColors } from '../../../../../../features/portfolio/portfolioSlice'
import Inspector from '@/components/dashboard/editor/Inspector'

export default function EditorLayout({ children }) {
  const params = useParams()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.portfolio.themeId)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreen()
    window.addEventListener("resize", checkScreen)

    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  if (isMobile) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 text-center">
      <div className="max-w-sm">
        <h2 className="text-2xl font-semibold mb-3">
          Editor not supported on mobile
        </h2>

        <p className="text-muted-foreground mb-6">
          Please open the editor on a laptop or tablet for the best experience.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md border">
          💻 Laptop &nbsp;|&nbsp; 📱 Tablet
        </div>
      </div>
    </div>
  )
}

  const fetchProjectData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch project data in a single request
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project/${params.project}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()

      if (!data || !data.myproject) {
        throw new Error('Invalid project data received')
      }

      // Dispatch project data
      dispatch(setProject(data.myproject))

      // Dispatch sections
      if (data.myproject.sections) {
        dispatch(setSections(data.myproject.sections))
      }

      // Dispatch theme if available
      if (data.myproject.theme) {
        dispatch(setTheme({ id: data.myproject.theme }))
      }

      // If we have a theme, fetch its colors immediately
      if (data.myproject.theme) {
        const themeRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/themes/${data.myproject.theme}`
        )

        if (themeRes.ok) {
          const themeData = await themeRes.json()
          if (themeData.success && themeData.theme?.colors) {
            dispatch(setThemeColors({ colors: themeData.theme.colors }))
          }
        }
      }
    } catch (error) {
      console.error('Error fetching project:', error)
      setError(error.message || 'Failed to load project data')
    } finally {
      setLoading(false)
    }
  }, [params.project, dispatch])

  useEffect(() => {
    if (!params.project) return

    fetchProjectData()
  }, [params.project, fetchProjectData])

  // Separate effect for fetching theme colors when theme changes
  useEffect(() => {
    if (!theme) return

    const fetchThemeColors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/themes/${theme}`
        )

        if (!res.ok) {
          throw new Error(`Failed to fetch theme: ${res.status}`)
        }

        const data = await res.json()

        if (data.success && data.theme?.colors) {
          dispatch(setThemeColors({ colors: data.theme.colors }))
        }
      } catch (error) {
        console.error('Error fetching theme colors:', error)
      }
    }

    fetchThemeColors()
  }, [theme, dispatch])

  // Handle loading and error states
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={fetchProjectData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar loading={loading} />
      <Toolbar />
      <Sidebar
        loading={loading}
        projectId={params.project}
        error={error}
      />
      {loading ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading project data...</p>
          </div>
        </div>
      ) : (
        children
      )}
      <Inspector />
    </>
  )
}