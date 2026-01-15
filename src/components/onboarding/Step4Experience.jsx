// steps/Step4Experience.tsx
"use client"
import { useOnboarding } from "@/app/(main)/ai-portfolio-builder/OnboardingProvider"
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



export default function Step4Experience() {
  const { data, update, setStep } = useOnboarding()
  const experiences = data.experience || []

  const addExperience = () => {
    update("experience", [
      ...experiences,
      { role: "", company: "", type: "", responsibilities: "" },
    ])
  }

  const updateExp = (index, key, value) => {
    const updated = [...experiences]
    updated[index][key] = value
    update("experience", updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {experiences.map((exp, i) => (
          <div key={i} className="space-y-2 border p-4 rounded">
            <Input placeholder="Job Title" onChange={e => updateExp(i,"role",e.target.value)} />
            <Input placeholder="Company" onChange={e => updateExp(i,"company",e.target.value)} />

            <Select onValueChange={v => updateExp(i,"type",v)}>
              <SelectTrigger><SelectValue placeholder="Employment Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full-time</SelectItem>
                <SelectItem value="part">Part-time</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>

            <Textarea placeholder="Responsibilities & achievements" />
          </div>
        ))}

        <Button variant="outline" onClick={addExperience}>+ Add Experience</Button>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(3)}>Back</Button>
          <Button onClick={() => setStep(5)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
