"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function CTAButtons() {
  const router = useRouter()

  return (
    <div className="mt-6 flex gap-3 justify-center">
      <Button variant="secondary" onClick={() => router.push("/sign-in")}>
        Get Started
      </Button>
      <Button variant="ghost" onClick={() => router.push("/login")}>
        See Templates
      </Button>
    </div>
  )
}
