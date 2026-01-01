'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import { Lock } from 'lucide-react'
import { Button } from '../ui/button'
import { pricingCards } from '@/lib/constants'
import { Badge } from '../ui/badge'
import { useRouter } from 'next/navigation'

const inter = Inter({
  subsets: ['latin']
})

export default function PricingSection() {
  const router= useRouter()
  return (
    <section id='pricing' className={`${inter.className} py-18 px-4 max-w-7xl mx-auto`}>
      <div className="text-center mb-12">
        <h2 className='text-4xl font-bold mb-4'>Choose the plan that fits your needs</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our straightforward pricing plans are tailored to help you showcase your work effectively.
          Start with our free plan and upgrade as you grow.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {pricingCards.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-xl border p-6 ${
            plan.recommended ? "border-primary shadow-lg" : ""
          }`}
        >
          {/* Coming Soon Badge */}
          {!plan.available && (
            <Badge className="absolute top-3 right-3">
              Coming Soon
            </Badge>
          )}

          <h3 className="text-xl font-semibold">{plan.title}</h3>
          <p className="text-muted-foreground text-sm mt-1">
            {plan.desc}
          </p>

          <div className="mt-4">
            <span className="text-3xl font-bold">{plan.price}</span>
            {plan.duration && (
              <span className="text-muted-foreground text-sm">
                {" / " + plan.duration}
              </span>
            )}
          </div>

          <ul className="mt-4 space-y-2 text-sm">
            {plan.features.map((feature) => (
              <li key={feature}>✓ {feature}</li>
            ))}
          </ul>

          {/* CTA */}
          {plan.available ? (
            <Button onClick={()=> router.push("/sign-in")} className="w-full mt-6">
              {plan.cta}
            </Button>
          ) : (
            <Button
              className="w-full mt-6 gap-2"
              disabled
              variant="secondary"
            >
              <Lock size={16} />
              Coming Soon
            </Button>
          )}
        </div>
      ))}
      </div>
    </section>
  )
}