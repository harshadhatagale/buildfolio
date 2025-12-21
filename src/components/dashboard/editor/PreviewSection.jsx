'use client'
import React, { useState } from 'react'
import DeviceToolbar from './DeviceToolbar'
import PortfolioPreview from './PortfolioPreview'
import { useDispatch, useSelector } from 'react-redux'
import FloatingEditBtn from '@/components/basics/FloatingEditBtn'

export default function PreviewSection() {
  const [device, setDevice] = useState("mobile")
  const dispatch = useDispatch()
  const sections = useSelector((state) => state.portfolio.present)
  return (
    <div className='flex resize overflow-auto flex-col w-full border-l-2 border-muted px-[248px] h-[calc(100vh-56px)] py-3 scroll-auto transition'>
      <PortfolioPreview sections={sections} />
    </div>
  )
}