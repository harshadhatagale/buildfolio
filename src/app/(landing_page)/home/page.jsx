import React from 'react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import PricingSection from '@/components/landing/PricingSection'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


export default function Page() {
  return (
    <>
      <section className='h-full w-full pt-36 relative flex justify-center items-center flex-col'>
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

        <p className={`text-center ${inter.className}`}>Build your own portfolio</p>

        <div className='relative'>
          <h1 className={`md:text-[200px] text-7xl font-bold text-center tracking-tight`}>
            <span className='bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text animate-gradient'>
              BuildFolio
            </span>
          </h1>
        </div>
        <div className='flex justify-center items-center relative md:mt-[-50px]'>
          <Image src="/images/demo3.png" alt='Preview' width={900} height={900} className='rounded-tl-2xl rounded-tr-2xl border-2 border-muted' />
        </div>
      </section>
      <PricingSection />
    </>
  )
}