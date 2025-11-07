import Navbar from '@/components/landing/Navbar'
import React from 'react'

export default function AuthLayout({children}) {
  return (
    <>
    <Navbar/>
    <div className='flex justify-center mt-5 items-center w-full'>
        {children}
    </div>
    </>
  )
}