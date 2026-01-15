'use client'

import React, { useEffect } from 'react'
import { useOnboarding } from '../OnboardingProvider'
import { useRouter } from 'next/navigation'
import PreviewMock from '@/components/onboarding/PreviewMock'
import SectionRenderer from '@/components/portfolio/sections/SectionRenderer'

export default function Page() {
  const { data } = useOnboarding()
  const router = useRouter()
  
  useEffect(() => {
    if (!data?.generatedSections) {
      router.push("/ai-portfolio-builder")
    }
  }, [data, router])

  return (
    <>
      <h3 className='mx-auto text-3xl font-bold capitalize text-center'>
        Portfolio generated successfully 🚀
      </h3>
      <PreviewMock>
        {data?.generatedSections ? (
          data.generatedSections.map((section, index) => (
            <SectionRenderer 
              key={section.id || `${section.name}-${index}`}
              id={section.name} 
              type={section.type} 
              content={section.content}
            />
          ))
        ) : (
          <div>Sections not generated</div>
        )}
      </PreviewMock>
    </>
  )
}