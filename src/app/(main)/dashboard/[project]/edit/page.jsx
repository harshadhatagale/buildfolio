'use client'
import PreviewSection from '@/components/dashboard/editor/PreviewSection'
import { useParams } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Page() {
  const params = useParams()
  const sections = useSelector((state) => state.portfolio.sections)

  return (
    <main className="w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_2px,transparent_2px),linear-gradient(to_bottom,#161616_2px,transparent_2px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_100%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="relative z-10 items-center w-full flex justify-center px-4">
        <div className="w-full max-w-[1200px] bg-transparent rounded-xl shadow-2xl overflow-hidden">
          <PreviewSection
            sections={sections}
            projectId={params.project}
          />
        </div>
      </div>
    </main>
  )
}
