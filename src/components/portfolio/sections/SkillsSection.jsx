// components/SkillsSection.tsx
'use client'

import React from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export default function SkillsSection({ id, name, content }) {
  return (
    <section id={name} className="relative bg-background py-28 px-6">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold text-foreground mb-6"
        >
          {content.primaryHeading}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground mb-10 text-base md:text-lg"
        >
          {content.secondaryHeading}
        </motion.p>

        <motion.div
          variants={containerVariants}
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
