// steps/Step8Projects.tsx
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


export default function Step8Projects() {
  const { data, update, setStep } = useOnboarding()
  const projects = data.projects || []

  const addProject = () => {
    update("projects", [...projects, { title:"", tech:"", url:"" }])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="border p-3 rounded space-y-2">
            <Input placeholder="Project Title" />
            <Input placeholder="Technologies Used" />
            <Input placeholder="Live URL / GitHub" />
          </div>
        ))}

        <Button variant="outline" onClick={addProject}>+ Add Project</Button>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(7)}>Back</Button>
          <Button onClick={() => setStep(9)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
