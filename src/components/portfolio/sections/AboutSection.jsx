"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AboutSection({ id, name, content }) {
  const [mounted, setMounted] = useState(false)

  /* 🔹 Client mount detect (SEO safe) */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* 🔹 Variants (server-visible) */
  const imageVariants = {
    initial: {
      opacity: 1,     // 👈 visible on server
      x: -40,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  const textVariants = {
    initial: {
      opacity: 1,     // 👈 visible on server
      x: 40,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.1 },
    },
  }

  return (
    <section id={name} className="relative py-28 px-5 bg-background">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div
          variants={imageVariants}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
          whileInView={mounted ? "animate" : "initial"}
          viewport={{ once: true, amount: 0.4 }}
          className="relative w-full flex justify-center items-center h-72 md:h-96 rounded-xl overflow-hidden shadow-lg"
        >
          <img
            src={content.avatar}
            alt={content.name}
            className="object-contain"
            loading="lazy"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
          whileInView={mounted ? "animate" : "initial"}
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
