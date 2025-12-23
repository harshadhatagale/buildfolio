// onboarding/Stepper.tsx
"use client"
import { Progress } from "@/components/ui/progress"
import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"

export default function Stepper() {
  const { step } = useOnboarding()
  const percent = (step / 9) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Step {step} of 9</span>
        <span>{Math.round(percent)}%</span>
      </div>
      <Progress value={percent} />
    </div>
  )
}
