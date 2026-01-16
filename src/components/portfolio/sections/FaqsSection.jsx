'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FaqsSection({ id, name, content }) {
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
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    initial: {
      opacity: 1, // 👈 visible on server
      y: 16,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
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
            {content?.heading || 'FAQs'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {content?.subHeading || 'Common questions and answers.'}
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full max-w-3xl mx-auto"
          >
            {content?.items?.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="initial"
                animate={mounted ? 'animate' : 'initial'}
                whileInView={mounted ? 'animate' : 'initial'}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}
