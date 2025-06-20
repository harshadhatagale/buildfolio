'use client'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSections } from '../../../../features/portfolio/portfolioSlice'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectPage() {
  const params = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.sections)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`/api/project/${params.projectId}/sections/`)

        if (!res.ok) {
          throw new Error(`Failed to fetch sections: ${res.status}`)
        }

        const data = await res.json()
        dispatch(setSections(data.sections))
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch sections')
        console.error("Failed to fetch sections", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.projectId) {
      fetchSections()
    }
  }, [dispatch, params.projectId])

  if (loading) {
    return (
      <div className="container space-y-8 py-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8 text-center text-destructive">
        <p>Error loading project: {error}</p>
      </div>
    )
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="container py-8 text-center">
        <p>No sections found for this project.</p>
      </div>
    )
  }

  return (
    <>
      {sections.map((section) => (
        <SectionRenderer
          key={section._id}
          type={section.type}
          content={section.content}
        />
      ))}
    </>
  )
}