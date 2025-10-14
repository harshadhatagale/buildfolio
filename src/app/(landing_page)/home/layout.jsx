import Navbar from '@/components/landing/Navbar'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
   <main className='min-h-screen w-full' suppressHydrationWarning>
    <Navbar/>
    {children}
   </main>
  )
}
