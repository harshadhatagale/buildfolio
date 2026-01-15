'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { ArrowRight, Rocket, Play } from 'lucide-react'

export default function CTAButton() {
  const router = useRouter()

  return (
    <div
      className="
        relative
        mt-10
        md:mt-0
        md:absolute md:-bottom-20
        lg:-bottom-8
        flex gap-4 z-20
        flex-col md:flex-row
        w-full md:w-auto
        items-center
      "
    >
      <RainbowButton
        size="lg"
        onClick={() => router.push('/sign-in')}
        className="h-14 px-8 border border-muted text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
      >
        <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        Create a Portfolio
        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
      </RainbowButton>

      <Button
        onClick={() => router.push('/examples')}
        variant="outline"
        size="lg"
        className="h-14 px-8 text-lg font-semibold border-2 bg-background/70 backdrop-blur-md hover:bg-accent/50 hover:scale-105 transition-all duration-300 group"
      >
        <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
        See Examples
      </Button>
    </div>
  )
}
