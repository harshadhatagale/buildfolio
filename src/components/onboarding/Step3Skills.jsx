// steps/Step3Skills.tsx
"use client"

import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Step3Skills() {
  const { data, update, setStep } = useOnboarding()
  const skills = data.skills || {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Skills Input */}
        <div className="space-y-1">
          <Label>Primary Skills</Label>
          <Input
            placeholder="React, Next.js, Tailwind, Node.js"
            value={skills.list || ""}
            onChange={(e) =>
              update("skills", { ...skills, list: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            Separate skills using commas
          </p>
        </div>

        {/* Tools / Technologies */}
        <div className="space-y-1">
          <Label>Tools & Technologies</Label>
          <Input
            placeholder="Figma, Git, VS Code, Docker"
            value={skills.tools || ""}
            onChange={(e) =>
              update("skills", { ...skills, tools: e.target.value })
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(2)}>
            Back
          </Button>
          <Button onClick={() => setStep(4)}>
            Next
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}
