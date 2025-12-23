'use client'
import { OnboardingProvider } from "./OnboardingProvider"
import StepRenderer from "@/components/onboarding/StepRenderer"
import Stepper from "@/components/onboarding/stepper"
export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-3xl space-y-6 p-6">
          
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Build Your AI-Powered Portfolio
            </h1>
            <p className="text-muted-foreground">
              Answer a few questions and let AI create your perfect portfolio
            </p>
          </div>

          {/* Step Progress */}
          <Stepper />

          {/* Actual Step UI */}
          <StepRenderer />

        </div>
      </div>
    </OnboardingProvider>
  )
}
