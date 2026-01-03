'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Cloud,
  Braces,
  Layout,
  ExternalLink
} from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CertificationsSection({ id, name, content }) {
  const iconMap = {
    badgecheck: BadgeCheck,
    cloud: Cloud,
    braces: Braces
  }

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  }

  return (
    <section id={name} className="relative w-full py-20 bg-background px-6">
      <motion.div
        className="container space-y-8"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.div variants={item} className="text-center space-y-2">
          <h2 className="text-4xl font-bold tracking-tight">
            {content?.heading || 'Certifications'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content?.subHeading ||
              'Credentials and certifications I have achieved.'}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.items?.map((itemData, index) => {
            const Icon =
              iconMap[itemData.icon?.toLowerCase()] || Layout

            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -4 }}
              >
                <Card className="transition-shadow hover:shadow-xl">
                  <CardHeader className="flex flex-col gap-3 items-start">
                    <div className="p-3 rounded-xl bg-muted">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{itemData.title}</CardTitle>
                    <CardDescription>{itemData.issuer}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {itemData.year}
                    </p>
                    <p className="text-sm">{itemData.description}</p>
                  </CardContent>

                  {itemData.link && (
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={itemData.link} target="_blank">
                          View Certificate
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
