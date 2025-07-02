'use client'
import Navbar from '@/components/dashboard/editor/Navbar'
import Toolbar from '@/components/dashboard/editor/Toolbar'
import React from 'react'
import Sidebar from '@/components/dashboard/editor/Sidebar'
import PropertiesBar from '@/components/dashboard/editor/PropertiesBar'
import { useParams } from 'next/navigation'
export default function EditorLayout({ children }) {
  const params = useParams()
  return (
    <>
        <Navbar />
        <Toolbar projectId={params.project}/>
        <Sidebar projectId={params.project} />
        {children}
        <PropertiesBar />
    </>
  )
}
