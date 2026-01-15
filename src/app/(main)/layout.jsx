import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

export default function layout({children}) {
  return (
    <>
    <ClerkProvider>
        {children}
    </ClerkProvider>
    </>
  )
}
