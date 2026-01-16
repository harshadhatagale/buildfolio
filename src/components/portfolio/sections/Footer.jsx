'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  globe: Globe,
}

export default function Footer({ id, content }) {
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
      transition: { staggerChildren: 0.12 },
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
    <footer
      id={id}
      className="relative w-full border-t bg-background px-6 py-5"
    >
      <motion.div
        className="container py-3 flex flex-col md:flex-row justify-between gap-6"
        variants={containerVariants}
        initial="initial"
        animate={mounted ? 'animate' : 'initial'}
        whileInView={mounted ? 'animate' : 'initial'}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Side */}
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="space-y-2 text-center md:text-left"
        >
          <h2 className="text-xl font-bold">
            {content?.portfolioName}
          </h2>

          {content?.description && (
            <p className="text-sm text-muted-foreground max-w-sm">
              {content.description}
            </p>
          )}

          <p className="text-xs text-muted-foreground">
            {content?.copyright ||
              `© ${new Date().getFullYear()} All rights reserved.`}
          </p>

          <Link
            href="/"
            className="text-xs text-muted-foreground hover:underline"
          >
            Built with ❤️ using BuildFolio.
          </Link>
        </motion.div>

        {/* Center Links */}
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="flex flex-wrap justify-center md:justify-start gap-4"
        >
          {content?.links?.map((link) => (
            <Link
              key={link.title}
              href={link.link}
              className="text-sm text-muted-foreground hover:underline"
            >
              {link.title}
            </Link>
          ))}
        </motion.div>

        {/* Right Social Icons */}
        <motion.div
          variants={itemVariants}
          initial="initial"
          animate={mounted ? 'animate' : 'initial'}
          className="flex items-center gap-4 justify-center md:justify-end"
        >
          {content?.socials?.map((social) => {
            const Icon =
              iconMap[social.icon?.toLowerCase()] || Globe

            return (
              <motion.div
                key={social.platform}
                whileHover={{ scale: 1.1 }}
              >
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </footer>
  )
}
