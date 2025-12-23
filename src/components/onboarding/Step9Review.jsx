// steps/Step9Review.tsx
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


export default function Step9Review() {
  const { data } = useOnboarding()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Generate</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <pre className="bg-muted p-4 rounded text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>

        <Button className="w-full">
         ✨ Generate Portfolio with AI
        </Button>
      </CardContent>
    </Card>
  )
}
