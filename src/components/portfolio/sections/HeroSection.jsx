"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function HeroSection({ id, name, content }) {
  const { primaryHeading, secondaryHeading, cta } = content || {}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      id={name}
      className="min-h-screen w-full overflow-x-hidden relative flex items-center justify-center bg-background px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl pt-10 text-center space-y-6"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl capitalize md:text-6xl font-bold text-foreground"
        >
          {primaryHeading}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-lg md:text-xl"
        >
          {secondaryHeading}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center gap-4 pt-4"
        >
          {cta?.getInTouchLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild>
                <a href={cta.getInTouchLink}>Get In Touch</a>
              </Button>
            </motion.div>
          )}

          {cta?.resumeLink && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <a
                  href={cta.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
