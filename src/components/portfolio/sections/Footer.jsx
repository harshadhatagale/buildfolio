'use client'

import React from 'react'
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

export default function Footer({ id, content }) {
  return (
    <footer className="relative w-full border-t bg-background px-6 py-5">
      <motion.div
        className="container py-3 flex flex-col md:flex-row justify-between gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Side */}
        <motion.div
          variants={itemVariants}
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
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/home`}
            className="text-xs text-muted-foreground"
          >
            Built with ❤️ using BuildFolio.
          </Link>
        </motion.div>

        {/* Center Links */}
        <motion.div
          variants={itemVariants}
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
