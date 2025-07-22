'use client'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import PreviewSkeleton from '@/components/dashboard/editor/PreviewSkeleton'
import FloatingEditBtn from '@/components/basics/FloatingEditBtn'
import { useSelector } from 'react-redux'

export default function PreviewPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState(null)
  const [error, setError] = useState(null)
  const theme = useSelector((state) => state.portfolio.theme)
  const themeMode = useSelector((state) => state.portfolio.themeMode)

  // Apply theme styles
  const getThemeStyles = () => {
    const colors = theme["dark"]
    return {
      '--radius': colors.radius,
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

  useEffect(() => {
    let isMounted = true
    
    const fetchSections = async () => {
      try {
        if (!params.project) {
          throw new Error('Project ID is missing')
        }

        const response = await fetch(`/api/sections`, {
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
      className="space-y-8 bg-background text-foreground"
      style={getThemeStyles()}
    >
      {sections.map((section) => (
        <div key={section._id} className="bg-card text-card-foreground">
          <SectionRenderer
            type={section.type}
            content={section.content}
          />
        </div>
      ))}
      <FloatingEditBtn projectId={params.project}/>
    </div>
  )
}