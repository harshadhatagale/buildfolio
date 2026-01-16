// components/SkillsSection.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

export default function SkillsSection({ id, name, content }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  /* ✅ Server-visible variants */
  const containerVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const fadeUp = {
    initial: { opacity: 1, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  const badgeVariants = {
    initial: { opacity: 1, scale: 0.9 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  }

  return (
    <section id={name} className="relative bg-background py-28 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="initial"
        animate={mounted ? 'animate' : 'initial'}
        whileInView={mounted ? 'animate' : 'initial'}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          variants={fadeUp}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6"
        >
          {content.primaryHeading}
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="text-muted-foreground mb-10 text-base md:text-lg"
        >
          {content.secondaryHeading}
        </motion.p>

        {/* Skills */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="flex flex-wrap justify-center gap-4"
        >
          {content.skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={badgeVariants}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <Badge className="text-base dark:text-black px-4 py-2 rounded-xl shadow-sm border-muted cursor-default">
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
