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
    education: null,
    preferences: {},
    ai: {},
    projects: [],
    generatedSections:null
  })

  const update = (section, value) => {
    setData(prev => ({ ...prev, [section]: value }))
  }
  const setSections = (sections) => {
    setData((prev) => ({
      ...prev,
      generatedSections: sections,
    }))
  }
  return (
    <OnboardingContext.Provider value={{ step, setStep, data, update, setSections, }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => useContext(OnboardingContext)
