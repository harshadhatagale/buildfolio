'use client'
import React from 'react'
import PortfolioPreview from './PortfolioPreview'
import { useSelector } from 'react-redux'


export default function PreviewSection() {
  const sections = useSelector((state) => state.portfolio.present)
  return (
    <div className='flex resize overflow-auto flex-col w-full border-l-2 border-muted px-[248px] h-[calc(100vh-56px)] py-3 scroll-auto transition'>
      <PortfolioPreview sections={sections} />
    </div>
  )
}