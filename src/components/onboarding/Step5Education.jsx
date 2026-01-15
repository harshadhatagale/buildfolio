// steps/Step5Education.tsx
"use client"

import { useOnboarding } from "@/app/(main)/ai-portfolio-builder/OnboardingProvider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Step5Education() {
  const { data, update, setStep } = useOnboarding()

  // ensure object exists
  const education = data.education || {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Degree */}
        <div className="space-y-1">
          <Label>Degree / Qualification</Label>
          <Input
            placeholder="B.Tech / BCA / MCA"
            value={education.degree || ""}
            onChange={(e) =>
              update("education", { ...education, degree: e.target.value })
            }
          />
        </div>

        {/* Institution */}
        <div className="space-y-1">
          <Label>Institution Name</Label>
          <Input
            placeholder="XYZ University"
            value={education.institution || ""}
            onChange={(e) =>
              update("education", { ...education, institution: e.target.value })
            }
          />
        </div>

        {/* Field */}
        <div className="space-y-1">
          <Label>Field of Study</Label>
          <Input
            placeholder="Computer Science"
            value={education.field || ""}
            onChange={(e) =>
              update("education", { ...education, field: e.target.value })
            }
          />
        </div>

        {/* Graduation Year */}
        <div className="space-y-1">
          <Label>Graduation Year</Label>
          <Input
            type="number"
            placeholder="2024"
            value={education.year || ""}
            onChange={(e) =>
              update("education", { ...education, year: e.target.value })
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(4)}>
            Back
          </Button>
          <Button onClick={() => setStep(6)}>
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
