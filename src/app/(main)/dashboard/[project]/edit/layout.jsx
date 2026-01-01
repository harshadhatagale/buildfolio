'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import Inspector from '@/components/dashboard/editor/Inspector'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import {
  setProject,
  setSections,
  setTheme,
  setThemeColors,
} from '../../../../../../features/portfolio/portfolioSlice'

export default function EditorLayout({ children }) {
  const params = useParams()
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.portfolio.themeId)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjectData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/project/${params.project}`
      )

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = await res.json()
      dispatch(setProject(data.myproject))
      dispatch(setSections(data.myproject.sections || []))

      if (data.myproject.theme) {
        dispatch(setTheme({ id: data.myproject.theme }))
      }
    } catch (err) {
      setError(err.message || 'Failed to load project')
    } finally {
      setLoading(false)
    }
  }, [params.project, dispatch])

  useEffect(() => {
    if (params.project) fetchProjectData()
  }, [params.project, fetchProjectData])

  return (
    <>
      {/* 🚫 MOBILE BLOCK */}
      <div className="flex md:hidden min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-semibold mb-3">
            Editor not supported on mobile
          </h2>
          <p className="text-muted-foreground">
            Please open the editor on a laptop or tablet for the best experience.
          </p>
        </div>
      </div>

      {/* ✅ DESKTOP / TABLET EDITOR */}
      <div className="hidden md:block">
        <Navbar loading={loading} />
        <Toolbar />
        <Sidebar loading={loading} projectId={params.project} />

        {error ? (
          <div className="min-h-[60vh] flex items-center justify-center text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : loading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-primary" />
          </div>
        ) : (
          children
        )}

        <Inspector />
      </div>
    </>
  )
}
