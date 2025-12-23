// steps/Step2Summary.tsx
"use client"

import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Step2Summary() {
  const { data, update, setStep } = useOnboarding()
  const summary = data.summary || {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">

        {/* Summary Text */}
        <div className="space-y-1">
          <Label>Career Objective / Summary</Label>
          <Textarea
            placeholder="e.g. Frontend developer with 3+ years of experience building scalable web applications..."
            rows={5}
            value={summary.text || ""}
            onChange={(e) =>
              update("summary", { ...summary, text: e.target.value })
            }
          />
          <p className="text-xs text-muted-foreground">
            AI will use this to create a compelling professional summary
          </p>
        </div>

        {/* Years of Experience */}
        <div className="space-y-1">
          <Label>Years of Experience</Label>
          <Select
            value={summary.experience || ""}
            onValueChange={(value) =>
              update("summary", { ...summary, experience: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1">0–1 years</SelectItem>
              <SelectItem value="1-3">1–3 years</SelectItem>
              <SelectItem value="3-5">3–5 years</SelectItem>
              <SelectItem value="5-10">5–10 years</SelectItem>
              <SelectItem value="10+">10+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Actions */}
        <div className="flex justify-between pt-4">
          <Button variant="ghost" onClick={() => setStep(1)}>
            Back
          </Button>
          <Button onClick={() => setStep(3)}>
            Next
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}
