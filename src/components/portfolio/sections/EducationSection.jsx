'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Book,
  School,
  Layout,
} from 'lucide-react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

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

export default function EducationSection({ id, name, content }) {
  const iconMap = {
    graduationcap: GraduationCap,
    book: Book,
    school: School,
  }

  return (
    <section
      id={name}
      className="relative w-full py-28 px-6 bg-background"
    >
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
            {content?.heading || 'Education'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content?.subHeading || 'My academic background'}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.items?.map((item, index) => {
            const Icon =
              iconMap[item.icon?.toLowerCase()] || Layout

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
                    <CardTitle>{item.degree}</CardTitle>
                    <CardDescription>{item.institution}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {item.year}
                    </p>
                    <p className="text-sm">
                      {item.description}
                    </p>
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
