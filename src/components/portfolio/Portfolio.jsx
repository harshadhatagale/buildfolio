'use client'

import SectionRenderer from './sections/SectionRenderer'
import { useEffect, useState } from 'react'
import PreviewSkeleton from '../dashboard/editor/PreviewSkeleton'
import {
  defaultTheme,
  setFont,
  setSections,
  setTheme,
  setThemeColors,
} from '../../../features/portfolio/portfolioSlice'
import { useTheme } from 'next-themes'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { slugify } from '../dashboard/editor/SectionProperties/NavProps'
import NotFound from '@/app/not-found/page'
import { loadFont } from '@/lib/lazyFontLoad'

export default function Portfolio({ project }) {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  const themeId = useSelector((state) => state.portfolio.themeId)
  const themeColors = useSelector((state) => state.portfolio.theme)
  const sections = useSelector((state) => state.portfolio.present)
  const font = useSelector((state) => state.portfolio.font)
  const { theme } = useTheme()

  // ✅ Initialize portfolio from server data
  useEffect(() => {
    if (!project) return

    dispatch(setSections(project.sections || []))
    dispatch(setFont(project.font || 'Roboto'))
    dispatch(setTheme({ id: project.theme }))

    setLoading(false)
  }, [project, dispatch])

  // ✅ Load selected font dynamically
  useEffect(() => {
    if (!font) return

    const applyFont = async () => {
      await loadFont(font)
    }

    applyFont()
  }, [font])

  // ✅ Fetch theme colors only (lightweight)
  useEffect(() => {
    if (!themeId) return

    const fetchTheme = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/themes/${themeId}`
      )
      const data = await res.json()

      if (data?.success) {
        dispatch(setThemeColors({ colors: data.theme.colors }))
      }
    }

    fetchTheme()
  }, [themeId, dispatch])

  const getThemeStyles = () => {
    const colors = {
      ...defaultTheme[theme === 'dark' ? 'dark' : 'light'], // fallback
      ...themeColors[theme === 'dark' ? 'dark' : 'light'], // user custom
    }

    return {
      '--background': colors.background,
      '--foreground': colors.foreground,
      '--card': colors.card,
      '--card-foreground': colors.cardForeground,
      '--popover': colors.popover,
      '--popover-foreground': colors.popoverForeground,
      '--primary': colors.primary,
      '--primary-foreground': colors.primaryForeground,
      '--secondary': colors.secondary,
      '--secondary-foreground': colors.secondaryForeground,
      '--muted': colors.muted,
      '--muted-foreground': colors.mutedForeground,
      '--accent': colors.accent,
      '--accent-foreground': colors.accentForeground,
      '--destructive': colors.destructive,
      '--border': colors.border,
      '--input': colors.input,
      '--ring': colors.ring,
      '--chart-1': colors.chart1,
      '--chart-2': colors.chart2,
      '--chart-3': colors.chart3,
      '--chart-4': colors.chart4,
      '--chart-5': colors.chart5,
      '--sidebar': colors.sidebar,
      '--sidebar-foreground': colors.sidebarForeground,
      '--sidebar-primary': colors.sidebarPrimary,
      '--sidebar-primary-foreground': colors.sidebarPrimaryForeground,
      '--sidebar-accent': colors.sidebarAccent,
      '--sidebar-accent-foreground': colors.sidebarAccentForeground,
      '--sidebar-border': colors.sidebarBorder,
      '--sidebar-ring': colors.sidebarRing,
    }
  }

  if (loading) return <PreviewSkeleton />
  if (!project) return <NotFound />

  return (
    <main
      style={{ fontFamily: `'${font}', Poppins, sans-serif` }}
      className="h-full w-full bg-background"
    >
      <div className="text-foreground" style={getThemeStyles()}>
        {sections.map((section) => (
          <div
            key={section._id}
            className="bg-card h-full text-card-foreground"
          >
            <SectionRenderer
              name={slugify(section.name)}
              type={section.type}
              content={section.content}
            />
          </div>
        ))}
      </div>
    </main>
  )
}
