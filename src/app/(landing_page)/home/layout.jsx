import Navbar from '@/components/landing/Navbar'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

export default function DashboardLayout({ children }) {
  return (
    <ClerkProvider>
      <main className='min-h-screen w-full'>
        <Navbar />
        {children}
      </main>
    </ClerkProvider>
  )
}
