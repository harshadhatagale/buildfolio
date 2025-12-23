// steps/Step6Preferences.tsx
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



export default function Step6Preferences() {
  const { update, setStep } = useOnboarding()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        <Select onValueChange={v => update("preferences",{ style:v })}>
          <SelectTrigger><SelectValue placeholder="Style" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="modern">Modern</SelectItem>
            <SelectItem value="minimal">Minimal</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-4">
          <Checkbox /> <Label>Projects</Label>
          <Checkbox /> <Label>Experience</Label>
          <Checkbox /> <Label>Education</Label>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(5)}>Back</Button>
          <Button onClick={() => setStep(7)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
