import { SignIn } from '@clerk/nextjs'
import React, { Suspense } from 'react'

export const metadata = {
  title: "Sign in | BuildFolio",
  description: "Sign in to your BuildFolio account",
}


export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn/>
    </Suspense>
  )
}
