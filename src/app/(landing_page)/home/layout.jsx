import Navbar from '@/components/landing/Navbar'
import React from 'react'

export default function DashboardLayout({children}) {
  return (
   <main className='min-h-screen w-full'>
    <Navbar/>
    {children}
   </main>
  )
}
