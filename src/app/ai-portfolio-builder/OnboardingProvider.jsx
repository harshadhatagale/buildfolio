// onboarding/OnboardingProvider.tsx
"use client"
import { createContext, useContext, useState } from "react"

const OnboardingContext = createContext(null)

export function OnboardingProvider({ children }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    personal: {},
    summary: {},
    skills: {},
    experience: [],
    education: [],
    preferences: {},
    ai: {},
    projects: []
  })

  const update = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }

  return (
    <OnboardingContext.Provider value={{ step, setStep, data, update }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => useContext(OnboardingContext)
