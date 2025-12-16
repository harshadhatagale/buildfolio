'use client'

import SectionRenderer from '@/components/portfolio/sections/SectionRenderer'
import { useEffect, useState } from 'react'
import PreviewSkeleton from '@/components/dashboard/editor/PreviewSkeleton'
import { defaultTheme, setSections, setTheme, setThemeColors } from '../../../features/portfolio/portfolioSlice'
import { useParams } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'
import { slugify } from '@/components/dashboard/editor/SectionProperties/NavProps'

export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()

  const themeId = useSelector((state)=> state.portfolio.themeId)
  const themeColors = useSelector((state)=> state.portfolio.theme)
  const sections = useSelector((state)=> state.portfolio.present)

  const { theme } = useTheme()
  const params = useParams()

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`/api/portfolio/${params.portfolio}`)
        const data = await res.json()

        if (data) {
          dispatch(setSections(data.myproject.sections))
          dispatch(setTheme({ id: data.myproject.theme })) 
        } else {
          setError(data.error)
        }
      } catch (err) {
        setError(err.message)
      }
      setLoading(false)
    }

    fetchSections()
  }, [params.portfolio])

  useEffect(() => {
    if (!themeId) return

    const fetchTheme = async () => {
      const res = await fetch(`/api/themes/${themeId}`) 
      const data = await res.json()

      if (data.success) {
        dispatch(setThemeColors({colors: data.theme.colors}))
      }
    }

    fetchTheme()
  }, [themeId])


  const getThemeStyles = () => {

        const colors = {
            ...defaultTheme[theme === "dark" ? "dark" : "light"],   // fallback
            ...themeColors[theme === "dark" ? "dark" : "light"]    // user custom
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
  if (error) return <div className="p-4 text-center text-destructive">{error}</div>

  return (
    <div
      className="space-y-8 bg-background text-foreground"
      style={getThemeStyles()}
    >
      {sections.map(section => (
        <div key={section._id} className="bg-card text-card-foreground">
          <SectionRenderer name={slugify(section.name)} type={section.type} content={section.content} />
        </div>
      ))}
    </div>
  )
}
