// steps/Step9Review.tsx
"use client"
import { useOnboarding } from "@/app/ai-portfolio-builder/OnboardingProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { getSections } from "@/app/ai-portfolio-builder/portfolio/getSections"
import React from "react"

export default function Step9Review() {
  const { data, setSections } = useOnboarding()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleGenerate = async () => {
    setLoading(true)

    const generatedSections = await getSections(data)
    setSections(generatedSections)
    setLoading(false)
    if(generatedSections.length>0)
    {
      router.push("/ai-portfolio-builder/portfolio")
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Review & Generate</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <pre className="bg-muted p-4 rounded text-xs">
          {JSON.stringify(data, null, 2)}
        </pre>

        <Button className="w-full" onClick={() => handleGenerate()}>
          {loading ? "Generating..." : "✨ Generate Portfolio with AI"}
        </Button>
      </CardContent>
    </Card>
  )
}
