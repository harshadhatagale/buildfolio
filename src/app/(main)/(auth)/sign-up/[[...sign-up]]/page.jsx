import { SignUp } from '@clerk/nextjs'
import React, { Suspense } from 'react'


export const metadata = {
  title: "Sign up | BuildFolio",
  description: "Sign up to your BuildFolio account",
}

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  )
}
