// steps/Step7AI.tsx
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


export default function Step7AI() {
  const { update, setStep } = useOnboarding()

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Customization</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select onValueChange={v => update("ai",{ tone:v })}>
          <SelectTrigger><SelectValue placeholder="Tone" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="professional">Professional</SelectItem>
            <SelectItem value="technical">Technical</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Checkbox /> <Label>Optimize for recruiters</Label>
        </div>

        <div className="flex justify-between">
          <Button variant="ghost" onClick={() => setStep(6)}>Back</Button>
          <Button onClick={() => setStep(8)}>Next</Button>
        </div>
      </CardContent>
    </Card>
  )
}
