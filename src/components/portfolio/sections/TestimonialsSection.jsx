'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

export default function TestimonialsSection({ id, name, content }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ✅ SEO-safe variants */
  const containerVariants = {
    initial: { opacity: 1 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    initial: { opacity: 1, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  }

  return (
    <section
      id={name}
      className="relative w-full py-28 bg-background px-6"
    >
      <motion.div
        className="container space-y-8"
        variants={containerVariants}
        initial="initial"
        animate={mounted ? 'animate' : 'initial'}
        whileInView={mounted ? 'animate' : 'initial'}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="text-center space-y-2"
        >
          <h2 className="text-4xl font-bold tracking-tight">
            {content?.heading || 'Testimonials'}
          </h2>
          <p className="text-muted-foreground text-lg">
            What people say about working with me
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content?.testimonials?.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              <Card className="hover:shadow-xl transition-shadow h-full">
                <CardHeader className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={item.image}
                      alt={item.name}
                    />
                    <AvatarFallback>
                      {item.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <CardTitle className="mt-4">
                    {item.name}
                  </CardTitle>
                  <CardDescription>
                    {item.role}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-muted-foreground">
                    “{item.message}”
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
