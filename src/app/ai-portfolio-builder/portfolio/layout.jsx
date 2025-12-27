import React from 'react'
import { OnboardingProvider } from '../OnboardingProvider'

export default function layout({ children }) {
  return (
    <>
      {/* Background Glow
      <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-3xl -z-10"></div> */}
      {children}
    </>
  )
}
