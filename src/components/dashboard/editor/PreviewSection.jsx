'use client'
import React, { useState } from 'react'
import DeviceToolbar from './DeviceToolbar'

export default function PreviewSection({projectId}) {
  const [device, setDevice] = useState("mobile")
  return (
    <div className='flex flex-col w-full border-l-2 border-muted px-[248px] h-[calc(100vh-56px)] py-3 overflow-auto scroll-auto transition'>
      <DeviceToolbar />
      <iframe src={`/preview/${projectId}/`} className={`mt-5 border-2 border-muted bg-accent  
      ${device === "mobile" ? "w-[300px] h-[667px]" : ""}
    ${device === "desktop" ? "min-h-[600px] w-lvw" : ""} rounded-md`}>
      </iframe>
    </div>
  )
}