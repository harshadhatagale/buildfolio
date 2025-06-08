import React from 'react'

export default function AuthLayout({children}) {
  return (
    <div className='h-full justify-center items-center flex'>
        {children}
    </div>
  )
}