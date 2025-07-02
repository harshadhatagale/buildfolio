'use client'
import React, { useState } from 'react'
import DeviceToolbar from './DeviceToolbar'
import PortfolioPreview from './PortfolioPreview'
import { useDispatch, useSelector } from 'react-redux'

export default function PreviewSection({ projectId }) {
  const [device, setDevice] = useState("mobile")
  const dispatch= useDispatch()
  const sections= useSelector((state)=> state.portfolio.present)
  return (
    <div className='flex flex-col w-full border-l-2 border-muted px-[248px] h-[calc(100vh-56px)] py-3 overflow-auto scroll-auto transition'>
      {/* <DeviceToolbar /> */}
      <PortfolioPreview sections={sections}/>
    </div>
  )
}