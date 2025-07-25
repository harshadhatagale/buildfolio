'use client'
import PreviewSection from '@/components/dashboard/editor/PreviewSection'
import { useParams } from 'next/navigation'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function page() {
  const params = useParams()
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.sections)
  return (
    <>
      <PreviewSection sections={sections} projectId={params.project} />
    </>
  )
}
