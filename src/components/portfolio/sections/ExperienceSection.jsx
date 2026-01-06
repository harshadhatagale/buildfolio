'use client'

import React from "react"
import { motion } from "framer-motion"

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
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function ExperienceSection({ id, name, content }) {
  return (
    <section
      id={name}
      className="relative bg-background py-28 px-6"
    >
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          variants={itemVariants}
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
