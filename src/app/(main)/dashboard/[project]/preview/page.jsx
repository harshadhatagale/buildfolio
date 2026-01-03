'use client'

import SectionRenderer from '@/components/portfolio/sections/SectionRenderer'
import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'
import { Poppins, Inter, Roboto, Pixelify_Sans } from 'next/font/google'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import PreviewSkeleton from '@/components/dashboard/editor/PreviewSkeleton'
import FloatingEditBtn from '@/components/basics/FloatingEditBtn'
import { defaultTheme } from '../../../../../../features/portfolio/portfolioSlice'

const poppins= Poppins({
  subsets:['latin'],
  weight:['100','200','300','400','500','600','700','800','900']
})

export default function PreviewPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState(null)
  const [error, setError] = useState(null)
  const sectionRefs = useRef({})
  const { theme } = useTheme()
  const previewTheme = useSelector((state) => state.portfolio.theme)

  // Apply theme styles with default theme fallback
  const getThemeStyles = () => {
    const colors = {
      ...defaultTheme[theme === "dark" ? "dark" : "light"],   // fallback
      ...previewTheme[theme === "dark" ? "dark" : "light"]    // user custom
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

  // Assign refs to each section
  const assignSectionRef = (id, element) => {
    if (element) {
      sectionRefs.current[id] = element
    }
  }

  useEffect(() => {
    let isMounted = true

    const fetchSections = async () => {
      try {
        if (!params.project) {
          throw new Error('Project ID is missing')
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sections`, {
          method: 'POST',
          body: JSON.stringify({ projectId: params.project }),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (isMounted) {
          if (data.success) {
            setSections(data.data)
          } else {
            setError(data.error || 'Failed to fetch sections')
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching sections:', err)
          setError(err.message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchSections()

    return () => {
      isMounted = false
    }
  }, [params.project])

  if (loading) {
    return <PreviewSkeleton />
  }

  if (error) {
    return (
      <div
        className="p-4 text-center text-destructive"
        style={getThemeStyles()}
      >
        <p>Error loading sections:</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (!sections || sections.length === 0) {
    return (
      <div
        className="p-4 text-center text-muted-foreground"
        style={getThemeStyles()}
      >
        No sections found for this project
      </div>
    )
  }

  return (
    <div
      suppressHydrationWarning
      className={`${poppins.className} bg-background text-foreground`}
      style={getThemeStyles()}
    >
      {sections.map((section) => (
        <div
          key={section._id}
          ref={(el) => assignSectionRef(section._id, el)}
          className="bg-card text-card-foreground"
        >
          <SectionRenderer
            type={section.type}
            content={section.content}
          />
        </div>
      ))}
      <FloatingEditBtn projectId={params.project} />
    </div>
  )
}