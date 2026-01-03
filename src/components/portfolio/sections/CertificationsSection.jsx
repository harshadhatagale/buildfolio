'use client'

import React from 'react'
import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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

export default function CertificationsSection({ id, name, content }) {
  const getIcon = (iconName) => {
    if (!iconName) return LucideIcons.Layout

    const formattedName = iconName
      .toLowerCase()
      .split(/[-_ ]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')

    return LucideIcons[formattedName] || LucideIcons.Layout
  }

  return (
    <section id={name} className="relative w-full py-20 bg-background px-6">
      <motion.div
        className="container space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.div variants={itemVariants} className="text-center space-y-2">
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
          {content?.items?.map((item, index) => {
            const Icon = getIcon(item.icon)

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -4 }}
              >
                <Card className="hover:shadow-xl transition-shadow">
                  <CardHeader className="flex flex-col gap-3 items-start">
                    <div className="p-3 rounded-xl bg-muted">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.issuer}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {item.year}
                    </p>
                    <p className="text-sm">{item.description}</p>
                  </CardContent>

                  {item.link && (
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link href={item.link} target="_blank">
                          View Certificate
                          <LucideIcons.ExternalLink className="ml-2 w-4 h-4" />
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
