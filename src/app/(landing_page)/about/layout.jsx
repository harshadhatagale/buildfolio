import Navbar from '@/components/landing/Navbar'
import React from 'react'

export const metadata={
  title: "About | BuildFolio",
  description: "Learn more about BuildFolio, our mission, and how we aim to empower individuals to create stunning portfolios with ease. Discover the team behind the platform and our commitment to helping you showcase your work effectively.",
}
export default function layout({children}) {
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}
