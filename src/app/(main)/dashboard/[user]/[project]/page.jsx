'use client'
import PreviewSection from '@/components/dashboard/editor/PreviewSection'
import SectionRenderer from '@/components/sections/SectionRenderer'
import { useParams } from 'next/navigation'
import React from 'react'


export default function page() {
  const params= useParams()
  return (
    <>
      <PreviewSection projectId={params.project}/>
    </>
  )
}
