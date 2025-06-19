import React from 'react'
import { Inter } from 'next/font/google'

import Link from 'next/link'
const inter = Inter({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


export default function Page() {
  return (
    <>
      <section className='h-full w-full pt-36 relative flex justify-center items-center flex-col'>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <p className={`text-center ${inter.className}`}>Build your own portfolio</p>

        <div className='bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative'>
          <h1 className='md:text-[200px] text-7xl font-bold text-center  tracking-tight'>BuildFolio</h1>
        </div>
      </section>
      <section className={`${inter.className} flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[40px]`}>
        <h2 className='text-4xl text-center'>Choose what, fits you right</h2>
        <p className="text-muted-foreground text-center">Our straightforward pricing plans are tailored to meet your needs.
          If not {"You're"} not  <br /> ready to commit you can get started for free.
        </p>
      </section>
    </>
  )
}