import React from 'react'
import { Inter } from 'next/font/google'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Card,CardTitle, CardContent, CardHeader, CardFooter } from '../ui/card'
import { pricingCards } from '@/lib/constants'
import clsx from 'clsx'
import { Badge } from '../ui/badge'

const inter = Inter({
  subsets: ['latin']
})

export default function PricingSection() {
  return (
    <section id='pricing' className={`${inter.className} py-26 px-4 max-w-7xl mx-auto`}>
      <div className="text-center mb-12">
        <h2 className='text-4xl font-bold mb-4'>Choose the plan that fits your needs</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Our straightforward pricing plans are tailored to help you showcase your work effectively.
          Start with our free plan and upgrade as you grow.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {pricingCards.map((card) => (
          <Card 
            key={card.id}
            className={clsx(
              "h-full flex flex-col transition-all hover:shadow-lg",
              {
                'border-2 border-primary': card.recommended,
                'mt-0': !card.recommended,
                'md:-mt-4': card.recommended
              }
            )}
          >
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className={clsx('text-2xl', { 'text-primary': card.recommended })}>
                  {card.title}
                </CardTitle>
                {card.recommended && (
                  <Badge variant="default" className="text-sm">
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">{card.desc}</p>
            </CardHeader>

            <CardContent className="pb-6">
              <div className="flex items-end">
                <span className='text-4xl font-bold'>{card.price}</span>
                {card.duration && (
                  <span className='text-muted-foreground text-lg'>/{card.duration}</span>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-6 pt-0">
              <div className="space-y-3 w-full">
                <h4 className="text-sm font-medium text-muted-foreground">{card.highlight}</h4>
                <ul className="space-y-2">
                  {card.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-2'>
                      <Check className='h-4 w-4 mt-0.5 text-primary flex-shrink-0' />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="#"
                className={clsx(
                  'w-full font-semibold text-center p-2 rounded-md transition-colors',
                  {
                    'bg-primary text-primary-foreground hover:bg-primary/90': card.recommended,
                    'bg-muted text-foreground hover:bg-muted/80 border border-input': !card.recommended,
                    'bg-secondary text-secondary-foreground hover:bg-secondary/80': card.id === 'enterprise'
                  }
                )}
              >
                {card.cta}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}