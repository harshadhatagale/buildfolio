'use client'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton' // Assuming you have a skeleton component
import PreviewSkeleton from '@/components/dashboard/editor/PreviewSkeleton'
import FloatingEditBtn from '@/components/basics/FloatingEditBtn'
export default function PreviewPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [sections, setSections] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true // Flag to prevent state updates after unmount
    
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
      isMounted = false // Cleanup function
    }
  }, [params.project])

  if (loading) {
    return (
      <PreviewSkeleton/>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        <p>Error loading sections:</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (!sections || sections.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No sections found for this project
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <SectionRenderer
          key={section._id}
          type={section.type}
          content={section.content}
        />
      ))}
      <FloatingEditBtn projectId={params.project}/>
    </div>
  )
}