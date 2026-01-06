'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

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
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

const ProjectImageFallback = ({ title }) => {
  const letter = title?.charAt(0)?.toUpperCase() || '?'

  return (
    <div className="aspect-video rounded-lg flex items-center justify-center bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border mb-4">
      <span className="text-5xl font-bold text-primary/70">
        {letter}
      </span>
    </div>
  )
}

export default function ProjectsSection({ id, name, content }) {
  return (
    <section
      id={name}
      className="relative bg-background py-28 px-6"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12"
        >
          {content.heading}
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {content?.projects?.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-muted p-6 rounded-xl border border-border shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              {project.image && project.image.trim() !== '' ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-lg aspect-video object-cover mb-4"
                />
              ) : (
                <ProjectImageFallback title={project.title} />
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-background text-foreground px-2 py-1 rounded text-xs border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {(project.live || project.github) && (
                <div className="flex gap-2 mt-4">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm">Live</Button>
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" variant="outline">
                        Code
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
