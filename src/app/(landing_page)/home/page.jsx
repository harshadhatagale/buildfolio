'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import PricingSection from '@/components/landing/PricingSection'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import FeaturesSection from '@/components/landing/FeaturesSection'
import Footer from '@/components/landing/FooterSection'
import FAQSection from '@/components/landing/FaqsSection'
import { RainbowButton } from '@/components/ui/rainbow-button'
import { Button } from '@/components/ui/button'
import { Rocket, Play, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


export default function Page() {
  const router = useRouter()
  return (
    <>
      <section className='h-full w-full pt-20 relative flex justify-center items-center flex-col'>
        <div className="z-10 flex items-center justify-center absolute top-5 text-center">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing BuildFolio</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className={`text-center capitalize text-xl font-semibold ${inter.className}`}>Create your portfolio website in just 5 minutes 🚀</p>

        <div className='relative'>
          <h1 className={`md:text-[200px] text-7xl font-bold text-center tracking-tight`}>
            <span className='bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text animate-gradient'>
              BuildFolio
            </span>
          </h1>
        </div>
        <div className="relative flex justify-center items-center md:mt-[-85px]">
          {/* Image */}
          <Image
            src="/images/demo4.png"
            alt="Preview"
            width={900}
            height={900}
            className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
          />

          {/* CTA Overlay */}
          <div className="absolute -bottom-20 md:-bottom-8 flex gap-4 z-20 flex-col md:flex-row">
            <RainbowButton
              size="lg"
              onClick={() => router.push("/sign-in")}
              className="h-14 px-8 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Create a Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </RainbowButton>

            <Button
              onClick={() => router.push("#")}
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold border-2 bg-background/70 backdrop-blur-md hover:bg-accent/50 hover:scale-105 transition-all duration-300 group"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              See Examples
            </Button>
          </div>
        </div>

      </section>
      <FeaturesSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  )
}