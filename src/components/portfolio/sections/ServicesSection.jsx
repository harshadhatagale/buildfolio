'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Code,
  Palette,
  Smartphone,
  Layout,
} from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

export default function ServicesSection({ id, name, content }) {
  const iconMap = {
    code: Code,
    palette: Palette,
    smartphone: Smartphone,
  }

  return (
    <section
      id={name}
      className="relative w-full py-28 bg-background px-6"
    >
      <motion.div
        className="max-w-6xl mx-auto space-y-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div
          variants={itemVariants}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            {content.heading}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content.subHeading || 'What I can help you with'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.services?.map((item, index) => {
            const Icon =
              iconMap[item.icon?.toLowerCase()] || Layout

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardHeader className="flex flex-col gap-3 items-start">
                    <div className="p-3 rounded-xl bg-muted">
                      <Icon className="h-6 w-6" />
                    </div>

                    <CardTitle>{item.title}</CardTitle>

                    <CardDescription>
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {item.link ? (
                      <Button
                        variant="outline"
                        asChild
                        className="w-full"
                      >
                        <Link href={item.link}>
                          Learn More
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        Learn More
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
