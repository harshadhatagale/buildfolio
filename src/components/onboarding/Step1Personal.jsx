// steps/Step1Personal.tsx
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

export default function Step1Personal() {
  const { data, update, setStep } = useOnboarding()
  const personal = data.personal || {}

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        
        {/* Full Name */}
        <div className="space-y-1">
          <Label>Full Name</Label>
          <Input
            placeholder="John Doe"
            value={personal.name || ""}
            onChange={(e) =>
              update("personal", { ...personal, name: e.target.value })
            }
          />
        </div>

        {/* Professional Title */}
        <div className="space-y-1">
          <Label>Professional Title</Label>
          <Input
            placeholder="Frontend Developer"
            value={personal.title || ""}
            onChange={(e) =>
              update("personal", { ...personal, title: e.target.value })
            }
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <Label>Email Address</Label>
          <Input
            type="email"
            placeholder="john@example.com"
            value={personal.email || ""}
            onChange={(e) =>
              update("personal", { ...personal, email: e.target.value })
            }
          />
        </div>

        {/* Location */}
        <div className="space-y-1">
          <Label>Location</Label>
          <Input
            placeholder="Mumbai, India"
            value={personal.location || ""}
            onChange={(e) =>
              update("personal", { ...personal, location: e.target.value })
            }
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <Button onClick={() => setStep(2)}>
            Next
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}
