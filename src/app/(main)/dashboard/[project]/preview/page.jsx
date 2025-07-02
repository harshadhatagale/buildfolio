'use client'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'

export default function PreviewPage() {
  const params = useParams()

  const sections = useSelector((state) => state.portfolio.present)

  if (!sections || sections.length === 0) {
    return <p>No sections found</p>
  }

  return (
    <>
      {sections.map(section => (
        <SectionRenderer
          key={section._id}
          type={section.type}
          content={section.content}
        />
      ))}
    </>
  )
}
