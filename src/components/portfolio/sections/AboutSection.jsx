"use client"

import React from "react"
import { motion } from "framer-motion"

export default function AboutSection({ id, name, content }) {
  const imageVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const textVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  }

  return (
    <section id={name} className="relative py-20 px-5 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative w-full flex justify-center items-center h-72 md:h-96 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={content.avatar}
            alt={content.name}
            className="object-contain"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {content.heading}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {content.about}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
