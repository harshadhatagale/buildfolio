'use client'

import SectionRenderer from './sections/SectionRenderer'
import { useEffect, useState, useRef } from 'react'
import PreviewSkeleton from '@/components/dashboard/editor/PreviewSkeleton'


export default function Portfolio() {
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState(null)
  const [error, setError] = useState(null)
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
    >
      {sections.map((section) => (
        <div
          key={section._id}
          className="bg-card text-card-foreground"
        >
          <SectionRenderer
            type={section.type}
            content={section.content}
          />
        </div>
      ))}
    </div>
  )
}