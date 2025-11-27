import Navbar from '@/components/landing/Navbar'
import React from 'react'

export default function layout({children}) {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}
