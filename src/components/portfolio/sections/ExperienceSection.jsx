'use client'

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ExperienceSection({ id, name, content }) {
  const [mounted, setMounted] = useState(false)

  /* 🔹 Detect client mount (SEO safe) */
  useEffect(() => {
    setMounted(true)
  }, [])

  /* 🔹 Variants (server-visible) */
  const containerVariants = {
    initial: {
      opacity: 1, // 👈 visible on server
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    initial: {
      opacity: 1, // 👈 visible on server
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  }

  return (
    <section
      id={name}
      className="relative bg-background py-28 px-6"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="initial"
        animate={mounted ? "animate" : "initial"}
        whileInView={mounted ? "animate" : "initial"}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          initial="initial"
          animate={mounted ? "animate" : "initial"}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-5"
        >
          {content.primaryHeading}
        </motion.h2>

        {/* Experience cards */}
        <div className="space-y-8">
          {content.experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              initial="initial"
              animate={mounted ? "animate" : "initial"}
              whileInView={mounted ? "animate" : "initial"}
              whileHover={{ y: -4 }}
              className="bg-background rounded-xl shadow-md p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {exp.jobTitle}{" "}
                  <span className="text-primary">
                    @ {exp.companyName}
                  </span>
                </h3>
                <span className="text-sm text-muted-foreground">
                  {exp.startDate} - {exp.endDate}
                </span>
              </div>

              <p className="mt-4 text-muted-foreground">
                {exp.responsibillities}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {exp.technologies.split(",").map((tech, index) => (
                  <span
                    key={index}
                    className="bg-muted text-foreground px-3 py-1 rounded-full text-sm border border-border"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
