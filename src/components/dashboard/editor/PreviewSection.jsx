'use client'
import React from 'react'
import PortfolioPreview from './PortfolioPreview'
import { useSelector } from 'react-redux'


export default function PreviewSection() {
  const sections = useSelector((state) => state.portfolio.present)
  const device=useSelector((state) => state.portfolio.device)
  const maxWidthMap = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[40%] mr-[calc(35%)]',
    desktop: 'max-w-[55%] mr-[calc(25%)]',
  }
  return (
    <div className={`flex overflow-auto flex-col ${maxWidthMap[device]} mx-auto h-[calc(100vh-56px)] py-3 scroll-auto transition`}>
      <PortfolioPreview sections={sections} />
    </div>
  )
}