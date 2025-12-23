// onboarding/StepRenderer.tsx
import Step1Personal from "./Step1Personal"
import Step2Summary from "./Step2Summary"
import Step3Skills from "./Step3Skills"
import Step4Experience from "./Step4Experience"
import Step5Education from "./Step5Education"
import Step6Preferences from "./Step6Preferences"
import Step7AI from "./Step7AI"
import Step8Projects from "./Step8Projects"
import Step9Review from "./Step9Review"
import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"

export default function StepRenderer() {
  const { step } = useOnboarding()

  switch (step) {
    case 1: return <Step1Personal />
    case 2: return <Step2Summary />
    case 3: return <Step3Skills />
    case 4: return <Step4Experience />
    case 5: return <Step5Education />
    case 6: return <Step6Preferences />
    case 7: return <Step7AI />
    case 8: return <Step8Projects />
    case 9: return <Step9Review />
    default: return null
  }
}
