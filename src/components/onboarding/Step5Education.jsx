// steps/Step5Education.tsx
"use client"
import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



export default function Step5Education() {
  const { data, update, setStep } = useOnboarding()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Degree" />
        <Input placeholder="Institution" />
        <Input placeholder="Field of Study" />
        <Input placeholder="Graduation Year" />

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(4)}>Back</Button>
          <Button onClick={() => setStep(6)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
